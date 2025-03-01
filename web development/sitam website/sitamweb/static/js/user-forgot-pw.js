document.addEventListener('DOMContentLoaded', function () {
    const forgotPwForm = document.getElementById('forgotPwForm');
    const otpVerificationForm = document.getElementById('otpVerificationForm');
    const updatePasswordForm = document.getElementById('updatePasswordForm');
    const responseMessage = document.getElementById('responseMessage');
    const otpResponseMessage = document.getElementById('otpResponseMessage');
    const passwordResponseMessage = document.getElementById('passwordResponseMessage');
    const otpSentMsg = document.getElementById('otpSentMsg');
    const loadBlock = document.getElementsByClassName('load-block')[0];

    // Send OTP
    forgotPwForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const csrfToken = getCookie('csrftoken');

        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList = 'loader';
        loadBlock.appendChild(loadingIndicator);

        await fetch('/student/forgot_password', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}`,
        })
        .then(response => response.json())
        .then(data => {

            loadingIndicator.remove();

            if (data.success) {
                otpSentMsg.innerHTML = `OTP sent to <b>${data.email}</b>`;
                otpSentMsg.style.margin = '20px 0px';
                document.getElementById('forgotPwBlock').style.display = 'none';
                document.getElementById('otpVerificationBlock').style.display = 'block';
            } else {
                responseMessage.innerText = data.error;
                responseMessage.style.color = 'red';
            }
        })
        .catch(error => {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';

            console.error('Error:', error);
            responseMessage.innerText = 'An error occurred while sending the OTP.';
            responseMessage.style.color = 'red';
        });
    });

    // Verify OTP
    otpVerificationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const otp = document.getElementById('otp').value;
        const csrfToken = getCookie('csrftoken');


        fetch('/student/verify_otp', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&otp=${otp}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire('Verified!', 'OTP verified successfully! You can now change your password.', 'success');
                document.getElementById('otpVerificationBlock').style.display = 'none';
                document.getElementById('updatePasswordBlock').style.display = 'block';
            } else {
                otpResponseMessage.innerText = data.error;
                otpResponseMessage.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            otpResponseMessage.innerText = 'An error occurred while verifying the OTP.';
            otpResponseMessage.style.color = 'red';

        });
    });

    // Update Password
    updatePasswordForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const csrfToken = getCookie('csrftoken');

        passwordResponseMessage.style.margin = '10px';
        passwordResponseMessage.style.color = 'red';


        if (newPassword !== confirmPassword) {
            passwordResponseMessage.innerText = 'Passwords do not match!';
            return;
        }

        const loadingIndicator = document.createElement('div');
        loadingIndicator.classList = 'loader';
        passwordResponseMessage.appendChild(loadingIndicator);

        fetch('/student/update_password', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${username}&new_password=${newPassword}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadingIndicator.remove();
                Swal.fire('Changed!', 'Password updated successfully! You can now log in with your new password.', 'success')
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.replace("/student/login");
                    }
                });
            } else {
                passwordResponseMessage.innerText = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            passwordResponseMessage.innerText = 'An error occurred while updating the password.';
        });
    });
});

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