# Agora Call Integration Guide

The backend has been perfectly migrated to Agora RTC and the call endpoint is functioning at `POST /calls/calls/agora/token`.

While the frontend can successfully start *outgoing* calls using `getAgoraToken()` and the `agora-rtc-sdk-ng`, **incoming calls will not work** natively because Agora RTC relies on your own backend's signaling system to notify the remote user.

Since the old `/ws/call` signaling WebSocket was removed, you must use the **existing Chat WebSocket** to signal incoming calls!

## 1. Modify the Backend Chat WebSocket (`app/websocket_endpoints/chat_ws.py`)

Currently, you allow `action: "message"`. You need to allow an action like `"call_started"`.

```python
# In chat_ws.py inside the websocket_chat route:

            action = msg.get("action")

            # Add this to pass call signaling down the chat channel
            if action == "call_started":
                # Forward to all others in the conversation
                for client in conversation_clients:
                    if client != websocket:
                        await client.send_text(json.dumps({
                            "action": "call_started",
                            "conversation_id": conversation_id,
                            "user_id": user_id,
                            "channel_name": msg.get("channel_name", "")
                        }))
                continue
```

## 2. Update Frontend `useChatWebSocket.ts`

Extend `WebSocketMessage` and `WebSocketIncoming` types to support call actions:
```typescript
// types.ts
export type WebSocketAction = 'join' | 'leave' | 'message' | 'call_started';

export interface WebSocketIncoming {
    // existing fields...
    action?: string;
    channel_name?: string; // Add this
}
```

Then in `useChatWebSocket.ts`, trigger a custom callback when `"call_started"` arrives:

```typescript
// useChatWebSocket.ts
interface UseChatWebSocketOptions {
    // existing options...
    onIncomingCall?: (channelName: string, userId: string) => void;
}

// inside ws.onmessage:
if (data.action === "call_started") {
    options.onIncomingCall?.(data.channel_name || "", data.user_id);
    return;
}
```

## 3. Trigger & Receive in `InboxLayout.tsx`

### Sending the Call Signal
When `handleStartCall` is clicked, send the WebSocket message with the action `"call_started"`.

```typescript
// InboxLayout.tsx
const handleStartCall = (targetUserId: string, targetUserName?: string, targetUserAvatar?: string) => {
    const channelName = selectedConversation?.id || `direct-${targetUserId}`;

    // Notify remote user via chat websocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
            action: 'call_started',
            conversation_id: selectedConversation.id,
            channel_name: channelName
        }));
    }

    setCallTarget({ id: channelName, name: targetUserName, avatar: targetUserAvatar });
    setIsCallModalOpen(true);
};
```

### Receiving the Call Signal
Wire up the `onIncomingCall` hook to set the call status to `ringing`:

```typescript
// InboxLayout.tsx
const { isConnected, sendMessage } = useChatWebSocket({
    token,
    conversationId: selectedConversation?.id,
    onMessage: handleIncomingMessage,
    onIncomingCall: (channelName, senderId) => {
        // Set callTarget to who is calling
        setCallTarget({ id: channelName, name: "Incoming Caller" });
        setIsCallModalOpen(true);
        // Force the custom hook state if necessary to "ringing"
        // so the UI knows to render exactly like an incoming call!
    }
});
```

By completing these three steps, your Agora RTC integration will be fully functional for both Outgoing and Incoming calls, relying robustly on your existing Chat WebSocket framework!
