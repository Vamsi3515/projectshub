let flag = 0;

document.addEventListener('DOMContentLoaded', function() {

    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');

    openBtn.addEventListener('click', function() {
        sidebar.style.transform = 'translateX(0)';
    });

    closeBtn.addEventListener('click', function() {
        sidebar.style.transform = 'translateX(-100%)';
    });

    const links = document.querySelectorAll('.sidebar-menu .sidebar-menu-li .sidebar-menu-a');
    const homeTab = document.getElementById('student-content');
    const notificationTab = document.getElementById('student-notifications');
    const profileSettingsTab = document.getElementById('student-setting');
    homeTab.style.display = 'block';
    notificationTab.style.display = 'none';
    profileSettingsTab.style.display = 'none';

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            links.forEach(l => l.parentElement.classList.remove('active_bar'));
            link.parentElement.classList.add('active_bar');
            if (link.classList.contains('sidebar_home')) {
                console.log(flag);
                if(flag == 1){
                    alert('Changes have made on your profile. Kindly refresh the page once.');
                    window.location.reload();
                    flag = 0;
                }
                homeTab.style.display = 'block';
                notificationTab.style.display = 'none';
                profileSettingsTab.style.display = 'none';
                document.querySelectorAll('.student-content-section').forEach(section => {
                    section.style.display = 'block';
                });
            } else if (link.classList.contains('sidebar_notifications')) {
                notificationTab.style.display = 'block';
                homeTab.style.display = 'none';
                profileSettingsTab.style.display = 'none';
                document.querySelectorAll('.student-content-section').forEach(section => {
                    section.style.display = 'none';
                });
            } else if (link.classList.contains('sidebar_profile_settings')) {
                profileSettingsTab.style.display = 'block';
                homeTab.style.display = 'none';
                notificationTab.style.display = 'none';
                document.querySelectorAll('.student-content-section').forEach(section => {
                    section.style.display = 'none';
                });
            }

            if (window.innerWidth <= 768) {
                sidebar.style.transform = 'translateX(-100%)';
            }
        });
    });

    // Main chart
    var ctx = document.getElementById('studyChart').getContext('2d');
    var percentage = parseFloat(document.getElementById('studyChart').dataset.percentage) || 0;

    var data = {
        datasets: [{
            data: [percentage, 100 - percentage],
            backgroundColor: ['#211D5A', '#FF183B'],
            borderWidth: 0,
        }],
        labels: [
            'Average Percentage',
            'Remaining'
        ]
    };

    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                        }
                    }
                },
                datalabels: {
                    display: false  
                }
            },
            cutout: '65%',
        },
        plugins: [{
            id: 'percentageLabel',
            beforeDraw: function(chart) {
                var ctx = chart.ctx;
                var centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                var centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                var radius = (chart.chartArea.bottom - chart.chartArea.top) / 2;

                ctx.save();
                ctx.font = 'bold 38px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#000';
                ctx.fillText(percentage.toFixed(2) + '%', centerX, centerY);
                ctx.restore();
            }
        }]
    });

    // Semester-wise charts CGPA
    document.querySelectorAll('.semester-wise-performance canvas').forEach(function(canvas) {
        var ctx1 = canvas.getContext('2d');
        var cgpa = parseFloat(canvas.dataset.studentcgpa) || 0;
        var charttitle = canvas.dataset.charttitle;
        let parts = charttitle.split('-');
        let semester = parts[1].trim(); 
        var maxCGPA = 10;
        var percentage = (cgpa / maxCGPA) * 100;
    
        console.log('Semester:', semester);
        console.log('Percentage:', percentage);
    
        var data1 = {
            datasets: [{
                data: [percentage, 100 - percentage],
                backgroundColor: ['#211D5A', '#FF183B'],
                borderWidth: 0,
            }],
            labels: [
                'CGPA',
                'Remaining'
            ]
        };
    
        new Chart(ctx1, {
            type: 'doughnut',
            data: data1,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: semester,
                        font: {
                            size: 20
                        },
                        padding: {
                            top: 10,
                            bottom: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                            }
                        }
                    },
                    datalabels: {
                        display: true
                    }
                },
                cutout: '80%', 
            },
            plugins: [{
                id: 'percentage1Label1',
                beforeDraw: function(chart) {
                    var ctx1 = chart.ctx;
                    var centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                    var centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
    
                    ctx1.save();
                    ctx1.font = 'bold 18px Arial';
                    ctx1.textAlign = 'center';
                    ctx1.textBaseline = 'middle';
                    ctx1.fillStyle = '#000';
                    ctx1.fillText(percentage.toFixed(2) + '%', centerX, centerY);
                    ctx1.restore();
                }
            }]
        });
    });
   
    if(document.querySelector('.certificates-achievements')){
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const wrapper = document.querySelector('.certificates-wrapper');
        const items = document.querySelectorAll('.certificate-item');
        let currentIndex = 0;
        let interval;
    
        const updateCarousel = () => {
            if(wrapper){
                wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        };
    
        const startSlideshow = () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            }, 3000);
        };
    
        const stopSlideshow = () => {
            clearInterval(interval);
        };
    
        if(prevBtn){
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateCarousel();
            });
        }
    
        if(nextBtn){
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCarousel();
            });
        }
    
        if(wrapper){
            wrapper.addEventListener('mouseover', stopSlideshow);
            wrapper.addEventListener('mouseleave', startSlideshow);
        }
    
        updateCarousel();
        startSlideshow();
    
    }

    const studentProfilePicUpdateBtn = document.querySelector('.stundent_profile_update_btn');
    studentProfilePicUpdateBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const studentProfileData = studentProfilePicUpdateBtn.dataset.imgupdate;
        console.log(studentProfileData);
        updateProfilePic(studentProfileData);
    });

    const editContactBtn = document.querySelector('#editContact-btn');
    editContactBtn.addEventListener('click', () => {
        updateStudentContact();
    });

    const removeResume = document.getElementById('remove_resume');
    const removeCv = document.getElementById('remove_cv');
    const removePortfolio = document.getElementById('remove_portfolio');

    const trashIconResume = document.querySelector('.trash_icon_resume');
    const trashIconCv = document.querySelector('.trash_icon_cv');
    const trashIconPortfolio= document.querySelector('.trash_icon_portfolio');

    trashIconResume.classList.add('bxs-trash-alt');
    trashIconResume.id = 'remove_resume';
    trashIconResume.title = 'delete resume';
    trashIconCv.classList.add('bxs-trash-alt');
    trashIconCv.id = 'remove_cv';
    trashIconCv.title = 'delete cv';
    trashIconPortfolio.classList.add('bxs-trash-alt');
    trashIconPortfolio.id = 'remove portfolio';
    trashIconPortfolio.title = 'delete portfolio';

    trashIconResume.style.display = 'none';
    trashIconCv.style.display = 'none';
    trashIconPortfolio.style.display = 'none';

    trashIconResume.addEventListener('click', () => {
        let removeResumeBtn;
        if(!removeResume){
            removeResumeBtn = false;
        }
        deleteDocPopUp('resume', trashIconResume, removeResumeBtn);
    });

    trashIconCv.addEventListener('click', () => {
        let removeCvBtn;
        if(!removeCv){
            removeCvBtn = false;
        }
        deleteDocPopUp('cv', trashIconCv, removeCvBtn);
    });

    const portfolioFileInput = document.getElementById('portfolio-upload-file');
    const resumeFileInput = document.getElementById('resume-upload');
    const cvFileInput = document.getElementById('cv-upload');
    const portfolioUrlInput = document.getElementById('portfolio-upload-link');
    const portfolioLabel = document.querySelector('.custom-file-label-portfolio');
    const resumeMsg = document.querySelector('.resume-upload-msg');
    const cvMsg = document.querySelector('.cv-upload-msg');
    const portfolioMsg = document.querySelector('.portfolio-upload-msg');

    portfolioLabel.addEventListener('click', () => {
        portfolioFileInput.click();
    });

    resumeFileInput.addEventListener('change', () => {
        resumeMsg.innerHTML = "Resume Uploaded Successfully";
        resumeMsg.style.color = 'green';
    });

    cvFileInput.addEventListener('change', () => {
        cvMsg.innerHTML = "CV Uploaded Successfully";
        cvMsg.style.color = 'green';
    });

    portfolioFileInput.addEventListener('change', () => {
        portfolioMsg.innerHTML = "Portfolio Uploaded Successfully";
        portfolioMsg.style.color = 'green';
        if (portfolioFileInput.files.length > 0) {
            portfolioUrlInput.value = '';
        }
    });

    portfolioUrlInput.addEventListener('input', () => {
        if(portfolioMsg.innerHTML !== ""){
            portfolioMsg.innerHTML = "File Removed";
        }
        portfolioMsg.style.color = 'red';
        if (portfolioUrlInput.value.trim() !== '') {
            portfolioFileInput.value = '';
        }
    });

    document.getElementById('resume-upload-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = document.getElementById('resume-upload-form');
        const formData = new FormData(form);
        const csrfToken = getCookie('csrftoken');
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                flag = 1;
                alert(data.success);
                resumeMsg.innerHTML = "";
                document.querySelector('.resume-upload-label').innerHTML = 'Update Resume';
                if(document.querySelector('.resume-download-btn')){ document.querySelector('.resume-download-btn').style.display='block';}
                document.querySelector('.no-resume-msg').style.display = 'None';
                if(!removeResume){
                    trashIconResume.style.display = 'block';
                }
            } else if (data.error) {
                alert(data.error);
                resumeMsg.innerHTML = "";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the resume.');
        });
    });    

    document.getElementById('cv-upload-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = document.getElementById('cv-upload-form');
        const formData = new FormData(form);
        const csrfToken = getCookie('csrftoken');
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                flag = 1;
                alert(data.success);
                cvMsg.innerHTML = "";
                document.querySelector('.cv-upload-label').innerHTML = 'Update CV';
                if(document.querySelector('.cv-download-btn')){ document.querySelector('.cv-download-btn').style.display='block';}
                document.querySelector('.no-cv-msg').style.display = 'None';
                trashIconCv.style.display = 'block';
            } else if (data.error) {
                alert(data.error);
                cvMsg.innerHTML = "";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the cv.');
        });
    });    

    document.getElementById('portfolio-upload-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = document.getElementById('portfolio-upload-form');
        const formData = new FormData(form);
        const csrfToken = getCookie('csrftoken');
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                flag = 1;
                alert(data.success);
                portfolioMsg.innerHTML = "";
                portfolioUrlInput.value = '';
                portfolioFileInput.value = '';
                document.querySelector('.custom-file-label-portfolio').innerHTML = 'Update Portfolio';
                document.querySelector('#portfolio-section-div').style.display = 'block';
                if(!removePortfolio){
                    trashIconPortfolio.style.display = 'block';
                }
            } else if (data.error) {
                alert(data.error);
                portfolioMsg.innerHTML = "";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while updating the portfolio.');
        });
    });
    
    if(removeResume){
        removeResume.addEventListener('click', () => {
            deleteDocPopUp('resume', trashIconResume, removeResume);
        });
    }
    
    if(removeCv){
        removeCv.addEventListener('click', () => {
            deleteDocPopUp('cv', trashIconCv, removeCv);
        });
    }
    
    if(removePortfolio){
        removePortfolio.addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you really want to delete your portfolio?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const docName = 'portfolio';
                    removeStudentDocs(docName)
                        .then(res => {
                            if (res) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your portfolio has been deleted.',
                                    'success'
                                );
                                document.querySelector('.custom-file-label-portfolio').innerHTML = 'Upload Portfolio';   
                                document.querySelector('#portfolio-section-div').style.display = 'none';
                                trashIconPortfolio.style.display = 'none';
                            } else {
                                Swal.fire(
                                    'Failed!',
                                    'An error occurred while deleting your portfolio. Please try again.',
                                    'error'
                                );
                            }
                        });
                }
            });
        });    
    }

    const addCertificateBtn = document.getElementById('add_certificate');
    const certificateUpdateContainer = document.querySelector('.certificates-updates-container');
    const certificateBlock = document.querySelector('.certificate-update-block');
    if (certificateBlock) {
        certificateUpdateContainer.style.alignItems = 'flex-end';

    } else {
        certificateUpdateContainer.style.alignItems = 'center';
    }

    addCertificateBtn.addEventListener('click', (event) => {
        event.preventDefault();
        addStudentCertificate();
    });

    const deleteCertificateBtn = document.querySelectorAll('.certificate_delete');

    deleteCertificateBtn.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const certificateId = btn.getAttribute('data-certificate-id');
            deleteCertificate(certificateId);
        })
    });

    const addProjectBtn = document.getElementById('add_project');
    const projectUpdateContainer = document.querySelector('.projects-updates-container');
    const projectBlock = document.querySelector('.project-update-block');
    if (projectBlock) {
        projectUpdateContainer.style.alignItems = 'flex-end';

    } else {
        projectUpdateContainer.style.alignItems = 'center';
    }

    addProjectBtn.addEventListener('click', (event) => {
        event.preventDefault();
        addStudentProject();
    });
    
    const deleteProjectIcons = document.querySelectorAll('.project_delete');
    deleteProjectIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.preventDefault();
            const projectId = icon.getAttribute('data-project-id');
            deleteProject(projectId);
        });
    });


    const addActivityBtn = document.getElementById('add_activity');
    const activityUpdateContainer = document.querySelector('.activity-updates-container');
    const activityBlock = document.querySelector('.activity-update-block');
    if (activityBlock) {
        activityUpdateContainer.style.alignItems = 'flex-end';

    } else {
        activityUpdateContainer.style.alignItems = 'center';
    }

    addActivityBtn.addEventListener('click', (event) => {
        event.preventDefault();
        addStudentActivity();
    });

    const deleteActivityIcons = document.querySelectorAll('.activity_delete');
    const activityImages = document.querySelectorAll('.activity-image');

    deleteActivityIcons.forEach(icon => {
        icon.style.display = 'none';
    });

    deleteActivityIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            event.preventDefault();
            const activityId = icon.getAttribute('data-activity-id');
            deleteActivity(activityId);
        });
    });

    const activityBlocks = document.querySelectorAll('.activity-update-block');
    activityBlocks.forEach(block => {
        const deleteIcon = block.querySelector('.activity_delete');
        const activityImage = block.querySelector('.activity-image');

        block.addEventListener('mouseenter', () => {
            deleteIcon.style.display = 'block';
            deleteIcon.style.cursor = 'pointer';
            deleteIcon.title = 'delete';
        });

        block.addEventListener('mouseleave', () => {
            deleteIcon.style.display = 'none';
        });
    });

    const changePw = document.getElementById('changepw-btn');
    changePw.addEventListener('click', (event) => {
        event.preventDefault();
        updateStudentPassword();
    })
    
});

