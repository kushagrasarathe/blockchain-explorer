"use client";

import { useFetchTransactionDetails } from "@/api/hooks/useFetchTransactionDetails";
import { formatTimestampToDate } from "@/lib/utils";
import { useTransactionsStore } from "@/redux/hooks";
import { TTransactionType } from "@/types/transactions";
import { LucideLoader2 } from "lucide-react";
import CopyToClipboard from "./copy-to-clipboard";
import TransactionDetailsTabs from "./transaction-details-tabs";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TransactionBadge from "./ui/transaction-badge";

export default function TransactionDetails({ txHash }: { txHash: string }) {
  const { transactionDetails } = useTransactionsStore();
  const { data, error, isFetching } = useFetchTransactionDetails(
    txHash,
    !transactionDetails,
  );

  console.log(transactionDetails);
  if (isFetching) {
    return <div>Loading...</div>;
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
          <Badge className="flex w-fit items-center gap-2 px-3 py-1.5 dark:bg-green-700 dark:text-white hover:dark:bg-green-800">
            <LucideLoader2 className="size-4 animate-spin" />{" "}
            <div className="text-xs font-normal">ACCEPTED_ON_L2</div>
          </Badge>
        </div>

        <div>
          <TransactionDetailsTabs />
        </div>
      </CardContent>
    </Card>
  );
}
