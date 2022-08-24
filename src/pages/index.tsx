import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/templates/layout";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Impl and Vis</title>
      </Head>
      <Layout>
        <h1>Problems</h1>
        <div>
          <Link href="/grid-maze">
            <a>Grid Maze</a>
          </Link>
        </div>
        <h1>Samples</h1>
        <div>
          <Link href="/calc">
            <a>Simple Calculator</a>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
