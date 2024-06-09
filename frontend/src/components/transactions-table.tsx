"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimestamp, truncateHash } from "@/lib/utils";
import { TTransaction } from "@/types/transactions";
import Link from "next/link";
import CopyToClipboard from "./copy-to-clipboard";
import TransactionBadge from "./ui/transaction-badge";

const columns = ["HASH", "TYPE", "BLOCK", "AGE"];

export default function TransactionsTable({
  transactions,
}: {
  transactions: TTransaction[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="*:p-2.5">
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions &&
          transactions?.map((transaction: TTransaction) => (
            <TableRow
              key={transaction._id}
              className="dark:hover:bg-secondary-2"
            >
              <TableCell>
                {transaction.transactionHash ? (
                  <div className="flex w-28 items-center justify-between gap-2">
                    {transaction.type === "INVOKE" &&
                    transaction.version === 1 &&
                    !!transaction.transactionHash.length ? (
                      <Link href={`/tx/${transaction.transactionHash}`}>
                        <span className="text-foreground-secondary">
                          {truncateHash(transaction.transactionHash)}
                        </span>
                      </Link>
                    ) : (
                      <span className="text-foreground-secondary">
                        {truncateHash(transaction.transactionHash)}
                      </span>
                    )}
                    <CopyToClipboard text={transaction.transactionHash} />
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {<TransactionBadge type={transaction.type} /> || "N/A"}
              </TableCell>
              <TableCell>
                {transaction.blockNumber ? (
                  <div className="flex w-16 items-center justify-between gap-2">
                    <div className="text-foreground-secondary">
                      {truncateHash(transaction.blockNumber.toString())}
                    </div>
                    <CopyToClipboard
                      text={transaction.blockNumber.toString()}
                    />
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{formatTimestamp(transaction.timestamp)}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
