export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    discount: boolean;
    discount_percent: number;
    type: string;
    status: string;
    image: string;
    created_at: string;
    keywords: string;
    username: string;
    user_id: string;
    upvotes: number;
    user_online: boolean;
    user_picture?: string | null;
}

export interface UserProfile {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    bio: string;
    phone: string;
    avatar_url: string;
    country: string;
    state: string;
    city: string;
    address_line1: string;
    address_line2: string;
    postal_code: string;
    gender: string;
    date_of_birth?: string | null;
    created_at: string;
    updated_at: string;
}

export interface PortfolioItem {
    id: string;
    user_id: string;
    title: string;
    description: string;
    category: string;
    visibility: string;
    website?: string | null;
    facebook?: string | null;
    youtube?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    created_at: string;
    updated_at: string;
}

export interface User {
    username: string;
    email: string;
    id: string;
    status: string;
    referral_code: string;
}

export interface ServiceDetailResponse {
    service: Service;
    profile: UserProfile;
    portfolio: PortfolioItem[];
    user: User;
}

export interface ServiceResponseItem {
    service: Service;
    profile: UserProfile | null;
    portfolio: PortfolioItem[];
    user: User;
}
