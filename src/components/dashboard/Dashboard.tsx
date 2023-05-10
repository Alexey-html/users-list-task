import React from 'react';
import dashboard from '../../images/dashboard.jpg';
import styles from './Dashboard.module.css';

export function Dashboard() {
  document.title = "StreamDat App | Панель индикаторов"
  return (
    <>
      <h1 className={styles.h1}>Панель индикаторов</h1>
      <img src={dashboard} alt="" />
    </>
  );
}
