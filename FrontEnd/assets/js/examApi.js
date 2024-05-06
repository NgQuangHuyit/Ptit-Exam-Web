function deleteExam(examId, callback) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
    };
    fetch(`http://localhost:8080/exams/${examId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result, examId))
    .catch((error) => console.error(error));

}


function getAllExams(callback) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization",  `Bearer ${localStorage.getItem("token")}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        };

fetch("http://localhost:8080/exams", requestOptions)
  .then((response) => response.json())
  .then((result) => callback(result))
  .catch((error) => console.error(error));
}


function getExamById(examId, callback) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(`http://localhost:8080/exams/${examId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}

function searchExamByTitle(title, callback) {
    console.log(title);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    fetch(`http://localhost:8080/exams/search?searchValue=${title}`, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}

function createExam(exam, callback) {
    const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    
        const raw = JSON.stringify(exam);
    
        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };
    
        fetch("http://localhost:8080/exams", requestOptions)
        .then((response) => response.json())
        .then((result) => callback(result))
        .catch((error) => console.error(error));
}

function filterExam(status, subject, callback) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    };

    url = `http://localhost:8080/exams/filter?status=${status}&subject=${subject}`
    url = encodeURI(url);
    fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => callback(result))
    .catch((error) => console.error(error));
}