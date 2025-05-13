document.addEventListener('DOMContentLoaded', function () {
  // Ensure the DOM is fully loaded before running the script

  //open position button //
  // Smooth scroll to open positions section
  // open position button
  const openPositionsButton = document.querySelector('.open-positions-button');

  if (openPositionsButton) {
    openPositionsButton.addEventListener('click', function (event) {
      event.preventDefault();  // Prevent default anchor link behavior

      // Simulate smooth scrolling for a second (if you want some kind of transition effect before navigation)
      console.log("Starting transition...");

      // Delay the page navigation
    
        window.location.href = openPositionsButton.getAttribute('href');  
  
    });
  } else {
    console.log("Button not found!");
  }




  // Handle parent links and navigation toggle
  const parentLinks = document.querySelectorAll('.parent-link');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  console.log('DOM fully loaded and parsed');

  parentLinks.forEach(link => {
    console.log('Adding click event to parent link:', link);
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const subLinks = this.nextElementSibling;
      console.log('Parent link clicked:', this);

      // Toggle the sub-links visibility
      if (subLinks) {
        subLinks.classList.toggle('show');
      }

      // Toggle the active class on the clicked link
      this.classList.toggle('active');

      // Remove the active class from all other links
      parentLinks.forEach(otherLink => {
        if (otherLink !== this) {
          otherLink.classList.remove('active');
          if (otherLink.nextElementSibling && otherLink.nextElementSibling.classList.contains('sub-links')) {
            otherLink.nextElementSibling.classList.remove('show');
          }
        }
      });
    });
  });




//mobile nav toggle //
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      console.log('Nav toggle clicked');
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      if (navToggle.classList.contains('active')) {
        navToggle.textContent = '✖'; // Change to X
      } else {
        navToggle.textContent = '☰'; // Change back to hamburger
      }
    });
  }
  // mobile chevron arrow //
  const chevrons = document.querySelectorAll('.chevron');
  if (window.innerWidth <= 768) {
    chevrons.forEach(function (chevron) {
      chevron.addEventListener('click', function (event) {
        event.preventDefault();
        const subLinks = this.parentElement.nextElementSibling;
        subLinks.classList.toggle('show');
      });
    });
  }
  // go to top button //
  const goToTopButton = document.getElementById('goToTop');
  const contentWrapper = document.querySelector('.content-wrapper');
  if (goToTopButton && contentWrapper) {
    goToTopButton.addEventListener('click', function () {
      contentWrapper.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Show/hide button based on scroll position
    contentWrapper.addEventListener('scroll', function () {
      if (contentWrapper.scrollTop > 500) {
        goToTopButton.style.display = 'block';
      } else {
        goToTopButton.style.display = 'none';
      }
    });
  }
// animated header  //
  const headers = document.querySelectorAll('.animated-header');
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once the animation is triggered
      }
    });
  }, observerOptions);

  headers.forEach(header => {
    observer.observe(header);
  });

  
//highlight page in sidebar nav links//
  const currentUrl = window.location.pathname;
  const subLinks = document.querySelectorAll('.sub-links a');

  subLinks.forEach(link => {
    if (link.getAttribute('href') === currentUrl) {
      // Expand the parent section
      const parentLink = link.closest('.ceo-link').querySelector('.parent-link');
      parentLink.classList.add('active');

      // Show the sub-links
      const subLinks = parentLink.nextElementSibling;
      if (subLinks) {
        subLinks.classList.add('show');
      }

      // Highlight the current sub-link
      link.classList.add('active-link');
    }
  });

});


