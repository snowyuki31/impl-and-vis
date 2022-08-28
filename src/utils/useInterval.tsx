import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, interval: number) => {
  const callbackRef = useRef<() => void>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    const id = setInterval(tick, interval);
    return () => {
      clearInterval(id);
    };
  });
};

export default useInterval;
