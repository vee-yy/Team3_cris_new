const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const loginBtn = document.getElementById('loginBtn');

const ADMIN_ACCOUNTS = [
  { username: "LebronSuperAdmin", password: "Admin@123", role: "Super Admin" },
  { username: "CarlcashierAdmin", password: "Cashier@123", role: "Cashier" },
  { username: "SophiaVerifierAdmin", password: "Verify@123", role: "Verifying Officer" },
  { username: "BillyHDOAdmin", password: "Help@123", role: "Help Desk Officer" },
  { username: "YasmineRCAdmin", password: "Receive@123", role: "Receiving Clerk" },
  { username: "TinaReportsAdmin", password: "Report@123", role: "Report Officer" },
  { username: "DerekSignatoryAdmin", password: "Sign@123", role: "Document Signatory Officer" },
  { username: "AnnaReleaseAdmin", password: "Release@123", role: "Releasing Officer" }
];


loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const passwordValue = document.getElementById('password').value;

    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
        const user = ADMIN_ACCOUNTS.find(
        acc => acc.username === username && acc.password === passwordValue
        );

        if (user) {
        successMessage.style.display = 'block';
        successMessage.textContent = "Login successful! Redirecting...";

        // Store session info
        sessionStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminUsername", user.username);
        localStorage.setItem("adminRole", user.role);

        setTimeout(() => {
            window.location.href = 'AdminDashboard.html';
        }, 1000);

        return;
        }


    errorMessage.style.display = 'block';
    errorMessage.textContent = "Incorrect username or password.";
    loginBtn.disabled = false;
    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';

    document.getElementById('password').value = '';
    document.getElementById('password').focus();
});

document.getElementById('username').addEventListener('input', hideError);
document.getElementById('password').addEventListener('input', hideError);

function hideError() {
    errorMessage.style.display = 'none';
}
