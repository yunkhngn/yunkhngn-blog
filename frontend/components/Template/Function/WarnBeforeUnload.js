import { useEffect } from "react";
import { useRouter } from "next/router";

const WarnBeforeUnload = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWindowClose = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handleBrowseAway = (url) => {
      if (router.asPath !== url && !window.confirm("Bạn có muốn rời khỏi trang không?")) {
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
      }
    };

    window.addEventListener("beforeunload", handleWindowClose);
    router.events.on("routeChangeStart", handleBrowseAway);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("routeChangeStart", handleBrowseAway);
    };
  }, [router]);

  return null;
};

export default WarnBeforeUnload;