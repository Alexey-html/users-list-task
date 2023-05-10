import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  userListApi,
  addUserApi,
  deleteUserApi,
  selectUserList,
  sortId,
} from './userSlice';
import styles from './Users.module.css';

export function Users() {

  document.title = "StreamDat App | Пользователи";

  let userList = useAppSelector(selectUserList);
  const dispatch = useAppDispatch();

  const [nameState, setNameState] = useState('');
  const [userNameState, setUserNameState] = useState('');
  const [emailState, setEmailState] = useState('');

  const [nameStateError, setNameStateError] = useState<String>('');
  const [userNameStateError, setUserNameStateError] = useState<String>('');
  const [emailStateError, setEmailStateError] = useState<String>('');


  const validateName = () => {
    if (!nameState || (nameState && nameState?.length < 3)) {
      setNameStateError("Введите не менее 3 символов");
      return false;
    }
    else {
      setNameStateError("")
      return true;
    }
  }

  const validateUserName = () => {
    if (!userNameState || (userNameState && userNameState?.length < 3)) {
      setUserNameStateError("Введите не менее 3 символов")
      return false;
    }
    else {
      setUserNameStateError("")
      return true;
    }
  }

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;


    if (!re.test(email)) {
      setEmailStateError("Некорректный Email")
      return false
    }
    else {
      setEmailStateError('')
      return true;
    }
  }


  const createNewUser = () => {

    if (validateName() && validateUserName() && validateEmail(emailState)) {
      dispatch(addUserApi({ "nameState": nameState, "userNameState": userNameState, "emailState": emailState }));
      setNameState("");
      setUserNameState("");
      setEmailState("");
    }
  }

  const userListFunc = (e: any) => {
    dispatch(userListApi());
    e.target.blur();
  }

  const userDeleteFunc = (e: any, itemFunc: any) => {
    e.preventDefault()
    if (window.confirm(`Вы хотите удалить пользователя ${itemFunc.name}?`)) {
      dispatch(deleteUserApi(itemFunc.id))

    }
  }

  document.body.onkeydown = (e: any) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      createNewUser()
    }
  }


  return (
    <>
      <h1 className={styles.h1}>Пользователи</h1>
      <div className={styles.users}>
        <div className={styles.usersLeft}>

          <div className={styles.userIndicators}>
            <div className={styles.userIndicatorsItem}>
              <div className={styles.userCharts}>
                <svg className={styles.pie} width="100" viewBox="0 0 37 37">
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                </svg>
                <span>100%</span>
              </div>
              <span>72 580<br /><small>Всего</small></span>
            </div>
            <div className={styles.userIndicatorsItem}>
              <div className={styles.userCharts}>
                <svg className={`${styles.pie} ${styles.online}`} width="100" viewBox="0 0 37 37">
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                </svg>
                <span>70%</span>
              </div>

              <span>50 806<br /><small>Онлайн</small></span>
            </div>
            <div className={styles.userIndicatorsItem}>
              <div className={styles.userCharts}>
                <svg className={`${styles.pie} ${styles.offline}`} width="100" viewBox="0 0 37 37">
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                </svg>
                <span>30%</span>
              </div>

              <span>21 774<br /><small>Офлайн</small></span>
            </div>
            <div className={styles.userIndicatorsItem}>
              <div className={styles.userCharts}>
                <svg className={`${styles.pie} ${styles.waiting}`} width="100" viewBox="0 0 37 37">
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                  <circle r="15.9155" cx="50%" cy="50%"></circle>
                </svg>
                <span>10%</span>
              </div>
              <span>7 258<br /><small>Заблокировано</small></span>
            </div>

          </div>

          <div className={styles.userListBlock}>
            <table className={styles.tableUsers}>
              <thead>
                <tr>
                  <th>ID <span onClick={() => {
                    dispatch(sortId())
                  }
                  }>&#8597;</span></th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Действие</th>
                </tr>
                {
                  [...userList].map((item: any) => (
                    <tr key={item.id}>
                      <td key={`id${item.id}`}>
                        {item.id}
                      </td>
                      <td key={`name${item.id}`}>
                        {item.name}
                      </td>
                      <td key={`username${item.id}`}>
                        {item.username}
                      </td>
                      <td key={`email${item.id}`}>
                        {item.email}
                      </td>
                      <td key={`delete${item.id}`}>
                        <a href="/user" onClick={(e) => {
                          userDeleteFunc(e, item)
                        }
                        }>Удалить</a>
                      </td>
                    </tr>
                  ))

                }
              </thead>
            </table>

            <div className={styles.userApi}>
              <button
                className={styles.buttonUserApi}
                onClick={(e) => userListFunc(e)}
              >
                Загрузить список пользователей (API)
              </button>
            </div>
          </div>
        </div>
        <div className={styles.usersRight}>
          <div className={styles.usersCreate}>
            <div className={styles.usersCreateText}>Новый пользователь</div>
            <input
              className={styles.textbox}
              type="text"
              aria-label="Set name"
              value={nameState}
              placeholder='Name'
              onChange={(e) => setNameState(e.target.value)}
            />
            <div className={styles.inputError}>{nameStateError}</div>

            <input
              className={styles.textbox}
              aria-label="Set username"
              value={userNameState}
              placeholder='Username'
              onChange={(e) => setUserNameState(e.target.value)}
            />
            <div className={styles.inputError}>{userNameStateError}</div>

            <input
              className={styles.textbox}
              aria-label="Set email"
              value={emailState}
              placeholder='Email'
              onChange={(e) => setEmailState(e.target.value)}
            />
            <div className={styles.inputError}>{emailStateError}</div>

            <button
              className={styles.button}
              onClick={() => createNewUser()}
            >
              Добавить
            </button>

          </div>
        </div>

      </div >
    </>

  );
}
