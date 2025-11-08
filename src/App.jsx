import React, { useState } from "react";
import ParamsComp from "./ParamsComp";
import AuthComp from "./AuthComp";
import BodyComp from "./BodyComp";
import HeadersComp from "./HeadersComp";
import Footer from "./Footer";
import ComparePopup from "./ComparePopup";


export default function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [expected, setExpected] = useState("");
  const [response, setResponse] = useState("");
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Params");
  const [showComparePopup, setShowComparePopup] = useState(false);
  const [responseStatus, setResponseStatus] = useState();

  const sendRequest = async () => {
    if (!url.trim()) {
      alert("Please enter an API URL");
      return;
    }
    setLoading(true);
    setResponse("");
    setMatch(null);
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (method !== "GET" && body.trim()) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setResponseStatus(res.status);
      const text = await res.text();
      setResponse(text);

    } catch (err) {
      setResponseStatus(-1);
      setResponse(err.message);
    } finally {
      setShowComparePopup(true);
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen w-screen bg-neutral-900 text-gray-100 flex flex-col p-4">
      <div className="flex-1 w-full bg-[rgb(33,33,33)]  mx-auto border border-gray-800 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-[rgb(255,108,55)]">
          API Tester
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <select
            className={`border-3 border-[rgb(98,98,98)] rounded-xl px-3 py-3 font-semibold focus:border-[rgb(2,101,210)] 
                        focus:outline-none transition-colors duration-200 bg-[rgb(33,33,33)] text-gray-300`}
            style={{
              color:
                method === "GET"
                  ? "#4ade80" 
                  : method === "POST"
                  ? "#facc15" 
                  : method === "PUT"
                  ? "#60a5fa" 
                  : method === "DELETE"
                  ? "#f87171" 
                  : "#a78bfa", 
            }}
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
              <option
                key={m}
                value={m}
                className="bg-[rgb(33,33,33)] text-gray-300"
                style={{
                  color:
                    m === "GET"
                      ? "#4ade80"
                      : m === "POST"
                      ? "#facc15"
                      : m === "PUT"
                      ? "#60a5fa"
                      : m === "DELETE"
                      ? "#f87171"
                      : "#a78bfa",
                }}
              >
                {m}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="flex-1 border-3 border-[rgb(98,98,98)] rounded-xl px-3 py-3 
                      focus:border-[rgb(2,101,210)] focus:outline-none transition-colors duration-200
                      bg-[rgb(33,33,33)] text-gray-200 font-medium placeholder-gray-500"
            placeholder="Enter URL or Paste"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={sendRequest}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-lg font-semibold transition cursor-pointer ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-[rgb(2,101,210)] hover:bg-[rgb(59,134,214)]"
            }`}
          >
            {loading ? "Cancel" : "Send"}
          </button>
        </div>
 

        <div className="flex space-x-2 bg-gray-800/70 rounded-xl p-1 w-fit mx-auto mb-4 backdrop-blur-sm">
          {["Params", "Headers", "Auth", "Body"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "text-gray-300 hover:bg-gray-700/70 hover:text-blue-400 cursor-pointer"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Params"? <ParamsComp/>: null}
        {activeTab === "Auth"? <AuthComp/>: null}
        {activeTab === "Body"? <BodyComp/>: null}
        {activeTab === "Headers"? <HeadersComp/>: null}
      </div>

    {showComparePopup && 
    <ComparePopup
    formattedResponse = {response}
    setShowModal = {()=> setShowComparePopup(false)}
    responseStatus = {responseStatus}
    /> 
    }
{/* 
    <footer className="text-center py-4 text-gray-400 border-t border-gray-800">
      Made with ❤️ by Jatin Yadav
    </footer> */}
    </div>
  );
}
