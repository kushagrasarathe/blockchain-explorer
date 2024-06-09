"use client";
import { useFetchAllTransactions } from "@/api/hooks/useFetchAllTransactions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function AllTransactions() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useFetchAllTransactions();

  console.log("data", data);

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  async function fetchData() {
    const res = await fetch("http://localhost:8080/api");
    const data = await res.json();
    console.log(data);
  }

  //   fetchData();

  return (
    <Card className="dark:bg-secondary-default w-full rounded-lg p-8">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>A list of transactions on Starknet</CardDescription>
      </CardHeader>
      <CardContent>
        <h1>Infinite Loading</h1>
        {status === "pending" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              <button
                onClick={() => fetchPreviousPage()}
                disabled={!hasPreviousPage || isFetchingPreviousPage}
              >
                {isFetchingPreviousPage
                  ? "Loading more..."
                  : hasPreviousPage
                    ? "Load Older"
                    : "Nothing more to load"}
              </button>
            </div>
            {/* {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.items.map((transaction) => (
               <div>
                {transaction.}
               </div>
              ))}
            </React.Fragment>
          ))} */}
            <div>
              <button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                    ? "Load Newer"
                    : "Nothing more to load"}
              </button>
            </div>
            <div>
              {isFetching && !isFetchingNextPage
                ? "Background Updating..."
                : null}
            </div>
          </>
        )}

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="*:p-2.5">
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="dark:hover:bg-secondary-2">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
