import { CopyIcon } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./badge";

interface CopyRowProps {
  text: string;
}

const CopyRow: React.FC<CopyRowProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide the "Copied!" message after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative flex items-center justify-between gap-2 border-t p-2.5 dark:border-y-neutral-600 dark:hover:bg-secondary-2/70">
      <div className="text-sm text-amber-500">{text}</div>

      <button onClick={handleCopy}>
        <CopyIcon size={16} />
      </button>
      {copied && (
        <Badge
          variant={"secondary"}
          className="absolute right-8 rounded-sm dark:border dark:border-gray-700"
        >
          COPIED!
        </Badge>
      )}
    </div>
  );
};

export default CopyRow;
