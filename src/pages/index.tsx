import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/templates/layout";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Layout pagename="">
        <h1>Problems</h1>
        <div>
          <Link href="/grid-maze">
            <a>Grid Maze</a>
          </Link>
        </div>
        <div>
          <Link href="/traveling-salesman">
            <a>Traveling Salesman (WIP)</a>
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
