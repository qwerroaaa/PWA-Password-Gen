document.addEventListener("DOMContentLoaded", () => {
    const passwordList = document.getElementById("password-list");
    const addForm = document.getElementById("add-password-form");
    const generateButton = document.getElementById("generate-password");

    // Функция генерации пароля
    function generatePassword(length = 12, options = { 
        useUppercase: true, 
        useLowercase: true, 
        useNumbers: true, 
        useSpecial: true 
    }) {
        const chars = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            special: "!@#$%^&*()",
        };

        let charPool = "";
        if (options.useUppercase) charPool += chars.uppercase;
        if (options.useLowercase) charPool += chars.lowercase;
        if (options.useNumbers) charPool += chars.numbers;
        if (options.useSpecial) charPool += chars.special;

        if (charPool === "") {
            alert("Выберите хотя бы одну категорию символов для генерации пароля.");
            return "";
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            password += charPool.charAt(Math.floor(Math.random() * charPool.length));
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

    // Проверка длины пароля
    function validatePasswordLength(length) {
        if (isNaN(length) || length < 4 || length > 32) {
            alert("Длина пароля должна быть от 4 до 32 символов!");
            return false;
        }
        return true;
    }

    // Генерация пароля
    generateButton.addEventListener("click", () => {
        const length = parseInt(document.getElementById("password-length").value);
        const useUppercase = document.getElementById("use-uppercase").checked;
        const useLowercase = document.getElementById("use-lowercase").checked;
        const useNumbers = document.getElementById("use-numbers").checked;
        const useSpecial = document.getElementById("use-special").checked;

        if (validatePasswordLength(length)) {
            document.getElementById("password").value = generatePassword(length, {
                useUppercase,
                useLowercase,
                useNumbers,
                useSpecial
            });
        }
    });

    // Инициализация
    updatePasswordList();
});
