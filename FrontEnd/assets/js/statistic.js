function renderExam(data){
    var row = document.createElement('tr');
        row.innerHTML = `
            <td class="text-center"><span>${data.id}</span></td>
            <td class="text-center">${data.username}</td>
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

function genChart(elementId, point, color, width = 250, height = 250) {
    var options = {
        series: [point/10*100],
        chart: {
            height: height,
            width: width,
            type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            show: true,
                        },
                        value: {
                            show: false,
                        },
                        total: {
                            show: true,
                            fontSize: '30px',
                            label: point.toString() + '/10'
                        }
                    }
                }
            },
            colors: [color],
        };

    var chart = new ApexCharts(document.getElementById(elementId), options);
    chart.render();
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const examId = urlParams.get('id');
    console.log(examId);
    getStatistic(examId, function(data) {
        const sortedScoreSpectrum = Object.fromEntries(Object.entries(data.scoreSpectrum).sort());
        keys = Object.keys(sortedScoreSpectrum);
        values = Object.values(sortedScoreSpectrum);
        var ctx = document.getElementById('score-spectrum-chart').getContext('2d');
        console.log(data)
            
        // Tạo một biểu đồ tròn mới
        var myChart = new Chart(ctx, {
            type: 'bar', // Loại biểu đồ là biểu đồ tròn
            data: {
                labels: keys,
                datasets: [{
                    label: "",
                    data: values, // Dữ liệu cho biểu đồ
                    backgroundColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true, // Đặt điểm bắt đầu trên trục y là 0
                            suggestedMin: 1, // Giá trị tối thiểu trên trục y
                            suggestedMax: 10, 
                            stepSize: 1 // Bước nhảy giữa các giá trị trên trục y là 1 (số nguyên)
                        }
                    }]
                },
                // Cấu hình thêm nếu cần
            }
        });
        genChart('min-score', data.minPoint, '#FF0000')
        genChart('max-score', data.maxPoint, '#00FF00')
        genChart('avg-score', data.avgPoint, '#0000FF', width=250, height=365)
        // document.getElementById("min-score").innerHTML = data.minPoint;
        // document.getElementById("max-score").innerHTML = data.maxPoint;
        document.getElementById("count-result").innerHTML = data.cnt;
    })

    getAllResultByExam(examId, renderExams);

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchValue = document.getElementById('search-input').value;
        console.log(searchValue);
        searchTable(searchValue, 'tbody_tbl1')
    })
    


})