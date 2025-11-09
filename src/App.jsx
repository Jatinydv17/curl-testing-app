import React, { useState } from "react";
import ParamsComp from "./ParamsComp";
import AuthComp from "./AuthComp";
import BodyComp from "./BodyComp";
import HeadersComp from "./HeadersComp";
import Footer from "./Footer";
import ComparePopup from "./ComparePopup";
import { Send, ToggleRight } from "lucide-react";


export default function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Params");
  const [showComparePopup, setShowComparePopup] = useState(false);
  const [responseStatus, setResponseStatus] = useState();
  const [params, setParams] = useState([{ key: "", value: "", description: "", enabled:true }]);
  const [auth, setAuth] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState("");

  const sendRequest = async () => {
    if (!url.trim()) {
      alert("Please enter an API URL");
      return;
    }
    setLoading(true);
    setResponse("");
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

  const handleUrlChange = (newUrl) => {
    setUrl(newUrl);

    try {
      const parsedUrl = new URL(newUrl);

      const paramsArray = Array.from(parsedUrl.searchParams.entries()).map(
        ([key, value]) => ({
          key,
          value,
          description: "",
          enabled: true,
        })
      );

      if (paramsArray.length === 0) {
        setParams([{ key: "", value: "", description: "", enabled: true }]);
      } else {
        paramsArray.push({ key: "", value: "", description: "", enabled: true });
        setParams(paramsArray);
      }
    } catch (e) {
      setParams([{ key: "", value: "", description: "", enabled: true }]);
    }
  };


  const handleParamsChange = (paramsKeyValueDesc) => {
    const queryString = paramsKeyValueDesc
      .filter((p) => p.key.trim() !== "" || p.value.trim() !== "")
      .map((p) => {
        const keyPart = p.key.trim() !== "" ? encodeURIComponent(p.key.trim()) : "";
        const valuePart = p.value.trim() !== "" ? `=${encodeURIComponent(p.value.trim())}` : "";
        return `${keyPart}${valuePart}`;
      })
      .join("&");

    const baseUrl = url.split("?")[0];
    const urlWithParams = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    setUrl(urlWithParams);
    setParams(paramsKeyValueDesc);
  };

  const handleDeleteParams = (index) => {
      setParams(params.filter((_, i) => i !== index));
    };
  
  const handleChangeParams = (index, field, value) => {
    setParams((prev) => {
      const updated = prev.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );

      const last = updated[updated.length - 1];
      if (
        index === updated.length - 1 &&
        (last.key !== "" || last.value !== "" || last.description !== "")
      ) {
        updated.push({ enabled: true, key: "", value: "", description: "" });
      }
      return updated;
    });
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
            onChange={(e) => handleUrlChange(e.target.value)}
          />

          <button
            onClick={sendRequest}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-lg font-semibold transition cursor-pointer ${
              loading
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-[rgb(2,101,210)] hover:bg-[rgb(59,134,214)]"
            }`}
          >
            {!loading? <Send size={18} />: null} {loading ? "Cancel" : "Send"}
          </button>
        </div>
 

        <div className="flex space-x-2 bg-gray-800/70 rounded-xl p-1 w-fit mx-auto mb-4 backdrop-blur-sm">
          {["Params", "Headers", "Auth", "Body"].map((tab) => (
            <div key={tab} className="relative">
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "text-gray-300 hover:bg-gray-700/70 hover:text-blue-400 cursor-pointer"
                }`}
              >
                {tab}
              </button>
                {tab === 'Params' ? <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-300" />: null}
              
            </div>
          ))}
        </div>


        {activeTab === "Params"? <ParamsComp onChange = {handleParamsChange} rows = {params}  handleDelete={handleDeleteParams} handleChange={handleChangeParams}/>: null}
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
