import React from "react";

const PrettyJsonView = ({ data }) => {
  // Ensure data is parsed and prettified
  let formattedJson = "";
  try {
    formattedJson = JSON.stringify(
      typeof data === "string" ? JSON.parse(data) : data,
      null,
      2
    );
  } catch {
    formattedJson = data;
  }

  return (
    <pre className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-xl overflow-auto leading-relaxed">
      <code>
        {formattedJson.split("\n").map((line, index) => {
          // Regex to colorize keys, strings, numbers, booleans, and null
          const coloredLine = line
            .replace(
              /"(.*?)":/g,
              '<span class="text-amber-400">"$1"</span>:' // keys - amber
            )
            .replace(
              /: "([^"]*)"/g,
              ': <span class="text-emerald-400">"$1"</span>' // strings - green
            )
            .replace(
              /: (\d+(\.\d+)?)/g,
              ': <span class="text-sky-400">$1</span>' // numbers - blue
            )
            .replace(
              /: (true|false)/g,
              ': <span class="text-purple-400">$1</span>' // booleans - purple
            )
            .replace(
              /: null/g,
              ': <span class="text-gray-500 italic">null</span>' // null - gray italic
            );

          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: coloredLine }}
            />
          );
        })}
      </code>
    </pre>
  );
};

export default PrettyJsonView;
