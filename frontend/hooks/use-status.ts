import {useQuery} from "@tanstack/react-query";
import {status} from "@/lib/api/index";
import { useAuth } from "@clerk/nextjs";

export const useStatus = () =>{
    const {getToken, isSignedIn} = useAuth();

    return useQuery({
        queryKey: ['status'],
        queryFn: async () =>{
            if(!isSignedIn) {
                throw new Error("Not authenticated");
            }

            const token = await getToken();

            if(!token) {
                throw new Error("Failed to get token");
            }
            return status.get(token);
        },
        enabled: isSignedIn,
        retry: 3,
        staleTime: 30000,
    })
}
