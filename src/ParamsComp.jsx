import React from 'react'

function ParamsComp() {
  return (
     <div className="p-4 max-h-[400px] overflow-y-auto">
          
          {/* Key-Value Editor (for Params/Headers) */}
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700">
              <div className="col-span-5">Key</div>
              <div className="col-span-5">Value</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            <div className="grid grid-cols-12 gap-2">
              <input
                className="col-span-5 border p-2 rounded-md text-sm"
                placeholder="Key"
              />
              <input
                className="col-span-5 border p-2 rounded-md text-sm"
                placeholder="Value"
              />
              <button className="col-span-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200">
                Remove
              </button>
            </div>

            <button className="mt-3 text-blue-600 text-sm hover:underline">
              + Add Row
            </button>
          </div>
        </div>
  )
}

export default ParamsComp