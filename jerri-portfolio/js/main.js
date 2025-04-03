(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);

(function () {
    emailjs.init("cTgyNUJIC5JeC7E7i"); // Replace with your EmailJS Public Key
})();
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        from_name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    // Send email using EmailJS
    emailjs.send("service_qnqvi5j", "template_1p04hi4", formData)
        .then(response => {
            const statusMessage = document.getElementById("statusMessage");
            statusMessage.innerHTML = '<span class="text-success">Message sent successfully!</span>';

            // Reset form after success
            document.getElementById("contactForm").reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                statusMessage.innerHTML = "";
            }, 5000);
        })
        .catch(error => {

            const statusMessage = document.getElementById("statusMessage");
            statusMessage.innerHTML = '<span class="text-danger">Failed to send message. Try again later.</span>';

            // Hide error message after 5 seconds
            setTimeout(() => {
                statusMessage.innerHTML = "";
            }, 5000);

            console.error("Error:", error);
        });
});


// cv download section

const resumePath = 'assets/gyaneswara-angular.docx'; // Update with the correct file path

// Download CV Functionality
document.getElementById('downloadBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'My_Resume.docx'; // Sets the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Show success popup after download
    setTimeout(() => {
        alert('✅ Successfully downloaded resume!');
    }, 500);
});

// View CV Functionality
document.getElementById('viewBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    window.open('https://docs.google.com/gview?url=' + window.location.origin + '/' + resumePath, '_blank');
});



//blog section popup
// document.addEventListener("DOMContentLoaded", function () {
//     const blogSection = document.getElementById('blog');
//     const popup = document.getElementById('popup');

//     // Create Intersection Observer
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 console.log("Blog section is visible"); // Debugging
//                 popup.style.display = 'block'; // Show popup
//                 setTimeout(() => {
//                     popup.style.display = 'none'; // Hide after 3 seconds
//                 }, 3000);
//             }
//         });
//     }, { threshold: 0.3 }); // 30% visibility triggers popup

//     // Observe the Blog section
//     observer.observe(blogSection);
// });

document.addEventListener("DOMContentLoaded", function () {
    // Select the sections to monitor
    const sectionsToUpdate = [
        { id: 'blog', message: '⚠️ Blog section is still updating!' },
        { id: 'service', message: '⚠️ Services section is still updating!' },
        { id: 'portfolio', message: '⚠️ Portfolio section is still updating!' }
    ];

    const popup = document.getElementById('popup');

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the message for the corresponding section
                const sectionData = sectionsToUpdate.find(section => section.id === entry.target.id);
                if (sectionData) {
                    popup.textContent = sectionData.message; // Update popup message
                    popup.style.display = 'block'; // Show popup
                    setTimeout(() => {
                        popup.style.display = 'none'; // Hide after 3 seconds
                    }, 3000);
                }
            }
        });
    }, { threshold: 0.3 }); // 30% visibility triggers popup

    // Observe all sections
    sectionsToUpdate.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
    });
});