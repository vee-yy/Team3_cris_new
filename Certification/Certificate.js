document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.searchInput');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    function highlightText(element, query) {
      if (!query) {
          element.innerHTML = element.textContent;
        return;
      }

    const text = element.textContent;
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    element.innerHTML = text.replace(regex, '<mark>$1</mark>');
  }

    const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        if (cardText.includes(query)) {
          card.style.display = 'flex';

    const title = card.querySelector('h2');
        if (title) highlightText(title, query);
        } else {
        card.style.display = 'none';
        
    const title = card.querySelector('h2');
        if (title) highlightText(title, '');
        }
      });
    const rows = document.querySelectorAll('#registrationTableBody tr');
      rows.forEach(row => {
    const rowText = row.innerText.toLowerCase();
      if (rowText.includes(query)) {
        row.style.display = '';
    const nameCell = row.querySelectorAll('td')[1];
      if (nameCell) {
          highlightText(nameCell, query);
      }
    row.querySelectorAll('td').forEach((td, i) => {
      if (i !== 1) {
        td.innerHTML = td.textContent;
        }
      });
      } else {
    row.style.display = 'none';
    row.querySelectorAll('td').forEach(td => {
    td.innerHTML = td.textContent;
          });
        }
      });
    const firstVisibleCard = [...cards].find(card => card.style.display !== 'none');
  if (firstVisibleCard) {
    firstVisibleCard.scrollIntoView({ behavior: 'auto', block: 'center' });
  }
    const firstVisibleRow = [...rows].find(row => row.style.display !== 'none');
  if (firstVisibleRow) {
    firstVisibleRow.scrollIntoView({ behavior: 'auto', block: 'center' });
  }
    });
 }
})

function openAboutPopup() {
  window.location.href = '../AboutUS/AboutUs.html';
}


function openOtherCertificateAlert(){
  Swal.fire({
    icon: 'info',
    title: 'Other Certificate',
    text: 'Contact us Via email cris.support@gmail.com.',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3b82f6'
  })
}
function openForm(type) {
  Swal.fire({
    title: 'Terms & Conditions',
    html: `<div style="text-align: left;">
      <p style="margin-bottom: 1rem;">By proceeding, you agree to:</p>
        <ul style="margin-left: 1.2rem; padding-left: 1rem; list-style-type: disc;">
          <li style="margin-bottom: 0.5rem;">Ensure all information provided is accurate and truthful</li>
          <li style="margin-bottom: 0.5rem;">Only upload valid and authentic supporting documents</li>
          <li style="margin-bottom: 0.5rem;">Settle any applicable fees in a timely manner</li>
          <li><strong>Please allow 3–5 business days for processing</strong></li>
          <li>If a field does not apply to you, enter <strong>N/A.</strong></li>
        </ul>
      <div style="margin-top: 1.5rem;">
        <input type="checkbox" id="termsCheckbox" style="margin-right: 0.5rem;" />
        <label for="termsCheckbox">I have read and agree to the Terms & Conditions</label>
      </div>
    </div>`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Agree & Continue',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#3b82f6',
    width: '600px',
    preConfirm: () => {
      const checkbox = document.getElementById('termsCheckbox');
      if (!checkbox || !checkbox.checked) {
        Swal.showValidationMessage('You must agree to the terms before continuing.');
        return false;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      showPopupForm(type);
    } else {
      closeForm();
    }
  });
}

function showPopupForm(type) {
  const popup = document.getElementById('popupForm');
  if (!popup) return;

  popup.style.display = 'flex';
  const formTitle = document.getElementById('formTitle');
  if (formTitle) formTitle.innerText = `Register for ${type}`;

  const certTypeInput = document.getElementById('certificateType');
  if (certTypeInput) certTypeInput.value = type;

  document.querySelectorAll('.type-fields').forEach(div => div.style.display = 'none');

  const fieldMap = {
    'Birth Certificate': 'birthFields',
    'Marriage Certificate': 'marriageFields',
    'Death Certificate': 'deathFields',
    'Cenomar Certificate': 'cenomarFields',
    'Cenodeath Certificate': 'cenodeathFields',
  };

  const showId = fieldMap[type];
  const section = document.getElementById(showId);
  if (section) section.style.display = 'block';

  resetFormAndStepper();
}
function closeForm() {
  const popup = document.getElementById('popupForm');
  if (popup) popup.style.display = 'none';
  certificateForm?.reset();
  resetFormAndStepper();
}

const form = document.getElementById('certificateForm');
const steps = document.querySelectorAll('.form-step');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const downloadBtn = document.getElementById('downloadBtn');

let currentStep = 0;

const sectionMap = {
  'Birth Certificate': 'birthFields',
  'Marriage Certificate': 'marriageFields',
  'Death Certificate': 'deathFields',
  'Cenomar Certificate': 'cenomarFields',
  'Cenodeath Certificate': 'cenodeathFields'
};

document.addEventListener('DOMContentLoaded', () => {
  const dateInputs = document.querySelectorAll('.input-group');

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const minDate = `${year}-01-01`;
  const maxDate = `${year}-${month}-${day}`;

  dateInputs.forEach(input => {
    input.min = minDate;
    input.max = maxDate;
    input.addEventListener('keydown', e => e.preventDefault());
    input.addEventListener('change', (e) => {
      const selectedDate = new Date(e.target.value);
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
       Swal.fire({
        toast: true,
        background: '#f8d7da',
        icon: 'error',
        title: 'Future dates are not allowed',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });

        e.target.value = '';
      }
    });
  });
});
function showStep(step) {
  steps.forEach((el, idx) => {
    el.style.display = idx === step ? 'block' : 'none';
  });
  prevBtn.disabled = step === 0;
  nextBtn.style.display = step === steps.length - 1 ? 'none' : 'inline-block';
  form.querySelector('button[type="submit"]').style.display = step === steps.length - 1 ? 'inline-block' : 'none';
  downloadBtn.style.display = step === steps.length - 1 ? 'inline-block' : 'none';
}

