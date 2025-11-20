document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const rememberInput = document.querySelector("#remember");

    // Check có remember không
    if (localStorage.getItem("remember_login") === "true") {
        usernameInput.value = localStorage.getItem("remember_username");
        passwordInput.value = localStorage.getItem("remember_password");
        rememberInput.checked = true;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            alert("Vui lòng nhập Username và Password!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Tìm user
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert("Sai tài khoản hoặc mật khẩu!");
            return;
        }

        // Thực hiện hành động remember me
        if (rememberInput.checked) {
            localStorage.setItem("remember_login", "true");
            localStorage.setItem("remember_username", username);
            localStorage.setItem("remember_password", password);
        } else {
            localStorage.removeItem("remember_login");
            localStorage.removeItem("remember_username");
            localStorage.removeItem("remember_password");
        }

        alert("Đăng nhập thành công!");
        form.submit(); 
    });
});
