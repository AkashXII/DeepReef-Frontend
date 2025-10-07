import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReefRiskDashboard() {
  const [reefs, setReefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReefData = async () => {
      try {
        const res = await axios.get("https://w16fp9rg-8000.inc1.devtunnels.ms/predict_top5");
        setReefs(res.data.results);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reef data");
      } finally {
        setLoading(false);
      }
    };

    fetchReefData();
    // Optional: refresh every 10 minutes
    const interval = setInterval(fetchReefData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        🌊 Fetching real-time reef data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
        🌍 Global Coral Bleaching Risk Monitor
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reefs.map((reef, index) => (
          <div
            key={index}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-bold text-blue-700 mb-1">{reef.reef}</h3>
            <p className="text-sm text-gray-600 mb-2">
              📍 Coordinates: [{reef.coordinates[0]}, {reef.coordinates[1]}]
            </p>

            <p className="text-base mb-1">
              <strong>Bleaching Risk:</strong>{" "}
              <span
                className={`font-semibold ${
                  reef.bleaching_risk === "Severe"
                    ? "text-red-600"
                    : reef.bleaching_risk === "Moderate"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {reef.bleaching_risk}
              </span>
            </p>

            <p className="text-sm text-gray-600 mb-2">
              Confidence: {(reef.probability * 100).toFixed(1)}%
            </p>

            <div className="bg-white p-3 rounded-lg border border-gray-200 text-sm">
              <p>🌡️ Temp (max): {reef.factors.temperature_2m_max.toFixed(2)} °C</p>
              <p>☀️ UV Index (max): {reef.factors.uv_index_max.toFixed(2)}</p>
              <p>💨 Wind Speed (max): {reef.factors.wind_speed_10m_max.toFixed(2)} km/h</p>
              <p>🌧️ Precipitation: {reef.factors.precipitation_sum.toFixed(2)} mm</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
