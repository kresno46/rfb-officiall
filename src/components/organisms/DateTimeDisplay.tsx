"use client";

import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from "../atoms/LanguageSwitcher";

const DateTimeDisplay = () => {
    const { t, i18n } = useTranslation('common');
    const [currentDate, setCurrentDate] = useState("");
    const [currentTimeJKT, setCurrentTimeJKT] = useState("");
    const [currentTimeTKY, setCurrentTimeTKY] = useState("");
    const [currentTimeHK, setCurrentTimeHK] = useState("");
    const [currentTimeNY, setCurrentTimeNY] = useState("");
    const [currentTimeLDN, setCurrentTimeLDN] = useState("");

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const daysOfWeek = t('dateTime.days', { returnObjects: true }) as string[];
            const months = t('dateTime.months', { returnObjects: true }) as string[];
            const formattedDate = `${daysOfWeek[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
            setCurrentDate(formattedDate);

            const formatTime = (timezone: string) => {
                const formatter = new Intl.DateTimeFormat(i18n.language === 'id' ? 'id-ID' : 'en-GB', {
                    timeZone: timezone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                return formatter.format(now);
            };

            setCurrentTimeJKT(formatTime("Asia/Jakarta"));
            setCurrentTimeTKY(formatTime("Asia/Tokyo"));
            setCurrentTimeHK(formatTime("Asia/Hong_Kong"));
            setCurrentTimeLDN(formatTime("Europe/London"));
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
                        <p><strong>{t('dateTime.timezones.jkt')}</strong> {currentTimeJKT}</p>
                        <p><strong>{t('dateTime.timezones.tky')}</strong> {currentTimeTKY}</p>
                        <p><strong>{t('dateTime.timezones.hk')}</strong> {currentTimeHK}</p>
                        <p><strong>{t('dateTime.timezones.ldn')}</strong> {currentTimeLDN}</p>
                        <p><strong>{t('dateTime.timezones.ny')}</strong> {currentTimeNY}</p>
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
                            <i className="fa-solid fa-calendar-days"></i> {t('dateTime.date')}
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
                            <i className="fa-regular fa-clock"></i> {t('dateTime.worldTime')}
                        </button>
                        {showTime && (
                            <div className="absolute left-0 mt-2 bg-white text-black rounded shadow px-3 py-2 text-xs whitespace-nowrap z-50">
                                <div className="space-y-5">
                                    <p><strong>{t('dateTime.timezones.jkt')}:</strong> {currentTimeJKT}</p>
                                    <p><strong>{t('dateTime.timezones.tky')}:</strong> {currentTimeTKY}</p>
                                    <p><strong>{t('dateTime.timezones.hk')}:</strong> {currentTimeHK}</p>
                                    <p><strong>{t('dateTime.timezones.ldn')}:</strong> {currentTimeLDN}</p>
                                    <p><strong>{t('dateTime.timezones.ny')}:</strong> {currentTimeNY}</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Language Switcher */}
            <div className="flex justify-end">
                <LanguageSwitcher />
            </div>
        </div>
    );
};

export default DateTimeDisplay;
