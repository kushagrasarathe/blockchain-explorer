import { axios } from "@/api";
import { TRANSACTION_EVENTS } from "@/lib/constants/query";
import { useQuery } from "@tanstack/react-query";

export const useFetchTransactionEvents = (txHash: string, dependsOn = true) => {
  const fetchTransactionEvents = async () => {
    const { data } = await axios.get(`/events/transaction/${txHash}`);
    return data;
  };

  async function onSuccess(data: any) {
    console.log("events", data);
  }

  return useQuery({
    queryKey: [TRANSACTION_EVENTS],
    queryFn: fetchTransactionEvents,
    onSuccess,
    retry: 0,
    enabled: dependsOn,
  });
};
