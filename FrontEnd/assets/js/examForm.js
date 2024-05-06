function handlerSubmitExamResponse(response) {
    if (response.success) {
        showSuccessNotice(`Tạo thành công đề thi ${response.data.title}`);
        sessionStorage.setItem("editExamId", response.data.id);
        window.location.href = "/DashboardAdmin/editExam.html";
    }
    else
    {
        showErrorNotice(`Tạo thất bại đề thi ${title}`);
    }
}

function submitExamForm() {
    var title = document.getElementById("form-field-title").value;
    var timeAmt = document.getElementById("form-field-timeAmt").value;
    var subject = document.getElementById("form-field-subject").value;
    var description = document.getElementById("description").value;
    var isActive = document.getElementById("form-field-active").value;

    var newExam = {
        title: title,
        timeAmt: timeAmt,
        subject: subject,
        description: description,
        isActive: isActive
    };
    createExam(newExam, handlerSubmitExamResponse);

}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("exam-form").addEventListener("submit", function(event) {
        event.preventDefault();
        submitExamForm();
    });

});

// class Question {
//     constructor(text, options) {
//         this.text = text;
//         this.options = options || [];
//         this.correctAnswerIndex = null;
//     }
// }

// class Option {
//     constructor(text) {
//         this.text = text;
//     }
// }

var questions = [];

// function renderQuestions() {
//     var questionList = document.getElementById("questionList");
//     var questionCount = document.getElementById("questionCount");
    
//     questionList.innerHTML = "";
//     questionCount.innerText = `Tổng số câu hỏi: ${questions.length}`;

//     questions.forEach(function (question, questionIndex) {
//         var questionItem = document.createElement("li");
//         questionItem.innerHTML = `
//             <span>${question.text}</span>
//             <ul id="optionsList${questionIndex}"></ul>
//             <input type="text" id="optionInput${questionIndex}" placeholder="Thêm một phương án">
//             <button class="btn btn--success btn--size-s" onclick="addOption(${questionIndex})">Thêm phương án</button>
//             <button class="btn btn--warn btn--size-s" onclick="editQuestion(${questionIndex})">Chỉnh sửa</button>
//             <button class="btn btn--danger btn--size-s" onclick="deleteQuestion(${questionIndex})">Xóa</button>
//             <button class="btn btn--success btn--size-s" onclick="selectCorrectAnswer(${questionIndex})">Chọn đáp án Đúng</button>
//         `;
//         questionList.appendChild(questionItem);

//         var optionsList = document.getElementById(`optionsList${questionIndex}`);
//         question.options.forEach(function (option, optionIndex) {
//             var optionItem = document.createElement("li");
//             optionItem.innerHTML = `
//                 <span>${option.text}</span>
//                 <button onclick="editOption(${questionIndex}, ${optionIndex})">Chỉnh sửa</button>
//                 <button onclick="deleteOption(${questionIndex}, ${optionIndex})">Xóa</button>
//             `;
//             optionsList.appendChild(optionItem);

//             if (optionIndex === question.correctAnswerIndex) {
//                 optionItem.classList.add("correct-answer");
//             }
//         });
//     });
// }

// function addQuestion() {
//     var questionInput = document.getElementById("questionInput");
    
//     if (questionInput.value.trim() === "") {
//         showAlert("Vui lòng nhập một câu hỏi.");
//         return;
//     }

//     var newQuestion = new Question(questionInput.value);
//     questions.push(newQuestion);
//     renderQuestions();
//     questionInput.value = "";
// }

// function addOption(questionIndex) {
//     var optionInput = document.getElementById(`optionInput${questionIndex}`);

//     if (optionInput.value.trim() === "") {
//         showAlert("Vui lòng nhập một phương án.");
//         return;
//     }

//     var newOption = new Option(optionInput.value);
//     questions[questionIndex].options.push(newOption);
//     renderQuestions();
//     optionInput.value = "";
// }

// function editQuestion(questionIndex) {
//     var newText = prompt("Chỉnh sửa câu hỏi:", questions[questionIndex].text);
    