async function updateProfilePic(studentProfileData) {

    const csrfToken = getCookie('csrftoken');
    
    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.zIndex = '1000';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';

    const popupForm = document.createElement('div');
    popupForm.style.background = '#fff';
    popupForm.style.padding = '20px';
    popupForm.style.borderRadius = '8px';
    popupForm.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupForm.style.textAlign = 'center';
    popupForm.style.width = 'auto';
    popupForm.style.height = '50%';
    popupForm.style.display = 'flex';
    popupForm.style.flexDirection = 'column';
    popupForm.style.justifyContent = 'center';
    popupForm.style.alignItems = 'center';
    popupForm.classList.add("popUpFormProfile");
    
    const imgPreview = document.createElement('img');
    imgPreview.classList.add("previewProfile");
    imgPreview.src = studentProfileData;
    imgPreview.alt = 'Profile Preview';
    imgPreview.style.width = '150px';
    imgPreview.style.height = '150px';
    imgPreview.style.borderRadius = '50%';
    imgPreview.style.objectFit = 'cover';
    popupForm.appendChild(imgPreview);

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.classList.add("profileFileInput");
    popupForm.appendChild(fileInput);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add("profileUpdate");
    updateButton.style.marginTop = '10px';
    updateButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('csrfmiddlewaretoken', csrfToken);

            fetch(`/student/profile/image/update`, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrfToken,
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Profile picture updated successfully.');
                    const profileImgElementSidebar = document.querySelector('.student-profile img');
                    const profileImgElementSettings = document.querySelector('.student-profile-pic-update img');

                    const newImageURL = URL.createObjectURL(file);
                    profileImgElementSidebar.src = newImageURL;
                    profileImgElementSettings.src = newImageURL;
                    imgPreview.src = newImageURL;

                    console.log("New : ", newImageURL);
                    console.log("Old : ", studentProfileData);
                    console.log("File : ", file);
                    
                } else {
                    alert('Failed to update profile picture.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating profile picture.');
            });
        } else {
            alert('Please select an image to upload.');
        }
        popupOverlay.remove();
    });
    popupForm.appendChild(updateButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add("profileUpdateCancel");
    cancelButton.style.marginTop = '10px';
    cancelButton.addEventListener('click', () => {
        popupOverlay.remove();
    });
    popupForm.appendChild(cancelButton);
    popupOverlay.appendChild(popupForm);
    document.body.appendChild(popupOverlay);
}

