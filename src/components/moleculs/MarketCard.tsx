import React from 'react';

export default function MarketCard({ symbol, last, percentChange, direction }) {
    const bgColor = direction === 'up' ? 'bg-green-100 border-green-500' :
        direction === 'down' ? 'bg-red-100 border-red-500' :
            'bg-gray-100 border-gray-400';

    const iconBg = direction === 'up' ? 'bg-green-300 text-green-800' :
        direction === 'down' ? 'bg-red-300 text-red-800' :
            'bg-gray-300';

    const iconClass = direction === 'up' ? 'fa-angles-up' :
        direction === 'down' ? 'fa-angles-down' :
            'fa-minus';

    const textColor = direction === 'up' ? 'text-green-700' :
        direction === 'down' ? 'text-red-700' :
            'text-gray-700';

    return (
        <div className={`p-4 rounded-xl border ${bgColor} shadow-sm`}>

            {/* Mobile View */}
            <div className="flex flex-row gap-4 items-center sm:hidden">
                <div className={`${iconBg} px-3 py-2 rounded-full text-white mb-2`}>
                    <i className={`fa-solid ${iconClass}`}></i>
                </div>
                <div>
                    <h1 className={`font-bold text-base ${textColor} mb-1`}>{symbol}</h1>
                    <p className="text-sm text-black mb-1">{last}</p>
                    <div className={`${iconBg} px-2 py-1 rounded-lg font-medium`}>
                        <p className="text-xs">{percentChange}</p>
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex items-center gap-5">
                <div className={`${iconBg} px-3 py-2 rounded-full text-white`}>
                    <i className={`fa-solid ${iconClass}`}></i>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h1 className={`font-bold text-2xl ${textColor}`}>{symbol}</h1>
                        <p className="text-lg">{last}</p>
                    </div>
                    <div className={`${iconBg} px-2 py-1 rounded-lg font-medium`}>
                        <p className="text-lg">{percentChange}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
