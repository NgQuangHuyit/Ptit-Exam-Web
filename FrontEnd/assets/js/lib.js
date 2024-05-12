function searchTable(searchValue, tableID) {
    if (searchValue === '') { 
        var table = document.getElementById(tableID);
        var rows = table.getElementsByTagName('tr');
        for (var i = 0; i<rows.length; i++) {
            rows[i].style.display = '';
        }
        return;
    }
    searchValue = searchValue.toLowerCase();
    var table = document.getElementById(tableID);
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i<rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j<cells.length; j++) {
            cellValue = cells[j].textContent.toLowerCase();
            if (cellValue.includes(searchValue)){
                found = true;
                break;
            }
        }

        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }

}


function notice({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("notice");
    if (main) {
      const notice = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(notice);
      }, duration + 1000);
  
      // Remove toast when clicked
      notice.onclick = function (e) {
        if (e.target.closest(".notice__close")) {
          main.removeChild(notice);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fa-solid fa-circle-check",
        info: "fa-solid fa-circle-info",
        error: "fa-solid fa-circle-exclamation"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      notice.classList.add("notice");
      if (type!=="info") {
        notice.classList.add(`notice--${type}`);
      }
      notice.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      notice.innerHTML = `
                      <div class="notice__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="notice__body">
                          <h3>${title}</h3>
                          <p>${message}</p>
                      </div>
                      <div class="notice__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(notice);
    }
  }
  
  function showInfoNotice(message) {
    notice(
      { title: "Note",
        message: message, 
        type: "info" });
  }
  
  function showSuccessNotice(message) {
    notice(
      { title: "Success",
        message: message, 
        type: "success" });
  }
  
  function showErrorNotice(message) {
    notice(
      { title: "Error",
        message: message, 
        type: "error" });
  }
  
  function toggleInfo() {
    var x = document.getElementById("adminCard");
    if (x.innerHTML === "") {
      x.style.display = "flex";
      x.innerHTML = `
      <div class="card_item">
        <i class="fa-solid fa-user card__icon"></i>
        <span class="card__info">${localStorage.getItem("username")}</span>
      </div>
      <div class="card_item">
        <i class="fa-solid fa-envelope card__icon"></i>
        <span class="card__info">${localStorage.getItem("email")}</span>
      </div>
      <div class="card_item">
          <i class="fa-solid fa-signature card__icon"></i>
          <span class="card__info">${localStorage.getItem("fullname")}</span>
      </div>
      <button class="card_item logout" onclick="logout()" >
        <i class="fa-solid fa-right-to-bracket card__icon"></i>
        <span class="card__info ">Đăng xuất</span>
      </button>
              `;
    }
    else {
      x.innerHTML = "";
      x.style.display = "none";
    }
}

function checkTokenValid() {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/";
    }
    else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "token": `${localStorage.getItem("token")}`
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:8080/auth/introspect", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.valid === true) {
            console.log("Token is valid");
          }
          else {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("fullname");
            localStorage.removeItem("userId")
            window.location.href = "/";
          }
        })
        .catch((error) => console.error(error));
          }

}

function logout () {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("fullname");
    localStorage.removeItem("userId")
    window.location.href = "/";
}

function editExamPage(id) {
  window.location.href = "Exam/editExam.html?id=" + id;
}
function statisticPage(id) {
  window.location.href = `Exam/statistic.html?id=${id}`;
}



function parseDatetime(s) {

  const dateTime = new Date(s);

  // Lấy thông tin ngày, tháng, năm, giờ, phút, giây từ đối tượng Date
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  const day = dateTime.getDate();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  // Định dạng lại chuỗi ngày giờ theo định dạng mong muốn
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}