function updateStudentContact() {
    const parentProfile = document.querySelector('#student-profile_settings');
    const csrfToken = getCookie('csrftoken');
    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.zIndex = '1000';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';

    parentProfile.appendChild(popupOverlay);

    const popupForm = document.createElement('form');
    popupForm.setAttribute('method', 'post');
    popupForm.setAttribute('enctype', 'multipart/form-data');
    popupForm.id = 'popupForm';
    popupForm.style.zIndex = '2000';
    popupForm.style.background = '#fff';
    popupForm.style.padding = '20px';
    popupForm.style.borderRadius = '8px';
    popupForm.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupForm.style.textAlign = 'center';
    popupForm.style.width = '50%';
    popupForm.style.height = '50%';
    popupForm.style.display = 'flex';
    popupForm.style.flexDirection = 'column';
    popupForm.style.justifyContent = 'center';
    popupForm.style.alignItems = 'center';

    const emailInput = document.createElement('input');
    const phoneInput = document.createElement('input');
    const linkedinInput = document.createElement('input');
    const githubInput = document.createElement('input');

    emailInput.type = 'email';
    phoneInput.type = 'text';
    linkedinInput.type = 'text';
    githubInput.type = 'text';

    emailInput.name = 'email';
    phoneInput.name = 'phone';
    linkedinInput.name = 'linkedin';
    githubInput.name = 'github';

    emailInput.classList.add("emailContactInput");
    phoneInput.classList.add("phoneContactInput");
    linkedinInput.classList.add("linkedinContactInput");
    githubInput.classList.add("githubContactInput");

    popupForm.appendChild(emailInput);
    popupForm.appendChild(phoneInput);
    popupForm.appendChild(linkedinInput);
    popupForm.appendChild(githubInput);

    popupOverlay.appendChild(popupForm);

    emailInput.value = document.querySelector('#studentEmail').textContent;
    phoneInput.value = document.querySelector('#studentNumber').textContent.split(' ')[1];
    linkedinInput.value = document.querySelector('#studentLinkedin').textContent;
    githubInput.value = document.querySelector('#studentGithub').textContent;

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add("profileUpdate");
    updateButton.style.marginTop = '10px';
    updateButton.addEventListener('click', (event) => {
        event.preventDefault();

        const formData = new FormData(popupForm);
        formData.append('csrfmiddlewaretoken', csrfToken);

        fetch(`/student/contact/update`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Profile updated successfully.');
                document.querySelector('#studentEmail').textContent = emailInput.value;
                document.querySelector('#studentNumber').textContent.split(' ')[1] = phoneInput.value;
                document.querySelector('#studentLinkedin').textContent = linkedinInput.value;
                document.querySelector('#studentGithub').textContent = githubInput.value;

                document.querySelector('.student-email').innerHTML = emailInput.value;
                document.querySelector('.student-phone').innerHTML = "+91 " + phoneInput.value;
                document.querySelector('.student-linkedin').innerHTML = linkedinInput.value;
                document.querySelector('.student-github').innerHTML = githubInput.value;
                popupOverlay.remove();
            } else {
                alert('Failed to update profile.');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    popupForm.appendChild(updateButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add("contactUpdateCancel");
    cancelButton.style.marginTop = '10px';
    cancelButton.addEventListener('click', () => {
        popupOverlay.remove();
    });

    popupForm.appendChild(cancelButton);
}

async function getStudentInfo(){
    try {
        const response = await fetch('/student/request');
        const data = await response.json();
        const student_id = data.studentId;
        const student_pic = data.student_pic;
        console.log("StudentId: ", student_id);
        console.log("StudentPic: ", student_pic);
        const studentInfo = {
            'student_id' : student_id,
            'student_pic' : student_pic,
        }
        return studentInfo;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function removeStudentDocs(docName) {
    const csrfToken = getCookie('csrftoken');
    let url = `/student/${docName}/remove`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => response.json())
    .then(msg => {
        if (msg.success) {
            flag = 1;
            console.log(msg.success);
            return true; 
        } else {
            console.log(msg.error);
            return false; 
        }
    })
    .catch(error => {
        console.log(error);
        return false; 
    });
}

function deleteDocPopUp(docname, trashIcon, removeIcon){
    Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to delete your ${docname}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const docName = docname;
            removeStudentDocs(docName)
                .then(res => {
                    if (res) {
                        Swal.fire(
                            'Deleted!',
                            `Your ${docname} has been deleted.`,
                            'success'
                        );
                        document.querySelector(`.${docname}-upload-label`).innerHTML = `Upload ${docname}`;
                        if(document.querySelector(`.${docname}-download-btn`)){ document.querySelector(`.${docname}-download-btn`).style.display='None';}
                        document.querySelector(`.no-${docname}-msg`).innerHTML = `No ${docname} uploaded`;
                        trashIcon.style.display = 'none';
                        if(removeIcon){
                            removeIcon.style.display = 'none';
                        }
                    } else {
                        Swal.fire(
                            'Failed!',
                            `An error occurred while deleting your ${docname}. Please try again.`,
                            'error'
                        );
                    }
                });
        }
    });
}


function addStudentCertificate() {
    const parentProfile = document.querySelector('#student-profile_settings');
    const csrfToken = getCookie('csrftoken');
    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.zIndex = '1000';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';

    parentProfile.appendChild(popupOverlay);

    const popupForm = document.createElement('form');
    popupForm.setAttribute('method', 'post');
    popupForm.setAttribute('enctype', 'multipart/form-data');
    popupForm.id = 'popupForm';
    popupForm.style.zIndex = '2000';
    popupForm.style.background = '#fff';
    popupForm.style.padding = '30px';
    popupForm.style.borderRadius = '8px';
    popupForm.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupForm.style.textAlign = 'center';
    popupForm.style.width = 'auto';
    popupForm.style.height = '50%';
    popupForm.style.display = 'flex';
    popupForm.style.flexDirection = 'column';
    popupForm.style.justifyContent = 'center';
    popupForm.style.alignItems = 'center';
    popupForm.classList = 'certificateForm';

    const certificateName = document.createElement('input');
    const certificateImg = document.createElement('input');

    certificateName.type = 'text';
    certificateName.required = true;
    certificateImg.type = 'file';
    certificateImg.accept = 'image/*';
    certificateImg.required = true;

    certificateName.name = 'certificate-name';
    certificateImg.name = 'certificate-img';

    certificateName.classList.add("certificateNameInput");
    certificateImg.classList.add("certificateImgFile");

    certificateName.placeholder = 'Name';
    certificateName.style.border = '1px solid black';
    certificateName.style.padding = '10px';
    certificateName.style.width = '100%';
    certificateName.style.height = '5vh';
    certificateName.style.margin = '15px 5px';
    certificateImg.style.marginBottom = '25px';

    popupForm.appendChild(certificateName);
    popupForm.appendChild(certificateImg);

    popupOverlay.appendChild(popupForm);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add("certificatesave");
    saveButton.style.marginTop = '10px';

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (!certificateName.value || certificateImg.files.length === 0) {
            Swal.fire('Failed!', 'Both name and image are required', 'error');
            return;
        }

        const formData = new FormData(popupForm);
        formData.append('csrfmiddlewaretoken', csrfToken);

        fetch(`/student/certificate/add`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                flag = 1;
                console.log("certificate id :", data.certificate_id);
                Swal.fire('Added!', data.success, 'success');

                const newCertificateBlock = document.createElement('div');
                newCertificateBlock.classList.add('certificate-update-block');
                newCertificateBlock.id = `certificate-${data.certificate_id}`;

                const certificateInfo = document.createElement('div');
                certificateInfo.classList.add('certificate-info');

                const newCertificateName = document.createElement('p');
                newCertificateName.id = 'certificate_name';
                newCertificateName.textContent = certificateName.value;

                certificateInfo.appendChild(newCertificateName);
                newCertificateBlock.appendChild(certificateInfo);

                const certificateActions = document.createElement('div');
                certificateActions.classList.add('certificate-actions');
                certificateActions.classList.add('place-row');

                const viewBtn = document.createElement('button');
                viewBtn.id = 'certificate_view_btn';

                const viewLink = document.createElement('a');

                viewIcon = document.createElement('i');
                viewIcon.classList.add('fa', 'fa-eye');
                viewLink.appendChild(viewIcon);
                viewLink.href = URL.createObjectURL(certificateImg.files[0]);
                viewLink.target = 'blank';
                viewBtn.style.marginRight = '18px';
                viewBtn.style.backgroundColor = 'white';

                viewBtn.appendChild(viewLink);

                const deleteDiv = document.createElement('div');
                deleteDiv.classList.add('certificate_delete');
                deleteDiv.dataset.certificate_id = data.certificate_id;
                deleteDiv.style.marginRight = '1px';
                deleteDiv.style.backgroundColor = 'white';

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('bx', 'bxs-trash-alt');

                deleteBtn.style.backgroundColor = 'white';

                deleteDiv.appendChild(deleteBtn);
                certificateActions.appendChild(viewBtn);
                certificateActions.appendChild(deleteDiv);

                newCertificateBlock.appendChild(certificateActions);

                deleteDiv.addEventListener('click', () => {
                    console.log(`Delete ${certificateName.value}`);
                    deleteCertificate(data.certificate_id);
                });

                const container = document.querySelector('.dynamic-certificate-block');
                container.appendChild(newCertificateBlock);

                popupOverlay.remove();
            } else {
                Swal.fire('Failed!', data.error, 'error');
            }
        })
        .catch(error => {
            Swal.fire('Failed!', 'An unexpected error occurred. Please try again.', 'error');
            console.error('Error:', error);
        });
    });

    popupForm.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add("addCertificateCancel");
    cancelButton.style.marginTop = '10px';
    cancelButton.addEventListener('click', () => {
        popupOverlay.remove();
    });

    popupForm.appendChild(cancelButton);
}

function deleteCertificate(certificateId) {
    flag = 1;
    console.log("Inside function :",certificateId);
    console.log(certificateId);
    const csrfToken = getCookie('csrftoken');  

    fetch(`/student/certificate/delete/${certificateId}`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log('Fetch response:', response);
        return response.json();
    })
    .then(data => {
        if (data.success) {
            flag = 1;
            document.getElementById(`certificate-${certificateId}`).remove();
            Swal.fire('Deleted!', 'The certificate has been deleted.', 'success');
        } else {
            Swal.fire('Failed!', 'Error deleting the certificate.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Failed!', 'An unexpected error occurred.', 'error');
    });
}

function addStudentProject() {
    const parentProfile = document.querySelector('#student-profile_settings');
    const csrfToken = getCookie('csrftoken');
    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.zIndex = '1000';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';

    parentProfile.appendChild(popupOverlay);

    const popupForm = document.createElement('form');
    popupForm.setAttribute('method', 'post');
    popupForm.setAttribute('enctype', 'multipart/form-data');
    popupForm.id = 'popupForm';
    popupForm.style.zIndex = '2000';
    popupForm.style.background = '#fff';
    popupForm.style.padding = '30px';
    popupForm.style.borderRadius = '8px';
    popupForm.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupForm.style.textAlign = 'center';
    popupForm.style.width = 'auto';
    popupForm.style.height = '50%';
    popupForm.style.display = 'flex';
    popupForm.style.flexDirection = 'column';
    popupForm.style.justifyContent = 'center';
    popupForm.style.alignItems = 'center';
    popupForm.classList = 'certificateForm';

    const projectName = document.createElement('input');
    const projectLink = document.createElement('input');
    const projectImg = document.createElement('input');

    projectName.type = 'text';
    projectName.required = true;
    projectLink.type = 'text';
    projectLink.required = true;
    projectImg.type = 'file';
    projectImg.accept = 'image/*';
    projectImg.required = true;

    projectName.name = 'project-name';
    projectLink.name = 'project-link';
    projectImg.name = 'project-img';

    projectName.classList.add("projectNameInput");
    projectLink.classList.add("projectLinkInput");
    projectImg.classList.add("projectImgFile");

    projectName.placeholder = 'Project Name';
    projectName.style.border = '1px solid black';
    projectName.style.padding = '10px';
    projectName.style.width = '100%';
    projectName.style.height = '5vh';
    projectName.style.margin = '15px 5px';
    projectLink.placeholder = 'Paste project url here';
    projectLink.style.border = '1px solid black';
    projectLink.style.padding = '10px';
    projectLink.style.width = '100%';
    projectLink.style.height = '5vh';
    projectLink.style.margin = '15px 5px';
    projectImg.style.marginBottom = '25px';

    popupForm.appendChild(projectName);
    popupForm.appendChild(projectLink);
    popupForm.appendChild(projectImg);

    popupOverlay.appendChild(popupForm);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add("projectSave");
    saveButton.style.marginTop = '10px';

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (!(projectName.value || projectLink.value || projectImg.files.length === 0)) {
            Swal.fire('Failed!', 'All fields are required', 'error');
            return;
        }

        const formData = new FormData(popupForm);
        formData.append('csrfmiddlewaretoken', csrfToken);

        fetch(`/student/project/add`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                flag = 1;
                console.log("project id :", data.project_id);
                Swal.fire('Added!', data.success, 'success');

                console.log("This is dynamic block .");
                const newProjectBlock = document.createElement('div');
                newProjectBlock.classList.add('project-update-block');
                newProjectBlock.id = `project-${data.project_id}`;

                const projectInfo = document.createElement('div');
                projectInfo.classList.add('project-info');

                const newProjectName = document.createElement('p');
                newProjectName.id = 'project_name';
                newProjectName.textContent = projectName.value;

                projectInfo.appendChild(newProjectName);
                newProjectBlock.appendChild(projectInfo);

                const projectActions = document.createElement('div');
                projectActions.classList.add('project-actions');
                projectActions.classList.add('place-row');

                // const editBtn = document.createElement('button');
                // editBtn.id = 'project_view_btn';

                // const editLink = document.createElement('a');

                // editIcon = document.createElement('i');
                // editIcon.classList.add('bx', 'bxs-edit-alt');
                // editIcon.style.color = '#44B644';
                // editLink.appendChild(editIcon);
                // editLink.href = URL.createObjectURL(projectImg.files[0]);
                // editBtn.style.marginRight = '18px';
                // editBtn.style.backgroundColor = 'white';

                // editBtn.appendChild(editLink);

                const deleteDiv = document.createElement('div');
                deleteDiv.classList.add('project_delete');
                deleteDiv.dataset.project_id = data.project_id;
                deleteDiv.style.marginRight = '1px';
                deleteDiv.style.backgroundColor = 'white';

                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('bx', 'bxs-trash-alt');
                deleteBtn.style.color = 'red';

                deleteBtn.style.backgroundColor = 'white';

                deleteDiv.appendChild(deleteBtn);
                // projectActions.appendChild(editBtn);
                projectActions.appendChild(deleteDiv);

                newProjectBlock.appendChild(projectActions);

                deleteDiv.addEventListener('click', () => {
                    console.log(`Delete ${projectName.value}`);
                    deleteProject(data.project_id);
                });

                const container = document.querySelector('.dynamic-project-block');
                container.appendChild(newProjectBlock);

                popupOverlay.remove();
            } else {
                Swal.fire('Failed!', data.error, 'error');
            }
        })
        .catch(error => {
            Swal.fire('Failed!', 'An unexpected error occurred. Please try again.', 'error');
            console.error('Error:', error);
        });
    });

    popupForm.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add("addProjectCancel");
    cancelButton.style.marginTop = '10px';
    cancelButton.addEventListener('click', () => {
        popupOverlay.remove();
    });

    popupForm.appendChild(cancelButton);
}

