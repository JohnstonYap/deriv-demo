// Page3 Loading State Management with Test Item Progress
document.addEventListener('DOMContentLoaded', () => {
    const loadingState = document.getElementById('loadingState');
    const resultsState = document.getElementById('resultsState');
    const loadingProgressRing = document.querySelector('#loadingState .progress-ring');
    const testItems = document.querySelectorAll('#loadingState .test-item');
    const resultsProgressRing = document.querySelector('#resultsState .score-circle .progress-ring');
    const metricsGrid = document.querySelector('#resultsState .metrics-grid');
    const statsGrid = document.querySelector('#resultsState .stats-grid');
    const resultsContainer = document.querySelector('#resultsState .results-container');

    if (!loadingProgressRing || !testItems.length) {
        // No loading animation needed, show results
        if (resultsState) resultsState.style.display = '';
        return;
    }

    // ===== LOADING PHASE =====
    const r = parseFloat(loadingProgressRing.getAttribute('r')) || 90;
    const circumference = 2 * Math.PI * r;

    // Set initial dash for loading ring (full circle starting point)
    loadingProgressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    loadingProgressRing.style.strokeDashoffset = circumference;

    // Animation parameters
    const totalDuration = 4000; // total animation time in ms
    const itemDuration = 800; // time per test item phase
    const startDelay = 200;

    // Start loading animation
    requestAnimationFrame(() => {
        loadingProgressRing.style.transition = `stroke-dashoffset ${totalDuration}ms cubic-bezier(.2,.85,.32,1)`;
        loadingProgressRing.style.strokeDashoffset = 0; // Animate to full circle
    });

    // Stagger test item status updates
    testItems.forEach((item, index) => {
        const delay = startDelay + index * itemDuration;

        // Waiting → Checking
        setTimeout(() => {
            item.setAttribute('data-status', 'checking');
            const statusEl = item.querySelector('.test-status');
            if (statusEl) statusEl.textContent = 'Checking';
        }, delay);

        // Checking → Done
        setTimeout(() => {
            item.setAttribute('data-status', 'done');
            const statusEl = item.querySelector('.test-status');
            if (statusEl) statusEl.textContent = 'Done';
        }, delay + 600);
    });

    // ===== TRANSITION TO RESULTS PHASE =====
    setTimeout(() => {
        // Hide loading state
        if (loadingState) loadingState.style.display = 'none';

        // Show results state
        if (resultsState) resultsState.style.display = '';

        // Reset reveal classes for staggered appear
        [metricsGrid, statsGrid, resultsContainer].forEach(el => {
            if (el) el.classList.remove('revealed');
        });

        // Animate results score ring (full circle in shorter time)
        if (resultsProgressRing) {
            const resultsR = parseFloat(resultsProgressRing.getAttribute('r')) || 90;
            const resultsCircumference = 2 * Math.PI * resultsR;

            resultsProgressRing.style.strokeDasharray = `${resultsCircumference} ${resultsCircumference}`;
            resultsProgressRing.style.strokeDashoffset = resultsCircumference;

            requestAnimationFrame(() => {
                resultsProgressRing.style.transition = `stroke-dashoffset 1200ms cubic-bezier(.2,.85,.32,1)`;
                resultsProgressRing.style.strokeDashoffset = 0;
            });
        }

        // Reveal metrics/stats/results in sequence
        setTimeout(() => {
            if (metricsGrid) metricsGrid.classList.add('revealed');
        }, 100);

        setTimeout(() => {
            if (statsGrid) statsGrid.classList.add('revealed');
        }, 400);

        setTimeout(() => {
            if (resultsContainer) resultsContainer.classList.add('revealed');
        }, 700);

    }, totalDuration + 200);
});
