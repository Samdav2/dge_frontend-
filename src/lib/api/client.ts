const BASE_URL = '/api';
console.log('ApiClient: Forced BASE_URL to:', BASE_URL);

interface RequestConfig extends RequestInit {
    headers?: HeadersInit;
}

class ApiClient {
    private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
        const url = `${BASE_URL}${endpoint}`;
        console.log(`ApiClient: Requesting ${config.method || 'GET'} ${url}`);
        const headers = {
            'Content-Type': 'application/json',
            ...config.headers,
        };

        try {
            const response = await fetch(url, {
                ...config,
                headers,
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            return response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }

    get<T>(endpoint: string, config?: RequestConfig) {
        return this.request<T>(endpoint, { ...config, method: 'GET' });
    }

    post<T>(endpoint: string, body: unknown, config?: RequestConfig) {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    put<T>(endpoint: string, body: unknown, config?: RequestConfig) {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    delete<T>(endpoint: string, config?: RequestConfig) {
        return this.request<T>(endpoint, { ...config, method: 'DELETE' });
    }

    patch<T>(endpoint: string, body: unknown, config?: RequestConfig) {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }
}

export const api = new ApiClient();
