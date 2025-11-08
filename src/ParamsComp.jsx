import React, { useState } from "react";
import { Trash2 } from "lucide-react";

function ParamsComp() {
  const [rows, setRows] = useState([
    { enabled: true, key: "", value: "", description: "" },
  ]);

  const handleRowAddClick = () => {
    setRows([...rows, { enabled: true, key: "", value: "", description: "" }]);
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="p-4 max-h-[400px] overflow-y-auto">
      <div className="border border-[#5a5a5a] rounded-md overflow-hidden">
        <table className="w-full text-sm border-[#5a5a5a]  border-collapse">
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
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition"
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
