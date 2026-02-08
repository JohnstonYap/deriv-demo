# QB Bot - UI/UX Inspector - Complete Project Guide

## 📋 Overview

QB Bot is a comprehensive UI/UX testing platform that allows users to:
1. Enter a URL to test
2. Configure custom test parameters
3. View detailed test results with scores and analytics

## 🗂️ Project Structure

```
qb-bot-complete/
├── app.py                          # Main Flask application (Backend)
├── requirements.txt                # Python dependencies
├── run.sh                          # Linux/Mac startup script
├── run.bat                         # Windows startup script
├── README.md                       # Basic documentation
├── PROJECT_GUIDE.md               # This detailed guide
│
├── templates/                      # HTML Templates (Flask)
│   ├── page1.html                 # URL Input & Configuration
│   ├── page2.html                 # Test Configuration (Custom Flows & UI)
│   └── page3.html                 # Results Dashboard
│
└── static/                        # Static Assets
    ├── css/
    │   └── style.css              # Main stylesheet (Yellow-accent theme)
    ├── js/
    │   ├── page1.js               # Page 1 interactions
    │   └── page3.js               # Page 3 dashboard functionality
    └── images/
        └── logo.png               # QB Bot logo

```

## 🚀 Quick Start

### Windows
1. Double-click `run.bat`
2. Wait for server to start
3. Open browser to `http://localhost:5000`

### Linux/Mac
1. Open terminal in project directory
2. Run: `./run.sh`
3. Open browser to `http://localhost:5000`

### Manual Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run application
python app.py

# Access at http://localhost:5000
```

## 📄 Page Descriptions

### Page 1 - URL Input (page1.html)
**Purpose:** Collect URL and basic test configuration

**Features:**
- URL input field with validation
- Environment selection (Web, iOS, Android, Desktop)
- Dynamic resolution options based on environment
- Browser selection with custom option
- Tester level selection
- Language selection (15+ languages)
- Recent test history display

**Flow:**
User enters URL → Selects configuration → Clicks "Run Test" → Redirects to Page 2

### Page 2 - Test Configuration (page2.html)
**Purpose:** Configure custom UX flows and UI requirements

**Features:**

#### UX Flow & Usability
- Standard flows: Sign up, Login (checkboxes)
- Custom flow option with dynamic inputs:
  - **Flow Name** and **Description** columns
  - First row appears when "Custom flow" is checked
  - Auto-generates new row when typing in flow name
  - Delete button (X) on additional rows
  - Unlimited custom flows

#### UI Consistency Checklist
- Standard checks: Color, Typography, Spacing, Icons, Branding
- Custom requirement option:
  - Single-column input for requirements
  - Auto-generates new row when typing
  - Delete button (X) on additional rows
  - Unlimited custom requirements

**Flow:**
User selects/adds flows → Selects/adds UI checks → Clicks "Continue to Test" → Redirects to Page 3

### Page 3 - Results Dashboard (page3.html)
**Purpose:** Display comprehensive test results

**Features:**
- Overall score (0-100) with letter grade
- Test statistics (Passed/Failed/Warning)
- UX Flow results (including custom flows)
- Responsiveness results
- UI Consistency results (including custom requirements)
- Accessibility checklist
- Interaction & Feedback results
- Issue tracking with severity levels
- Download results option
- Reset test button

## 🔧 Technical Details

### Backend (app.py)

#### Routes
1. **`/`** (GET) - Page 1: URL input
2. **`/run-test`** (POST) - Process Page 1, redirect to Page 2
3. **`/configure`** (GET) - Page 2: Test configuration
4. **`/results`** (GET, POST) - Page 3: Results dashboard
5. **`/download-results`** (GET) - Download test report
6. **`/reset`** (GET) - Clear session and restart

#### Session Data
- `test_url`: URL being tested
- `test_date`: Timestamp of test
- `device`: Selected device type
- `tester_level`: Tester expertise level
- `language`: Test language
- `ux_flows`: Selected standard UX flows
- `custom_flows`: Array of {name, description}
- `ui_checks`: Selected standard UI checks
- `custom_ui`: Array of custom requirements

#### Key Functions
- `load_history()`: Loads last 10 tests from JSON
- `save_history()`: Saves test to history
- `generate_test_results()`: Creates test data based on configuration
- `get_grade()`: Converts score to letter grade

### Frontend

#### JavaScript Features (page2.html)
```javascript
// Dynamic flow row management
- addFlowRow(): Creates new flow input row
- deleteFlowRow(id): Removes specific row
- Auto-expansion on input

// Dynamic UI row management  
- addUIRow(): Creates new UI requirement row
- deleteUIRow(id): Removes specific row
- Auto-expansion on input

