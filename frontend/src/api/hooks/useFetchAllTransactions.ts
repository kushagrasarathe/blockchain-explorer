import { axios } from "@/api";
import { ALL_TRANSACTIONS } from "@/lib/constants/query";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchAllTransactions = () => {
  const fetchLatestTransactions = async ({
    pageParam = 1,
    size = 20,
  }: {
    pageParam?: number;
    size?: number;
  }) =>
    // : Promise<PaginatedResponse<TTransaction[]>>
    {
      const params = new URLSearchParams({
        page: String(pageParam),
        size: String(size),
      });

      // <PaginatedResponse<TTransaction[]>>
      const { data } = await axios.get(`/transactions?${params}`);
      return data;
    };

  return useInfiniteQuery({
    queryKey: [ALL_TRANSACTIONS],
    queryFn: fetchLatestTransactions,
    initialPageParam: 1,
    retry: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};
