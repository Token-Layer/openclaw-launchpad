import Image from "next/image";
import { Token } from "@/types/token";
import { formatNumber, formatPrice, formatPercentage, getTradeUrl } from "@/lib/api";

interface FeaturedTokenCardProps {
  token: Token;
}

const CHAIN_ICONS: Record<string, string> = {
  base: "/images/icons/base.svg",
  "base-sepolia": "/images/icons/base-sepolia.svg",
  solana: "/images/icons/solana.svg",
  ethereum: "/images/icons/ethereum.svg",
  bnb: "/images/icons/bnb.svg",
  "bnb-testnet": "/images/icons/bnb-testnet.svg",
  arbitrum: "/images/icons/arbitrum.svg",
  polygon: "/images/icons/polygon.svg",
  avalanche: "/images/icons/avalanche.svg",
  unichain: "/images/icons/unichain.svg",
  "unichain-testnet": "/images/icons/unichain-testnet.svg",
  zksync: "/images/icons/zksync.svg",
  abstract: "/images/icons/abstract.svg",
  monad: "/images/icons/monad.svg",
};

function ChainIcon({ chain, isRegistered = true }: { chain: string; isRegistered?: boolean }) {
  const iconPath = CHAIN_ICONS[chain.toLowerCase()];

  if (iconPath) {
    return (
      <Image
        src={iconPath}
        alt={chain}
        width={20}
        height={20}
        className={`w-5 h-5 rounded-sm ${!isRegistered ? "opacity-40 grayscale" : ""}`}
      />
    );
  }

  return (
    <span
      className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-[#1a2332] text-[#8892b0] rounded-sm uppercase ${!isRegistered ? "opacity-40" : ""}`}
    >
      {chain.charAt(0)}
    </span>
  );
}

function ChainBadge({ chain, isRegistered }: { chain: string; isRegistered: boolean }) {
  const tooltip = isRegistered ? chain : "Awaiting graduation";

  return (
    <div className="relative group/badge">
      <div
        className={`flex items-center gap-1.5 px-2.5 py-1.5 bg-[#111827]/80 border border-[rgba(136,146,176,0.1)] rounded-lg cursor-default ${
          !isRegistered ? "opacity-50" : ""
        }`}
      >
        <ChainIcon chain={chain} isRegistered={isRegistered} />
        <span className="text-xs text-[#8892b0] capitalize">{chain}</span>
      </div>
      {/* Custom Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-[#1a2332] border border-[rgba(136,146,176,0.2)] rounded-lg opacity-0 invisible group-hover/badge:opacity-100 group-hover/badge:visible transition-all duration-150 pointer-events-none z-50 whitespace-nowrap">
        <span className={`text-xs font-medium ${isRegistered ? "text-[#f0f4ff]" : "text-[#fbbf24]"}`}>
          {tooltip}
        </span>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a2332]" />
      </div>
    </div>
  );
}

export default function FeaturedTokenCard({ token }: FeaturedTokenCardProps) {
  const tradeUrl = getTradeUrl(token.token_layer_id);
  const priceChange = token.price_change_24h_percent;
  const isPositive = priceChange !== null && priceChange >= 0;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0f1a] via-[#111827] to-[#0a0f1a] border border-[rgba(255,77,77,0.2)] shadow-[0_0_60px_-12px_rgba(255,77,77,0.25)]">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff4d4d]/10 via-[#00e5cc]/10 to-[#ff4d4d]/10 opacity-50" />

      {/* Featured badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] text-white rounded-full shadow-lg shadow-[#ff4d4d]/20">
          Mascot
        </span>
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          {/* Token Logo */}
          <div className="relative">
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
              {token.logo ? (
                <Image
                  src={token.logo}
                  alt={token.name}
                  fill
                  className="rounded-2xl object-cover ring-4 ring-[rgba(255,77,77,0.2)] shadow-xl"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#ff4d4d] to-[#ff6b6b] flex items-center justify-center text-white font-bold text-4xl shadow-xl">
                  {token.symbol.charAt(0)}
                </div>
              )}
            </div>
            {/* Live indicator */}
            {token.token_layer_id && (
              <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0f1a] border border-[#00e5cc]/30 rounded-full">
                <span className="w-2 h-2 bg-[#00e5cc] rounded-full animate-pulse" />
                <span className="text-xs font-medium text-[#00e5cc]">Live</span>
              </div>
            )}
          </div>

          {/* Token Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f4ff] mb-1">
              {token.name}
            </h3>
            <p className="text-lg text-[#5a6480] mb-4">${token.symbol}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div>
                <p className="text-xs text-[#5a6480] mb-1 uppercase tracking-wider">Price</p>
                <p className="text-lg font-semibold text-[#f0f4ff]">
                  {formatPrice(token.price)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#5a6480] mb-1 uppercase tracking-wider">24h Change</p>
                <p
                  className={`text-lg font-semibold ${
                    isPositive ? "text-[#00e5cc]" : "text-[#ff4d4d]"
                  }`}
                >
                  {formatPercentage(priceChange)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#5a6480] mb-1 uppercase tracking-wider">Market Cap</p>
                <p className="text-lg font-semibold text-[#f0f4ff]">
                  ${formatNumber(token.market_cap)}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#5a6480] mb-1 uppercase tracking-wider">Volume 24h</p>
                <p className="text-lg font-semibold text-[#f0f4ff]">
                  ${formatNumber(token.volume_24h)}
                </p>
              </div>
            </div>

            {/* Chains */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#5a6480] mr-1">Available on:</span>
              {token.token_addresses.map((addr) => (
                <ChainBadge
                  key={addr.id}
                  chain={addr.chain}
                  isRegistered={addr.is_registered}
                />
              ))}
            </div>
          </div>

          {/* Trade Button */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            {tradeUrl ? (
              <a
                href={tradeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#ff4d4d] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#ff8585] rounded-xl shadow-lg shadow-[#ff4d4d]/25 transition-all duration-200 hover:shadow-[#ff4d4d]/40 hover:scale-[1.02]"
              >
                Trade Now
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ) : (
              <button
                disabled
                className="block w-full md:w-auto px-8 py-4 text-base text-[#5a6480] bg-[#111827]/50 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
