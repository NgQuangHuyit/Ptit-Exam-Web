function getAllResultsByUserId(userId, callback) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${localStorage.getItem("token")}`);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch(`http://localhost:8080/users/${userId}/results`, requestOptions)
      .then((response) => response.json())
      .then((result) => callback(result))
      .catch((error) => console.error(error));
}

function getResultById(resultId, callback) {

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`http://localhost:8080/results/${resultId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}


function getAllResultByExam(examId, callback) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`http://localhost:8080/exams/${examId}/results`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}



function createResult(examId, callback) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const raw = "";

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(`http://localhost:8080/results?examId=${examId}`, requestOptions)
    .then((response) => {
      if (response.status === 403) {
        data = { success: false };
        return data;
      }
      if (response.status === 401) {
        window.location.href = "/";
      }
      if (response.status === 200) {
        return response.json();
      }
      else {
        window.location.href = "/error.html";
      }
    })
    .then((result) => callback(result))
    .catch((error) => console.error(error));
  }


  function submitResult(data,resultId, callback) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`http://localhost:8080/results/submissions?resultId=${resultId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => callback(result))
      .catch((error) => console.error(error));
  }