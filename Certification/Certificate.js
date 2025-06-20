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
window.location.href = '../AboutUs/AboutUs.html';
}
function openLoginPopup() {
window.location.href = '../Loginweb/LoginPage.html';
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
          <li style="margin-bottom: 0.5rem;"><strong>Please allow 3–5 business days for processing</strong></li>
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

  currentStep = 0;

  resetFormAndStepper();
  showStep(currentStep);
}

function resetFormAndStepper() {
  if (form) form.reset();
  document.getElementById('reviewSummary').innerHTML = '';

  showStep(0); // Always start at the first step
}


function closeForm() {
  const popup = document.getElementById('popupForm');
  if (popup) popup.style.display = 'none';
  certificateForm?.reset();
  resetFormAndStepper();
}

document.addEventListener('DOMContentLoaded', () => {
  const closeFormBtn = document.getElementById('closeFormBtn');

  if (closeFormBtn) {
    closeFormBtn.addEventListener('click', (e) => {
      e.preventDefault();

      Swal.fire({
        title: 'Do you really want to exit?',
        text: 'Your changes will not be saved.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Discard',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3b82f6'
      }).then((result) => {
        if (result.isConfirmed) {
          closeForm();
        }
      });
    });
  }
});

const form = document.getElementById('certificateForm');
const steps = document.querySelectorAll('.form-step');
const nextBtn = document.getElementById('nextBtn');
const verificationPrevBtn = document.getElementById('verificationPrevBtn');
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
  const dateInputs = document.querySelectorAll('input[type="date"]');

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const maxDate = `${year}-${month}-${day}`;

  dateInputs.forEach(input => {
    input.removeAttribute('min');        
    input.max = maxDate;
    input.addEventListener('keydown', e => e.preventDefault());
    input.addEventListener('change', (e) => {
      const selectedDate = new Date(e.target.value);
      const todayCheck = new Date();
      todayCheck.setHours(0, 0, 0, 0);

      if (selectedDate > todayCheck) {
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
  const steps = document.querySelectorAll('.form-step'); // move this inside to refresh each time
  steps.forEach((el, idx) => {
    if (el) {
      el.style.display = idx === step ? 'block' : 'none';
    }
  });

  const progressSteps = document.querySelectorAll('.progressbar li');
  progressSteps.forEach((li, index) => {
    li.classList.remove('active', 'current');
    if (index < step) {
      li.classList.add('active');
    } else if (index === step) {
      li.classList.add('current');
    }
  });

  // Button visibility
  if (nextBtn) nextBtn.style.display = (step === 0 || step === 1) ? 'inline-block' : 'none';
  if (prevBtn) prevBtn.style.display = step > 0 ? 'inline-block' : 'none';
  if (verificationPrevBtn) verificationPrevBtn.style.display = step === 2 ? 'inline-block' : 'none';

  const submitBtn = form.querySelector('button[type="submitBtn"]');
  if (submitBtn) submitBtn.style.display = step === 4 ? 'inline-block' : 'none';
  if (downloadBtn) downloadBtn.style.display = step === 2 ? 'inline-block' : 'none';
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

function validateStep2() {
  const idImageInput = document.getElementById('idImage');
  if (!idImageInput || !idImageInput.files || idImageInput.files.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'Please upload your ID or document for verification.',
      confirmButtonColor: '#3b82f6'
    });
    return false;
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

// Event listeners for buttons
prevBtn.addEventListener('click', () => {
  currentStep--;
  showStep(currentStep);
});

verificationPrevBtn.addEventListener('click', () => {
  currentStep = 1; // Go back to the Information step
  showStep(currentStep);
});

nextBtn.addEventListener('click', () => {
  if (currentStep === 0) {
    if (validateStep1()) {
      currentStep = 1;
      showStep(currentStep);
    }
  } else if (currentStep === 1) {
    if (validateStep2()) {
      currentStep = 2;
      generateSummary(); // ← add this
      showStep(currentStep);
    }
  } else if (currentStep === 2) {
    currentStep = 3;  // move to final step
    showStep(currentStep);
  }
});
const nextStep2Btn = document.getElementById('nextStep2Btn');

if (nextStep2Btn) {
  nextStep2Btn.addEventListener('click', () => {
    if (currentStep === 1) {
      if (validateStep2()) {
        currentStep = 2;
        generateSummary();
        showStep(currentStep);
      }
    }
  });
}



downloadBtn.type = 'button';

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
    title: 'Registration Submitted Successfully!',
    text: 'Your payment and registration have been recorded.',
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




// outside dom //
form.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  // --- Payment Logic ---
  function updateTotalPrice() {
    const qty = parseInt(document.getElementById('quantity')?.value) || 1;
    const base = 350;
    const fee = 10;
    const total = qty * base;
    const final = total + fee;

    document.getElementById('totalAmount').textContent = total;
    document.getElementById('convenienceFee').textContent = fee;
    document.getElementById('finalAmount').textContent = final;
    document.getElementById('receiptAmount').textContent = final;
    document.getElementById('basePrice').textContent = base;
  }

  function generateReferenceId() {
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `REF${timestamp}`;
  }

  function generateReceiptDetails() {
    const now = new Date().toLocaleString();
    document.getElementById('receiptDate').textContent = now;
    document.getElementById('receiptReferenceId').textContent = document.getElementById('referenceId').textContent;
    document.getElementById('receiptPaymentMethod').textContent = selectedPayment;
  }

  // --- Payment Method Selection & OTP ---
  let selectedPayment = null;
  let otpTimers = {};

  window.selectPayment = function(method) {
    selectedPayment = method;
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('[id$="Details"]').forEach(el => el.classList.add('hidden'));
    document.querySelector(`#${method}Details`)?.classList.remove('hidden');
    document.querySelector(`[onclick="selectPayment('${method}')']`)?.classList.add('selected');
  }

  window.sendOTP = function(method) {
    Swal.fire({ icon: 'success', title: 'OTP Sent!', text: 'OTP has been sent to your number.' });
    const section = document.getElementById(`${method}OtpSection`);
    if (section) section.classList.remove('hidden');
    startResendCountdown(method);
  }

  window.resendOTP = function(method) {
    sendOTP(method);
  }

  function startResendCountdown(method) {
    let timer = 300;
    const resendLink = document.getElementById(`resend-${method}`);

    if (otpTimers[method]) clearInterval(otpTimers[method]);

    resendLink.textContent = `Resend (${timer}s)`;
    resendLink.style.pointerEvents = 'none';

    otpTimers[method] = setInterval(() => {
      timer--;
      resendLink.textContent = `Resend (${timer}s)`;
      if (timer <= 0) {
        clearInterval(otpTimers[method]);
        resendLink.textContent = 'Resend';
        resendLink.style.pointerEvents = 'auto';
      }
    }, 1000);
  }

  function getEnteredOTP() {
    return [...document.querySelectorAll('.otp-box')].map(input => input.value).join('');
  }

  window.verifyAndProceed = function() {
    if (!selectedPayment) {
      Swal.fire({ icon: 'error', title: 'Select a payment method first!' });
      return;
    }
    if ((selectedPayment === 'ewallet' || selectedPayment === 'bank') && getEnteredOTP() !== '123456') {
      Swal.fire({ icon: 'error', title: 'Invalid OTP', text: 'Please enter correct OTP (123456)' });
      return;
    }
    generateReceiptDetails();
    currentStep = 4;
    showStep(currentStep);
  }

  // --- OTP Input Behavior ---
  document.addEventListener('input', e => {
    if (e.target.classList.contains('otp-box') && e.target.value.length === 1) {
      const next = e.target.nextElementSibling;
      if (next && next.classList.contains('otp-box')) next.focus();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.target.classList.contains('otp-box') && e.key === 'Backspace' && e.target.value === '') {
      const prev = e.target.previousElementSibling;
      if (prev && prev.classList.contains('otp-box')) prev.focus();
    }
  });

  // Step 3 → Step 4 transition
  const goToPaymentBtn = document.getElementById('goToPaymentBtn');
  if (goToPaymentBtn) {
    goToPaymentBtn.addEventListener('click', () => {
      const certType = document.getElementById('certificateType').value;
      document.getElementById('paymentCertificateType').textContent = certType;
      currentStep = 3;
      showStep(currentStep);
    });
  }

  // Step 5: Final Submit
  document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Registration Submitted Successfully!',
      text: 'Your payment and registration have been recorded.',
      confirmButtonColor: '#3b82f6'
    }).then(() => {
      form.dispatchEvent(new Event('submit'));
    });
  });

  // Step 5: Download Receipt PDF
  document.getElementById('downloadReceiptBtn').addEventListener('click', () => {
    const content = document.getElementById('receiptContent');

    if (!content) {
      console.error('Receipt content not found.');
      return;
    }

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'pt', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('payment-receipt.pdf');
    }).catch(error => {
      console.error('Error generating receipt PDF:', error);
    });
  });

  // Initialize default values
  document.getElementById('referenceId').textContent = generateReferenceId();
  updateTotalPrice();
  document.getElementById('quantity').addEventListener('input', updateTotalPrice);

});
