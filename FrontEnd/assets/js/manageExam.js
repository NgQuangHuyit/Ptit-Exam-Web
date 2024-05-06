function handlerDeleteExam(result, examId) {
    if (result.success) {
        showSuccessNotice("Xóa thành công");
        document.getElementById(`tbl1_row_${examId}`).remove();
    }
}

function renderExam(data) {
    var row = document.createElement('tr');
    row.id = `tbl1_row_${data.id}`;
    row.innerHTML = `
    <th scope="row" style="color: #666666;">${data.id}</th>
    <td>${data.title}</td>
    <td>${data.subject}</td>
    <td>${data.timeAmt}</td>
    <td>${data.questionCount}</td>
    <td style="color:${data.isActive ? "green" : "red"}">${data.isActive ? true : false}</td>
    <td><button class="btn btn-outline-info">Thống kê</button>
        <button class="btn btn-outline-success" onclick="editExamPage(${data.id})">Sửa</button>
        <button class="btn btn-outline-danger" class="bg-red" onclick="deleteExam(${data.id}, handlerDeleteExam); ">Xóa</button>
    </td>
    `
    return row;
}

function renderAllExams(data) {
    document.getElementById('tbody_tbl1').innerHTML = '';
    data.forEach(exam => {
        document.getElementById('tbody_tbl1').appendChild(renderExam(exam));
    });
}


document.addEventListener("DOMContentLoaded", function() {
    getAllExams(renderAllExams);

    document.getElementById("search-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("search-input").value;
        searchExamByTitle(title, renderAllExams);
    })

    document.getElementById("filter-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const status = document.getElementById("filter-status").value;
        const subject = document.getElementById("filter-subject").value;
        filterExam(status, subject, renderAllExams);
    })
})
