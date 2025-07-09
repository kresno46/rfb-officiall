// Halaman Home

"use client";

import React, { ReactNode } from "react";
import Head from "next/head";
import NavBar from "@/components/organisms/NavBar";
import Footer from "@/components/organisms/Footer";
import DateTimeDisplay from "@/components/organisms/DateTimeDisplay";

interface PageTemplateProps {
    title?: string;
    children: ReactNode;
}

export default function PageTemplate({ title, children }: PageTemplateProps) {
    return (
        <>
            <Head>
                <title>{title ? `${title} - PT. Rifan Financindo Berjangka` : "PT. Rifan Financindo Berjangka"}</title>

                {/* Favicon & Icons */}
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
                <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="RFB" />
                <link rel="manifest" href="/favicon/site.webmanifest" />

                {/* Font: Montserrat */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>

            <DateTimeDisplay />
            <NavBar />

            <main>{children}</main>
            <Footer />
        </>
    );
}
