function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const maxStars = 5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<img src="source/star.svg" alt="Full Star">';
    }

    const decimalPart = rating % 1;
    if (decimalPart >= 0.7) {
        starsHTML += '<img src="source/star.svg" alt="Full Star">'+rating; 
    } else if (decimalPart > 0.3) {
        starsHTML += '<img src="source/star-half.svg" alt="Half Star">'+rating;
    }

    const totalStars = fullStars + (decimalPart >= 0.8 ? 1 : (decimalPart > 0.3 ? 1 : 0));
    const remainingStars = maxStars - totalStars;

    for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<img src="source/star-empty.svg" alt="Empty Star">'+rating;
    }

    return starsHTML;
}

function setStarRatings() {
    const starContainers = document.querySelectorAll('.stars');
    starContainers.forEach(container => {
        const rating = parseFloat(container.getAttribute('data-rating'));
        container.innerHTML = generateStars(rating);
    });
}

document.addEventListener('DOMContentLoaded', setStarRatings);




const sections = document.querySelectorAll('div[id]');
const navLinks = document.querySelectorAll('.contents a');

let isScrolling = false;
let scrollTimeout;

function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));

    if (navLinks[index]) {
        navLinks[index].classList.add('active');
    }
}




navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const targetOffset = targetSection.offsetTop;

        window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
        });

        navLinks.forEach((l) => l.classList.remove('active'));
        sections.forEach((section) => section.classList.remove('active-block'));
        link.classList.add('active');
        targetSection.classList.add('active-block');

        // Удаляем подсветку через 1 секунду
        setTimeout(() => {
            targetSection.classList.remove('active-block');
        }, 300); // 1000 миллисекунд = 1 секунда
    });
});

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(changeActiveLink, 100);
    }
});

changeActiveLink();
