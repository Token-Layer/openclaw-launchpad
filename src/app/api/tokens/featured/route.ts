import { NextResponse } from "next/server";
import { Token } from "@/types/token";

// Disable caching for this route
export const dynamic = "force-dynamic";

const API_BASE_URL =
  process.env.TOKEN_LAYER_API_URL || "https://api.tokenlayer.network/functions/v1";

interface GetTokensV2Response {
  success: boolean;
  tokens: Token[];
}

export async function GET() {
  try {
    const tokenLayerId = process.env.NEXT_PUBLIC_FEATURED_TOKEN_ID;

    if (!tokenLayerId) {
      return NextResponse.json(
        { success: false, error: "Featured token ID not configured" },
        { status: 400 }
      );
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const apiKey = process.env.TOKEN_LAYER_API_KEY;
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${API_BASE_URL}/get-tokens-v2`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        keyword: tokenLayerId,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: GetTokensV2Response = await response.json();

    if (!data.tokens || data.tokens.length === 0) {
      return NextResponse.json(
        { success: false, error: "Featured token not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      token: data.tokens[0],
    });
  } catch (error) {
    console.error("Error fetching featured token:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch featured token" },
      { status: 500 }
    );
  }
}
