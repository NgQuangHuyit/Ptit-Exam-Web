class Exam {
    constructor(title, timeAmt, subject, isActive, description) {
        this.title = title;
        this.timeAmt = timeAmt;
        this.subject = subject;
        this.isActive = isActive;
        this.description = description;
    }
}

function disableExamForm() {
    var formFields = document.getElementsByClassName("exam-form-field");
    for (var i = 0; i < formFields.length; i++) {
        formFields[i].disabled = true;
    }
    document.getElementById("save-exam-btn").style.display = "none";
}

function enableExamForm() {
    var formFields = document.getElementsByClassName("exam-form-field");
    for (var i = 0; i < formFields.length; i++) {
        formFields[i].removeAttribute("disabled");
    }
}

function renderExamInfo(data) {

    document.getElementById("form-field-title").value = data.title;
    document.getElementById("form-field-active").value = data.isActive
    document.getElementById("form-field-timeAmt").value = data.timeAmt;
    document.getElementById("form-field-subject").value = data.subject;
    document.getElementById("description").value = data.description;
}

function renderQuestion(data){
    var row = document.createElement('div')
    row.id = `quest_${data.id}`
    row.classList.add("container")
    row.innerHTML = `
    <div class="row">
        <div class="col-md-12 quest-content">
            ${data.content}
        </div>

    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="quest-option">
                <span>A. ${data.choiceA}</span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="quest-option">
                <span>B. ${data.choiceB}</span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="quest-option">
                <span>C. ${data.choiceC}</span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="quest-option">
                <span>D. ${data.choiceD}</span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="correct-option ml-5 mt-3">
            <span>Đáp án đúng: ${data.rightChoice}</span>
        </div>
    </div>
    <div class="row  mt-3">
        <div class="col-md-10"></div>
        <div class="col-md-1">
            <button class="btn btn-success" onclick="getQuestionById(${data.id}, renderEditForm)">Edit</button>
        </div>
        <div class="col-md-1">
            <button class="btn btn-danger" onclick="deleteQuestion(${data.id}, handlerDeleteQuestion)">Delete</button>
        </div>
    </div>
    `
    return row
}

function renderEditForm(data){
    console.log(data);
    var form = document.createElement('form')
    form.id = `edit-quest-form-${data.id}`
    form.innerHTML = `
    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label>Câu hỏi</label>
                <textarea  id="questionContent#${data.id}"  class="form-control ques-form-field" name="comment" placeholder="Nhập nội dung câu hỏi ở đây..."></textarea>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label for="form-field-answerA">Đáp án A</label>
                <input type="text" name="answerA" id="form-field-answerA#${data.id}" class="form-control ques-form-field" required>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="form-field-answerB">Đáp án B</label>
                <input type="text" name="answerA" id="form-field-answerB#${data.id}" class="form-control ques-form-field" required>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="form-field-answerC">Đáp án C</label>
                <input type="text" name="answerC" id="form-field-answerC#${data.id}" class="form-control ques-form-field" required>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="form-field-answerD">Đáp án D</label>
                <input type="text" name="answerD" id="form-field-answerD#${data.id}" class="form-control ques-form-field" required>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>Đáp án đúng</label>
                <select id="form-field-correctAns#${data.id}"  name="correctAns" class="form-control exam-form-field" required>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-2">
            <button type="submit" id="submit-question-btn"  class="btn btn-success">Lưu</button>
        </div>
    </div>`
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        var question = {
            content: document.getElementById(`questionContent#${data.id}`).value,
            choiceA: document.getElementById(`form-field-answerA#${data.id}`).value,
            choiceB: document.getElementById(`form-field-answerB#${data.id}`).value,
            choiceC: document.getElementById(`form-field-answerC#${data.id}`).value,
            choiceD: document.getElementById(`form-field-answerD#${data.id}`).value,
            rightChoice: document.getElementById(`form-field-correctAns#${data.id}`).value
        }
        updateQuestionById(question, data.id, function(result) {
            if (result.success) {
                var question = renderQuestion(result.data);
                document.getElementById(`quest_${data.id}`).innerHTML = ""
                document.getElementById("question-list").replaceChild(question, document.getElementById(`quest_${data.id}`));
                showSuccessNotice("Cập nhập câu hỏi thành công");
            }
            else {
                showErrorNotice("Cập nhập câu hỏi thất bại");
            }
        });
    })
    document.getElementById(`quest_${data.id}`).innerHTML = ""
    document.getElementById(`quest_${data.id}`).appendChild(form)
    document.getElementById(`questionContent#${data.id}`).value = data.content
    document.getElementById(`form-field-answerA#${data.id}`).value = data.choiceA
    document.getElementById(`form-field-answerB#${data.id}`).value = data.choiceB
    document.getElementById(`form-field-answerC#${data.id}`).value = data.choiceC
    document.getElementById(`form-field-answerD#${data.id}`).value = data.choiceD
    document.getElementById(`form-field-correctAns#${data.id}`).value = data.rightChoice

}

