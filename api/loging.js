// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXTwuy5ACKCRCO4M18_v8f_Bwie2gRIeU",
  authDomain: "mr-gadgets.firebaseapp.com",
  projectId: "mr-gadgets",
  storageBucket: "mr-gadgets.firebasestorage.app",
  messagingSenderId: "144245989215",
  appId: "1:144245989215:web:71e02602c87bf0087aa0ea",
  measurementId: "G-R6H4WRR6V4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Display loading message
    loginMessage.textContent = "Logging in...";
    loginMessage.style.color = "#333";

    // Firebase Authentication for user login
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login successful
            loginMessage.textContent = "Login successful!";
            loginMessage.style.color = "green";
            window.location.href = "dashboard.html";  // Redirect to dashboard
        })
        .catch((error) => {
            // Handle login errors
            loginMessage.textContent = error.message;
            loginMessage.style.color = "red";
        });
});
