import RouteManagement from "./router/RouteManagement";
import { useEffect } from "react";
import "./assets/styles/global.css";
import { useState } from "react";

export const App = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, [domLoaded]);
  return <>{domLoaded && <RouteManagement />}</>;
};
