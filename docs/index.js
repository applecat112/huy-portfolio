document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "https://huy-portfolio-production.up.railway.app"; // thay bằng URL Railway của bạn

    const form = document.getElementById("contactForm");

    // Kiểm tra và tạo customAlert nếu chưa có
    let alertDiv = document.getElementById("customAlert");
    if (!alertDiv && form) {
        alertDiv = document.createElement("div");
        alertDiv.id = "customAlert";
        alertDiv.style.display = "none";
        alertDiv.className = "mt-3";
        form.appendChild(alertDiv);
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const message = document.getElementById("message");

        // Ẩn alert cũ khi submit mới
        if (alertDiv) alertDiv.style.display = "none";

        // reset lỗi
        [name, email, message].forEach(input => {
            if (input) input.classList.remove("is-invalid");
        });

        // validate
        if (name.value.trim() === "") {
            name.classList.add("is-invalid");
            isValid = false;
        }

        if (email.value.trim() === "") {
            email.classList.add("is-invalid");
            emailError.innerText = "Vui lòng nhập Email";
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            email.classList.add("is-invalid");
            emailError.innerText = "Email không hợp lệ";
            isValid = false;
        }

        if (isValid) {
            const formData = {
                name: name.value,
                email: email.value,
                message: message.value.trim() === "" ? "Không có nội dung" : message.value  // Nếu trống thì gửi text mặc định
            };

            try {
                const response = await fetch(`${API_URL}/contact`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    alertDiv.textContent = "Gửi thành công!";
                    alertDiv.className = "alert alert-success mt-3";
                    alertDiv.style.display = "block";

                    setTimeout(() => {
                        alertDiv.style.display = "none";
                    }, 3000);

                    form.reset();
                } else {
                    alertDiv.textContent = "Xảy ra lỗi! Vui lòng thử lại sau.";
                    alertDiv.className = "alert alert-danger mt-3";
                    alertDiv.style.display = "block";

                    setTimeout(() => {
                        alertDiv.style.display = "none";
                    }, 3000);
                }
            } catch (error) {
                console.log(error);
                alertDiv.textContent = "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.";
                alertDiv.className = "alert alert-danger mt-3";
                alertDiv.style.display = "block";

                setTimeout(() => {
                    alertDiv.style.display = "none";
                }, 3000);
            }
        }
    });
});