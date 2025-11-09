import { motion, AnimatePresence } from "framer-motion";
import { View, X } from "lucide-react";
import { useState } from "react";
import ViewJson from "./ViewJson";

const ViewCompleteButton = ({ formattedResponse }) => {
  const [completeJsonView, setCompleteJsonView] = useState(false);

  const toggleJsonView = () => setCompleteJsonView(!completeJsonView);

  return (
    <>
      <div className="relative flex items-center justify-center group">
        <button
          onClick={toggleJsonView}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
        >
          <View size={16} />
        </button>

        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
          View Complete JSON
        </span>

        <AnimatePresence>
          {completeJsonView && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <div className="relative bg-white w-[90%] max-w-4xl rounded-2xl shadow-xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={toggleJsonView}
                  className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <X size={18} />
                </button>

                {/* JSON View */}
                <ViewJson jsonData={formattedResponse} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ViewCompleteButton;
