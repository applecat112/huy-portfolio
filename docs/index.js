document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "huy-portfolio-production.up.railway.app"; // thay bằng URL Railway của bạn

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async function (e) {  // thêm async
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const message = document.getElementById("message");

        // reset lỗi
        [name, email, message].forEach(input => {
            input.classList.remove("is-invalid");
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

        if (message.value.trim() === "") {
            message.classList.add("is-invalid");
            isValid = false;
        }

        if (isValid) {
            const formData = {
                name: name.value,      // fix: dùng : thay vì =
                email: email.value,
                message: message.value
            };

            try {
                const response = await fetch(`${API_URL}/contact`, {  // dùng URL Railway
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    alert("Gửi thành công!");
                    form.reset();
                } else {
                    alert("Xảy ra lỗi!");
                }
            } catch (error) {
                console.log(error);
                alert("Không thể kết nối đến server");
            }
        }
    });
});