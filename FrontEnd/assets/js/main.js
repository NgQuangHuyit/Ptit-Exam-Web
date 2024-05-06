function handlerLoginResponse(response) {
    console.log(response);
    if (!response.success) {
        showErrorNotice("Sai thông tin đăng nhập");
    }
    else {
        showSuccessNotice("Đăng nhập thành công!");
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("email", response.email);
        localStorage.setItem("fullname", response.fullname);
        if (response.username ==  "admin") {
            window.location.href = "DashboardAdmin";
        }
        else {
            window.location.href = "User";
        }
    }
}

function handleRegisterResponse(response, registerForm) {
    console.log(response);
    if (!response.success) {
        showErrorNotice(response.data.message);
    }
    else {
        showSuccessNotice("Đăng ký thành công!");
        document.getElementById("login-form").style.display = "block";
        document.getElementById("register-form").style.display = "none";
        document.getElementById('re-form').style.display = "none";
        document.getElementById("Username").value = registerForm.username;
        document.getElementById("password").value = registerForm.password;
    }

}
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const reForm = document.getElementById('re-form');
    const registerLink = document.getElementById("register-link");
    const reLink = document.getElementById('re-link');
    const loginLink = document.getElementById("login-link");

    reLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        reForm.style.display = 'block';
    });

    // Hiển thị form đăng ký khi nhấn vào liên kết "Đăng ký"
    registerLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        reForm.style.display = 'none';
    });

    // Hiển thị form đăng nhập khi nhấn vào liên kết "Đăng nhập"
    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        reForm.style.display = 'none';
    });

    function isEmailExist(email) {
        for(var i = 0; i < demoUsers.length; i++) {
            if(demoUsers[i].email === email) {
                console.log(demoUsers[i].email)
                return true;
            }
        }
        return false;
    }

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Ngăn chặn việc gửi form
        // Xác thực tên người dùng và mật khẩu (đoạn mã demo)
        var username = document.getElementById("Username").value;
        var password = document.getElementById("password").value;
        checkLogin(username, password, handlerLoginResponse);
    });


    reForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const confirmEmail = document.getElementById("confirm-email").value;

        if(isEmailExist(confirmEmail)) {
            showSuccessNotice("Đã gửi mật khẩu mới về gmail của bạn!");
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            reForm.style.display = 'none';
        } else {
            showInfoNotice("Email này chưa được đăng kí? Đăng kí ngay!");
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            reForm.style.display = 'none';
        }

    })

    usernamePattern = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;
    passwordPattern = /^[a-zA-Z0-9]{7,}$/;
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const newUsername = document.getElementById("newUsername").value;
        const newEmail = document.getElementById("email").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!usernamePattern.test(newUsername)) {
            showErrorNotice("Tên đăng nhập phải bắt đầu bằng chữ cái và chứa ít nhất 6 ký tự.");
            return;
        }
        if (!passwordPattern.test(newPassword)) {
            showErrorNotice("Mật khẩu phải chứa ít nhất 7 ký tự.");
            return;
        }
        if (newPassword !== confirmPassword) {
            showErrorNotice("Mật khẩu không khớp. Vui lòng nhập lại.");
            return;
        }
        registerUser({username: newUsername, password: newPassword, email: newEmail}, handleRegisterResponse);
    });
    
});


