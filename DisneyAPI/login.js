document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const passwordInput = document.getElementById("senha");
    const passwordToggle = document.querySelector(".password-toggle");

    passwordToggle.addEventListener("click", togglePasswordVisibility);

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const naoSouRoboCheckbox = document.getElementById("naoSouRobo");
        if (!naoSouRoboCheckbox.checked) {
            alert("Por favor, marque a caixa 'Não sou um robô'.");
            return;
        }

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (email && senha) {
            alert("Login bem-sucedido! Redirecionando para a página de personagens.");
            window.location.href = "personagens.html";
        } else {
            alert("Credenciais inválidas. Por favor, verifique seu email e senha.");
        }
    });

    function togglePasswordVisibility() {
        const type = passwordInput.type === "password" ? "text" : "password";
        passwordInput.type = type;
        passwordToggle.textContent = type === "password" ? "Mostrar senha" : "Esconder senha";
    }

    function redirectToCharactersPage() {
        window.location.replace("personagens.html");
    }
});

