import React from "react";
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <link rel="shortcut icon" href="/static/logo.jpg" className="logo"/>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}