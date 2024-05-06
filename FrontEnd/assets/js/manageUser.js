function renderUserRow(data, parentId) {
    var row = document.createElement('tr');
    row.id = `tbl1_row_${data.id}`;
    row.innerHTML = `
        <th scope="row" style="color: #666666;">${data.id}</th>
        <td>${data.username}</td>
        <td>${data.fullname ? data.fullname : ''}</td>
        <td>${data.classId ? data.classId : ''}</td>
        <td style="color:${data.isActive ? "green" : "red"}">${data.isActive ? true : false}</td>
        <td>${data.gender ? data.gender : ''}</td>
        <td><button class="btn btn-outline-info" onclick="getUserDetailPage(${data.id})">Detail</button>
        <button class="btn btn-outline-danger" class="bg-red" onclick="deleteUser(${data.id},handlerDeleteExamResponse)">xoa</button>
        </td>`;
    document.getElementById(parentId).appendChild(row);
}
function renderAllUsers(data) {
    document.getElementById('tbody1').innerHTML = '';
    data.forEach(user => {
        renderUserRow(user, 'tbody1');
    });
}

function getUserDetailPage(userId) {
    window.location.href = `/DashboardAdmin/UserInfo/index.html?userId=${userId}`;
}

function handlerDeleteExamResponse(result, examId) {
    if (result.success) {
        showSuccessNotice("Xóa thành công");
        document.getElementById(`tbl1_row_${examId}`).remove();
    }
    else {
        showErrorNotice(result.data.message);
    }

}
document.addEventListener("DOMContentLoaded", function() {

    getAllUser(renderAllUsers);
})
