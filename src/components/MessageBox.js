import React from "react";
import * as messageboxStlyes from "./MessageBox.module.css";

function MessageBox(props) {
  const { success, danger } = props;
  return (
    <div
      className={`${messageboxStlyes.messageBox} ${
        success ? messageboxStlyes.success : messageboxStlyes.danger
      }`}
    >
      <p>{props.children}</p>
    </div>
  );
}

export default MessageBox;
