import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatTimestamp, formatTimestampToDate } from "@/lib/utils";
import { useTransactionsStore } from "@/redux/hooks";
import React from "react";

const TransactionDetailsTabs: React.FC = () => {
  const { transactionDetails } = useTransactionsStore();
  const tabs = ["Overview", "Events"];

  const transactionDetailsData = [
    {
      "BLOCK NUMBER": transactionDetails?.blockNumber,
      TIMESTAMP: `${formatTimestamp(transactionDetails?.timestamp as number)} ( ${formatTimestampToDate(transactionDetails?.timestamp as number)} )`,
      "ACTUAL FEE": transactionDetails?.actualFeeUSD,
      "MAX FEE": "-",
      "GAS CONSUMED": "-",
      "TOKENS TRANSFERRED": "-",
      "CONTRACT ADDRESS": "-",
    },
  ];

  return (
    <Tabs defaultValue="Overview" className="w-full">
      <TabsList className="flex w-max items-stretch justify-normal rounded-sm border-0 dark:bg-transparent">
        {tabs.map((tab, idx) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "pb-5 text-sm font-normal text-foreground dark:border-amber-700 dark:bg-transparent dark:data-[state=active]:border-b dark:data-[state=active]:bg-transparent",
            )}
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={"Overview"}>
        <div className="space-y-4 py-4">
          <div className="text-xl">Transaction Details</div>
          {transactionDetailsData.map((details, index) =>
            Object.entries(details).map(([key, value]) => (
              <div
                key={`${key}-${index}`}
                className="flex items-center justify-stretch text-sm"
              >
                <div className="w-3/12">{key}:</div>
                <div className="w-9/12 border-b py-2 dark:border-gray-600">
                  {value}
                </div>
              </div>
            )),
          )}
        </div>
      </TabsContent>
      <TabsContent value={"Events"}>
        <div>Events</div>
      </TabsContent>
    </Tabs>
  );
};

export default TransactionDetailsTabs;
