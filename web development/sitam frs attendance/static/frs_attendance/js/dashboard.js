document.addEventListener('DOMContentLoaded', () => {
    const goBackBtn = document.getElementById('go-back');
    goBackBtn.addEventListener('click', () => {
        window.history.back();
    });
});

document.getElementById('load-data').addEventListener('click', function () {
    const date = document.getElementById('attendance-date').value;
    const branch = document.getElementById('branch').value;
    const batchYear = document.getElementById('batch').value;

    if (!date || !branch || !batchYear) {
        alert('Please select date, branch, and batch year.');
        return;
    }

    fetch(`/get-attendance-data/?date=${date}&branch=${branch}&batch_year=${batchYear}`)
    .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                // Update chart
                renderChart(data.present_count, data.absent_count);
            }
        })
        .catch(error => console.error('Error fetching attendance data:', error));
});

function renderChart(present, absent) {
    const ctx = document.getElementById('attendance-chart').getContext('2d');
    if (window.attendanceChart) {
        window.attendanceChart.destroy();
    }
    window.attendanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [present, absent],
                backgroundColor: ['#4CAF50', '#F44336'],
            }],
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        },
    });
}

document.getElementById('download-present').addEventListener('click', function () {
    const date = document.getElementById('attendance-date').value;
    const branch = document.getElementById('branch').value;
    const batch = document.getElementById('batch').value;

    if (!date || !branch || !batch) {
        alert('Please select a date, branch, and batch before downloading.');
        return;
    }

    const url = `/dashboard/download/presentees/?date=${date}&branch=${branch}&batch=${batch}`;
    window.location.href = url;
});

document.getElementById('download-absent').addEventListener('click', function () {
    const date = document.getElementById('attendance-date').value;
    const branch = document.getElementById('branch').value;
    const batch = document.getElementById('batch').value;

    if (!date || !branch || !batch) {
        alert('Please select a date, branch, and batch before downloading.');
        return;
    }

    const url = `/dashboard/download/absentees/?date=${date}&branch=${branch}&batch=${batch}`;
    window.location.href = url;
});

function downloadExcelFile(type) {
    const date = document.getElementById('attendance-date').value;
    const branch = document.getElementById('branch').value;

    if (!date || !branch) {
        alert('Please select both a date and a branch before downloading.');
        return;
    }

    const fileURL = `/dashboard/download/${type}/?date=${date}&branch=${branch}`;
    const link = document.createElement('a');
    link.href = fileURL;
    link.target = '_blank';
    link.click();
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const date = document.getElementById('attendance-date').value;
    const branch = document.getElementById('branch').value;

    if (!date || !branch) {
        alert('Please select both a date and a branch.');
        return;
    }

    fetchAttendanceData(date, branch);
});

function fetchAttendanceData(date, branch) {
    const presentees = Math.floor(Math.random() * 50) + 50;
    const absentees = 100 - presentees;

    renderChart(presentees, absentees);
}

function renderChart(present, absent) {
    const ctx = document.getElementById('attendance-chart').getContext('2d');
    if (window.attendanceChart) {
        window.attendanceChart.destroy();
    }
    window.attendanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Presentees', 'Absentees'],
            datasets: [{
                data: [present, absent],
                backgroundColor: ['#4CAF50', '#F44336'],
            }],
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        },
    });
}

document.getElementById('branch').addEventListener('change', function () {
    const branch = this.value;
    const batchSelect = document.getElementById('batch');

    if (!branch) {
        batchSelect.innerHTML = '<option value="">--Select Batch--</option>';
        return;
    }

    fetch(`/get_batches/?branch=${branch}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                batchSelect.innerHTML = '<option value="">--Select Batch--</option>';
                data.batches.forEach(batch => {
                    const option = document.createElement('option');
                    option.value = batch;
                    option.textContent = batch;
                    batchSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error fetching batches:', error));
});

function fetchAttendanceData(date, branch, batch) {
    const queryParams = new URLSearchParams({
        date: date,
        branch: branch,
        batch: batch || '',
    });

    fetch(`/dashboard/data/?${queryParams}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                renderChart(data.present_count, data.absent_count);
            }
        })
        .catch(error => console.error('Error fetching attendance data:', error));
}