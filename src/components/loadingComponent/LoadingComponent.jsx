import { Spin } from "antd";
import "./loadingComponent.css"

const LoadingComponent = () => (
  <div className="loading-container">
    <Spin tip="Loading . . ." size="large"/>
  </div>
);
export default LoadingComponent;
