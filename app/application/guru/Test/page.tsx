"use client"
import React, { useEffect, useState } from "react";

const Page = () => {
  const [token, setToken] = useState<string | null>(null);
  const [generatedData, setGeneratedData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const authUrl = "https://test-cs-domain.auth.eu-west-1.amazoncognito.com/oauth2/token?grant_type=client_credentials";
  const dataUrl = "https://2yoe5fi562.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/CustomerService";

  const clientId = "5ham1gp9poa30qme67bttvbsp8";
  const clientSecret = "1g4oam70j2tav8inapr0li9b52j5i03h9uhmjt2rh3p26npitgdt";

  // Fetch token
  const fetchToken = async () => {
    try {
      const response = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();
      setToken(data.access_token);
      console.log(data.access_token);

      // Store expiry time
      setTimeout(() => {
        setToken(null); // Clear token after it expires
      }, data.expires_in * 1000);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Fetch generated data
  const fetchGeneratedData = async () => {
    if (!token) {
      console.error("Token is missing or expired. Fetch a new token first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(dataUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YQY0Kv4b6I3IQ5KRbxo4c1uENhNHVEoN80NGHC1K",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prompt_type: "",
          prompt: "Good afternoon",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setGeneratedData(data.generated_text);
      console.log(data.generated_text);
    } catch (error) {
      console.error("Error fetching generated data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch a token when the page loads
    fetchToken();
  }, []);

  return (
    <div>
      <h1>Customer Service</h1>
      <button onClick={fetchGeneratedData} disabled={!token || loading}>
        {loading ? "Loading..." : "Get Generated Data"}
      </button>
      {generatedData && (
        <div>
          <h2>Response:</h2>
          <p>{generatedData}</p>
        </div>
      )}
    </div>
  );
};

export default Page;