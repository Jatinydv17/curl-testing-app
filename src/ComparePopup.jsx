import React from 'react'
import { JsonView, darkStyles } from 'react-json-view-lite'
import "react-json-view-lite/dist/index.css";


function ComparePopup({formattedResponse, setShowModal}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">    
     <div className="bg-gray-900 w-10/12 max-w-6xl max-h-[90vh] overflow-auto rounded-2xl shadow-2xl p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-400">Response Verification</h2>
        <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-200 text-xl">✖</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-3 overflow-auto max-h-96">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Actual Response</h3>
          <JsonView data={JSON.parse(formattedResponse)} style={darkStyles} shouldExpandNode={() => true}/>  
        </div>

        <div className="bg-gray-800 rounded-xl p-3">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Expected Response</h3>
          <textarea
            className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2 text-gray-200 focus:outline-none h-80"
            placeholder="Enter expected output..."
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold">
          Verify Response
        </button>
      </div>
    </div>
  </div>
  )
}

export default ComparePopup