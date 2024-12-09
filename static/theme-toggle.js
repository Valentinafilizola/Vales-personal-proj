document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const startButton = document.querySelector('.start-button');
    console.log("DOM loaded, initializing theme toggle");

    if (!toggleButton) {
        console.log("Error: Theme toggle button not found!");
        return;
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        console.log(`Saved theme: ${savedTheme}`);
        document.body.classList.toggle('light-mode', savedTheme === 'light');
        toggleButton.textContent = savedTheme === 'light' ? '🌙' : '🌞';
    }

    // Toggle theme on button click
    toggleButton.addEventListener('click', () => {
        const isLightMode = document.body.classList.toggle('light-mode');
        toggleButton.textContent = isLightMode ? '🌙' : '🌞';

        // Save preference to localStorage
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });

    // Dynamic bending effect based on mouse position
    startButton.addEventListener('mousemove', (e) => {
        const buttonRect = startButton.getBoundingClientRect();
        const offsetX = e.clientX - buttonRect.left;
        const offsetY = e.clientY - buttonRect.top;

        const midX = buttonRect.width / 2;
        const midY = buttonRect.height / 2;

        const diffX = (offsetX - midX) / midX;
        const diffY = (offsetY - midY) / midY;

        // Apply more dynamic and fluid distortions
        const scale = 1 + Math.abs(diffX) * 0.2 + Math.abs(diffY) * 0.2;
        const skewX = diffY * 15; // Skew the button along the X-axis based on Y position
        const skewY = diffX * 15; // Skew the button along the Y-axis based on X position
        const borderRadius = 15 + Math.abs(diffX) * 30 + Math.abs(diffY) * 30; // Fluid border radius based on position

        // Apply the transformations and border radius for the "water-like" effect
        startButton.style.transform = `scale(${scale}) skewX(${skewX}deg) skewY(${skewY}deg)`;
        startButton.style.borderRadius = `${borderRadius}%`;
        startButton.style.transition = 'none'; // Disable transition during mouse move for smoother effect
    });

    // Reset the transformation when mouse leaves the button
    startButton.addEventListener('mouseleave', () => {
        startButton.style.transform = 'scale(1) skewX(0deg) skewY(0deg)';
        startButton.style.borderRadius = '8%'; // Reset to original border radius
        startButton.style.transition = 'transform 0.4s cubic-bezier(0.39, 0.575, 0.565, 1), border-radius 0.4s ease-out'; // Re-enable transition
    });
});
