"use client";

import { useFetchTransactionDetails } from "@/api/hooks/useFetchTransactionDetails";
import { useFetchTransactionEvents } from "@/api/hooks/useFetchTransactionEvents";
import { formatTimestampToDate } from "@/lib/utils";
import { useTransactionsStore } from "@/redux/hooks";
import { TTransactionType } from "@/types/transactions";
import { Check, LucideLoader2 } from "lucide-react";
import CopyToClipboard from "./copy-to-clipboard";
import TransactionDetailsTabs from "./transaction-details-tabs";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import TransactionBadge from "./ui/transaction-badge";

export default function TransactionDetails({ txHash }: { txHash: string }) {
  const { transactionDetails } = useTransactionsStore();
  const { data, error, isFetching } = useFetchTransactionDetails(
    txHash,
    !transactionDetails,
  );
  const {
    data: txEvents,
    error: txEventsError,
    isFetching: isFetchingTxEvents,
  } = useFetchTransactionEvents(txHash, !transactionDetails);

  // console.log(transactionDetails);
  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!transactionDetails) {
    return <div>Not Found</div>;
  }

  return (
    <Card className="w-full rounded-lg p-2 dark:bg-secondary-default">
      <CardHeader>
        <CardTitle className="font-normal">Transactions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-1">
          <span className="text-sm text-neutral-500">Hash</span>
          <div className="flex items-center gap-2">
            <span className="text-base tracking-wide">
              {transactionDetails?.transactionHash}{" "}
            </span>
            <CopyToClipboard
              text={transactionDetails?.transactionHash as string}
            />
          </div>
        </div>
        <div className="flex items-center justify-between md:max-w-xl">
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">TYPE</div>
            <TransactionBadge
              type={transactionDetails?.type as TTransactionType}
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-neutral-500">TIMESTAMP</div>
            <div>
              {formatTimestampToDate(transactionDetails?.timestamp as number)}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-sm text-neutral-500">STATUS</div>
          <div className="relative flex items-center">
            <Badge className="group flex w-fit cursor-pointer items-center gap-2 px-3 py-1.5 hover:pr-5 dark:bg-green-700 dark:text-white hover:dark:bg-green-800">
              <Check className="size-4 group-hover:translate-x-1" />
              <div className="text-xs font-normal group-hover:translate-x-1">
                ACCEPTED_ON_L2
              </div>
            </Badge>
            <Separator className="w-10 dark:bg-gray-400" />

            <div className="flex size-8 items-center justify-center rounded-full border dark:border-gray-400 dark:text-gray-400">
              <LucideLoader2 className="size-7 animate-spin" />
            </div>
          </div>
        </div>

        <div>
          <TransactionDetailsTabs />
        </div>
      </CardContent>
    </Card>
  );
}
