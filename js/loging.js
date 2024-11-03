document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Display loading message
    loginMessage.textContent = "Logging in...";
    loginMessage.style.color = "#333";

    // Firebase login example (Replace this with your Firebase code if set up)
    // For demo, let's use a simple timeout to simulate loading
    setTimeout(() => {
        if (username === "test@example.com" && password === "password") {
            loginMessage.textContent = "Login successful!";
            loginMessage.style.color = "green";
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            loginMessage.textContent = "Invalid email or password.";
            loginMessage.style.color = "red";
        }
    }, 1000);  // Simulate loading time
});
