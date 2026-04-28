// Types for Agora RTC Audio Calling

export type CallStatus =
    | 'idle'        // No call
    | 'ringing'     // Incoming call ringing
    | 'joining'     // Joining Agora channel
    | 'connected'   // In call
    | 'ended'       // Call ended
    | 'failed';     // Call failed

export interface CallState {
    status: CallStatus;
    isAudioEnabled: boolean;
    remoteUserId: string | null;
    remoteUserName: string | null;
    error: string | null;
    callDuration: number; // in seconds
}

export interface AgoraTokenResponse {
    token: string;
    channel_name: string;
    uid: number;
    app_id: string;
    expires_in: number;
}
