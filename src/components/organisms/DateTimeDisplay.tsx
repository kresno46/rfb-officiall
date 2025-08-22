"use client";

import { useEffect, useState } from "react";

const DateTimeDisplay = () => {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTimeJKT, setCurrentTimeJKT] = useState("");
    const [currentTimeTKY, setCurrentTimeTKY] = useState("");
    const [currentTimeHK, setCurrentTimeHK] = useState("");
    const [currentTimeNY, setCurrentTimeNY] = useState("");

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const formattedDate = `${daysOfWeek[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
            setCurrentDate(formattedDate);

            const formatTime = (timezone: string) => {
                const formatter = new Intl.DateTimeFormat("en-GB", {
                    timeZone: timezone,
                    hour: "2-digit",
                    minute: "2-digit",
                });
                return formatter.format(now);
            };

            setCurrentTimeJKT(formatTime("Asia/Jakarta"));
            setCurrentTimeTKY(formatTime("Asia/Tokyo"));
            setCurrentTimeHK(formatTime("Asia/Hong_Kong"));
            setCurrentTimeNY(formatTime("America/New_York"));
        };

        const intervalId = setInterval(updateDateTime, 1000);
        updateDateTime();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between bg-zinc-800 text-white px-3 py-2 text-sm gap-2 relative">

            {/* LEFT SECTION */}
            <div className="flex items-center gap-3">

                {/* Desktop View */}
                <div className="hidden md:flex items-center gap-5">
                    <p><i className="fa-solid fa-calendar-days"></i> {currentDate}</p>
                    <div className="flex items-center gap-3">
                        <p><strong>JKT</strong> {currentTimeJKT}</p>
                        <p><strong>TKY</strong> {currentTimeTKY}</p>
                        <p><strong>HK</strong> {currentTimeHK}</p>
                        <p><strong>NY</strong> {currentTimeNY}</p>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="flex md:hidden items-center gap-2">

                    {/* Date Button */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowDate(!showDate);
                                setShowTime(false);
                            }}
                            className="flex items-center gap-2 bg-zinc-600 hover:bg-zinc-500 px-3 py-1 rounded text-xs"
                        >
                            <i className="fa-solid fa-calendar-days"></i> Date
                        </button>
                        {showDate && (
                            <div className="absolute left-0 mt-2 bg-white text-black rounded shadow px-3 py-2 text-xs whitespace-nowrap z-50">
                                {currentDate}
                            </div>
                        )}
                    </div>

                    {/* Time Button */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowTime(!showTime);
                                setShowDate(false);
                            }}
                            className="flex items-center gap-2 bg-zinc-600 hover:bg-zinc-500 px-3 py-1 rounded text-xs"
                        >
                            <i className="fa-regular fa-clock"></i> World Time
                        </button>
                        {showTime && (
                            <div className="absolute left-0 mt-2 bg-white text-black rounded shadow px-3 py-2 text-xs whitespace-nowrap z-50">
                                <div className="space-y-5">
                                    <p><strong>JKT:</strong> {currentTimeJKT}</p>
                                    <p><strong>TKY:</strong> {currentTimeTKY}</p>
                                    <p><strong>HK:</strong> {currentTimeHK}</p>
                                    <p><strong>NY:</strong> {currentTimeNY}</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Language Select (Same for all screens) */}
            <div>
                <select className="border border-white rounded text-white px-2 py-1 text-xs md:text-sm">
                    <option className="text-black" value="id">Bahasa</option>
                    <option className="text-black" value="en">English</option>
                    <option className="text-black" value="cn">中文</option>
                </select>
            </div>
        </div>
    );
};

export default DateTimeDisplay;
