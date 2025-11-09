document.addEventListener("DOMContentLoaded",() => {
    listenForLogin();
});

function listenForLogin(){
    const loginForm = document.getElementById("userInfoForm");
    loginForm.addEventListener("submit",(event) => {
        event.preventDefault();
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const mobile = document.getElementById("mobile").value
        const user = {
            name : name,
            email : email,
            mobile : mobile
        };
        localStorage.setItem("user",JSON.stringify(user));
        window.location.href = "../reserve/reserve.html";
    });
}