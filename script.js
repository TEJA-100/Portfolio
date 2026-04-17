document.addEventListener('DOMContentLoaded', function () {


    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });


    const animateOnScroll = function () {
        const elements = document.querySelectorAll(
            '.project-card, .cert-card, .achievement-item, .education-item, .skill-category'
        );

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    setTimeout(animateOnScroll, 300);
    window.addEventListener('scroll', animateOnScroll);

    
    emailjs.init("rilVAIOmGF41FQxDl"); 

    const contactForm = document.getElementById('contactForm');
    const btn = document.getElementById('sendBtn');
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            btn.disabled = true;
            btn.innerText = "Sending...";

            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
            };

            emailjs.send("service_zqdsdfl", "template_xq8g7s5", templateParams)
                .then(() => {
                    successMsg.innerText = "✅ Message sent successfully!";
                    successMsg.style.display = "block";
                    errorMsg.style.display = "none";

                    contactForm.reset();
                })
                .catch((error) => {
                    errorMsg.innerText = "❌ Failed to send message. Try again.";
                    errorMsg.style.display = "block";
                    successMsg.style.display = "none";

                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    btn.disabled = false;
                    btn.innerText = "Send Message";
                });
        });
    }

});


const toggle = document.getElementById("themeToggle");

if (toggle) {
    toggle.onclick = () => {
        document.body.dataset.theme =
            document.body.dataset.theme === "dark" ? "light" : "dark";
    };
}