
let examData = [];

function handleQuestionData(data) {
    examData = data;
    examData = examData.map(question => {
        return {
            id: question.id,
            content: question.content,
            choiceA: question.choiceA,
            choiceB: question.choiceB,
            choiceC: question.choiceC,
            choiceD: question.choiceD,
        };
    });
    console.log(examData);
    displayAllQuestions(); // Sau khi nhận dữ liệu, hiển thị câu hỏi
}

function displayAllQuestions() {
    let navbarContent = '<table>'; // Nội dung cho navbar bên phải
    let questionsHTML = ''; // Nội dung cho tất cả câu hỏi

    examData.forEach((question) => {
        if ((question.id-1) % 5 === 0) { // Mỗi hàng mới
            navbarContent += '<tr>';
        }
        // Thêm mục vào navbar bên phải
        navbarContent += `
            <td class = "navbar-item">
                <a href="#question-${question.id}">${question.id}</a>
            </td>
        `;

        if ((question.id-1)  % 5 === 4 || (question.id-1) === examData.length - 1) { // Kết thúc hàng hoặc cuối danh sách
            navbarContent += '</tr>';
        }
        // Thêm câu hỏi vào container
        questionsHTML += `
        <div id="question-${question.id}" class="question">
            <p><strong>Câu hỏi ${question.id}:</strong> ${question.content}</p>
            <ul>
                <li><input type="radio" name="choice-${question.id}" value="0">${question.choiceA}</li>
                <li><input type="radio" name="choice-${question.id}" value="1">${question.choiceB}</li>
                <li><input type="radio" name="choice-${question.id}" value="2">${question.choiceC}</li>
                <li><input type="radio" name="choice-${question.id}" value="3">${question.choiceD}</li>
            </ul>
        </div>
        `;
    });
    navbarContent += '</table>';

   
    const navbar = document.querySelector('.navbar');
    navbar.innerHTML = navbarContent;

    // Gán nội dung của câu hỏi
    const questionContainer = document.querySelector('.question-container');
    questionContainer.innerHTML = questionsHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    const examPage = document.getElementById('exam-page');
    const resultPage = document.getElementById('result-page');
    const submitExamBtn = document.getElementById('submit-exam-btn');
    const timeLeft = document.getElementById('time-left');
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const correctAnswersSpan = document.getElementById('correct-answers');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const examGradeSpan = document.getElementById('exam-grade');
    const navbar = document.getElementById('navbar'); // Navbar bên phải
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('examId');
    // Giả định dữ liệu bài thi

        
    getQuestionByExamId(examId, handleQuestionData);

    // Hiển thị tất cả câu hỏi

    let timeLimit = 2700;
    function addChangeEventsToInputs() {
        const allInputs = document.querySelectorAll('input[type="radio"]');
        allInputs.forEach(input => {
            input.addEventListener('change', function() {
                // Lấy id của câu hỏi từ name của input
                const questionId = parseInt(this.name.split('-')[1]);
                // Gọi hàm thay đổi CSS cho td tương ứng
                changeNavbarItemStyle(questionId);
            });
        });
    }
    
    // Hàm thay đổi CSS của td tương ứng với câu hỏi
    function changeNavbarItemStyle(questionId) {
        const navbarItem = document.getElementById(`question-${questionId}`);
        // Thay đổi CSS của td
        navbarItem.style.backgroundColor = 'red';
        navbarItem.querySelector('a').style.color = 'white';
    }
    
    // Đếm ngược thời gian
    function startTimer() {
        // Logic đếm ngược thời gian
        const timerInterval = setInterval(() => {
                         timeLimit--;
                         if (timeLimit < 0) {
                             clearInterval(timerInterval);                             
                             displayResult();
                         } else {
                             const minutes = Math.floor(timeLimit / 60);
                             const seconds = timeLimit % 60;
                             timeLeft.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                         }
                     }, 1000);
    }

    
    // Ẩn result-page ban đầu
    resultPage.style.display = 'none';

    // Logic khi nộp bài
    function submitExam() {
        // Hiển thị result-page
        resultPage.style.display = 'block';
        showSuccessNotice('Nộp bài thành công');
        // Ẩn exam-page
        examPage.style.display = 'none';
        document.getElementById('navbar-i').remove();
        // Tính điểm số và hiển thị kết quả
        displayResult();
    }

    

    // Hàm kiểm tra xem tất cả các câu hỏi đã được trả lời chưa
    function checkAllQuestionsAnswered() {
        const allQuestions = document.querySelectorAll('.question');
        for (let i = 0; i < allQuestions.length; i++) {
            const choices = allQuestions[i].querySelectorAll('input[type="radio"]');
            let answered = false;
        for (let j = 0; j < choices.length; j++) {
            if (choices[j].checked) {
                answered = true;
                break;
            }
        }
        if (!answered) {
            return false;
        }
    }
    return true;
}

    // Thực hiện khi nộp bài
    // Sự kiện khi người dùng nhấn nút nộp bài
    submitExamBtn.addEventListener('click', function() {
    // Kiểm tra xem tất cả các câu hỏi đã được trả lời chưa
    const allAnswered = checkAllQuestionsAnswered();
    if (!allAnswered) {
        // Nếu có câu hỏi chưa được trả lời, hiển thị thông báo
        showErrorNotice('Bạn chưa trả lời hết các câu hỏi');
    } else {
        // Nếu tất cả các câu hỏi đã được trả lời, thực hiện nộp bài
        submitExam();
    }
});


    // Hiển thị kết quả
    function displayResult() {
        let correctAnswers = 0;
    
        
        // Tạo biến để lưu thông tin kết quả
    let resultHTML = '';

    // Kiểm tra các câu trả lời và tính số câu trả lời đúng
    examData.forEach((question, index) => {
        const selectedChoiceIndex = document.querySelector(`input[name="choice-${index}"]:checked`);
        const userAnswerIndex = selectedChoiceIndex ? selectedChoiceIndex.value : -1; // Nếu không có câu trả lời, gán giá trị -1
        const correctAnswerIndex = question.correctAnswer;
        const isCorrect = userAnswerIndex == correctAnswerIndex;
        var modifier = isCorrect ? "--correct" : "--incorrect";
        // Cập nhật số câu trả lời đúng
        if (isCorrect) {
            correctAnswers++;
        }

        // Tạo HTML cho mỗi câu hỏi và đáp án
        resultHTML += `
            <div class="question-result question-result${modifier}">
                <p class="question-text"><strong>Câu hỏi ${index + 1}:</strong> ${question.question}</p>
                <p class="user-answer"><strong>Đáp án của bạn:</strong> ${userAnswerIndex != -1 ? question.choices[userAnswerIndex] : "Không có"}</p>
                <p class="correct-answer"><strong>Đáp án đúng:</strong> ${question.choices[correctAnswerIndex]}</p>
            </div>
        `;
    });

    // Hiển thị số câu trả lời đúng và tổng số câu
    correctAnswersSpan.textContent = correctAnswers;
    totalQuestionsSpan.textContent = examData.length;

    // Tính điểm số
    const examGrade = (correctAnswers / examData.length) * 10;

    // Hiển thị điểm số
    examGradeSpan.textContent = examGrade.toFixed(2); // Làm tròn đến 2 chữ số thập phân

    // Hiển thị thông tin kết quả
    answersContainer.innerHTML = resultHTML;
    console.log(resultHTML)

    }
    

    // Thực hiện khi nộp bài
    

    // Hiển thị tất cả câu hỏi và bắt đầu đếm ngược thời gian khi trang được tải
    displayAllQuestions();
    startTimer();
    addChangeEventsToInputs();
});
