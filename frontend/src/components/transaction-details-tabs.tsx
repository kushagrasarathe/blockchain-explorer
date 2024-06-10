import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatTimestamp, formatTimestampToDate } from "@/lib/utils";
import { useTransactionsStore } from "@/redux/hooks";
import { ExecutionResources } from "@/types/transactions";
import React from "react";
import CalldataTabs from "./calldata-tabs";
import CopyToClipboard from "./copy-to-clipboard";
import EventsTable from "./events-table";
import { Badge } from "./ui/badge";
import CopyRow from "./ui/copy-row";

const TransactionDetailsTabs: React.FC = () => {
  const { transactionDetails } = useTransactionsStore();
  const tabs = ["Overview", "Events"];

  const transactionDetailsData = [
    {
      "BLOCK NUMBER": transactionDetails?.blockNumber,
      TIMESTAMP: `${formatTimestamp(transactionDetails?.timestamp as number)} ( ${formatTimestampToDate(transactionDetails?.timestamp as number)} )`,
      "ACTUAL FEE": transactionDetails?.actualFeeUSD,
      "MAX FEE": transactionDetails?.max_fee || "-",
      "GAS CONSUMED": transactionDetails?.gasConsumed || "-",
      "CONTRACT ADDRESS": transactionDetails?.sender_address || "-",
    },
  ];

  const renderExecutionResources = (
    executionResources: ExecutionResources,
  ): JSX.Element[] => {
    return Object.entries(executionResources).map(([key, value]) => {
      if (typeof value === "object") {
        return (
          <div
            key={key}
            className={cn(
              "flex items-center gap-2 rounded px-3 font-normal tracking-wide dark:border-neutral-500",
            )}
          >
            {key} : {renderExecutionResources(value)}
          </div>
        );
      } else {
        return (
          <Badge
            key={key}
            className={cn(
              "flex items-center rounded px-3 font-normal tracking-wide dark:border-neutral-500",
            )}
            variant={"outline"}
          >
            {key} : {value}
          </Badge>
        );
      }
    });
  };

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
        <div className="space-y-4 py-4">
          <div className="text-xl">Developer Info</div>
          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">UNIX TIMESTAMP:</div>
            <div className="flex w-9/12 gap-2 border-b py-2 dark:border-gray-600">
              {transactionDetails?.unix_timestamp}{" "}
              <CopyToClipboard
                text={transactionDetails?.unix_timestamp.toString() as string}
              />
            </div>
          </div>
          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">NONCE:</div>
            <div className="w-9/12 border-b py-2 dark:border-gray-600">
              {transactionDetails?.nonce || "-"}
            </div>
          </div>
          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">POSITION:</div>
            <div className="w-9/12 border-b py-2 dark:border-gray-600">
              {transactionDetails?.position || "-"}
            </div>
          </div>
          <div className="flex items-center justify-stretch text-sm">
            <div className="w-3/12">VERSION:</div>
            <div className="w-9/12 border-b py-2 dark:border-gray-600">
              {transactionDetails?.version || "-"}
            </div>
          </div>
          {/* todo: render execution resources */}
          <div className="flex items-start justify-stretch pt-2 text-sm">
            <div className="w-3/12">EXECUTION RESOURCES:</div>
            <div className="flex w-9/12 flex-wrap items-center gap-2.5 border-b pb-6 dark:border-gray-600">
              {/* {transactionDetails?.execution_resources.} */}
              {transactionDetails?.execution_resources &&
                renderExecutionResources(
                  transactionDetails?.execution_resources,
                )}
            </div>
          </div>
          <div className="flex items-start justify-stretch text-sm">
            <div className="w-3/12">CALLDATA:</div>
            <div className="w-9/12 py-2">
              <CalldataTabs calldata={transactionDetails?.calldata || []} />
            </div>
          </div>

          <div className="flex items-start justify-stretch text-sm">
            <div className="w-3/12">SIGNATURE{`(S)`}:</div>
            <div className="w-9/12 border-b pt-2 dark:border-gray-600">
              {transactionDetails?.signature.map((item, idx) => (
                <CopyRow key={idx} text={item} />
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value={"Events"}>
        <div>
          <EventsTable events={transactionDetails?.events || []} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TransactionDetailsTabs;
