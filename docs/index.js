document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "https://huy-portfolio-production.up.railway.app";

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const message = document.getElementById("message");

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

        // Nếu validate không thành công
        if (!isValid) {
            Swal.fire({
                icon: 'warning',
                title: 'Thông tin chưa đầy đủ',
                text: 'Vui lòng điền đầy đủ thông tin trước khi gửi.',
                confirmButtonColor: '#5b4fcf',
                confirmButtonText: 'Đã hiểu',
                background: '#fff',
                iconColor: '#ff9800'
            });
            return;
        }

        // Hiển thị loading khi đang gửi
        Swal.fire({
            title: 'Đang gửi...',
            text: 'Vui lòng chờ trong giây lát',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const formData = {
            name: name.value,
            email: email.value,
            message: message.value.trim() === "" ? "Không có nội dung" : message.value
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

            // Đóng loading
            Swal.close();

            if (data.success) {
                // Popup thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Gửi thành công!',
                    html: 'Cảm ơn bạn <strong>' + name.value + '</strong> đã liên hệ.<br>Tôi sẽ phản hồi sớm nhất có thể.',
                    confirmButtonColor: '#5b4fcf',
                    confirmButtonText: 'OK',
                    background: '#fff',
                    iconColor: '#4CAF50',
                    timer: 4000,
                    timerProgressBar: true,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });

                // Reset form sau khi gửi thành công
                form.reset();

                // Xóa class is-invalid nếu có
                [name, email, message].forEach(input => {
                    if (input) input.classList.remove("is-invalid");
                });
            } else {
                // Popup lỗi từ server
                Swal.fire({
                    icon: 'error',
                    title: 'Gửi thất bại!',
                    text: 'Xảy ra lỗi từ server. Vui lòng thử lại sau.',
                    confirmButtonColor: '#5b4fcf',
                    confirmButtonText: 'Thử lại',
                    background: '#fff',
                    iconColor: '#f44336'
                });
            }
        } catch (error) {
            console.log(error);
            Swal.close();

            // Popup lỗi kết nối
            Swal.fire({
                icon: 'error',
                title: 'Lỗi kết nối!',
                html: 'Không thể kết nối đến server.<br>Vui lòng kiểm tra kết nối mạng và thử lại.',
                confirmButtonColor: '#5b4fcf',
                confirmButtonText: 'Đã hiểu',
                background: '#fff',
                iconColor: '#f44336'
            });
        }
    });
});