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

  // var width = "calc(100% / " + props.width + ")";
  // console.log(width);

  return <div className={className}></div>;
};

export default Cell;
