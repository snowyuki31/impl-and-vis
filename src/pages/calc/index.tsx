import type { NextPage } from "next";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import init, { add } from "wasm-lib";
import Layout from "../../components/templates/layout";

const Calculator: NextPage = () => {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const [ans, setAns] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    f: Dispatch<SetStateAction<number>>
  ) => {
    f(() => Number(e.target.value));
  };

  useEffect(() => {
    init().then(() => {
      setAns(add(val1, val2));
    });
  }, [val1, val2]);

  return (
    <Layout>
      <input
        type="number"
        value={val1}
        onChange={(e) => handleChange(e, setVal1)}
      />{" "}
      +{" "}
      <input
        type="number"
        value={val2}
        onChange={(e) => handleChange(e, setVal2)}
      />{" "}
      = {ans}
    </Layout>
  );
};

export default Calculator;
