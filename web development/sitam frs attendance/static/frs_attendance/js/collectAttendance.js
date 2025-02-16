document.addEventListener('DOMContentLoaded', () => {
    let currentStream = null;
    let facingMode = "environment"; 
    const videoElement = document.getElementById('camera-stream');
    const swapButton = document.getElementById('swap-camera');
    const nameDisplay = document.getElementById('name-display');
    const rollDisplay = document.getElementById('roll-display');
    const statusMessage = document.getElementById('attendance-status');

    const goBackBtn = document.getElementById('go-back');
    goBackBtn.addEventListener('click', () => {
        window.history.back();
    });

    function getCSRFToken() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1] || '';
    }

    async function sendFrame() {
        if (!videoElement.videoWidth || !videoElement.videoHeight) {
            console.warn("Video not ready for frame capture.");
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const frameData = canvas.toDataURL('image/jpeg');

        try {
            const response = await fetch('/api/capture-attendance/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': getCSRFToken(),
                },
                body: new URLSearchParams({ frame: frameData }),
            });

            const result = await response.json();

            if (result.name && result.roll_num) {
                nameDisplay.textContent = result.name;
                rollDisplay.textContent = result.roll_num;
                statusMessage.textContent = "Attendance Marked Successfully!";
                statusMessage.className = "status-message success";
            } else {
                nameDisplay.textContent = "Unknown";
                rollDisplay.textContent = "N/A";
                statusMessage.textContent = "Face not recognized!";
                statusMessage.className = "status-message error";
            }
        } catch (error) {
            console.error("Error sending frame data:", error);
            statusMessage.textContent = "Error processing frame.";
            statusMessage.className = "status-message error";
        }
    }

    function stopCameraStream() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            currentStream = null;
        }
    }

    async function getMediaStream(facingMode = "environment") {
        try {
            stopCameraStream();
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
            videoElement.srcObject = stream;
            currentStream = stream;
        } catch (error) {
            console.error("Error accessing camera:", error);

            if (error.name === "NotAllowedError") {
                alert("Camera access is blocked. Please enable permissions.");
            } else if (error.name === "NotFoundError") {
                alert("No camera found. Please connect a camera.");
            } else {
                console.warn("Camera access issue:", error.message);
            }
        }
    }

    window.addEventListener('beforeunload', stopCameraStream);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            stopCameraStream();
        } else if (document.visibilityState === 'visible') {
            getMediaStream(facingMode);
        }
    });

    swapButton.addEventListener('click', () => {
        facingMode = facingMode === "environment" ? "user" : "environment";
        getMediaStream(facingMode);
    });

    getMediaStream(facingMode);

    const frameInterval = setInterval(sendFrame, 3000);

    window.addEventListener('beforeunload', () => {
        clearInterval(frameInterval);
    });
});