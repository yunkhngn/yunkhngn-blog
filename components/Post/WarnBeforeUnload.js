import { useEffect } from "react";

const WarnBeforeUnload = () => {
  console.log("Added");
  useEffect(() => {
    const listener = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", listener);

    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, []);

  return null;
};

export default WarnBeforeUnload;