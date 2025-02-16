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
});