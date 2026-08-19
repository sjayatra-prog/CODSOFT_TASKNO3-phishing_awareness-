// Scroll Progress Bar
window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// Scroll Reveal Animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// Quiz Logic
function checkAnswer(quizId, selectedButton) {
    const quizContainer = document.getElementById(quizId);
    const options = quizContainer.querySelectorAll('.option-btn');
    const feedbackDiv = quizContainer.querySelector('.feedback');
    const isCorrect = selectedButton.getAttribute('data-correct') === 'true';

    // Disable all options
    options.forEach(btn => {
        btn.disabled = true;
        // Show which one was actually correct if they got it wrong
        if (btn.getAttribute('data-correct') === 'true') {
            btn.classList.add('selected-correct');
        }
    });

    // Style the selected button
    if (isCorrect) {
        selectedButton.classList.add('selected-correct');
        feedbackDiv.innerHTML = "<strong>Correct!</strong> Great job identifying the safe course of action.";
        feedbackDiv.className = "feedback success";
    } else {
        selectedButton.classList.add('selected-wrong');
        feedbackDiv.innerHTML = "<strong>Incorrect.</strong> Review the correct answer highlighted above.";
        feedbackDiv.className = "feedback error";
    }

    feedbackDiv.classList.remove('hidden');
}
