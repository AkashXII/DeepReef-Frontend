import React, { useState } from "react";
import axios from "axios";


export default function CoralAnalyzer() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // 👈 only for preview before analysis
  const [form, setForm] = useState({
    Temperature_Mean: "",
    Windspeed: "",
    TSA: "",
    Ocean_Name: "",
    Exposure: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // 👈 show preview right after upload
  };

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a coral image.");
    for (const v of Object.values(form)) if (!v) return alert("Please fill all fields.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    try {
      const res = await axios.post("http://localhost:8000/analyze_coral", formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing coral. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        Coral Health + Bleaching Severity Analysis
      </h2>

      {/* Image upload + preview */}
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block mb-3"
        />

        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="Coral Preview"
              className="rounded-xl border border-gray-300 w-64 h-64 object-cover shadow-md"
            />
          </div>
        )}
      </div>

      {/* Input fields */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="number"
          step="any"
          name="Temperature_Mean"
          placeholder="Temperature Mean (°C)"
          value={form.Temperature_Mean}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          step="any"
          name="Windspeed"
          placeholder="Windspeed (m/s)"
          value={form.Windspeed}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          step="any"
          name="TSA"
          placeholder="TSA (Temperature Stress Anomaly)"
          value={form.TSA}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        />

        <select
          name="Ocean_Name"
          value={form.Ocean_Name}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        >
          <option value="">Select Ocean</option>
          <option value="Atlantic">Atlantic</option>
          <option value="Pacific">Pacific</option>
          <option value="Indian">Indian</option>
        </select>

        <select
          name="Exposure"
          value={form.Exposure}
          onChange={handleChange}
          className="border p-2 rounded-lg w-full"
        >
          <option value="">Select Exposure</option>
          <option value="Exposed">Exposed</option>
          <option value="Sheltered">Sheltered</option>
        </select>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze Coral"}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">🧾 Results</h3>
          <p><strong>Image Prediction:</strong> {result.image_prediction}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p><strong>Bleaching Severity:</strong> {result.bleaching_severity}</p>

          {result.gemini_summary && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2 text-blue-700">Gemini 2.5 Summary:</h4>
              <p className="text-gray-800 whitespace-pre-line">{result.gemini_summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
