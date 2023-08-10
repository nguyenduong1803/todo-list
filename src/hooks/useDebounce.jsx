import { useEffect, useRef, useState } from "react";

function useDebounce(value, delay = 400) {
  const [debounceValue, setDebounceValue] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer.current);
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;
