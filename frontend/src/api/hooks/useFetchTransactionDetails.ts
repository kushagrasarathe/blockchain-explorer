import { axios } from "@/api";
import { TRANSACTION_DETAILS } from "@/lib/constants/query";
import { useAppDispatch } from "@/redux/hooks";
import { transactionsActions } from "@/redux/slices/transactions-slice";
import { TTransactionDetails } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useFetchTransactionDetails = (
  txHash: string,
  dependsOn = true,
) => {
  const dispatch = useAppDispatch();
  const fetchTransaction = async () => {
    const { data } = await axios.get(`/transactions/${txHash}`);
    return data;
  };

  async function onSuccess(data: TTransactionDetails) {
    // console.log("data", data);
    dispatch(transactionsActions.setTransactionDetails(data));
  }

  async function onError(error: AxiosError) {
    // dispatch(transactionsActions.setTransactionDetails());
  }

  return useQuery({
    queryKey: [TRANSACTION_DETAILS],
    queryFn: fetchTransaction,
    onSuccess,
    onError,
    retry: 0,
    enabled: dependsOn,
  });
};
