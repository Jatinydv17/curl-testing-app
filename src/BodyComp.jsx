import React from 'react'

function BodyComp() {
  return (
    
    <div className="mt-6">
    <label className="block mb-2 text-sm font-medium text-gray-700">
        Raw JSON Body
    </label>
    <textarea
        rows="6"
        className="w-full border rounded-md p-3 font-mono text-sm focus:ring-2 focus:ring-blue-400"
        placeholder='{"key": "value"}'
    ></textarea>
    </div>
  )
}

export default BodyComp