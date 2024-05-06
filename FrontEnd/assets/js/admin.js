document.addEventListener("DOMContentLoaded", function() {
    showInfoNotice("Ban dang dang nhap voi tu cach Quan tri vien");

    table1_data = [
        {
            id: 1, 
            tenkithi: 'Giua ki I 2022', 
            monthi: 'Lap trinh web',
            ngaythi: "23/8/2022",
            cathi: "18:00",
            socau: 50
        },
        {
            id: 2, 
            tenkithi: 'Cuoi ki I 2022', 
            monthi: 'Lich su dang',
            ngaythi: "23/12/2022",
            cathi: "18:00",
            socau: 50
        },
        {
            id: 3, 
            tenkithi: 'Giua ki II 2023', 
            monthi: 'Co so du lieu',
            ngaythi: "23/12/2023",
            cathi: "15:00",
            socau: 50
        }, 
        {
            id: 4, 
            tenkithi: 'Cuoi ki II 2023', 
            monthi: 'Mang may tinh',
            ngaythi: "23/12/2023",
            cathi: "18:00",
            socau: 50
        }
    ]

    table1_data.forEach(function(item, index) {
        console.log(index);
        var row = document.createElement('tr');
        row.id = `tbl1_row_${index}`;
        row.innerHTML = `
            <td class="text-start"><span>${item.id}</span></td>
            <td class="text-start">${item.tenkithi}</td>
            <td class="text-start">${item.monthi}</td>
            <td class="text-start">${item.ngaythi}</td>
            <td class="text-start">${item.cathi}</td>
            <td class="text-start">${item.socau}</td>
            <td class="text-center">
                <button type="submit" onclick="this.parentNode.parentNode.remove(); showSuccessNotice('Xoa thanh cong ki thi ${item.id}')" id="btn-del-${index}" class="btn btn--danger btn--size-s">Xoa</button>
                <a href="editExamForm.html" class="btn btn--warn btn--size-s">Sua</a>
            </td>
        `
        console.log(row);
        document.getElementById('tbody_tbl1').appendChild(row);
    })

    table2_data = [
        {
            masv: 'B21DCCN001',
            tenSv: 'Nguyen Van A',
            lop: 'D17CQCN01-N',
            ngaysinh: '12/12/2002',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN002',
            tenSv: 'Nguyen Van B',
            lop: 'D17CQCN01-N',
            ngaysinh: '12/12/2003',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN003',
            tenSv: 'Nguyen Manh D',
            lop: 'D17CQCN01-N',
            ngaysinh: '12/01/2003',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN004',
            tenSv: 'Chu Quang E',
            lop: 'D17CQCN01-N',
            ngaysinh: '12/02/2002',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN005',
            tenSv: 'Nguyen Van F',
            lop: 'D17CQCN01-N',
            ngaysinh: '16/12/2002',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN006',
            tenSv: 'Chu Dang G',
            lop: 'D17CQCN01-N',
            ngaysinh: '19/02/2002',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN007',
            tenSv: 'Nguyen Cong H',
            lop: 'D17CQCN01-N',
            ngaysinh: '12/12/2002',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN008',
            tenSv: 'Nguyen Van I',
            lop: 'D17CQCN01-N',
            ngaysinh: '12/12/2002',
            last: '19:00 18/12/2023'
        },
        {
            masv: 'B21DCCN009',
            tenSv: 'Nguyen Van L',
            lop: 'D17CQCN01-N',
            ngaysinh: '12/12/2002',
            last: '19:00 18/12/2023'
        }
    ]

    table2_data.forEach(item => {
        var row = document.createElement('tr');
        row.innerHTML = `
        <tr>
        <td class="text-start"><span>${item.masv}</span></td>
        <td class="text-start">${item.tenSv}</td>
        <td class="text-start">${item.lop}</td>
        <td class="text-start">${item.ngaysinh}</td>
        <td class="text-start">${item.last}</td>
        <td class="text-center">
            <button type="submit" onclick="this.parentNode.parentNode.remove(); showSuccessNotice('Xoa thanh cong sinh vien ${item.masv}')" class="btn btn--danger btn--size-s">Xoa</button>
            <a href="../DashboardAdmin/UserResult">
                <i class="fa-solid fa-address-card" style="margin-left:10px; color: #40A2D8"></i>
            </a>

        </td>
    </tr>
        `
        document.getElementById('tbody_tbl2').appendChild(row);

    })
    // charts create
    var data1 = {
        labels: ['0-3', '3-5', '5-7', '7-9', '9-10'],
        datasets: [{
            label: 'Số lượng ',
            backgroundColor: 'rgb(81, 130, 155)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [300, 400, 800, 289, 100],
        }]
    };

    // Thiết lập và vẽ biểu đồ cột
    var ctx01 = document.getElementById('myChart01').getContext('2d');
    var myChart01 = new Chart(ctx01, {
        type: 'bar',
        data: data1,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    var data2 = {
        labels: ['tham-gia', 'không tham gia'],
        datasets: [{
            label: 'Ti le',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [80, 20],

        }]
    };

    var ct2 = document.getElementById('myChart02').getContext('2d');
    var myChart2 = new Chart(ct2, {
        type: 'doughnut',
        data: data2,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Ti le tham gia thi'
                },
                
            }
        }
    });

    var data3 = {
        labels: [''],
        datasets: [{
            label: ['diem trung binh' ,''],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
              ],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [7.7,2.3],

        }]
    };

    var ct3 = document.getElementById('myChart03').getContext('2d');
    var myChart3 = new Chart(ct3, {
        type: 'doughnut',
        data: data3,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Điểm trung bình'
                }
            }
        }
    });


    document.getElementById('searchInput_01').addEventListener('keyup', function() {
        searchTable(this.value, 'tbody_tbl1');
    });
    document.getElementById('searchInput_02').addEventListener('keyup', function() {
        searchTable(this.value, 'tbody_tbl2');
    })
    
})
