
//lấy bài thi
function renderExam(data) {
    var ele = document.createElement('div')
    ele.classList.add("exam-box")
    ele.innerHTML = `
            <h2 class="title">${data.title}</h2>
            <div class="view-detail">
                <div class="monhoc">${data.subject}</div>
                <div class="active">${data.isActive ? "có thể truy cập" : "không thể truy cập"}</div>
                <div class="time">${data.timeAmt}p</div>    
            </div>
        <button class="btn btn-primary ${data.isActive ? "disable" : ""} style="background-color: red;">Bắt đầu thi</button>
                `
    return ele
}


//lấy nhiều bài thi
function renderAllExams(data) {
    document.getElementById("exam-list").innerHTML = ``
    data.forEach(exam => {
        document.getElementById("exam-list").appendChild(renderExam(exam))
    });
}


document.addEventListener("DOMContentLoaded", function() {
    getAllExams(renderAllExams)

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
    
});



