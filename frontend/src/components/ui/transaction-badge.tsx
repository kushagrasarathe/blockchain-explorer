import { cn } from "@/lib/utils";
import { TTransactionType } from "@/types/transactions";
import React from "react";
import { Badge } from "./badge";
import { ButtonProps } from "./button";

interface BadgeProps {
  type: TTransactionType;
}

const typeColors: Record<TTransactionType, ButtonProps["className"]> = {
  DECLARE:
    "dark:bg-[#202e26] dark:hover:bg-[#202e26] border dark:border-[#6b7d07] dark:text-[#feffb5]",
  DEPLOY:
    "dark:bg-[#223655] dark:hover:bg-[#223655] border dark:border-[#3C506E] dark:text-[#d2e5ff]",
  DEPLOY_ACCOUNT:
    "dark:bg-[#223655] dark:hover:bg-[#223655] border dark:border-[#3C506E] dark:text-[#d2e5ff]",
  INVOKE:
    "dark:bg-[#202e26] dark:hover:bg-[#202e26] border dark:border-[#2E4C3C] dark:text-[#82f4bb]",
  L1_HANDLER:
    "dark:bg-[#383838] dark:hover:bg-[#383838] border dark:border-[#5E5E5E] dark:text-white",
};

const TransactionBadge: React.FC<BadgeProps> = ({ type }) => {
  const colorClass = typeColors[type] || "bg-gray-500 text-white";

  return (
    <Badge className={cn(colorClass, "rounded px-2 py-1 font-normal")}>
      {type.toUpperCase()}
    </Badge>
  );
};

export default TransactionBadge;
