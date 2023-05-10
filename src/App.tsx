import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Users } from './components/users/Users';
import { Dashboard } from './components/dashboard/Dashboard';
import { Settings } from './components/settings/Settings';
import { selectStatus } from './components/users/userSlice';
import { useAppSelector } from './app/hooks';
import logo from './images/logo.png';
import dashboardIcon from './images/dashboard-icon.svg';
import usersIcon from './images/users-icon.svg';
import settingIcon from './images/setting-icon.svg';
import search from './images/search.svg';
import admin from './images/admin.jpg';
import exitdoor from './images/exitdoor.svg';

import styles from './App.module.css';

function App() {
  const loadingStatus = useAppSelector(selectStatus);
  const scrollPos = Math.round(window.pageYOffset);

  React.useEffect(() => {
    if (loadingStatus === "loading") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible"
    }
  }, [loadingStatus]);


  return (
    <>
      <div className={styles.App}>
        {loadingStatus === "loading" &&
          <div className={styles.loading} style={{ top: `${scrollPos}px` }}>
            <div className={styles.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        }
        <div className={styles.leftMenu}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.leftMenuContent}>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? styles.active : ""}
            >
              <img src={dashboardIcon} alt="" /> Панель индикаторов
            </NavLink>
            <NavLink
              to="/users/"
              className={({ isActive }) => isActive ? styles.active : ""}
            >
              <img src={usersIcon} alt="" /> Пользователи
            </NavLink>
            <NavLink
              to="/settings/"
              className={({ isActive }) => isActive ? styles.active : ""}
            >
              <img src={settingIcon} alt="" /> Настройки
            </NavLink>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.topPanel}>
            <h1>&nbsp;</h1>
            <div className={styles.search}>
              <div className={styles.searchForm}>
                <input type="text" placeholder="Поиск" />
                <button><img src={search} alt="" /></button>
              </div>
            </div>
            <div className={styles.currentUser}>
              <img src={admin} alt="" />
              <p>Супер Aдмин<br /><span>superadmin</span></p>
              <a href="/" className={styles.exitdoor}><img src={exitdoor} alt="" /></a>
            </div>
          </div>



          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

      </div >

    </>
  );
}

export default App;
