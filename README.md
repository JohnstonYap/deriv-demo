# QB Bot - UI/UX Inspector

A comprehensive Flask-based web application for automated UI/UX testing with AI-powered analysis.

## Features

- **Comprehensive Configuration**: Configure all testing parameters on the first page
- **Multi-Environment Support**: Test on Web, iOS, Android, and Desktop platforms
- **Flexible Testing Criteria**: Choose from predefined tests or add custom requirements
- **AI-Powered Analysis**: Custom descriptions guide AI testing
- **Performance Metrics**: Track FCP, Page Load, and Speed Index
- **Testing History**: View past test results with scores
- **Download Results**: Export detailed test reports

## Installation

1. **Clone or download this repository**

2. **Create a virtual environment**
```bash
   python -m venv venv
```

3. **Activate the virtual environment**
   - Windows:
```bash
     venv\Scripts\activate
```
   - Mac/Linux:
```bash
     source venv/bin/activate
```

4. **Install dependencies**
```bash
   pip install -r requirements.txt
```

## Usage

1. **Start the application**
```bash
   python app.py
```

2. **Open your browser**
   Navigate to `http://localhost:5000`

3. **Configure and Run Tests**
   - **Page 1**: Enter URL and configure all test parameters
   - **Page 2**: Select test criteria and add custom tests
   - **Page 3**: View comprehensive results with performance metrics

## Project Structure
```
qb-bot/
├── app.py                      # Flask backend
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── .gitignore                  # Git ignore rules
├── templates/
│   ├── page1.html             # Configuration page
│   ├── page2.html             # Test selection page
│   └── page3.html             # Results page
└── static/
    ├── css/
    │   └── style.css          # All styling
    ├── js/
    │   ├── page1.js           # Page 1 JavaScript
    │   └── page2.js           # Page 2 JavaScript
    └── images/
        └── logo.png           # Your logo (add this)
```

## Configuration Options

### Page 1 - Report Configuration
- **URL**: Website to test
- **Environment**: Web, iOS, Android, Desktop
- **Resolution**: Dynamic based on environment
- **Browser**: Chrome, Firefox, Safari, Edge, Others
- **Tester Level**: Newbie, Expert, Custom
- **Test Date**: Automatic date picker

### Page 2 - Test Selection
- **Test Scope**: 6 predefined categories
- **UI Consistency**: 5 standard checks + custom
- **UX Flow**: Standard flows + custom flows

## Adding Your Logo

Place your logo file at:
```
static/images/logo.png
```

Supported formats: PNG, SVG, JPG

## Technologies

- **Backend**: Flask 3.0.0
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Date Picker**: Flatpickr
- **Session Management**: Flask Sessions
- **Data Storage**: JSON file (upgradeable to database)

## Features in Detail

### Auto-Row Generation
- Custom requirement rows auto-generate as you type
- No manual "Add" buttons needed
- Last row always remains for new entries

### Performance Scoring
- Real-time score calculation
- Color-coded metrics (Green/Yellow/Red)
- Historical tracking with visual indicators

### Smart Validation
- URL validation
- Required field checking
- Environment-specific resolution options

## Deployment

For production:
1. Set `debug=False` in `app.py`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Set up reverse proxy (Nginx)
4. Use environment variables for secrets
5. Consider upgrading to a proper database

Example with Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## License

MIT License

## Support

For issues or questions, please open an issue on the repository.
```

---

## **Folder Structure to Create**

Create these folders:
```
static/
  css/
  js/
  images/     (place your logo here as logo.png)
templates/