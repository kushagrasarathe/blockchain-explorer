"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimestamp } from "@/lib/utils";
import { Event } from "@/types/transactions";
import CopyToClipboard from "./copy-to-clipboard";
import { Badge } from "./ui/badge";

const columns = ["ID", "BLOCK", "AGE"];

export default function EventsTable({ events }: { events: Event[] }) {
  console.log(events);
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
        {!!events.length ? (
          events?.map(({ id, blockNumber, timestamp }: Event) => (
            <TableRow key={id} className="dark:hover:bg-secondary-2">
              <TableCell>
                {id ? (
                  <div className="flex w-28 items-center justify-between gap-2">
                    <span className="text-foreground-secondary">{id}</span>
                    <CopyToClipboard text={id} />
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {blockNumber ? (
                  <div className="flex w-28 items-center justify-between gap-2">
                    <Badge
                      className="text-foreground-secondary"
                      variant={"outline"}
                    >
                      {blockNumber}
                    </Badge>
                    <CopyToClipboard text={id} />
                  </div>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{formatTimestamp(timestamp)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="dark:hover:bg-secondary-2">
            <TableCell colSpan={columns.length}>Not Available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
