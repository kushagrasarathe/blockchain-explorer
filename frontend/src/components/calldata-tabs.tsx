import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, separateDataFormats } from "@/lib/utils";
import React from "react";
import { Card } from "./ui/card";
import CopyRow from "./ui/copy-row";

interface CalldataTabsProps {
  calldata: string[];
}

const CalldataTabs: React.FC<CalldataTabsProps> = ({ calldata }) => {
  const tabs = ["Hex", "Dec", "Text"];

  const data = separateDataFormats(calldata);

  return (
    <Card className="w-full rounded-lg p-3 dark:bg-white/10">
      <Tabs defaultValue="Hex" className="w-full">
        <TabsList className="flex w-max items-stretch justify-normal rounded-sm border p-0 dark:border-gray-600 dark:bg-transparent">
          {tabs.map((tab, idx) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={cn(
                "border-r text-sm font-normal text-foreground dark:border-gray-600 dark:bg-transparent dark:data-[state=active]:bg-secondary-2",
                idx === tabs.length - 1 && "border-r-0",
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={"Hex"}>
          <Card className="w-full rounded-lg p-2 dark:bg-secondary-default">
            {data.hex.map((item, idx) => (
              <CopyRow key={idx} text={item.toString()} />
            ))}
            {!data.hex.length && (
              <span className="text-neutral-400">Not Available</span>
            )}
          </Card>
        </TabsContent>
        <TabsContent value={"Dec"}>
          <Card className="w-full rounded-lg p-2 dark:bg-secondary-default">
            {data.dec.map((item, idx) => (
              <CopyRow key={idx} text={item.toString()} />
            ))}
            {!data.dec.length && (
              <span className="text-neutral-400">Not Available</span>
            )}
          </Card>
        </TabsContent>
        <TabsContent value={"Text"}>
          <Card className="w-full rounded-lg p-2 dark:bg-secondary-default">
            {data.text.map((item, idx) => (
              <CopyRow key={idx} text={item.toString()} />
            ))}
            {!data.text.length && (
              <span className="text-neutral-400">Not Available</span>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CalldataTabs;
