document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // block reload

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

        // rmissing
        if (email.value.trim() === "") {
            email.classList.add("is-invalid");
            emailError.innerText = "Vui lòng nhập Email";
            isValid = false;
        }
        // wrong format
        else if (!emailRegex.test(email.value)) {
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
                name = name.value,
                email = email.value,
                message = message.value
            }
            try {
                const response = await fetch("http://localhost:3000/contact", {
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