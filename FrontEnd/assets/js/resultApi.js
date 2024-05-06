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