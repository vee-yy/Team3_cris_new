function openAboutPopup() {
window.location.href = '../AboutUs/AboutUs.html';
}

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Category Tabs
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqSections = document.querySelectorAll('.faq-questions');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Show selected FAQ section
            faqSections.forEach(section => {
                section.classList.remove('active');
                if (section.dataset.category === category) {
                    section.classList.add('active');
                }
            });
        });
    });
    
    // FAQ Accordion
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        const title = question.querySelector('h3');
        title.addEventListener('click', () => {
            questions.forEach(q => {
                if (q !== question && q.classList.contains('active')) {
                    q.classList.remove('active');
                }
            }); 
           question.classList.toggle('active');
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    document.querySelector('.footer-bottom p').insertAdjacentHTML('beforeend', ' &copy; ');
    document.querySelector('.footer-bottom p').appendChild(yearSpan);
});

  function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('show');
  }
// Feedback Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const feedbackPopup = document.getElementById('feedbackPopup');
  const feedbackTrigger = document.getElementById('feedbackTrigger');
  const closeFeedback = document.getElementById('closeFeedback');
  const feedbackForm = document.getElementById('feedbackForm');
  const stars = document.querySelectorAll('.stars i');
  const ratingValue = document.getElementById('ratingValue');
  
  // Open popup
  feedbackTrigger.addEventListener('click', function() {
    feedbackPopup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
  
  // Close popup
  closeFeedback.addEventListener('click', function() {
    closeFeedbackPopup();
  });
  
  // Close when clicking outside
  feedbackPopup.addEventListener('click', function(e) {
    if (e.target === feedbackPopup) {
      closeFeedbackPopup();
    }
  });
  
  // Star rating functionality
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      ratingValue.value = rating;
      updateStars(rating);
    });
    
    star.addEventListener('mouseover', function() {
      const hoverRating = parseInt(this.getAttribute('data-rating'));
      updateStars(hoverRating, true);
    });
    
    star.addEventListener('mouseout', function() {
      const currentRating = parseInt(ratingValue.value);
      updateStars(currentRating);
    });
  });
  
  // Form submission
  feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const feedbackType = document.getElementById('feedbackType').value;
    const feedbackMessage = document.getElementById('feedbackMessage').value;
    const rating = ratingValue.value;
    const email = document.getElementById('feedbackEmail').value;
    
    // Here you would typically send this data to your server
    console.log({
      type: feedbackType,
      message: feedbackMessage,
      rating: rating,
      email: email
    });
    
    // Show thank you message
    alert('Thank you for your feedback! We appreciate your input.');
    feedbackForm.reset();
    ratingValue.value = '0';
    updateStars(0);
    closeFeedbackPopup();
  });
  
  function closeFeedbackPopup() {
    feedbackPopup.classList.remove('active');
    document.body.style.overflow = ''; 
  }
  
  function updateStars(rating, isHover = false) {
    stars.forEach(star => {
      const starRating = parseInt(star.getAttribute('data-rating'));
      
      star.classList.remove('active', 'hovered');
      
      if (isHover) {
        if (starRating <= rating) {
          star.classList.add('hovered');
        }
      } else {
        if (starRating <= rating) {
          star.classList.add('active');
        }
      }
    });
  }
});


const toggleBtn = document.getElementById('toggleHolidays');
const hiddenHolidays = document.querySelectorAll('.holiday.hidden');
let expanded = false;

const icon = document.createElement('i');
icon.className = 'fas fa-chevron-down';
toggleBtn.prepend(icon);

toggleBtn.addEventListener('click', () => {
  expanded = !expanded;
  toggleBtn.classList.toggle('expanded');
  
  toggleBtn.innerHTML = expanded ? 
    `<i class="fas fa-chevron-up"></i> Show Fewer Holidays` : 
    `<i class="fas fa-chevron-down"></i> Show More Holidays`;
  
  // Animate holidays
  hiddenHolidays.forEach((item, index) => {
    if (expanded) {
      setTimeout(() => {
        item.style.display = 'flex';
        setTimeout(() => {
          item.classList.remove('hidden');
        }, 10);
      }, index * 100);
    } else {
      setTimeout(() => {
        item.classList.add('hidden');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }, index * 50);
    }
  });
  
  if (expanded) {
    setTimeout(() => {
      toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, hiddenHolidays.length * 100 + 100);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const feedbackLink = document.querySelector('a[href="#feedback"]');
  const feedbackTrigger = document.getElementById('feedbackTrigger');
  
  if (feedbackLink) {
    feedbackLink.addEventListener('click', function(e) {
      e.preventDefault();
      feedbackTrigger.classList.add('feedback-shake');
      feedbackTrigger.style.color = '#FFA500';
      setTimeout(() => {
        feedbackTrigger.classList.remove('feedback-shake');
      }, 500);
      setTimeout(() => {
        feedbackTrigger.style.color = '';
      }, 2000);

  })}   
});