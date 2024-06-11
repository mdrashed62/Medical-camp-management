import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./Secure/useAxiosSecure";


const useCamps = () => {
    const axiosSecure = useAxiosSecure();
   const {data: camps = []} = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/registeredCamps');
            return res.data;
        }
   })
   return [camps]

};

export default useCamps;