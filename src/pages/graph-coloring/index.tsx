import type { NextPage } from "next";
import VisPage from "../../components/templates/visPage";

const GraphColoringPage: NextPage = () => {
  return (
    <VisPage
      pagename="Graph Coloring"
      field={<></>}
      infoArea={<></>}
      generator={<></>}
      solver={<></>}
    ></VisPage>
  );
};

export default GraphColoringPage;
