"use client";

import { useState, useEffect } from "react";
import FeaturedTokenCard from "./FeaturedTokenCard";
import { Token } from "@/types/token";

interface FeaturedTokenResponse {
  success: boolean;
  token?: Token;
  error?: string;
}

export default function FeaturedTokenSection() {
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedToken() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/tokens/featured");

        if (!response.ok) {
          if (response.status === 400) {
            // Featured token not configured, silently skip
            setToken(null);
            return;
          }
          throw new Error("Failed to fetch featured token");
        }

        const data: FeaturedTokenResponse = await response.json();

        if (data.success && data.token) {
          setToken(data.token);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedToken();
  }, []);

  // Don't render section if no featured token configured or error
  if (!loading && (!token || error)) {
    return null;
  }

  return (
    <section className="py-12 px-6 pb-0">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold text-[#f0f4ff] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Boiling Point Mascot
        </h2>

        {loading ? (
          <div className="rounded-3xl bg-[#0a0f1a]/50 border border-[rgba(136,146,176,0.08)] h-48 animate-pulse" />
        ) : (
          token && <FeaturedTokenCard token={token} />
        )}
      </div>
    </section>
  );
}
