import { NextRequest, NextResponse } from "next/server";
import { FilterType, GetTokensResponse } from "@/types/token";

const API_BASE_URL =
  process.env.TOKEN_LAYER_API_URL || "https://api.tokenlayer.network/functions/v1";

type SortOption = "created_at" | "volume_24h" | "market_cap" | "price_change_24h" | "holders";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filter, sortBy = "created_at", limit = 20, offset = 0 } = body as {
      filter: FilterType;
      sortBy?: SortOption;
      limit?: number;
      offset?: number;
    };

    const initialChain = process.env.NEXT_PUBLIC_INITIAL_CHAIN || "base";
    const destinationChains = (
      process.env.NEXT_PUBLIC_DESTINATION_CHAINS || "solana,ethereum,bnb"
    ).split(",");

    const chains = [initialChain, ...destinationChains];

    const builderCode = process.env.BUILDER_CODE;

    const apiBody: Record<string, unknown> = {
      chains,
      order_by: sortBy,
      order_direction: "DESC",
      limit,
      offset,
      ...(builderCode && { builder_code: builderCode }),
    };

    // Filter logic: graduated tokens have token_layer_id
    if (filter === "graduated") {
      apiBody.verified_only = true;
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add API key if available
    const apiKey = process.env.TOKEN_LAYER_API_KEY;
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${API_BASE_URL}/get-tokens-v2`, {
      method: "POST",
      headers,
      body: JSON.stringify(apiBody),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data: GetTokensResponse = await response.json();

    // Client-side filter for bonding curve (tokens without token_layer_id)
    if (filter === "bonding_curve") {
      data.tokens = data.tokens.filter((token) => !token.token_layer_id);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
