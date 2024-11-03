// Initialize Firebase (use the same config as in login.js)
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

// Get user information
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("userGreeting").textContent = `Hello, ${user.email}!`;
    } else {
        // If not logged in, redirect to login page
        window.location.href = "login.html";
    }
});

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", function() {
    auth.signOut().then(() => {
        // Sign-out successful.
        window.location.href = "login.html"; // Redirect to login page
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});
