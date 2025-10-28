const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    statusCode: number;
}

export const status = {
    get: async (token: string): Promise<string> =>{
        const response = await fetch(`${API_BASE_URL}/status`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if(!response.ok) {
            const errorData = await response.json().catch(()=>({message: 'Network response was not ok'}));
            throw new Error(errorData.message || 'Failed to fetch status');
        }
        const data: ApiResponse<string> = await response.json()

        if(!data.success) {
            throw new Error(data.message || "API request failed");
        }
        return typeof data.data === 'string' ? data.data : JSON.stringify(data.data);
    }
}