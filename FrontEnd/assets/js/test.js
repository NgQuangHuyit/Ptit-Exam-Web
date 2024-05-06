
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

    // Giả định dữ liệu bài thi
    const examData = [
        {
            question: "Câu hỏi 1: Các mạng máy tính được thiết kế và cài đặt theo quan điểm:",
            choices: ["A. Có cấu trúc đa tầng", "B. Nhiều tầng", "C. Theo lớp", "D. Tập hợp"],
            correctAnswer: 0
        },
        {
            question: "Câu hỏi 2: Khi sử dụng mạng máy tính ta sẽ thu được các lợi ích:",
            choices: ["A. Chia sẻ tài nguyên (ổ cứng, cơ sở dữ liệu, máy in, các phần mềm tiện ích...)", "B. Quản lý tập trung", "C. Tận dụng năng lực xử lý của các máy tính rỗi kết hợp lại để thực hiện các công việc lớn", "D. Tất cả đều đúng"],
            correctAnswer: 3
        },
        {
            question: "Câu hỏi 3: Đơn vị cơ bản đo tốc độ truyền dữ liệu là:",
            choices: ["A. Bit", "B. Byte", "C. Bps (bit per second)", "D. Hz"],
            correctAnswer: 2
        },
        {
            question: "Câu hỏi 4: Quá trình dữ liệu di chuyển từ hệ thống máy tính này sang hệ thống máy tính khác phải trải qua giai đoạn nào:",
            choices: ["A. Phân tích dữ liệu", "B. Nén dữ liệu", "C. Đóng gói", "D. Lọc dữ liệu"],
            correctAnswer: 2
        },
        {
            question: "Câu hỏi 5: Kết nối mạng sử dụng các giao thức khác nhau bằng các:",
            choices: ["A. Bộ chuyển tiếp", "B. Cổng giao tiếp", "C. SONET", "D. Bộ định tuyến"],
            correctAnswer: 3
        },
        {
            question: "Câu hỏi 6: Nhược điểm của mạng dạng hình sao (Star) là:",
            choices: ["A. Khó cài đặt và bảo trì", "B. Khó khắc phục khi lỗi cáp xảy ra, và ảnh hưởng tới các nút mạng khác", "C. Cần quá nhiều cáp để kết nối tới nút mạng trung tâm", "D. Không có khả năng thay đổi khi đã lắp đặt"],
            correctAnswer: 2
        },
        {
            question: "Câu hỏi 7: Đặc điểm của mạng dạng Bus:",
            choices: ["A. Tất cả các nút mạng kết nối vào nút mạng trung tâm (ví dụ như Hub)", "B. Tất cả các nút kết nối trên cùng một đường truyền vật lý", "C. Tất cả các nút mạng đều kết nối trực tiếp với nhau", "D. Mỗi nút mạng kết nối với 2 nút mạng còn lại"],
            correctAnswer: 1
        },
        {
            question: "Câu hỏi 8: Trong kỹ thuật chuyển mạch kênh, trước khi trao đổi thông tin, hệ thống sẽ thiết lập kết nối giữa 2 thực thể bằng một:",
            choices: ["A. Đường truyền vật lý", "B. Kết nối ảo", "C. Đường ảo", "D. Đường truyền logic"],
            correctAnswer: 0
        },
        {
            question: "Câu hỏi 9: Kết nối liên mạng các mạng LAN, WAN, MAN độc lập với nhau bằng các thiết bị có chức năng:",
            choices: ["A. Kiểm soát lỗi, kiểm soát luồng", "B. Định tuyến", "C. Điều khiển liên kế", "D. Điều khiển lưu lượng và đồng bộ hoá"],
            correctAnswer: 1
        },
        {
            question: "Câu hỏi 10: Cáp UTP Cat5e sử dụng đầu nối:",
            choices: ["A. RJ - 58", "B. BNC", "C. RJ - 45", "D. ST"],
            correctAnswer: 2
        },
        {
            question: "Câu hỏi 11: Cáp UTP Cat 5 có bao nhiêu đôi cáp:",
            choices: ["A. 2", "B. 4", "C. 6", "D. 8"],
            correctAnswer: 1
        },
        {
            question: "Câu hỏi 12: Đặc điểm quan trọng của kiến trúc mạng client/server (khách/chủ):",
            choices: ["A. Client/server là kiến trúc phân cấp, client đóng vai trò yêu cầu và server đáp ứng lại các yêu cầu đó.", "B. Server là host luôn hoạt động, thường có IP cố định, có nhóm các server để chia sẻ công việc. Client có kết nối không liên tục, địa chỉ IP có thể thay đổi, truyền thông với server và thường không truyền thông trực tiếp với client khác.", "C. Câu A và B đều đúng", "D. Câu A và B đều sai"],
            correctAnswer: 2
        },
        {
            question: "Câu hỏi 13: Khẳng định nào sau đây là đúng khi nói về mạng có cấu trúc điểm- điểm:",
            choices: ["A. Mạng quảng bá", "B. Nối từng cặp node lại với nhau theo một hình học xác định", "C. Mạng lưu và chuyển tiếp (Store - and - Forward)", "D. Các node trung gian: tiếp nhận, lưu trữ tạm thời và gửi tiếp thông tin"],
            correctAnswer: 2
        },
        {
            question: "Câu hỏi 14: Khẳng định nào sau đây là đúng khi nói về nhược điểm của mạng có cấu trúc điểm-điểm:",
            choices: ["A. Khả năng đụng độ thông tin (collision) thấp", "B. Hiệu suất sử dụng đường truyền thấp, chiếm dụng nhiều tài nguyên", "C. Độ trễ lớn, tốn nhiều thời gian để thiết lập đường truyền và xử lý tại các node", "D. Tốc độ trao đổi thông tin thấp"],
            correctAnswer: 1
        },
        {
            question: "Câu hỏi 15: Khẳng định nào sau đây là đúng khi nói về đặc trưng của mạng quảng bá:",
            choices: ["A. Tất cả các node cùng truy nhập chung trên một đường truyền vật lý", "B. Nối từng cặp node lại với nhau theo một hình học xác định", "C. Các node trung gian: tiếp nhận, lưu trữ tạm thời và gửi tiếp thông tin", "D. Khả năng đụng độ thông tin (collision) thấp"],
            correctAnswer: 0
        },
        {
            question: "Câu hỏi 16: Khẳng định nào sau đây là đúng khi nói về mạng chuyển mạch kênh:",
            choices: ["A. Thiết lập liên kết vật lý, truyền dữ liệu và giải phóng liên kết giữa 2 thực thể", "B. Thiết lập liên kết logic, truyền dữ liệu và giải phóng liên kết giữa 2 thực thể", "C. Truyền dữ liệu giữa 2 thực thể", "D. Thiết lập liên kết và giải phóng liên kết giữa 2 thực thể"],
            correctAnswer: 0
        },
        {
            question: "Câu hỏi 17: Khẳng định nào sau đây là đúng khi nói về mạng chuyển mạch gói:",
            choices: ["A. Gói tin lưu chuyển trên các kết nối logic", "B. Gói tin lưu chuyển trên các kết nối vật lý", "C. Gói tin lưu chuyển độc lập hướng đích", "D. Gói tin lưu chuyển trên các kết nối logic hướng đích và trên một đường có thể có nhiều gói tin cùng lưu chuyển"],
            correctAnswer: 3
        },
        {
            question: "Câu hỏi 18: Khẳng định nào sau đây là đúng khi nói về quá trình phân mảnh gói tin:",
            choices: ["A. Làm giảm thời gian xử lý", "B. Làm tăng tính linh hoạt của mạng", "C. Ảnh hưởng đến tốc độ trao đổi dữ liệu trong mạng", "D. Tăng tốc độ trao đổi thông tin trong mạng"],
            correctAnswer: 3
        },
        {
            question: "Câu hỏi 19: Khẳng định nào sau đây là đúng khi nói về truyền dữ liệu theo phương thức hướng liên kết:",
            choices: ["A. Có độ tin cậy cao, đảm bảo chất lượng dịch vụ và có xác nhận", "B. Không cần độ tin cậy cao, chất lượng dịch vụ thấp", "C. Có xác nhận, không kiểm soát lỗi, kiểm soát luồng", "D. Độ tin cậy cao, không xác nhận"],
            correctAnswer: 0
        },
        {
            question: "Câu hỏi 20: Khẳng định nào sau đây là đúng nói về cấu trúc vật lý của mạng:",
            choices: ["A. Giao thức mạng (Protocol)", "B. Hình trạng mạng (Topology )", "C. Phương tiện truyền", "D. Các dịch vụ mạng"],
            correctAnswer: 1
        },

        
    ];

    function changeNavbarItemColor(questionIndex) {
        const navbarItems = document.querySelectorAll('.navbar-item');
        navbarItems.forEach((item, index) => {
            if (index === questionIndex) {
                item.style.backgroundColor = 'red';
                item.querySelector('a').style.color = 'white';
            }
        });
    }

    // Thêm sự kiện change cho tất cả các input trong các câu hỏi để lắng nghe sự kiện thay đổi
    function addChangeEventsToInputs() {
        const allInputs = document.querySelectorAll('input[type="radio"]');
        allInputs.forEach(input => {
            input.addEventListener('change', function() {
                // Lấy chỉ số của câu hỏi từ name của input
                const questionIndex = parseInt(this.name.split('-')[1]); // Lấy chỉ số từ name
                // Gọi hàm thay đổi màu cho navbar item tương ứng
                changeNavbarItemColor(questionIndex);
            });
        });
    }
    
    // Hiển thị tất cả câu hỏi
    function displayAllQuestions() {
        let navbarContent = '<table>'; // Nội dung cho navbar bên phải
        let questionsHTML = ''; // Nội dung cho tất cả câu hỏi

        examData.forEach((question, index) => {
            // Thêm mục vào navbar bên phải
            //navbarContent += `<div class="navbar-item"><a href="#question-${index + 1}">${index + 1}</a></div>`;
            if (index % 5 === 0) { // Mỗi hàng mới
                navbarContent += '<tr>';
            }
    
            // Thêm mục vào navbar bên phải
            navbarContent += `
                <td class="navbar-item">
                    <a href="#question-${index + 1}">${index + 1}</a>
                </td>
            `;
    
            if (index % 5 === 4 || index === examData.length - 1) { // Kết thúc hàng hoặc cuối danh sách
                navbarContent += '</tr>';
            }
            // Thêm câu hỏi vào container
            questionsHTML += `
                <div id="question-${index + 1}" class="question">
                    <p><strong>Câu hỏi ${index + 1}:</strong> ${question.question}</p>
                    <ul>
                        ${question.choices.map((choice, choiceIndex) => `
                            <li><input type="radio" name="choice-${index}" value="${choiceIndex}">${choice}</li>
                        `).join('')}
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

    let timeLimit = 2700;
    
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
