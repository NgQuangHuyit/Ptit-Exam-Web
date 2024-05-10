function renderUserInfo(data) {
    // if (data.message != null) {
    //     window.location.href = "/errorPage.html"
    // }
    document.getElementById('username').innerHTML = data.username;
    document.getElementById('user-fullname').innerHTML = data.fullname;
    document.getElementById('edit-fullname').value = data.fullname;
    document.getElementById('edit-gender').value = data.gender;
    document.getElementById('edit-email').value = data.email;
    document.getElementById('edit-phoneNumber').value = data.phoneNumber;
    document.getElementById('edit-dob').value = data.dob;
    document.getElementById('edit-class').value = data.classID;
}


function renderExam(data){
    var row = document.createElement('tr');
        row.innerHTML = `
            <td class="text-center"><span>${data.id}</span></td>
            <td class="text-center">${data.examTitle}</td>
            <td class="text-center">${parseDatetime(data.startTime)}</td>
            <td class="text-center">${parseDatetime(data.startTime)}</td>
            <td class="text-center"><a href="/DashboardAdmin/Result/index.html?id=${data.id}">${data.point}</a></td>
        `
        return row;
}

function renderExams(data) {
    document.getElementById('tbody_tbl1').innerHTML = '';
    data.forEach(exam => {
        document.getElementById('tbody_tbl1').appendChild(renderExam(exam));
    });
}


document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    console.log(userId);
    getUserInfoById(userId, renderUserInfo);

    getAllResultsByUserId(userId, renderExams)
    
    var save_btn = document.getElementById('save-btn');
    var edit_btn = document.getElementById('edit-btn');
    edit_btn.addEventListener('click', function() {
        console.log('edit');
        var inputs = document.getElementsByClassName('edit-input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute('disabled');
        }
        edit_btn.setAttribute('disabled', 'disabled');
        edit_btn.classList.add('btn--disabled');
        save_btn.removeAttribute('disabled');
        save_btn.classList.remove('btn--disabled');
        showInfoNotice('Ban co the chinh sua thong tin');
    })

    save_btn.addEventListener('click', function() {
        console.log('save');
        user = {
            "fullname": document.getElementById('edit-fullname').value,
            "classID": document.getElementById('edit-class').value,
            "dob": document.getElementById('edit-dob').value ,
            "gender": document.getElementById('edit-gender').value,
            "phoneNumber": document.getElementById('edit-phoneNumber').value
        }

        updateUserInfo(userId, user, function(data) {
            if (!data.success) {
                showErrorNotice(data.message);
                renderUserInfo(data.data)
            } else {
                showSuccessNotice('Ban da luu thong tin thanh cong');
                renderUserInfo(data.data)
            }
        });
        var inputs = document.getElementsByClassName('edit-input');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute('disabled', 'disabled');
        }
        save_btn.setAttribute('disabled', 'disabled');
        save_btn.classList.add('btn--disabled');
        edit_btn.removeAttribute('disabled');
        edit_btn.classList.remove('btn--disabled');
    })

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchValue = document.getElementById('search-input').value;
        console.log(searchValue);
        searchTable(searchValue, 'tbody_tbl1')
    })

});