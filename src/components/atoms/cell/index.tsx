import styles from "./style.module.css";

type Props = {
  value: number;
  states: string[];
};

const Cell: React.FC<Props> = (props) => {
  var className = `${styles.cell}`;
  props.states.forEach((state) => {
    className += ` ${styles[state]}`;
  });

  return <div className={className}></div>;
};

export default Cell;
