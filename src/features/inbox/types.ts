// Types for Chat/Messaging feature

export type ConversationType = 'private' | 'group' | 'support';
export type MessageContentType = 'text' | 'image' | 'video' | 'file';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export interface Conversation {
    id: string;
    title?: string;
    type: ConversationType;
    created_by: string;
    created_at: string;
    last_message_id?: string | null;
    metadataInfo?: Record<string, unknown>;
    // Extended fields for UI
    participants?: ConversationParticipant[];
    lastMessage?: Message;
    unreadCount?: number;
}

export interface ConversationParticipant {
    id: string;
    conversation_id: string;
    user_id: string;
    role: string;
    joined_at: string;
    left_at?: string;
    // Extended fields for UI (populated from user data)
    username?: string;
    avatar_url?: string;
    online?: boolean;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    content_type: MessageContentType;
    status: MessageStatus;
    created_at: string;
    edited_at?: string;
    reply_to_message_id?: string;
    metadataInfo?: Record<string, unknown>;
    // Extended fields for UI
    sender?: {
        username?: string;
        avatar_url?: string;
    };
}

export interface MessageCreate {
    conversation_id: string;
    sender_id: string;
    content: string;
    content_type: MessageContentType;
    reply_to_message_id?: string;
    metadataInfo?: Record<string, unknown>;
}

export interface ConversationCreate {
    title?: string;
    type: ConversationType;
    recipient_id: string;
    metadataInfo?: Record<string, unknown>;
}

// WebSocket action types
export type WebSocketAction = 'join' | 'leave' | 'message' | 'call_invite' | 'call_accept' | 'call_reject';

export interface WebSocketMessage {
    action: WebSocketAction;
    conversation_id: string;
    content?: string;
    user_id?: string;
    // Call invite fields
    channel_name?: string;
    caller_name?: string;
    caller_avatar?: string;
    metadataInfo?: Record<string, unknown>;
}

export interface WebSocketIncoming {
    conversation_id: string;
    user_id: string;
    message?: Message;
    content?: string;
    action?: string;
    // Call invite fields
    channel_name?: string;
    caller_name?: string;
    caller_avatar?: string;
}
