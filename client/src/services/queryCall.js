import { fetchUser, getUserResult } from "@/actions/apiActions";
import { useQuery } from "@tanstack/react-query";



export function useUsers(){
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUser,
        enabled: false
    })
}