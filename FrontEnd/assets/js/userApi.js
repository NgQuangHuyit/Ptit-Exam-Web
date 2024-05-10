function checkLogin(username, password, callback) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "username": username,
    "password": password
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:8080/auth/login", requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
    }

function registerUser(registerForm, callback) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(registerForm);
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("http://localhost:8080/users/register", requestOptions)
      .then((response) => response.json())
      .then((result) => callback(result, registerForm))
      .catch((error) => console.error(error));
}

function getAllUser(callback) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://localhost:8080/users", requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}

function deleteUser(userId, callback) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch(`http://localhost:8080/users/${userId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result, userId))
    .catch((error) => console.error(error));
}

function getUserInfoById(userId, callback) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  console.log(userId);
  fetch(`http://localhost:8080/users/${userId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}

function updateUserInfo(userId, user, callback) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization",  `Bearer ${localStorage.getItem("token")}`);
  const raw = JSON.stringify(user);
  
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  fetch(`http://localhost:8080/users/${userId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}

function searchUser(name, callback) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
  };

  fetch(`http://localhost:8080/users/search?searchValue=${name}`, requestOptions)
  .then((response) => response.json())
  .then((result) => callback(result))
  .catch((error) => console.error(error));
}


