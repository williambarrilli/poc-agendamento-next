import styles from "./styles.module.scss";
import React from "react";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
