"use client";
import TransactionDetails from "@/components/transaction-details";
import { usePathname } from "next/navigation";

export default function TransactionPage() {
  const path = usePathname();
  const txHash = path.split("/")[2];
  return <TransactionDetails txHash={txHash} />;
}
