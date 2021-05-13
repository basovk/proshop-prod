import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Welcome to ProShop!</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=="
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
      <Footer />
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        main {
          flex: 1 1 auto;
        }
      `}</style>
    </div>
  );
};

export default Layout;
