document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.querySelector("#username").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();
        const repass = document.querySelector("#re-password").value.trim();
        const agree = document.querySelector("#remember").checked;

        // 1. Kiểm tra rỗng
        if (!username || !email || !password || !repass) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        // 2. Kiểm tra email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Email không hợp lệ!");
            return;
        }

        // 3. Kiểm tra password giống nhau
        if (password !== repass) {
            alert("Mật khẩu nhập lại không trùng khớp!");
            return;
        }

        // 4. Kiểm tra đồng ý điều khoản
        if (!agree) {
            alert("Bạn phải đồng ý với điều khoản dịch vụ!");
            return;
        }

        // 5. Lấy danh sách user đã lưu
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // 6. Kiểm tra username đã tồn tại chưa
        if (users.some(u => u.username === username)) {
            alert("Username đã tồn tại! Vui lòng chọn username khác.");
            return;
        }

        // 7. Lưu tài khoản mới
        const newUser = { username, email, password };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Tạo tài khoản thành công!");
        window.location.href = "./login.html";
    });
});
