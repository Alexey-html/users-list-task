export function fetchUserList() {
  return fetch("https://jsonplaceholder.typicode.com/users")
}

export function fetchAddUser(userObj: any) {
  return fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify({
      name: userObj?.nameState,
      username: userObj?.userNameState,
      email: userObj?.emailState,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

export function fetchDeleteUser(userId: number) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: 'DELETE',
  })
}
