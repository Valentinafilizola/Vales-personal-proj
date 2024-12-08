document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
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
});
