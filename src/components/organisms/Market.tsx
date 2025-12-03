import { useEffect, useState, useRef } from "react";
import MarketCard from "../moleculs/MarketCard";
import Header1 from "../moleculs/Header1";
import { useTranslation } from "next-i18next";

interface MarketItem {
    symbol: string;
    last: number;
    percentChange: number;
    direction?: 'up' | 'down' | 'neutral';
}

interface ApiMarketItem {
    symbol: string;
    last: number;
    percentChange: number;
}

export default function Market() {
    const { t } = useTranslation('market');
    const [marketData, setMarketData] = useState<MarketItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const prevDataRef = useRef<MarketItem[]>([]);

    useEffect(() => {   
        const fetchMarketData = async () => {
            try {
                const res = await fetch('/api/market');

                if (!res.ok) {
                    const errorText = `${res.status} ${res.statusText}`;
                    setErrorMessage(errorText);
                    setMarketData([]);
                    return;
                }

                const data: ApiMarketItem[] = await res.json();

                const filteredData: ApiMarketItem[] = data
                    .filter((item: ApiMarketItem) => item.symbol && typeof item.last === 'number')
                    .map((item: ApiMarketItem) => ({
                        symbol: item.symbol,
                        last: item.last,
                        percentChange: item.percentChange,
                    }));

                const updatedData: MarketItem[] = filteredData.map((item: ApiMarketItem) => {
                    const prevItem = prevDataRef.current.find((p: MarketItem) => p.symbol === item.symbol);
                    let direction: 'up' | 'down' | 'neutral';

                    if (prevItem) {
                        if (item.last > prevItem.last) direction = 'up';
                        else if (item.last < prevItem.last) direction = 'down';
                        else direction = item.percentChange === 0 ? 'neutral' : (item.percentChange > 0 ? 'up' : 'down');
                    } else {
                        direction = item.percentChange > 0 ? 'up' : (item.percentChange < 0 ? 'down' : 'neutral');
                    }

                    return { ...item, direction };
                });

                setMarketData(updatedData);
                prevDataRef.current = filteredData;
                setErrorMessage("");
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "Gagal memuat data";
                setErrorMessage(errorMessage);
                setMarketData([]);
            }
        };

        fetchMarketData();
        const interval = setInterval(fetchMarketData, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (symbol: string, price: number): string => {
        if (symbol.includes('IDR')) return `Rp${price.toLocaleString('id-ID')}`;
        if (symbol.includes('BTC')) return `$${price.toLocaleString('en-US')}`;
        return `$${price.toFixed(2)}`;
    };

    const formatPercent = (percent: number): string => {
        const formatted = percent?.toFixed(2);
        const sign = percent > 0 ? '+' : '';
        return `${sign}${formatted}%`;
    };

    return (
        <div className="w-full bg-[#f7e7e7] py-10 flex flex-col items-center space-y-4">
            <div className="mb-6">
                <Header1 title={t('title')} className="text-2xl md:text-3xl" />
            </div>

            <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 2xl:px-52 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {errorMessage ? (
                        <div className="col-span-full text-center text-red-600 font-semibold text-sm sm:text-base">
                            {errorMessage}
                        </div>
                    ) : marketData.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 font-medium text-sm sm:text-base animate-pulse">
                            {t('loading')}
                        </div>
                    ) : (
                        marketData.map((item: MarketItem, index: number) => (
                            <MarketCard
                                key={index}
                                symbol={item.symbol}
                                last={formatPrice(item.symbol, item.last)}
                                percentChange={formatPercent(item.percentChange)}
                                direction={item.direction || 'neutral'}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
