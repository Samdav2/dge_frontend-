export interface PortfolioMedia {
    id: string;
    portfolio_id: string;
    media_type: 'image' | 'video';
    s3_key: string;
    thumbnail_s3_key?: string;
    size_bytes?: number;
    processed: boolean;
    created_at: string;
}

export type PortfolioVisibility = 'public' | 'private';

export interface UserPortfolio {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    category?: string;
    visibility: PortfolioVisibility;
    website?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    media?: PortfolioMedia[];
    created_at: string;
    updated_at: string;
}

export interface UserPortfolioCreate {
    title: string;
    description?: string;
    category?: string;
    visibility?: PortfolioVisibility;
    website?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
}

export interface UserPortfolioUpdate {
    title?: string;
    description?: string;
    category?: string;
    visibility?: PortfolioVisibility;
    website?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
}
