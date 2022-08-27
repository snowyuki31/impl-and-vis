import styles from "./style.module.css";

type Props = {
  value: number;
  width: number;
  states: string[];
};

const Cell: React.FC<Props> = (props) => {
  var className = `${styles.cell}`;
  props.states.forEach((state) => {
    className += ` ${styles[state]}`;
  });

  const divStyle = {
    width: "calc(100% / " + props.width + ")",
  };

  return <div className={className} style={divStyle}></div>;
};

export default Cell;
