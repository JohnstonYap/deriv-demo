// Resolution options based on environment
const resolutions = {
    'Web': [
        '1920x1080 (Full HD)',
        '1366x768 (Laptop)',
        '1440x900 (Desktop)',
        '1536x864 (Desktop)',
        '1280x720 (HD)',
        '2560x1440 (2K)',
        '3840x2160 (4K)'
    ],
    'iOS': [
        '375x667 (iPhone SE)',
        '390x844 (iPhone 13/14)',
        '393x852 (iPhone 14 Pro)',
        '428x926 (iPhone 14 Plus)',
        '430x932 (iPhone 14 Pro Max)',
        '744x1133 (iPad Mini)',
        '810x1080 (iPad)',
        '834x1194 (iPad Pro 11")',
        '1024x1366 (iPad Pro 12.9")'
    ],
    'Android': [
        '360x640 (Small Phone)',
        '360x800 (Medium Phone)',
        '412x915 (Pixel 7)',
        '384x854 (Samsung Galaxy)',
        '360x780 (Standard)',
        '768x1024 (Tablet)',
        '800x1280 (Tablet 10")'
    ],
    'Desktop': [
        '1920x1080 (Full HD)',
        '1366x768 (Standard)',
        '1440x900 (MacBook)',
        '1536x864 (Surface)',
        '1680x1050 (Wide)',
        '2560x1440 (2K QHD)',
        '3840x2160 (4K UHD)',
        '5120x2880 (5K)'
    ]
};

// Test Date removed: flatpickr initialization removed

// Handle environment change to update resolutions
document.querySelectorAll('input[name="environment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const resolutionSelect = document.getElementById('resolution');
        const resolutionGroup = document.getElementById('resolutionGroup');
        const selectedEnv = this.value;

        resolutionSelect.innerHTML = '<option value="">Select Resolution</option>';

        if (selectedEnv && resolutions[selectedEnv]) {
            resolutions[selectedEnv].forEach(res => {
                const option = document.createElement('option');
                option.value = res;
                option.textContent = res;
                resolutionSelect.appendChild(option);
            });

            // show + animate the resolution group
            resolutionGroup.style.display = 'block';
            resolutionGroup.classList.remove('pop-in');
            void resolutionGroup.offsetWidth;
            resolutionGroup.classList.add('pop-in');
        } else {
            // hide when no selection
            resolutionGroup.classList.remove('pop-in');
            resolutionGroup.style.display = 'none';
        }
    });
});

// Handle browser "Others" option
document.querySelectorAll('input[name="browser"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const browserOtherGroup = document.getElementById('browserOtherGroup');
        const browserOtherInput = document.getElementById('browserOther');
        
        if (this.value === 'Others') {
            browserOtherGroup.style.display = 'block';
            browserOtherInput.required = true;
        } else {
            browserOtherGroup.style.display = 'none';
            browserOtherInput.required = false;
            browserOtherInput.value = '';
        }
    });
});

// Handle tester level "Custom" option
document.querySelectorAll('input[name="tester_level"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const testerCustomGroup = document.getElementById('testerCustomGroup');
        const testerCustomInput = document.getElementById('testerCustom');
        
        if (this.value === 'Custom') {
            testerCustomGroup.style.display = 'block';
            testerCustomInput.required = true;
        } else {
            testerCustomGroup.style.display = 'none';
            testerCustomInput.required = false;
            testerCustomInput.value = '';
        }
    });
});

// Form validation
document.getElementById('configForm').addEventListener('submit', function(e) {
    const urlInput = document.getElementById('urlInput');
    
    // Validate URL
    if (!urlInput.value.trim()) {
        e.preventDefault();
        alert('Please enter a URL');
        return false;
    }
    
    try {
        new URL(urlInput.value.trim());
    } catch (error) {
        e.preventDefault();
        alert('Please enter a valid URL (e.g., https://example.com)');
        return false;
    }
    
    // Check if environment is selected
    const environmentSelected = document.querySelector('input[name="environment"]:checked');
    if (!environmentSelected) {
        e.preventDefault();
        alert('Please select an environment');
        return false;
    }
    
    // Check if resolution is selected
    const resolutionSelect = document.getElementById('resolution');
    if (!resolutionSelect.value) {
        e.preventDefault();
        alert('Please select a resolution');
        return false;
    }
    
    // Check if browser is selected
    const browserSelected = document.querySelector('input[name="browser"]:checked');
    if (!browserSelected) {
        e.preventDefault();
        alert('Please select a browser');
        return false;
    }
    
    // Check if tester level is selected
    const testerLevelSelected = document.querySelector('input[name="tester_level"]:checked');
    if (!testerLevelSelected) {
        e.preventDefault();
        alert('Please select a tester level');
        return false;
    }
    
    return true;
});

// Animate score rings on page load
document.addEventListener('DOMContentLoaded', function() {
    const scoreItems = document.querySelectorAll('.history-score');
    
    scoreItems.forEach(item => {
        const scoreValue = item.closest('.history-item').querySelector('.score-number');
        if (scoreValue) {
            const score = parseInt(scoreValue.textContent);
            const circle = item.querySelector('.score-progress');
            
            if (circle) {
                // Calculate stroke color based on score
                let color = '#10b981'; // Green
                if (score < 50) {
                    color = '#ef4444'; // Red
                } else if (score < 75) {
                    color = '#f59e0b'; // Orange
                }
                circle.setAttribute('stroke', color);
            }
        }
    });
});

// Show config sections only when a valid URL is entered
function isValidUrl(value) {
    if (!value) return false;
    try {
        new URL(value);
        return true;
    } catch (e) {
        return false;
    }
}

const urlInput = document.getElementById('urlInput');
const configSections = document.getElementById('configSections');
function toggleConfigSections() {
    if (!urlInput || !configSections) return;
    if (isValidUrl(urlInput.value.trim())) {
        configSections.style.display = '';
    } else {
        configSections.style.display = 'none';
    }
}

if (urlInput) {
    urlInput.addEventListener('input', toggleConfigSections);
    urlInput.addEventListener('blur', toggleConfigSections);
}

document.addEventListener('DOMContentLoaded', function() {
    toggleConfigSections();
});