import { axios } from "@/api";
import { ALL_TRANSACTIONS } from "@/lib/constants/query";
import { PaginatedResponse } from "@/types";
import { TTransaction } from "@/types/transactions";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchAllTransactions = () => {
  const fetchLatestTransactions = async ({
    pageParam = 1,
    size = 2,
  }: {
    pageParam?: number;
    size?: number;
  }): Promise<PaginatedResponse<TTransaction[]>> => {
    const params = new URLSearchParams({
      page: String(pageParam),
      size: String(size),
    });

    const { data } = await axios.get<PaginatedResponse<TTransaction[]>>(
      `/transactions?${params}`,
    );
    return data;
  };

  return useInfiniteQuery({
    queryKey: [ALL_TRANSACTIONS],
    queryFn: fetchLatestTransactions,
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  });
};
