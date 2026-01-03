document.addEventListener("DOMContentLoaded",() => {
    listenForLogin();
});

function getRedirectUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('redirect');
}

function listenForLogin(){
    const loginForm = document.getElementById("userInfoForm");
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const mobile = document.getElementById("mobile").value
        const user = {
            name : name,
            email : email,
            mobile : mobile
        };

        try {
            // Send login data to server to set cookie
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                // Also store in localStorage for client-side use
                localStorage.setItem("user", JSON.stringify(user));

                // Check if there's a redirect URL in query params
                const redirectUrl = getRedirectUrl();
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = "/reserve/reserve.html";
                }
            } else {
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        }
    });
}