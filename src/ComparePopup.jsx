import React from 'react';
import CopyButton from './CopyButton';
import PrettyJsonView from './PrettyJsonView';

function ComparePopup({ formattedResponse, setShowModal, responseStatus }) {
  const parsedResponse = JSON.parse(formattedResponse);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-[95%] md:w-[85%] h-[90vh] rounded-2xl shadow-2xl flex flex-col p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-400">Response Verification</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-200 text-xl cursor-pointer"
          >
            ✖
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {responseStatus === 200 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-3 overflow-auto max-h-[70vh]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-300">Actual Response</h3>
                  <CopyButton textToCopy={formattedResponse} />
                </div>
                <PrettyJsonView data={parsedResponse} />
              </div>

              <div className="bg-gray-800 rounded-xl p-3 max-h-[70vh] flex flex-col">
                <h3 className="text-sm font-bold text-gray-300 mb-2">Expected Response</h3>
                <textarea
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2 text-gray-200 focus:outline-none flex-1 resize-none"
                  placeholder="Enter expected output..."
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 justify-center h-full">
              <div
                className={`w-4 h-4 rounded-full ${
                  responseStatus >= 200 && responseStatus < 300
                    ? 'bg-green-500'
                    : responseStatus >= 400 && responseStatus < 500
                    ? 'bg-red-500'
                    : responseStatus >= 500
                    ? 'bg-orange-500'
                    : 'bg-gray-400'
                }`}
              ></div>
              <span className="text-gray-200 text-lg font-semibold">
                {responseStatus}{' '}
                {responseStatus === 404
                  ? 'Not Found'
                  : responseStatus === 400
                  ? 'Bad Request'
                  : responseStatus === 401
                  ? 'Unauthorized'
                  : responseStatus === 500
                  ? 'Internal Server Error'
                  : ''}
              </span>
            </div>
          )}
        </div>

        {responseStatus === 200 && (
          <div className="flex justify-end mt-3">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-md transition">
              Verify Response
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComparePopup;
