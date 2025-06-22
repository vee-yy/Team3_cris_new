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
  { username: "SheytNasanAkinSalamin", password: "Cashier@123", role: "Cashier" },
  { username: "BurecheVerify", password: "Verify@123", role: "Verifying Officer" },
  { username: "DusbiLabasna", password: "Help@123", role: "Help Desk Officer" },
  { username: "WalangReceive", password: "Receive@123", role: "Receiving Clerk" },
  { username: "PuroPaReportSabay3", password: "Report@123", role: "Report Officer" },
  { username: "JoskopoSignatory", password: "Sign@123", role: "Document Signatory Officer" },
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
  console.log("Matched user:", user); // Debug log

  sessionStorage.setItem("isAdmin", "true");
  sessionStorage.setItem("adminUsername", user.username);
  sessionStorage.setItem("adminRole", user.role);

  // Debug log to verify storage
  console.log("Saved username:", sessionStorage.getItem('adminUsername'));
  console.log("Saved role:", sessionStorage.getItem('adminRole'));

  successMessage.style.display = 'block';
  successMessage.textContent = "Login successful! Redirecting...";

 setTimeout(() => {
  switch (user.role) {
    case "Super Admin":
      window.location.href = 'AdminDashboard.html';
      break;
    case "Cashier":
      window.location.href = '../Roles/CashierAdmin.html';
      break;
    case "Verifying Officer":
      window.location.href = '../Roles/VerifierAdmin.html';
      break;
    case "Help Desk Officer":
      window.location.href = '../Roles/HelpAdmin.html';
      break;
    case "Receiving Clerk":
      window.location.href = '../Roles/ReceivingAdmin.html';
      break;
    case "Report Officer":
      window.location.href = '../Roles/ReportAdmin.html';
      break;
    case "Document Signatory Officer":
      window.location.href = '../Roles/SignatoryAdmin.html';
      break;
    case "Releasing Officer":
      window.location.href = '../Roles/ReleasingAdmin.html';
      break;
    default:
      window.location.href = 'AdminDashboard.html';
  }
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
