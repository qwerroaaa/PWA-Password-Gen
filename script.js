document.addEventListener("DOMContentLoaded", () => {
    const passwordList = document.getElementById("password-list");
    const addForm = document.getElementById("add-password-form");
    const generateButton = document.getElementById("generate-password");

    // Функция генерации пароля
    function generatePassword(length = 12) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    // Обновление списка паролей
    function updatePasswordList() {
        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwordList.innerHTML = passwords.map(
            (entry) => `<div>${entry.login} - ${entry.url} - ${entry.password}</div>`
        ).join("");
    }

    // Добавление нового пароля
    addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const login = document.getElementById("login").value;
        const url = document.getElementById("url").value;
        const password = document.getElementById("password").value;

        const passwords = JSON.parse(localStorage.getItem("passwords")) || [];
        passwords.push({ login, url, password });
        localStorage.setItem("passwords", JSON.stringify(passwords));

        addForm.reset();
        updatePasswordList();
    });

    // Генерация пароля
    generateButton.addEventListener("click", () => {
        document.getElementById("password").value = generatePassword();
    });

    // Инициализация
    updatePasswordList();
});