//     if (newText !== null) {
//         questions[questionIndex].text = newText;
//         renderQuestions();
//     }
// }

// function deleteQuestion(questionIndex) {
//     questions.splice(questionIndex, 1);
//     renderQuestions();
// }

// function editOption(questionIndex, optionIndex) {
//     var newText = prompt("Chỉnh sửa phương án:", questions[questionIndex].options[optionIndex].text);
    
//     if (newText !== null) {
//         questions[questionIndex].options[optionIndex].text = newText;
//         renderQuestions();
//     }
// }

// function deleteOption(questionIndex, optionIndex) {
//     questions[questionIndex].options.splice(optionIndex, 1);
//     renderQuestions();
// }

// function selectCorrectAnswer(questionIndex) {
//     var optionsList = document.getElementById(`optionsList${questionIndex}`);
//     var options = optionsList.getElementsByTagName("li");

//     for (var i = 0; i < options.length; i++) {
//         options[i].classList.remove("correct-answer");
//     }

//     var selectedOption = prompt("Nhập phương án đúng (bắt đầu từ 1):");
//     if (selectedOption !== null) {
//         var index = parseInt(selectedOption) - 1;

//         if (index >= 0 && index < questions[questionIndex].options.length) {
//             questions[questionIndex].correctAnswerIndex = index;
//             options[index].classList.add("correct-answer");
//         } else {
//             showAlert("Số phương án không hợp lệ.");
//         }
//     }
// }

// function updateQuizTime() {
//     var quizType = document.getElementById("quizType").value;
//     var quizTimeContainer = document.getElementById("timeSection");
//     var displayQuizTime = document.getElementById("displayQuizTime");

//     if (quizType === "Có thời gian") {
//         quizTimeContainer.style.display = "block";
//         var time = document.getElementById("quizTime").value;
//         displayQuizTime.innerText = `Thời gian làm bài: ${time} phút`;
//     } else {
//         quizTimeContainer.style.display = "none";
//         displayQuizTime.innerText = "";
//     }
// }

// function createQuiz() {
//     if (questions.length === 0) {
//         showAlert("Vui lòng thêm ít nhất một câu hỏi.");
//         return;
//     }

//     var quizName = document.getElementById("quizName").value;
//     var quizDescription = document.getElementById("quizDescription").value;
//     var quizType = document.getElementById("quizType").value;
//     var quizTime = document.getElementById("quizTime").value;

//     showAlert(`Đã tạo Đề thi!\nTên: ${quizName}\nMô tả: ${quizDescription}\nLoại: ${quizType}\nThời gian: ${quizTime} phút`);
// }

// function importExcel() {
//     var input = document.getElementById('excelFile');
    
//     if (!input.files.length) {
//         showAlert('Vui lòng chọn một tệp.');
//         return;
//     }

//     var file = input.files[0];
//     var reader = new FileReader();

//     reader.onload = function (e) {
//         var data = new Uint8Array(e.target.result);
//         var workbook = XLSX.read(data, { type: 'array' });

//         var sheetName = workbook.SheetNames[0];
//         var sheet = workbook.Sheets[sheetName];

//         var questionsArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//         parseExcelData(questionsArray);
//     };

//     reader.readAsArrayBuffer(file);
// }

// function parseExcelData(questionsArray) {
//     for (var i = 1; i < questionsArray.length; i++) {
//         var questionText = questionsArray[i][0];
//         var options = questionsArray[i].slice(1, -1);
//         var correctAnswer = questionsArray[i][questionsArray[i].length - 1];

//         var newQuestion = new Question(questionText);
        
//         options.forEach(function (optionText) {
//             var newOption = new Option(optionText);
//             newQuestion.options.push(newOption);
//         });

//         var correctAnswerIndex = options.indexOf(correctAnswer);
//         newQuestion.correctAnswerIndex = correctAnswerIndex;

//         questions.push(newQuestion);
//     }

//     renderQuestions();
// }

// function showAlert(message) {
//     return new Promise(function(resolve) {
//         alert(message);
//         resolve();
//     });
// }

// renderQuestions();