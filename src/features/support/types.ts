// Types for Support Ticket feature matching backend API

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

// For UI display conversion
export type UIPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type UIStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Closed';

export interface SupportTicket {
    id: string;
    user_id: string;
    assigned_to?: string | null;
    subject: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    created_at: string;
    updated_at: string;
}

export interface SupportTicketCreate {
    subject: string;
    description: string;
    priority: TicketPriority;
    user_id: string;
}

export interface SupportTicketUpdate {
    subject?: string;
    description?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
    assigned_to?: string | null;
}

export interface SupportTicketReply {
    id: string;
    ticket_id: string;
    message: string;
    attachments: Record<string, unknown>;
    created_at: string;
    author_user_id?: string | null;
    author_team_user_id?: string | null;
}

export interface SupportTicketReplyCreate {
    message: string;
    attachments?: Record<string, unknown>;
    ticket_id: string;
    author_user_id?: string | null;
    author_team_user_id?: string | null;
}

// Helper functions for UI conversion
export function priorityToUI(priority: TicketPriority): UIPriority {
    const map: Record<TicketPriority, UIPriority> = {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        urgent: 'Urgent'
    };
    return map[priority];
}

export function priorityFromUI(priority: UIPriority): TicketPriority {
    const map: Record<UIPriority, TicketPriority> = {
        'Low': 'low',
        'Medium': 'medium',
        'High': 'high',
        'Urgent': 'urgent'
    };
    return map[priority];
}

export function statusToUI(status: TicketStatus): UIStatus {
    const map: Record<TicketStatus, UIStatus> = {
        open: 'Pending',
        in_progress: 'In Progress',
        resolved: 'Resolved',
        closed: 'Closed'
    };
    return map[status];
}

export function statusFromUI(status: UIStatus): TicketStatus {
    const map: Record<UIStatus, TicketStatus> = {
        'Pending': 'open',
        'In Progress': 'in_progress',
        'Resolved': 'resolved',
        'Closed': 'closed'
    };
    return map[status];
}
