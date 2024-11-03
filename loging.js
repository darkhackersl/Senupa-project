document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded credentials (for demo only)
    if (username === "user" && password === "pass123") {
        document.getElementById("loginMessage").textContent = "Login successful!";
        // Redirect to another page
        window.location.href = "dashboard.html"; 
    } else {
        document.getElementById("loginMessage").textContent = "Invalid username or password.";
    }
});
