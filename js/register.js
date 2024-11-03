// Firebase configuration
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

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const registerMessage = document.getElementById("registerMessage");

    // Display loading message
    registerMessage.textContent = "Creating account...";
    registerMessage.style.color = "#333";

    // Firebase Authentication for user registration
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registration successful
            registerMessage.textContent = "Account created successfully!";
            registerMessage.style.color = "green";
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            // Handle registration errors
            registerMessage.textContent = error.message;
            registerMessage.style.color = "red";
        });
});
