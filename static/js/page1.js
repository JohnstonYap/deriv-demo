// QB Bot - Page 1 JavaScript - Enhanced Custom Selects
// Form validation, animations, and sexy custom dropdowns

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

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INITIALIZE CUSTOM SELECTS =====
    initializeCustomSelects();
    
    // ===== FORM VALIDATION =====
    const form = document.getElementById('testForm');
    const urlInput = document.getElementById('url');
    
    // URL validation with visual feedback
    if (urlInput) {
        urlInput.addEventListener('input', function() {
            validateURL(this.value.trim());
        });
        
        urlInput.addEventListener('blur', function() {
            validateURL(this.value.trim());
        });
    }
    
    function validateURL(url) {
        const wrapper = document.querySelector('.url-input-wrapper');
        
        if (!url) {
            wrapper.style.borderColor = '';
            return false;
        }
        
        try {
            new URL(url);
            wrapper.style.borderColor = '#10b981'; // Green for valid
            return true;
        } catch (error) {
            wrapper.style.borderColor = '#ef4444'; // Red for invalid
            return false;
        }
    }
    
    // Form submission validation
    if (form) {
        form.addEventListener('submit', function(e) {
            const url = urlInput.value.trim();
            
            // Check URL
            if (!url) {
                e.preventDefault();
                showNotification('Please enter a URL', 'error');
                urlInput.focus();
                return false;
            }
            
            try {
                new URL(url);
            } catch (error) {
                e.preventDefault();
                showNotification('Please enter a valid URL (e.g., https://example.com)', 'error');
                urlInput.focus();
                return false;
            }
            
            // Check required fields
            const requiredFields = ['environment', 'resolution', 'browser', 'tester_level', 'language'];
            for (const field of requiredFields) {
                const input = document.getElementById(field);
                if (field === 'resolution') {
                    const resolutionGroup = document.getElementById('resolutionGroup');
                    if (resolutionGroup.style.display !== 'none' && !input.value) {
                        e.preventDefault();
                        showNotification('Please select a resolution', 'error');
                        return false;
                    }
                } else if (!input.value) {
                    e.preventDefault();
                    showNotification(`Please select ${field.replace('_', ' ')}`, 'error');
                    return false;
                }
            }
            
            // Check custom inputs
            const browserValue = document.getElementById('browser').value;
            if (browserValue === 'Custom') {
                const customBrowser = document.getElementById('customBrowser');
                if (!customBrowser.value.trim()) {
                    e.preventDefault();
                    showNotification('Please enter custom browser name', 'error');
                    customBrowser.focus();
                    return false;
                }
            }
            
            const testerValue = document.getElementById('tester_level').value;
            if (testerValue === 'Custom') {
                const customTester = document.getElementById('customTester');
                if (!customTester.value.trim()) {
                    e.preventDefault();
                    showNotification('Please enter custom tester level', 'error');
                    customTester.focus();
                    return false;
                }
            }

            const languageValue = document.getElementById('language').value;
            if (languageValue === 'Custom') {
                const customLanguage = document.getElementById('customLanguage');
                if (!customLanguage.value.trim()) {
                    e.preventDefault();
                    showNotification('Please enter custom language', 'error');
                    customLanguage.focus();
                    return false;
                }
            }
            
            // Show loading state
            showLoadingState();
            
            return true;
        });
    }
    
    // ===== CUSTOM SELECT DROPDOWN LOGIC =====
    function initializeCustomSelects() {
        const customSelects = document.querySelectorAll('.custom-select');
        
        customSelects.forEach(select => {
            const trigger = select.querySelector('.select-trigger');
            const options = select.querySelectorAll('.select-option');
            const valueDisplay = select.querySelector('.select-value');
            const hiddenInput = select.querySelector('input[type="hidden"]');
            const selectName = select.getAttribute('data-name');
            
            // Toggle dropdown
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Close other selects
                customSelects.forEach(s => {
                    if (s !== select) s.classList.remove('active');
                });
                
                // Toggle current
                select.classList.toggle('active');
            });
            
            // Option selection
            options.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const value = this.getAttribute('data-value');
                    const text = this.textContent.trim();
                    
                    // Update display
                    valueDisplay.textContent = text;
                    valueDisplay.classList.remove('placeholder');
                    
                    // Update hidden input
                    hiddenInput.value = value;
                    
                    // Remove selected from all options
                    options.forEach(opt => opt.classList.remove('selected'));
                    
                    // Add selected to current option
                    this.classList.add('selected');
                    
                    // Close dropdown
                    select.classList.remove('active');
                    
                    // Handle special cases
                    if (selectName === 'environment') {
                        handleEnvironmentChange(value);
                    } else if (selectName === 'browser' && value === 'Custom') {
                        showCustomInput('customBrowserWrapper');
                    } else if (selectName === 'browser' && value !== 'Custom') {
                        hideCustomInput('customBrowserWrapper');
                    } else if (selectName === 'tester_level' && value === 'Custom') {
                        showCustomInput('customTesterWrapper');
                    } else if (selectName === 'tester_level' && value !== 'Custom') {
                        hideCustomInput('customTesterWrapper');
                    } else if (selectName === 'lang_level' && value === 'Custom') {
                        showCustomInput('customLanguageWrapper');
                    } else if (selectName === 'lang_level' && value !== 'Custom') {
                        hideCustomInput('customLanguageWrapper');
                    }
                    
                    // Visual feedback
                    select.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        select.style.transform = '';
                    }, 200);
                });
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            customSelects.forEach(select => {
                select.classList.remove('active');
            });
        });
    }
    
    // ===== ENVIRONMENT CHANGE HANDLER =====
    function handleEnvironmentChange(environment) {
        const resolutionGroup = document.getElementById('resolutionGroup');
        const resolutionOptions = document.getElementById('resolutionOptions');
        const resolutionSelect = document.querySelector('[data-name="resolution"]');
        const resolutionValue = resolutionSelect.querySelector('.select-value');
        const resolutionInput = document.getElementById('resolution');
        
        // Clear current options
        resolutionOptions.innerHTML = '';
        resolutionValue.textContent = 'Select Resolution';
        resolutionValue.classList.add('placeholder');
        resolutionInput.value = '';
        
        // Get resolutions for environment
        const envResolutions = resolutions[environment] || [];
        
        if (envResolutions.length > 0) {
            // Add new options
            envResolutions.forEach(res => {
                const option = document.createElement('div');
                option.className = 'select-option';
                option.setAttribute('data-value', res);
                option.innerHTML = `
                    <span class="option-icon">📐</span>
                    <span>${res}</span>
                `;
                
                // Add click handler
                option.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const value = this.getAttribute('data-value');
                    const text = this.textContent.trim();
                    
                    resolutionValue.textContent = text;
                    resolutionValue.classList.remove('placeholder');
                    resolutionInput.value = value;
                    
                    // Update selected state
                    resolutionOptions.querySelectorAll('.select-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    
                    resolutionSelect.classList.remove('active');
                    
                    // Visual feedback
                    resolutionSelect.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        resolutionSelect.style.transform = '';
                    }, 200);
                });
                
                resolutionOptions.appendChild(option);
            });
            
            // Show resolution group with animation
            resolutionGroup.style.display = 'block';
            resolutionGroup.style.opacity = '0';
            resolutionGroup.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                resolutionGroup.style.transition = 'all 0.3s ease';
                resolutionGroup.style.opacity = '1';
                resolutionGroup.style.transform = 'translateY(0)';
                
                // Add click handler to reset transform when resolution select is clicked
                const resolutionTrigger = resolutionSelect.querySelector('.select-trigger');
                if (resolutionTrigger) {
                    resolutionTrigger.addEventListener('click', function(e) {
                        resolutionGroup.style.transform = 'none';
                    }, { once: true });
                }
            }, 100);
        } else {
            resolutionGroup.style.display = 'none';
        }
    }
    
    // ===== SHOW/HIDE CUSTOM INPUTS =====
    function showCustomInput(wrapperId) {
        const wrapper = document.getElementById(wrapperId);
        if (wrapper) {
            wrapper.style.display = 'block';
            wrapper.style.animation = 'slideDown 0.3s ease';
            wrapper.querySelector('input').focus();
        }
    }
    
    function hideCustomInput(wrapperId) {
        const wrapper = document.getElementById(wrapperId);
        if (wrapper) {
            wrapper.style.display = 'none';
            wrapper.querySelector('input').value = '';
        }
    }
    
    // ===== LOADING STATE =====
    function showLoadingState() {
        const submitBtn = document.querySelector('.submit-button');
        if (submitBtn) {
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="50" opacity="0.3"/>
                    <path d="M10 2a8 8 0 018 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Running Test...
            `;
            submitBtn.disabled = true;
        }
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    ${type === 'error' ? 
                        '<path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"/>' :
                        '<path d="M9 12L11 14L15 10M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"/>'
                    }
                </svg>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        addNotificationStyles();
    }
    
    function addNotificationStyles() {
        if (document.getElementById('notification-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border: 3px solid #fef3c7;
                border-radius: 12px;
                padding: 16px 20px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
                min-width: 300px;
                max-width: 500px;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
            }
            
            .notification-content svg {
                flex-shrink: 0;
            }
            
            .notification-content span {
                font-size: 14px;
                font-weight: 600;
                color: #1e293b;
            }
            
            .notification-error {
                border-color: #fecaca;
            }
            
            .notification-error svg {
                color: #ef4444;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 24px;
                color: #64748b;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: all 0.2s;
            }
            
            .notification-close:hover {
                background: #f8fafc;
                color: #1e293b;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== URL PLACEHOLDER ANIMATION =====
    if (urlInput) {
        const placeholders = [
            'https://example.com',
            'https://yoursite.com',
            'https://myapp.io',
            'https://startup.co'
        ];
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % placeholders.length;
            urlInput.setAttribute('placeholder', placeholders[currentIndex]);
        }, 3000);
    }
    
    // ===== HISTORY ITEMS ANIMATION =====
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // ===== LOGO CLICK EASTER EGG =====
    const logo = document.querySelector('.logo-icon');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                this.style.animation = 'spin 0.5s ease';
                setTimeout(() => {
                    this.style.animation = 'float 3s ease-in-out infinite';
                }, 500);
                
                showNotification('QB Bot activated! 🚀', 'info');
                clickCount = 0;
            }
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            if (form) form.requestSubmit();
        }
        
        if (e.key === 'Escape' && urlInput) {
            urlInput.value = '';
            urlInput.focus();
        }
    });
    
    // ===== AUTO-FILL FROM CLIPBOARD =====
    if (urlInput && !urlInput.value) {
        navigator.clipboard.readText().then(text => {
            try {
                new URL(text);
                const hint = document.createElement('div');
                hint.className = 'clipboard-hint';
                hint.innerHTML = `
                    <span>URL detected in clipboard</span>
                    <button type="button" onclick="document.getElementById('url').value = '${text.replace(/'/g, "\\'")}'; this.parentElement.remove();">
                        Paste
                    </button>
                `;
                urlInput.parentElement.parentElement.insertBefore(hint, urlInput.parentElement);
                
                const style = document.createElement('style');
                style.textContent = `
                    .clipboard-hint {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 16px;
                        background: #fef3c7;
                        border: 2px solid #fde68a;
                        border-radius: 8px;
                        margin-bottom: 12px;
                        font-size: 13px;
                        color: #1e293b;
                        animation: slideDown 0.3s ease;
                    }
                    
                    .clipboard-hint button {
                        background: #fbbf24;
                        color: white;
                        border: none;
                        padding: 6px 16px;
                        border-radius: 6px;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    
                    .clipboard-hint button:hover {
                        background: #f59e0b;
                        transform: scale(1.05);
                    }
                `;
                document.head.appendChild(style);
            } catch (e) {
                // Not a valid URL
            }
        }).catch(() => {
            // Clipboard permission denied
        });
    }
});