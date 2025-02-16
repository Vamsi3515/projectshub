document.addEventListener('DOMContentLoaded', () => {
    function showForm(formType) {
        if (formType === 'signup') {
            document.getElementById('signup-form').style.display = 'block';
            document.getElementById('login-form').style.display = 'none';
            document.querySelector('.tab-button.active').classList.remove('active');
            document.querySelectorAll('.tab-button')[0].classList.add('active');
        } else {
            document.getElementById('signup-form').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.querySelector('.tab-button.active').classList.remove('active');
            document.querySelectorAll('.tab-button')[1].classList.add('active');
        }
    }

    const loginTabs = document.getElementsByClassName('tab-button');

    Array.from(loginTabs).forEach(tab => {
        tab.addEventListener('click', function () {
            Array.from(loginTabs).forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const name = this.dataset.btnname;
            Array.from(document.getElementsByClassName('alert')).forEach(msg => {
                msg.style.display = "none";
            });            
            showForm(name);
        });
    });

    showForm('signup');
    
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const alertMessage = document.getElementById('alert-message');

    alertMessage.style.display = 'none';

    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password && confirmPassword) {
            if (password !== confirmPassword) {
                alertMessage.style.display = 'block';
                alertMessage.innerText = 'Password and Confirm Password should be match!';
            } else {
                alertMessage.style.display = 'none';
            }
        } else {
            alertMessage.style.display = 'none';
        }
    }

    passwordInput.addEventListener('input', validatePasswords);
    confirmPasswordInput.addEventListener('input', validatePasswords);

});