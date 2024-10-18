import React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <h2 className={styles.myHeading}>Loading, please wait...</h2>
    </div>
  );
};

export default Loading;