function validateStep1() {
  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return false;

const inputs = section.querySelectorAll('input, select, textarea');


for (const input of inputs) {
  const skipFields = ['Middle Name', 'Suffix', "Mother's Middle Name", "Father's Middle Name", 'Jr. Sr. III, IV'];
  const identifier = input.placeholder;

  if (skipFields.includes(identifier)) {
    continue; 
  }

  if (!input.value.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: `Please fill out the required field: ${input.placeholder || input.name || input.id}`,
      confirmButtonColor: '#3b82f6'
    });
    input.focus();
    return false;
  }
}

  return true;
}

function generateSummary() {
  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return;

  const inputs = section.querySelectorAll('input, textarea, select');
  let summaryHTML = `<h3>${certType} - Review Your Inputs</h3>`;

  inputs.forEach(input => {
    const label = input.getAttribute('placeholder') || input.name || input.id || 'Field';
    const value = input.value.trim().toUpperCase() || '<em>Not provided</em>';
    summaryHTML += `
      <div class="review-item">
        <div class="label">${label}</div>
        <div class="value">${value}</div>
      </div>`;
  });

  document.getElementById('reviewSummary').innerHTML = summaryHTML;
}

nextBtn.addEventListener('click', () => {
  if (!validateStep1()) return;

  generateSummary();
  currentStep = 1;
  showStep(currentStep);
});

prevBtn.addEventListener('click', () => {
  currentStep = 0;
  showStep(currentStep);
});

downloadBtn.addEventListener('click', () => {
  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return;

  document.getElementById('pdfCertType').textContent = certType;
  const pdfDetails = document.getElementById('pdfDetails');
  pdfDetails.innerHTML = '';

  section.querySelectorAll('input, textarea, select').forEach(input => {
    const label = input.getAttribute('placeholder') || input.name || input.id || 'Field';
    const value = input.value.trim().toUpperCase() || '<em>Not provided</em>';
    pdfDetails.innerHTML += `
      <p style="margin: 4px 0;">
        <strong>${label}:</strong> ${value}
      </p>`;
  });

  const template = document.getElementById('pdfTemplate');
  template.style.display = 'block'; 

  html2canvas(template).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('certificate-summary.pdf');
    template.style.display = 'none';
  });
});


let registrationCount = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
  registrationCount++;

  const idNumber = `REG-${String(registrationCount).padStart(5, '0')}`;
  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return;

  const firstName = section.querySelector('input[placeholder="First Name"]')?.value.trim() || '';
  const lastName = section.querySelector('input[placeholder="Last Name"]')?.value.trim() || '';
  const middleInitial = section.querySelector('input[placeholder="Middle Initial"]')?.value.trim() || '';
  const suffix = section.querySelector('input#suffix')?.value.trim() || '';
  const fullName = [firstName, middleInitial && middleInitial + '.', lastName, suffix].filter(Boolean).join(' ').trim();
  const tableBody = document.querySelector('#registrationTableBody');

  if (!tableBody) return;
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${idNumber}</td>
    <td>${fullName}</td>
    <td>${certType}</td>
    <td>Pending</td>
  `;
  tableBody.appendChild(newRow);

  Swal.fire({
    icon: 'success',
    title: 'Thank you for your cooperation!',
    text: 'Kindly check your email for updates of your registration.',
    confirmButtonColor: '#3b82f6'
  }).then(() => {
    closeForm();

  });
});

//First AAAAAAAAAAARRGGHHH
showStep(currentStep);
async function downloadPDF() {
  const certType = document.getElementById('certificateType').value;
  const sectionMap = {
    'Birth Certificate': 'birthFields',
    'Marriage Certificate': 'marriageFields',
    'Death Certificate': 'deathFields',
    'Cenomar Certificate': 'cenomarFields',
    'Cenodeath Certificate': 'cenodeathFields'
  };
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);

  if (!section) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Certificate Registration Summary', 10, 10);

  let y = 20;
  section.querySelectorAll('input, textarea').forEach(input => {
    const label = input.getAttribute('placeholder') || input.name;
    const value = input.value.trim();
    doc.text(`${label}: ${value}`, 10, y);
    y += 10;
  });

  doc.save('registration-summary.pdf');
}

document.addEventListener('DOMContentLoaded', () => {
  const userIconContainer = document.getElementById('userIconContainer');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userIcon = document.getElementById('userIcon');
  const userDropdown = document.getElementById('userDropdown');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser && loggedInUser.username) {
    userNameDisplay.textContent = loggedInUser.username;
    userIconContainer.style.display = 'block';

    userIcon.addEventListener('click', () => {
      userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
      if (!userIconContainer.contains(e.target)) {
        userDropdown.style.display = 'none';
      }
    });
  } else {
    userIconContainer.style.display = 'none';
  }
});

function logout() {
  Swal.fire({
    title: 'Are you sure you want to log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, log me out',
    cancelButtonText: 'Discard',
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#aaa'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('loggedInUser');
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have successfully logged out.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3b82f6'
      }).then(() => {
        window.location.href = '../Loginweb/LoginPage.html';
      });
    }
  });
}

