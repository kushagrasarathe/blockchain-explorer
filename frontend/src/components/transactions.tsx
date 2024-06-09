"use client";
import { useFetchAllTransactions } from "@/api/hooks/useFetchAllTransactions";
import { TTransaction } from "@/types/transactions";
import { useCallback, useMemo, useRef } from "react";
import TransactionTabs from "./transaction-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Loader from "./ui/loader";

export default function Transactions() {
  const observer = useRef<IntersectionObserver>();

  const { status, data, error, isFetching, fetchNextPage, hasNextPage } =
    useFetchAllTransactions();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isFetching],
  );

  const transactions: TTransaction[] = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <Card className="w-full rounded-lg p-2 dark:bg-secondary-default">
      <CardHeader>
        <CardTitle className="font-normal">Transactions</CardTitle>
        <CardDescription>A list of transactions on Starknet</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === "loading" ? (
          <div className="flex w-full items-center justify-center">
            <Loader />
          </div>
        ) : status === "error" ? (
          <div className="p-2 text-center text-red-500">
            Error:{" "}
            {
              // @ts-ignore
              error?.message ?? "An error occurred"
            }
          </div>
        ) : (
          <>
            <TransactionTabs transactions={transactions} />

            <div ref={lastElementRef} />

            <div>
              {isFetching ? (
                <div className="flex w-full items-center justify-center">
                  <Loader />
                </div>
              ) : null}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
