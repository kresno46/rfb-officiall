import { useEffect, useState } from "react";

export default function MarketUpdate() {
    const [marketData, setMarketData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const res = await fetch('/api/market');

                if (!res.ok) {
                    const errorText = `${res.status} ${res.statusText}`;
                    console.error('Respon error:', errorText);
                    setErrorMessage(errorText);
                    setMarketData([]);
                    return;
                }

                const data = await res.json();

                const filteredData = data
                    .filter(item => item.symbol && typeof item.last === 'number')
                    .map(item => ({
                        symbol: item.symbol,
                        last: item.last,
                        percentChange: item.percentChange,
                    }));

                setMarketData(filteredData);
                setErrorMessage(""); // clear error
            } catch (error) {
                console.error('Fetch gagal:', error);
                setErrorMessage(error.message || "Gagal memuat data");
                setMarketData([]);
            }
        };

        fetchMarketData();

        const interval = setInterval(fetchMarketData, 10000);

        return () => clearInterval(interval);
    }, []);

    const formatPrice = (symbol, price) => {
        if (symbol.includes('IDR')) return `Rp${price.toLocaleString('id-ID')}`;
        if (symbol.includes('BTC')) return `$${price.toLocaleString('en-US')}`;
        return `$${price.toFixed(2)}`;
    };

    const formatPercent = (percent) => {
        const formatted = percent?.toFixed(2);
        const sign = percent > 0 ? '+' : '';
        return `${sign}${formatted}%`;
    };

    return (
        <div className="bg-zinc-900 text-white overflow-hidden shadow group">
            <div className="flex items-center h-12">
                <div className="bg-red-600 px-4 h-full flex items-center font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
                    Market Update
                </div>

                <div className="relative overflow-hidden w-full bg-green-500 h-full flex items-center min-w-0">
                    {errorMessage ? (
                        <div className="px-4 text-xs sm:text-sm md:text-base font-semibold text-white">
                            {errorMessage}
                        </div>
                    ) : marketData.length === 0 ? (
                        <div className="px-4 text-xs sm:text-sm md:text-base font-semibold text-white">
                            Memuat data...
                        </div>
                    ) : (
                        <div className="flex animate-marquee whitespace-nowrap items-center text-xs sm:text-sm md:text-base group-hover:[animation-play-state:paused]">
                            {[...marketData, ...marketData].map((item, idx) => (
                                <div key={idx} className="flex items-center">
                                    <div className="flex items-center gap-2 px-4">
                                        <span className="font-semibold">{item.symbol}:</span>
                                        <span>{formatPrice(item.symbol, item.last)}</span>
                                        <span className={`font-medium ${item.percentChange > 0 ? 'text-green-800' :
                                                item.percentChange < 0 ? 'text-red-500' :
                                                    'text-white/60'
                                            }`}>
                                            ({formatPercent(item.percentChange)})
                                        </span>
                                    </div>
                                    <span className="mx-4 h-full text-white/50">|</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
