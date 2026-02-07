// Update remove button visibility
function updateRemoveButtons(container) {
    const rows = container.querySelectorAll('.custom-row');
    rows.forEach((row, index) => {
        const removeBtn = row.querySelector('.btn-remove');
        if (rows.length === 1) {
            removeBtn.style.visibility = 'hidden';
        } else {
            removeBtn.style.visibility = 'visible';
        }
    });
}

// Auto-create new row when typing in UI requirement name
document.getElementById('customUIContainer').addEventListener('input', function(e) {
    if (e.target.classList.contains('custom-input')) {
        const allRows = this.querySelectorAll('.custom-row');
        const lastRow = allRows[allRows.length - 1];
        const lastInput = lastRow.querySelector('.custom-input');
        
        if (lastInput.value.trim() !== '') {
            const hasEmptyRow = Array.from(allRows).some(row => {
                const nameInput = row.querySelector('.custom-input');
                return nameInput.value.trim() === '';
            });
            
            if (!hasEmptyRow) {
                addUIRowAuto();
                updateRemoveButtons(this);
            }
        }
    }
});

// Auto-create new row when typing in UX flow name
document.getElementById('customUXContainer').addEventListener('input', function(e) {
    if (e.target.classList.contains('custom-input')) {
        const allRows = this.querySelectorAll('.custom-row');
        const lastRow = allRows[allRows.length - 1];
        const lastInput = lastRow.querySelector('.custom-input');
        
        if (lastInput.value.trim() !== '') {
            const hasEmptyRow = Array.from(allRows).some(row => {
                const nameInput = row.querySelector('.custom-input');
                return nameInput.value.trim() === '';
            });
            
            if (!hasEmptyRow) {
                addUXRowAuto();
                updateRemoveButtons(this);
            }
        }
    }
});

// Auto-add UI Row
function addUIRowAuto() {
    const container = document.getElementById('customUIContainer');
    const newRow = document.createElement('div');
    newRow.className = 'custom-row';
    newRow.innerHTML = `
        <input type="text" name="custom_ui_name[]" placeholder="Requirement Name" class="custom-input" />
        <input type="text" name="custom_ui_desc[]" placeholder="AI Description (e.g., 'Check header logo alignment on mobile')" class="custom-input-desc" />
        <button type="button" class="btn-remove" onclick="removeRow(this)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    `;
    container.appendChild(newRow);
}

// Auto-add UX Row
function addUXRowAuto() {
    const container = document.getElementById('customUXContainer');
    const newRow = document.createElement('div');
    newRow.className = 'custom-row';
    newRow.innerHTML = `
        <input type="text" name="custom_ux_name[]" placeholder="Flow Name" class="custom-input" />
        <input type="text" name="custom_ux_desc[]" placeholder="AI Description (e.g., 'Test checkout process from cart to confirmation')" class="custom-input-desc" />
        <button type="button" class="btn-remove" onclick="removeRow(this)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </button>
    `;
    container.appendChild(newRow);
}

// Remove Row
function removeRow(button) {
    const row = button.parentElement;
    const container = row.parentElement;
    const rows = container.querySelectorAll('.custom-row');
    
    if (rows.length > 1) {
        row.remove();
        updateRemoveButtons(container);
    }
}

// Form validation
document.getElementById('testsForm').addEventListener('submit', function(e) {
    const testScope = document.querySelectorAll('input[name="test_scope"]:checked');
    const uiChecklist = document.querySelectorAll('input[name="ui_checklist"]:checked');
    const uxFlows = document.querySelectorAll('input[name="ux_flows"]:checked');
    
    // Check custom UI
    const customUINames = document.querySelectorAll('input[name="custom_ui_name[]"]');
    let hasCustomUI = false;
    customUINames.forEach(input => {
        if (input.value.trim()) hasCustomUI = true;
    });
    
    // Check custom UX
    const customUXNames = document.querySelectorAll('input[name="custom_ux_name[]"]');
    let hasCustomUX = false;
    customUXNames.forEach(input => {
        if (input.value.trim()) hasCustomUX = true;
    });
    
    const hasSelection = testScope.length > 0 || uiChecklist.length > 0 || 
                        uxFlows.length > 0 || hasCustomUI || hasCustomUX;
    
    if (!hasSelection) {
        e.preventDefault();
        alert('Please select at least one test option or add a custom requirement/flow');
        return false;
    }
    
    return true;
});