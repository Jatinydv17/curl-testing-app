import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

function ParamsComp({onChange, rows, handleDelete, handleChange}) {

  useEffect(() => {
    onChange(rows);
  }, [rows])


  return (
    <div className="p-4 max-h-[400px] overflow-y-auto">
    <div className="text-[rgb(166,164,166)] font-bold mb-2"> Query Params </div>
      <div className="border border-[#5a5a5a] rounded-md overflow-hidden">
        <table className="w-full text-sm font-semibold border-[#5a5a5a]  border-collapse">
          <thead className="text-[rgb(166,164,166)] font-semibold">
            <tr>
              <th className="borderborder-[#5a5a5a] p-3 text-center w-[5%]"></th>
              <th className="border border-[#5a5a5a] p-3 text-left w-[25%]">Key</th>
              <th className="border border-[#5a5a5a] p-3 text-left w-[35%]">Value</th>
              <th className="border border-[#5a5a5a] p-3 text-left w-[35%]">Description</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
              >
                <td className="text-center border border-[#5a5a5a]">
                  <input
                    className="w-6 h-6 accent-white rounded-full"
                    type="checkbox"
                    checked={row.enabled}
                    onChange={(e) => handleChange(i, "enabled", e.target.checked)}
                  />
                </td>

                <td className=" border border-[#5a5a5a]">
                  <input
                    className="w-full p-3 text-sm focus:bg-[rgb(23,22,22)] focus:outline-none"
                    value={row.key}
                    onChange={(e) => handleChange(i, "key", e.target.value)}
                  />
                </td>

                <td className="border border-[#5a5a5a]">
                  <input
                    className="w-full p-3 text-sm outline-none focus:bg-[rgb(23,22,22)] focus:outline-none"
                    value={row.value}
                    onChange={(e) => handleChange(i, "value", e.target.value)}
                  />
                </td>

                <td className="border border-[#5a5a5a] relative">
                  <input
                    className="w-full p-3 text-sm outline-none pr-8 focus:bg-[rgb(23,22,22)] focus:outline-none"
                    value={row.description}
                    onChange={(e) =>
                      handleChange(i, "description", e.target.value)
                    }
                  />
                  {rows.length > 1 && (
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition cursor-pointer"
                      onClick={() => handleDelete(i)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParamsComp;