// Form validation
- Checks at least one flow selected
- Checks at least one UI check selected
- Validates custom inputs before submission
```

#### Styling (style.css)
- Yellow-accent brand theme (#fbbf24)
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Custom select dropdowns
- Card-based layouts

## 🎨 Customization Guide

### Change Brand Colors
Edit `static/css/style.css`:
```css
:root {
    --primary-yellow: #fbbf24;    /* Change to your primary color */
    --dark-yellow: #f59e0b;       /* Change to darker variant */
    --light-yellow: #fde68a;      /* Change to lighter variant */
}
```

### Add More Standard Flows
Edit `templates/page2.html`:
```html
<label class="checkbox-item">
    <input type="checkbox" name="ux_flow" value="your_flow_id" checked>
    <span class="checkbox-label">Your Flow Name</span>
</label>
```

Edit `app.py` in `generate_test_results()`:
```python
if 'your_flow_id' in selected_flows:
    ux_flows.append({
        'scenario': 'Your Flow Name',
        'expected': 'Expected behavior',
        'actual': 'Actual behavior',
        'status': 'pass'  # or 'fail', 'warning'
    })
```

### Modify Test Results Logic
Edit `generate_test_results()` in `app.py`:
- Change score calculation
- Modify issue generation
- Adjust status probabilities
- Add new test categories

### Change Logo
Replace `static/images/logo.png` with your own logo (100x100px recommended)

## 📊 Data Flow

```
Page 1 (URL + Config)
    ↓ (POST to /run-test)
    ↓ (Store in session)
    ↓
Page 2 (Test Config)
    ↓ (POST to /results)
    ↓ (Store flows/checks in session)
    ↓
Backend (generate_test_results)
    ↓ (Create test data using session)
    ↓
Page 3 (Display Results)
```

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if Flask is installed
pip list | grep Flask

# Reinstall if needed
pip install -r requirements.txt
```

### Port 5000 already in use
Edit `app.py`, change last line:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Change port
```

### Templates not found
Ensure directory structure is correct:
```
qb-bot-complete/
├── app.py
└── templates/
    ├── page1.html
    ├── page2.html
    └── page3.html
```

### Custom flows not showing in results
Check browser console for JavaScript errors, ensure:
1. Flow name field has value
2. Form submitted successfully
3. Session data persists

## 📝 File Descriptions

### Core Files
- **app.py**: Flask backend, routes, test generation logic
- **requirements.txt**: Python package dependencies
- **run.sh/run.bat**: Platform-specific startup scripts

### Templates
- **page1.html**: Initial page, URL input, environment config
- **page2.html**: Configuration page, custom flows/requirements
- **page3.html**: Results dashboard, scores, issues

### Static Assets
- **style.css**: All styling, responsive design, animations
- **page1.js**: Custom dropdown functionality, resolution handling
- **page3.js**: Dashboard interactions, charts (if any)
- **logo.png**: Application logo

### Generated Files
- **test_history.json**: Automatically created, stores last 10 tests

## 🔒 Security Notes

- Session uses `os.urandom(24)` for secret key
- No database, all data in memory/session
- History file is plain JSON (not encrypted)
- No authentication required (single-user app)

## 🚀 Production Deployment

For production use:

1. Set a permanent secret key in `app.py`:
```python
app.secret_key = 'your-secure-random-secret-key-here'
```

2. Disable debug mode:
```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

3. Use production WSGI server (e.g., Gunicorn):
```bash
pip install gunicorn
gunicorn -w 4 app:app
```

## 📞 Support

For issues or questions:
1. Check this guide
2. Review code comments
3. Check browser console for errors
4. Verify all files are present

## ✅ Testing Checklist

Before deploying, verify:
- [ ] All pages load correctly
- [ ] URL input validation works
- [ ] Custom flows auto-generate rows
- [ ] Custom UI requirements auto-generate rows
- [ ] Delete buttons work
- [ ] Form validation prevents empty submissions
- [ ] Results page shows custom flows
- [ ] Results page shows custom UI requirements
- [ ] Download results button works
- [ ] Reset button clears session
- [ ] History saves correctly
- [ ] Responsive design works on mobile

## 🎯 Key Features Summary

1. **Three-page workflow**: Input → Configure → Results
2. **Dynamic custom inputs**: Auto-expanding rows with delete
3. **Session-based**: No database required
4. **Responsive design**: Works on all devices
5. **History tracking**: Last 10 tests saved
6. **Download results**: Export test reports
7. **Customizable**: Easy to modify colors, flows, checks
8. **Professional UI**: Yellow-accent theme, smooth animations

---

**Version**: 1.0  
**Last Updated**: 2026-02-08  
**Framework**: Flask 3.0.0  
**License**: Private Use
