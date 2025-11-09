import React from "react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

// Postman-like JSON theme
export const customJsonStyles = {
  ...defaultStyles,
  container: "font-mono text-sm bg-white text-gray-800 p-4",
  key: "text-orange-600 font-semibold", // Orangish-red keys
  valueString: "text-blue-600", // String values
  valueNumber: "text-purple-600", // Numbers
  valueBoolean: "text-pink-600", // Booleans
  valueNull: "text-gray-500 italic", // Null values
  bracket: "text-gray-600", // Braces {}
  comma: "text-gray-500", // Commas
};

const ViewJson = ({ jsonData }) => {
  return (
    <div className="max-h-[80vh] overflow-auto px-4 py-6 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        JSON Preview
      </h2>
      <JsonView
        data={jsonData}
        shouldExpandNode={() => true}
        style={customJsonStyles}
      />
    </div>
  );
};

export default ViewJson;
