import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="white" />
                    <link rel="apple-touch-icon" href="ic_launcher-web.png" />
                    <meta name="theme-color" content="#468E97" />
                    <base href="/" />
                    {/* <link rel="manifest" crossOrigin="use-credentials" href="/manifest.json" /> */}
                    <meta name="description" content={` Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
                    <meta property="og:description"
                        content={`The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
                    <meta name="keywords" content={`Goplinto, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />

                    <script src="https://checkout.razorpay.com/v1/checkout.js" defer={true}></script>
                </Head>
                <body>
                    <div id='style'></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument