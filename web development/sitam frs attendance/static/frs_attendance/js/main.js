document.addEventListener('DOMContentLoaded', () => {

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.permissions
            .query({ name: 'camera' })
            .then(function(permissionStatus) {
                if (permissionStatus.state === 'granted') {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(function(stream) {
                            const video = document.getElementById('camera-stream');
                            video.srcObject = stream;
                        })
                        .catch(function(err) {
                            console.error('Error accessing the camera:', err);
                        });
                } else if (permissionStatus.state === 'prompt') {
                    navigator.mediaDevices.getUserMedia({ video: true })
                        .then(function(stream) {
                            const video = document.getElementById('camera-stream');
                            video.srcObject = stream;
                        })
                        .catch(function(err) {
                            console.error('Error accessing the camera:', err);
                            alert('Camera permission is required.');
                        });
                } else if (permissionStatus.state === 'denied') {
                    alert('Camera access is denied. Please enable camera access in your browser settings.');
                }
            })
            .catch(function(err) {
                console.error('Error checking camera permissions:', err);
            });
    } else {
        alert('Your browser does not support camera access.');
    }

    const newRegistrationBtn = document.getElementById('new-registration-btn');
    const modal = document.getElementById('registration-modal');
    const closeModal = document.getElementById('close-modal');

    if(newRegistrationBtn){
        newRegistrationBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        });
    }

    if(closeModal){
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    });

    const goBackBtn = document.getElementById('go-back');
    goBackBtn.addEventListener('click', () => {
        window.history.back();
    });

    function getCSRFToken() {
        const cookieValue = document.cookie
            .split("; ")
            .find(row => row.startsWith("csrftoken="))
            ?.split("=")[1];
        return cookieValue || "";
    }
    
    let currentStream = null;
    let currentFacingMode = "user";
    const swapCameraButton = document.getElementById("swap-camera");
    const form = document.getElementById("student-form");
    const video = document.getElementById("camera-stream");

    const msgSuccessStudentBlock = document.getElementById('msg-success-student-block');
    const msgErrorStudentBlock = document.getElementById('msg-error-student-block');
    const msgSuccessStudent = document.getElementById('msg-success-student');
    const msgErrorStudent = document.getElementById('msg-error-student');

    function stopCameraStream() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            currentStream = null;
        }
    }

    async function getMediaStream(facingMode) {
        try {
            stopCameraStream();
            const loadProgress = document.getElementById('load_progress');
            if (loadProgress) loadProgress.style.display = "block";

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode }
            });

            const video = document.getElementById("camera-stream");
            video.srcObject = stream;
            currentStream = stream;
            if (loadProgress) loadProgress.style.display = "none";

        } catch (error) {
            console.error("Error accessing camera:", error);
            if (error.name === "NotAllowedError" || error.name === "NotFoundError") {
                alert("Camera access failed. Please check permissions.");
            }
        }
    }

    window.addEventListener("beforeunload", stopCameraStream);
    window.addEventListener("pagehide", stopCameraStream);

    if (swapCameraButton) {
        swapCameraButton.addEventListener('click', (event) => {
            currentFacingMode = (currentFacingMode === "user") ? "environment" : "user";
            getMediaStream(currentFacingMode);
        });
    } else {
        console.error("Swap camera button not found.");
    }

    getMediaStream(currentFacingMode);

    const loadProgress = document.getElementById('load_progress');

    if (loadProgress) {
        loadProgress.style.display = "none";
    } else {
        console.error("Element with id 'load_progress' not found.");
    }

    if(form){
        form.addEventListener("submit", async function (event) {

            loadProgress.style.display = "block";
            event.preventDefault();
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/jpeg", 1.0); 

            console.log("Sending frame data:", imageData.slice(0, 100));
            const base64Image = imageData.split(",")[1];

            const formData = new FormData(form);
            const jsonData = {};

            formData.forEach((value, key) => {
                if (key === "email" && value === "") {
                    return; 
                }
                jsonData[key] = value;
            });

            jsonData["face_data"] = base64Image;

            fetch(form.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
                body: JSON.stringify(jsonData),
            })
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                } else {
                    throw new Error("Unexpected response format");
                }
            })
            .then(data => {
                if (data.message) {
                    loadProgress.style.display = "none";
                    console.log(data.message);
                    msgErrorStudentBlock.style.display = 'none';
                    msgSuccessStudentBlock.style.display = 'block';
                    if (msgSuccessStudent) {
                        msgSuccessStudent.innerHTML = data.message;
                    }
                    form.reset();
                }
                if (data.error) {
                    console.log(data.error);
                    msgErrorStudentBlock.style.display = 'block';
                    msgSuccessStudentBlock.style.display = 'none';
                    if (msgErrorStudent) {
                        msgErrorStudent.innerHTML = data.error;
                    }
                }
            })
            .catch(error => {
                console.error("Error:", error);
                msgSuccessStudentBlock.style.display = 'none';
                msgErrorStudentBlock.style.display = 'block';
                if (msgErrorStudent) {
                    msgErrorStudent.innerHTML = error.message || error;
                }
            });
        });
    }

});