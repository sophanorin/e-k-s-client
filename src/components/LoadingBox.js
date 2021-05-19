import React from "react";
import * as loadingStyles from "./LoadingBox.module.css";
function LoadingBox() {
  return (
    <div className={loadingStyles.loadingBox}>
      <div className={loadingStyles.loading}></div>
    </div>
  );
}

export default LoadingBox;
