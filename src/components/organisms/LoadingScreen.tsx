import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ show }) {
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        if (!show) {
            const timeout = setTimeout(() => setVisible(false), 500);  // Delay hilang komponen
            return () => clearTimeout(timeout);
        } else {
            setVisible(true);
        }
    }, [show]);

    return visible ? (
        <div className={`fixed inset-0 bg-white z-[9999] flex items-center justify-center transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg font-semibold text-gray-700">Loading...</p>
            </div>
        </div>
    ) : null;
}
