import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCopy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={handleCopy}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
      >
        <ClipboardCopy size={16} className="text-gray-200" />
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: -23, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute text-green-400 text-xs font-medium"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.6, opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-6 h-6 rounded-full bg-green-400/30"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyButton;
