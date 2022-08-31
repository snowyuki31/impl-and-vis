import { RefObject } from "react";
import styles from "./style.module.css";

export const Canvas = ({
  bgCanvasRef,
  resultCanvasRef,
  size,
}: {
  bgCanvasRef: RefObject<HTMLCanvasElement>;
  resultCanvasRef: RefObject<HTMLCanvasElement>;
  size: number;
}) => {
  return (
    <div className={styles.canvas_wrap}>
      <canvas
        ref={bgCanvasRef}
        width={size}
        height={size}
        className={styles.canvas}
      />
      <canvas
        ref={resultCanvasRef}
        width={size}
        height={size}
        className={styles.canvas}
      />
    </div>
  );
};

export default Canvas;
