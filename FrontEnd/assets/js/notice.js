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
    if (type!="info") {
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