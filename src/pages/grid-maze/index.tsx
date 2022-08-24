import type { NextPage } from "next";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import init, { add } from "wasm-lib";
import Layout from "../../components/templates/layout";
import Maze from "../../components/molecules/gridMaze";

const GridMaze: NextPage = () => {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(15);
  const [seed, setSeed] = useState(42);

  return (
    <Layout>
      <div>
        seed:{" "}
        <input
          type="number"
          value={seed}
          onChange={(e) => handleChange(e, setSeed)}
        ></input>
      </div>
      <Maze width={width} height={height} seed={seed}></Maze>
    </Layout>
  );
};

export default GridMaze;

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  f: Dispatch<SetStateAction<number>>
) => {
  f(() => Number(e.target.value));
};
