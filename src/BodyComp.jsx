import React, { useState } from "react";

function BodyComp() {
  const fields = ["none", "form-data", "x-www-form-urlencoded", "raw"];
  const [selectedField, setSelectedField] = useState("none");
  const [rawBody, setRawBody] = useState("");

  return (
    <div className="bg-gray-900 text-gray-100 p-4 rounded-xl shadow-md">
      {/* Radio Buttons */}
      <div className="flex gap-4 mb-4 border-b border-gray-700 pb-3">
        {fields.map((field, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="bodyType"
              value={field}
              checked={selectedField === field}
              onChange={(e) => setSelectedField(e.target.value)}
              className="accent-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium capitalize">{field}</span>
          </label>
        ))}
      </div>

      {/* Conditional Rendered Sections */}
      {selectedField === "none" && (
        <p className="text-gray-400 text-sm italic">No body will be sent with this request.</p>
      )}

      {selectedField === "form-data" && (
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Key"
              className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="Value"
              className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1 rounded-md">
            + Add Row
          </button>
        </div>
      )}

      {selectedField === "x-www-form-urlencoded" && (
        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Key"
              className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="Value"
              className="w-1/2 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-sm px-3 py-1 rounded-md">
            + Add Row
          </button>
        </div>
      )}

      {selectedField === "raw" && (
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Raw JSON Body
          </label>
          <textarea
            rows="6"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 font-mono text-sm text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder='{"key": "value"}'
            value={rawBody}
            onChange={(e) => setRawBody(e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default BodyComp;
