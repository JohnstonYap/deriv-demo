# QB Bot - UI/UX Inspector

A comprehensive UI/UX testing platform with customizable test configurations.

## Features

- **Page 1**: URL input with environment, browser, and tester configuration
- **Page 2**: Custom UX flows and UI consistency requirements
- **Page 3**: Detailed test results dashboard with scores and analytics

## Installation

1. Install Python 3.7 or higher

2. Install required packages:
```bash
pip install flask
```

## Project Structure

```
qb-bot-complete/
├── app.py                      # Flask application
├── templates/
│   ├── page1.html             # URL input page
│   ├── page2.html             # Test configuration page
│   └── page3.html             # Results dashboard
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── page1.js           # Page 1 functionality
│   │   └── page3.js           # Page 3 functionality
│   └── images/
│       └── logo.png           # (Add your logo here)
└── test_history.json          # Generated automatically

```

## Running the Application

1. Navigate to the project directory:
```bash
cd qb-bot-complete
```

2. Run the Flask application:
```bash
python app.py
```

3. Open your browser and go to:
```
http://localhost:5000
```

## Usage Flow

1. **Page 1 - URL Input**
   - Enter the URL to test
   - Select environment (Web, iOS, Android, Desktop)
   - Choose browser and tester level
   - Click "Run Test"

2. **Page 2 - Configuration**
   - Select standard UX flows (Sign up, Login)
   - Add custom flows with name and description
   - Select UI consistency checks
   - Add custom UI requirements
   - Click "Continue to Test"

3. **Page 3 - Results**
   - View overall score and grade
   - See detailed test results
   - Review issues and recommendations
   - Download or reset test

## Custom Features

### Dynamic Custom Flows
- Add unlimited custom UX flows
- Automatically generates new input rows
- Delete unwanted flows with X button

### Dynamic UI Requirements
- Add custom UI consistency requirements
- Auto-expanding input fields
- Easy deletion of requirements

## Notes

- Logo: Place your logo image at `static/images/logo.png` (100x100px recommended)
- History: The last 10 tests are automatically saved to `test_history.json`
- Session: Test configurations are stored in Flask session

## Customization

- Edit `static/css/style.css` to change colors and styling
- Modify `app.py` to adjust test generation logic
- Update templates for different layouts

## License

Private use only.
