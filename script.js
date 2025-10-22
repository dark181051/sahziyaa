// script.js

// --- 1. Logic for index.html (Initial Hii) ---
function sayHii() {
    const bearImage = document.getElementById('bearImage');
    
    // 1. Trigger the visual "feast" response (the shake animation)
    bearImage.classList.add('shake');

    // 2. Open the missyou.html page after a short delay
    setTimeout(() => {
        window.location.href = 'missyou.html';
    }, 400); 

    // 3. Cleanup: Remove the shake class after the animation ends
    setTimeout(() => {
        bearImage.classList.remove('shake');
    }, 500); 
}


// --- 2. Logic for missyou.html (Do you miss me?) ---
function handleResponse(answer) {
    // Disable buttons to prevent further clicks (optional, since page navigates)
    const btnYes = document.getElementById('btnYes');
    const btnOfCourse = document.getElementById('btnOfCourse');
    const btnNo = document.getElementById('btnNo');

    if (btnYes) btnYes.disabled = true;
    if (btnOfCourse) btnOfCourse.disabled = true;
    if (btnNo) btnNo.disabled = true;

    if (answer === 'Of Course') {
        // Option 1: Opens the final "I miss you too" page with a firework animation
        window.location.href = 'final.html';

    } else if (answer === 'Yes') {
        // Option 2: Opens the final "Aapne hisab se dekh le" page
         window.location.href = 'final_no.html';

    } else if (answer === 'No') {
        // Option 3: Opens the new "Really" challenge page
        window.location.href = 'really.html'; 
    }
}


// --- 3. Logic for really.html (The "Fly Away" Challenge) ---
function handleReallyResponse(answer) { 
    if (answer === 'No') {
        // If they stick to 'No', opens the final "Aapne hisab se dekh le" page
        window.location.href = 'final_no.html';
    }
}

// Function to attach the "fly away" logic to the "Yes" button
function setupFlyAwayButton() {
    const yesButton = document.getElementById('reallyBtnYes');
    if (yesButton) {
        // Attach logic to prevent the user from clicking 'Yes'
        yesButton.addEventListener('mouseover', flyAway);
        yesButton.addEventListener('click', flyAway); 
    }
}

// The core "Fly Away" logic
function flyAway(event) {
    const button = event.currentTarget;
    const container = button.closest('.container');
    
    if (!container) return; 
    
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    // Calculate maximum movement range
    const maxMoveX = containerRect.width - buttonRect.width;
    const maxMoveY = containerRect.height - buttonRect.height;
    
    // Generate a random position within the container bounds
    const newX = Math.random() * maxMoveX * 0.5; 
    const newY = Math.random() * maxMoveY * 0.5;

    // Apply the position transform (SMOOTHNESS: Use translateZ(0))
    button.style.position = 'absolute';
    button.style.left = '0'; 
    button.style.top = '0';
    
    button.style.transform = `translate(${newX}px, ${newY}px) scale(1.1) translateZ(0)`; 
    // SMOOTHNESS: Use a custom cubic-bezier for a snappier feel
    button.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; 
    button.style.boxShadow = '0 8px 0 rgba(255, 64, 129, 0.5)';

    event.preventDefault();
}


// Function to run after the missyou.html page loads (for 3D bear)
function add3DAnimationToMissYou() {
    const bearImage = document.getElementById('missYouBear');
    if (bearImage) {
        bearImage.classList.add('greeting-image'); 
        bearImage.style.transform = 'translateZ(25px)'; 
    }
}

// Execute setup for specific pages
if (document.title === 'Really?') { 
    document.addEventListener('DOMContentLoaded', setupFlyAwayButton);
} else if (document.title === 'Do You Miss Me?') {
    document.addEventListener('DOMContentLoaded', add3DAnimationToMissYou);
}