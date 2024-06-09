import { CopyIcon } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
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
    <div className="relative flex items-center gap-2">
      <button onClick={handleCopy}>
        <CopyIcon size={16} />
      </button>
      {copied && (
        <Badge
          variant={"secondary"}
          className="absolute left-6 rounded-sm dark:border dark:border-gray-700"
        >
          COPIED!
        </Badge>
      )}
    </div>
  );
};

export default CopyToClipboard;
