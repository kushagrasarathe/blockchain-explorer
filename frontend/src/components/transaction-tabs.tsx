import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TTransaction } from "@/types/transactions";
import React from "react";
import TransactionsTable from "./transactions-table";

interface TransactionTabsProps {
  transactions: TTransaction[];
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ transactions }) => {
  const transactionTypes = [
    "ALL",
    "DECLARE",
    "DEPLOY",
    "DEPLOY_ACCOUNT",
    "INVOKE",
    "L1_HANDLER",
  ];

  const renderTransactions = (type: string) => {
    const filteredTransactions =
      type === "ALL"
        ? transactions
        : transactions.filter(
            (transaction) => transaction.type.toUpperCase() === type,
          );

    return !!filteredTransactions.length ? (
      <TransactionsTable transactions={filteredTransactions} />
    ) : (
      <div className="pt-5 text-secondary-2">No transactions found</div>
    );
  };

  return (
    <Tabs defaultValue="ALL" className="w-full">
      <TabsList className="flex w-max items-stretch justify-normal rounded-sm border p-0 dark:border-gray-600 dark:bg-transparent">
        {transactionTypes.map((type, idx) => (
          <TabsTrigger
            key={type}
            value={type}
            className={cn(
              "border-r text-sm font-normal text-foreground dark:border-gray-600 dark:bg-transparent dark:data-[state=active]:bg-secondary-2",
              idx === transactionTypes.length - 1 && "border-r-0",
            )}
          >
            {idx === 0 ? (
              <span className="capitalize">{type}</span>
            ) : (
              type.replace("_", " ").toLowerCase()
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {transactionTypes.map((type) => (
        <TabsContent key={type} value={type}>
          {renderTransactions(type)}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TransactionTabs;
