// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGzWKdjbtxdTu2dWbqe-Vhwjas_wdzdkk",
    authDomain: "mobile-authentication-system.firebaseapp.com",
    projectId: "mobile-authentication-system",
    storageBucket: "mobile-authentication-system.firebasestorage.app",
    messagingSenderId: "853294443978",
    appId: "1:853294443978:web:147602235e789a8ac83333",
    measurementId: "G-6ZJSFC8C21"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Render reCAPTCHA verifier
function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'normal',
        callback: (response) => {
            console.log("reCAPTCHA verified.");
        },
        'expired-callback': () => {
            alert("reCAPTCHA expired. Please verify again.");
        }
    });
    recaptchaVerifier.render();
}

// Function to send OTP
function sendOTP() {
    const number = document.getElementById('number').value;

    if (!number) {
        alert("Please enter a valid phone number.");
        return;
    }

    firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.querySelector('.number-input').style.display = 'none';
            document.querySelector('.verification').style.display = 'block';
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}

// Function to verify OTP
function verifyCode() {
    const code = document.getElementById('verificationCode').value;

    if (!code) {
        alert("Please enter the OTP.");
        return;
    }

    window.confirmationResult.confirm(code)
        .then((result) => {
            document.querySelector('.verification').style.display = 'none';
            document.querySelector('.result').style.display = 'block';
            document.querySelector('.correct').style.display = 'block';
            console.log("Phone number verified successfully.");
        })
        .catch((error) => {
            document.querySelector('.verification').style.display = 'none';
            document.querySelector('.result').style.display = 'block';
            document.querySelector('.incorrect').style.display = 'block';
            console.error("Error during OTP verification: ", error.message);
        });
}

// Initialize reCAPTCHA when the page loads
window.onload = () => {
    render();
};