function deleteProject(projectId) {
    console.log(projectId);
    const csrfToken = getCookie('csrftoken'); 

    fetch(`/student/project/delete/${projectId}`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log('Fetch response:', response);
        return response.json();
    })
    .then(data => {
        if (data.success) {
            flag = 1;
            document.getElementById(`project-${projectId}`).remove();
            Swal.fire('Deleted!', 'The project has been deleted.', 'success');
        } else {
            Swal.fire('Failed!', 'Error deleting the project.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Failed!', 'An unexpected error occurred.', 'error');
    });
}

function addStudentActivity() {
    const parentProfile = document.querySelector('#student-profile_settings');
    const csrfToken = getCookie('csrftoken');
    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.zIndex = '1000';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';

    parentProfile.appendChild(popupOverlay);

    const popupForm = document.createElement('form');
    popupForm.setAttribute('method', 'post');
    popupForm.setAttribute('enctype', 'multipart/form-data');
    popupForm.id = 'popupForm';
    popupForm.style.zIndex = '2000';
    popupForm.style.background = '#fff';
    popupForm.style.padding = '30px';
    popupForm.style.borderRadius = '8px';
    popupForm.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupForm.style.textAlign = 'center';
    popupForm.style.width = 'auto';
    popupForm.style.height = '50%';
    popupForm.style.display = 'flex';
    popupForm.style.flexDirection = 'column';
    popupForm.style.justifyContent = 'center';
    popupForm.style.alignItems = 'center';
    popupForm.classList = 'certificateForm';

    const activityName = document.createElement('input');
    const activityImg = document.createElement('input');

    activityName.type = 'text';
    activityName.required = true;
    activityImg.type = 'file';
    activityImg.accept = 'image/*';
    activityImg.required = true;

    activityName.name = 'activity-name';
    activityImg.name = 'activity-img';

    activityName.classList.add("activityNameInput");
    activityImg.classList.add("activityImgFile");

    activityName.placeholder = 'Activity Name';
    activityName.style.border = '1px solid black';
    activityName.style.padding = '10px';
    activityName.style.width = '100%';
    activityName.style.height = '5vh';
    activityName.style.margin = '15px 5px';
    activityImg.style.marginBottom = '25px';

    popupForm.appendChild(activityName);
    popupForm.appendChild(activityImg);

    popupOverlay.appendChild(popupForm);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add("activitySave");
    saveButton.style.marginTop = '10px';

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (!(activityName.value || activityImg.files.length === 0)) {
            Swal.fire('Failed!', 'All fields are required', 'error');
            return;
        }

        const formData = new FormData(popupForm);
        formData.append('csrfmiddlewaretoken', csrfToken);

        fetch(`/student/activity/add`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                flag = 1;
                console.log("activity id :", data.activity_id);
                Swal.fire('Added!', data.success, 'success');

                const newActivityBlock = document.createElement('div');
                newActivityBlock.classList.add('activity-update-block');
                newActivityBlock.id = `activity-${data.activity_id}`;
                newActivityBlock.title = activityName.value;

                const newActivityImage = document.createElement('img');
                newActivityImage.classList.add('activity-image');
                newActivityImage.alt = activityName.value;
                newActivityImage.src = URL.createObjectURL(activityImg.files[0]);

                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('bx', 'bxs-message-square-x', 'activity_delete');
                deleteIcon.dataset.activityId = data.activity_id;
                deleteIcon.style.display = 'none';
                deleteIcon.style.cursor = 'pointer';
                deleteIcon.title = 'delete ' + activityName.value;

                newActivityBlock.appendChild(newActivityImage);
                newActivityBlock.appendChild(deleteIcon);

                const parentElement = document.querySelector('.dynamic-activity-block');
                parentElement.insertBefore(newActivityBlock, parentElement.firstChild);

                newActivityBlock.addEventListener('mouseenter', () => {
                    deleteIcon.style.display = 'block';
                });
        
                deleteIcon.addEventListener('click', (event) => {
                    event.preventDefault();
                    deleteActivity(data.activity_id);
                })

                newActivityBlock.addEventListener('mouseleave', () => {
                    deleteIcon.style.display = 'none';
                });

                popupOverlay.remove();
            } else {
                Swal.fire('Failed!', data.error, 'error');
            }
        })
        .catch(error => {
            Swal.fire('Failed!', 'An unexpected error occurred. Please try again.', 'error');
            console.error('Error:', error);
        });
    });

    popupForm.appendChild(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add("addProjectCancel");
    cancelButton.style.marginTop = '10px';
    cancelButton.addEventListener('click', () => {
        popupOverlay.remove();
    });

    popupForm.appendChild(cancelButton);
}