function handlerDeleteQuestion(result, questionId) {
    if (result.success) {
        showSuccessNotice("Xóa thành công");
        document.getElementById(`quest_${questionId}`).remove();
    }
    else {
        showErrorNotice("Xóa thất bại");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var editExamId = sessionStorage.getItem("editExamId");
    document.getElementById("edit-exam-btn").addEventListener("click", function(event) {
        enableExamForm();
        this.setAttribute("disabled", true);
        document.getElementById("save-exam-btn").style.display = "block";
    });
    document.getElementById("save-exam-btn").addEventListener("click", function(event) {
        var title = document.getElementById("form-field-title").value;
        var timeAmt = document.getElementById("form-field-timeAmt").value;
        var subject = document.getElementById("form-field-subject").value;
        var description = document.getElementById("description").value;
        var isActive = document.getElementById("form-field-active").value;
    
        var newExam = new Exam(title, timeAmt, subject, isActive, description);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

        const raw = JSON.stringify(newExam);

        const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch(`http://localhost:8080/exams/${editExamId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            if (result.success) {
                showSuccessNotice(`Cập nhập thành công đề thi ${title}`);
                document.getElementById("edit-exam-btn").removeAttribute("disabled");
                disableExamForm();
            }
            else
            {
                showErrorNotice(`Chỉnh sửa thất bại đề thi ${title}`);
            
        }})
        .catch((error) => console.error(error));
    });

    getExamById(editExamId, renderExamInfo)

    document.getElementById("open-close-form-btn").addEventListener("click", function(event) {
        var form = document.getElementById("add-ques-form");
        if (form.style.display === "none") {
            form.style.display = "block";
            this.innerHTML = `<i class="fa-solid fa-minus"></i>`
        }
        else {
            form.style.display = "none";
            this.innerHTML = `<i class="fa-solid fa-plus"></i>`
        }
    });

    document.getElementById("add-ques-form").addEventListener("submit", function(event) {
        event.preventDefault();
        var question = {
            content: document.getElementById("questionContent").value,
            choiceA: document.getElementById("form-field-answerA").value,
            choiceB: document.getElementById("form-field-answerB").value,
            choiceC: document.getElementById("form-field-answerC").value,
            choiceD: document.getElementById("form-field-answerD").value,
            rightChoice: document.getElementById("form-field-correctAns").value
        }
        createQuestion(question, editExamId, function(result) {
            if (result.success) {
                showSuccessNotice("Thêm câu hỏi thành công");
                document.getElementById("question-list").appendChild(renderQuestion(result.data));
                this.reset();
            }
            else {
                showErrorNotice("Thêm câu hỏi thất bại");
            }
        });
    })
    getAllQuestionsDetail(editExamId, function(data) {
        data.forEach(function(item) {
            document.getElementById("question-list").appendChild(renderQuestion(item));
        })
    });
});