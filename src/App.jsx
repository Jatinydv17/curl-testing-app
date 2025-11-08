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
      const text = await res.text();
      setResponse(text);

    } catch (err) {
      setResponse(err.message);
    } finally {
      setShowComparePopup(true);
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen w-screen bg-gray-950 text-gray-100 flex flex-col p-4">
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-400">
          API Tester 🧩
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <select
            className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 font-semibold focus:outline-none"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <input
            type="text"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 focus:outline-none"
            placeholder="Enter API endpoint (e.g. https://api.example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          
        <button
          onClick={sendRequest}
          disabled={loading}
          className={`px-3 py-2 rounded-xl text-lg font-semibold transition cursor-pointer ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "Sending..." : "Send Request 🚀"}
        </button>
        </div>  

        <div className="flex border-b text-sm font-medium text-gray-600 bg-gray-50 rounded-1.5xl">
          <button className={`px-4 py-2 ${activeTab === 'Params'? "border-b-2 border-blue-600 text-blue-600": "hover:text-blue-600"}`} onClick={() => setActiveTab("Params")}>
            Params
          </button>
          <button className={`px-4 py-2 ${activeTab === 'Headers'? "border-b-2 border-blue-600 text-blue-600": "hover:text-blue-600"}`} onClick={() => setActiveTab("Headers")}>
            Headers
          </button>
          <button className={`px-4 py-2 ${activeTab === 'Auth'? "border-b-2 border-blue-600 text-blue-600": "hover:text-blue-600"}`} onClick={() => setActiveTab("Auth")}>
            Auth
          </button>
          <button className={`px-4 py-2 ${activeTab === 'Body'? "border-b-2 border-blue-600 text-blue-600": "hover:text-blue-600"}`} onClick={() => setActiveTab("Body")}>
            Body
          </button>
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
    /> 
    }

    <footer className="text-center py-4 text-gray-400 border-t border-gray-800">
      Made with ❤️ by Jatin Yadav
    </footer>
    </div>
  );
}
