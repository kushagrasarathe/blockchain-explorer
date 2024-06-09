"use client";

import { useFetchAllTransactions } from "@/api/hooks/useFetchAllTransactions";
import React from "react";
import { useInView } from "react-intersection-observer";

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
    <div>
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
    </div>
  );
}
