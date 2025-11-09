import React from "react";
import { Trash2, Plus } from "lucide-react";

function ParamsComp({ rows, handleDelete, handleChange, handleAddRow }) {
  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-xl shadow-md">
      <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wide mb-3 border-b border-gray-700 pb-2">
        Query Params
      </h2>

      <div className="space-y-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg border border-gray-700"
          >
            <input
              type="text"
              placeholder="Key"
              className="w-1/2 p-2 bg-gray-900 border border-gray-700 rounded-md text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={row.key}
              onChange={(e) => handleChange(i, "key", e.target.value)}
            />

            <input
              type="text"
              placeholder="Value"
              className="w-1/2 p-2 bg-gray-900 border border-gray-700 rounded-md text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={row.value}
              onChange={(e) => handleChange(i, "value", e.target.value)}
            />

            {i > 0 && (
              <button
                onClick={() => handleDelete(i)}
                className="text-gray-400 hover:text-red-500 transition cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-start">
        <button
          onClick={handleAddRow}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-md transition cursor-pointer"
        >
          <Plus size={14} /> Add Row
        </button>
      </div>
    </div>
  );
}

export default ParamsComp;