function deleteActivity(activityId) {
    console.log('Activity ID to delete:', activityId);
    const csrfToken = getCookie('csrftoken');

    fetch(`/student/activity/delete/${activityId}`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log('Fetch response:', response);
        return response.json();
    })
    .then(data => {
        if (data.success) {
            const activityBlock = document.getElementById(`activity-${activityId}`);
            if (activityBlock) {
                activityBlock.remove();
            }

            Swal.fire('Deleted!', 'The Activity Image has been deleted.', 'success');
        } else {
            Swal.fire('Failed!', data.error || 'Error deleting the activity.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Failed!', 'An unexpected error occurred.', 'error');
    });
}

function updateStudentPassword(){
    const csrfToken = getCookie('csrftoken');

    const popupOverlay = document.createElement('div');
    popupOverlay.style.position = 'fixed';
    popupOverlay.style.top = '0';
    popupOverlay.style.left = '0';
    popupOverlay.style.width = '100%';
    popupOverlay.style.height = '100%';
    popupOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
    popupOverlay.style.zIndex = '1000';
    popupOverlay.style.display = 'flex';
    popupOverlay.style.justifyContent = 'center';
    popupOverlay.style.alignItems = 'center';

    const popupForm = document.createElement('div');
    popupForm.style.background = '#fff';
    popupForm.style.padding = '20px';
    popupForm.style.borderRadius = '8px';
    popupForm.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    popupForm.style.textAlign = 'center';
    popupForm.style.width = 'auto';
    popupForm.style.height = '50%';
    popupForm.style.display = 'flex';
    popupForm.style.flexDirection = 'column';
    popupForm.style.justifyContent = 'center';
    popupForm.style.alignItems = 'center';
    popupForm.classList.add("popUpFormProfile");

    const oldPassword = document.createElement('input');
    oldPassword.type = 'password';
    oldPassword.required = true;
    oldPassword.placeholder = 'Old Password';
    oldPassword.classList.add("old_password");
    popupForm.appendChild(oldPassword);

    const newPassword = document.createElement('input');
    newPassword.type = 'password';
    newPassword.required = true;
    newPassword.placeholder = 'New Password';
    newPassword.classList.add("new_password");
    popupForm.appendChild(newPassword);

    const confirmPassword = document.createElement('input');
    confirmPassword.type = 'password';
    confirmPassword.required = true;
    confirmPassword.placeholder = 'Confirm Password';
    confirmPassword.classList.add("confirm_password");
    popupForm.appendChild(confirmPassword);

    const updateButton = document.createElement('input');
    updateButton.textContent = 'Update';
    updateButton.type = 'submit'
    updateButton.classList.add("passwordUpdate");
    updateButton.style.marginTop = '10px';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add("passwordUpdateCancel");
    cancelButton.style.marginTop = '10px';

    popupForm.appendChild(updateButton);
    popupForm.appendChild(cancelButton);
    popupOverlay.appendChild(popupForm);
    document.body.appendChild(popupOverlay);

    updateButton.addEventListener('click', () => {
        if(oldPassword.value.length !== 0 && newPassword.value.length !== 0 && confirmPassword.value.length !==0){
            const formData = new FormData();
            formData.append('old_password', oldPassword.value);
            formData.append('new_password', newPassword.value);
            formData.append('confirm_password', confirmPassword.value);
            formData.append('csrfmiddlewaretoken', csrfToken);

            if (newPassword.value === confirmPassword.value){

                fetch(`/student/password/update`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': csrfToken,
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data.success){
                        Swal.fire('Changed!', data.success , 'success');
                    }
                    else {
                        Swal.fire(
                            'Failed!',
                            data.error,
                            'error'
                        );
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while updating password.');
                });
                popupOverlay.remove();

            }else{
                alert("New Password and Confirm Password should match");
                newPassword.value = '';
                confirmPassword.value = '';
            }                    
        }else{
            alert('All fields are required to fill');
        }
    });

    cancelButton.addEventListener('click', () => {
        popupOverlay.remove();
    });

}