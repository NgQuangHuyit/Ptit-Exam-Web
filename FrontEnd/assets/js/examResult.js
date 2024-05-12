checkTokenValid()
function renderQuestionAnswer(data, index) {
    var ele = document.createElement('div');
    ele.classList.add('question-result');
    ele.classList.add();
    ele.classList.add(data.isCorrect ? 'question-result--correct' : 'question-result--incorrect');
    ele.innerHTML = `
        <p class="question-text" ><strong>Câu hỏi ${index}:</strong> ${data.question.content}</p>
        <p class="ml-4"> A. ${data.question.choiceA}</p>
        <p class="ml-4"> B. ${data.question.choiceB}</p>
        <p class="ml-4"> C. ${data.question.choiceC}</p>
        <p class="ml-4"> D. ${data.question.choiceD}</p>
        <p class="user-answer"><strong>Đáp án của bạn:</strong> ${data.selectedChoice}</p>
        <p class="correct-answer"><strong>Đáp án đúng:</strong> ${data.question.rightChoice}</p>
                
`
    console.log(ele);
    return ele;
}

function renderAllQuestionAnswers(data) {
    document.getElementById("answers-container").innerHTML = '';
    data.forEach((question, index) => {
        document.getElementById("answers-container").appendChild(renderQuestionAnswer(question, index + 1));
    });
}


function handleGetResultsResponse(data) {
    document.getElementById("name").innerHTML = data.fullname;
    document.getElementById("username").innerHTML = data.username;
    document.getElementById("userId").innerHTML = data.userId;
    document.getElementById("exam-title").innerHTML = data.examTitle;
    document.getElementById("start-time").innerHTML = parseDatetime(data.startTime);
    document.getElementById("end-time").innerHTML = parseDatetime(data.endTime);
    document.getElementById("point").innerHTML = data.point;

    renderAllQuestionAnswers(data.answers);
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resultId = urlParams.get('id');

    getResultById(resultId, handleGetResultsResponse);

    // getResultById(resultId, renderAllQuestions);
    // const correctAnswers = document.querySelectorAll('.question-result--correct').length;
    // const totalQuestions = document.querySelectorAll('.question-result').length;
    // const examGrade = (correctAnswers / totalQuestions * 10).toFixed(2);
    // document.getElementById('correct-answers').textContent = correctAnswers;
    // document.getElementById('total-questions').textContent = totalQuestions;
    // document.getElementById('exam-grade').textContent = examGrade;

    
    // window.jsPDF = window.jspdf.jsPDF;
    // var docPDF = new jsPDF();

    // function downloadPDF(fileName){

    //     elementToHides = document.querySelectorAll('.header, .download-btn')
    //     elementToHides.forEach((elementToHide) => {
    //         elementToHide.style.display = 'none';
    //     });
    //     window.print();
    //     elementToHides.forEach((elementToHide) => {
    //         elementToHide.style.display = '';
    //     });
    // }

    // document.querySelector('.download-btn').addEventListener('click', () => {
    //     downloadPDF('result');
    // });
});