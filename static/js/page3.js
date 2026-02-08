// QB Bot - Page 2 JavaScript
// Dashboard animations, interactions, and visual effects

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ANIMATED SCORE REVEAL =====
    animateOverallScore();
    
    // ===== ANIMATE KPI CARDS =====
    animateKPICards();
    
    // ===== PROGRESS BARS ANIMATION =====
    animateProgressBars();
    
    // ===== STAGGER DASHBOARD CARDS =====
    staggerDashboardCards();
    
    // ===== TABLE ROW HIGHLIGHTS =====
    enhanceTableInteractions();
    
    // ===== ISSUE CARDS INTERACTIONS =====
    enhanceIssueCards();
    
    // ===== FILTER AND SEARCH (if needed) =====
    initializeFilters();
    
    // ===== EXPORT FUNCTIONALITY =====
    enhanceExportButton();
    
    // ===== TOOLTIPS =====
    initializeTooltips();
    
    // ===== SCORE CIRCLE ANIMATION =====
    function animateOverallScore() {
        const scoreCircle = document.querySelector('.overall-score-badge .score-circle circle:last-child');
        const scoreValue = document.querySelector('.score-value');
        
        if (scoreCircle && scoreValue) {
            const targetScore = parseInt(scoreValue.textContent);
            const circumference = 2 * Math.PI * 30; // r=30
            
            // Start from 0
            scoreCircle.style.strokeDasharray = `0 ${circumference}`;
            scoreValue.textContent = '0';
            
            // Animate to target
            let currentScore = 0;
            const duration = 1500; // 1.5 seconds
            const startTime = performance.now();
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out-cubic)
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                currentScore = Math.floor(targetScore * easeProgress);
                scoreValue.textContent = currentScore;
                
                // Update circle
                const offset = (currentScore / 100) * circumference;
                scoreCircle.style.strokeDasharray = `${offset} ${circumference}`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }
            
            requestAnimationFrame(animate);
        }
    }
    
    // ===== ANIMATE KPI VALUES =====
    function animateKPICards() {
        const kpiCards = document.querySelectorAll('.kpi-card');
        
        kpiCards.forEach((card, index) => {
            const valueElement = card.querySelector('.kpi-value');
            if (!valueElement) return;
            
            const targetValue = parseInt(valueElement.textContent);
            
            // Delay each card
            setTimeout(() => {
                // Fade in card
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    
                    // Animate number
                    animateNumber(valueElement, 0, targetValue, 800);
                }, 50);
            }, index * 150);
        });
    }
    
    // ===== NUMBER ANIMATION HELPER =====
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeProgress);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // ===== PROGRESS BARS ANIMATION =====
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        // Reset all bars to 0
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.setAttribute('data-target', targetWidth);
            bar.style.width = '0%';
        });
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-target');
                    
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // ===== STAGGER DASHBOARD CARDS =====
    function staggerDashboardCards() {
        const cards = document.querySelectorAll('.dashboard-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // ===== ENHANCE TABLE INTERACTIONS =====
    function enhanceTableInteractions() {
        const tables = document.querySelectorAll('.test-table tbody');
        
        tables.forEach(tbody => {
            const rows = tbody.querySelectorAll('tr');
            
            rows.forEach(row => {
                // Add click to expand (if needed)
                row.addEventListener('click', function() {
                    // Could add expandable details here
                    this.style.backgroundColor = '#fefce8';
                    setTimeout(() => {
                        this.style.backgroundColor = '';
                    }, 300);
                });
                
                // Hover sound effect (visual only)
                row.addEventListener('mouseenter', function() {
                    this.style.transition = 'all 0.2s ease';
                });
            });
        });
    }
    
    // ===== ENHANCE ISSUE CARDS =====
    function enhanceIssueCards() {
        const issueCards = document.querySelectorAll('.issue-card');
        
        issueCards.forEach((card, index) => {
            // Stagger animation
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, 800 + (index * 150));
            
            // Click to copy issue ID
            const issueId = card.querySelector('.issue-id');
            if (issueId) {
                issueId.style.cursor = 'pointer';
                issueId.setAttribute('title', 'Click to copy');
                
                issueId.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const id = this.textContent;
                    
                    navigator.clipboard.writeText(id).then(() => {
                        const originalText = this.textContent;
                        this.textContent = 'Copied!';
                        this.style.backgroundColor = '#10b981';
                        this.style.color = 'white';
                        
                        setTimeout(() => {
                            this.textContent = originalText;
                            this.style.backgroundColor = '';
                            this.style.color = '';
                        }, 1500);
                    });
                });
            }
            
            // Expandable issue details (toggle)
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
                
                if (this.classList.contains('expanded')) {
                    this.style.borderColor = '#fbbf24';
                } else {
                    this.style.borderColor = '';
                }
            });
        });
    }
    
    // ===== INITIALIZE FILTERS =====
    function initializeFilters() {
        // Add filter buttons above tables if needed
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;
        
        // Could add filters here:
        // - Filter by status (Pass/Fail/Warning)
        // - Filter by category
        // - Search functionality
    }
    
    // ===== ENHANCE EXPORT BUTTON =====
    function enhanceExportButton() {
        const exportBtn = document.querySelector('a[href*="download-results"]');
        
        if (exportBtn) {
            exportBtn.addEventListener('click', function(e) {
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Show export notification
                showNotification('Generating report...', 'info');
            });
        }
    }
    
    // ===== INITIALIZE TOOLTIPS =====
    function initializeTooltips() {
        // Add tooltips to severity badges
        const severityBadges = document.querySelectorAll('.severity-badge');
        
        severityBadges.forEach(badge => {
            const severity = badge.classList.contains('high') ? 'high' :
                           badge.classList.contains('medium') ? 'medium' : 'low';
            
            const tooltips = {
                'high': 'Critical issue - requires immediate attention',
                'medium': 'Important issue - should be fixed soon',
                'low': 'Minor issue - fix when convenient'
            };
            
            badge.setAttribute('title', tooltips[severity]);
        });
        
        // Add tooltips to status badges
        const statusBadges = document.querySelectorAll('.status-badge');
        
        statusBadges.forEach(badge => {
            if (badge.classList.contains('pass')) {
                badge.setAttribute('title', 'Test passed successfully');
            } else if (badge.classList.contains('fail')) {
                badge.setAttribute('title', 'Test failed - needs attention');
            } else if (badge.classList.contains('warning')) {
                badge.setAttribute('title', 'Test passed with warnings');
            }
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    ${type === 'info' ? 
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
        }, 3000);
        
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
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                flex: 1;
            }
            
            .notification-content svg {
                flex-shrink: 0;
                color: #fbbf24;
            }
            
            .notification-content span {
                font-size: 14px;
                font-weight: 600;
                color: #1e293b;
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
        `;
        document.head.appendChild(style);
    }
    
    // ===== STAR RATING ANIMATION =====
    const starRatings = document.querySelectorAll('.star-rating');
    starRatings.forEach(rating => {
        const stars = rating.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0) rotate(-180deg)';
            
            setTimeout(() => {
                star.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                star.style.opacity = '1';
                star.style.transform = 'scale(1) rotate(0deg)';
            }, 1200 + (index * 100));
        });
    });
    
    // ===== SCROLL TO TOP BUTTON =====
    createScrollToTopButton();
    
    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M12 5L5 12M12 5L19 12"/>
            </svg>
        `;
        button.setAttribute('title', 'Scroll to top');
        
        document.body.appendChild(button);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        });
        
        // Scroll to top on click
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .scroll-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                border: none;
                border-radius: 12px;
                color: white;
                cursor: pointer;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transform: scale(0);
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .scroll-to-top.visible {
                opacity: 1;
                transform: scale(1);
            }
            
            .scroll-to-top:hover {
                transform: scale(1.1);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            
            .scroll-to-top:active {
                transform: scale(0.95);
            }
            
            @media (max-width: 768px) {
                .scroll-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== PRINT OPTIMIZATION =====
    window.addEventListener('beforeprint', () => {
        // Expand all issue cards before printing
        document.querySelectorAll('.issue-card').forEach(card => {
            card.classList.add('expanded');
        });
    });
    
    window.addEventListener('afterprint', () => {
        // Collapse issue cards after printing
        document.querySelectorAll('.issue-card').forEach(card => {
            card.classList.remove('expanded');
        });
    });
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + P for print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
        
        // Ctrl/Cmd + D for download
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const downloadBtn = document.querySelector('a[href*="download-results"]');
            if (downloadBtn) downloadBtn.click();
        }
        
        // Escape to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // ===== PERFORMANCE MONITORING =====
    console.log('Dashboard loaded in:', performance.now().toFixed(2) + 'ms');
    
    // Log visible elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element visible:', entry.target.className);
            }
        });
    });
    
    document.querySelectorAll('.dashboard-card').forEach(card => {
        observer.observe(card);
    });
});