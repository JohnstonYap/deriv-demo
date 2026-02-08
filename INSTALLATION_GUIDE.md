# QB Bot - Installation & Setup Guide

## 🚀 Quick Start (Development)

### Step 1: Install Python Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- Flask (web framework)
- WeasyPrint (PDF generation)

### Step 2: Run the Application
```bash
python app.py
```

### Step 3: Access the Application
Open your browser and go to:
```
http://localhost:5000
```

That's it! You're ready to use QB Bot. ✅

---

## 📦 What Gets Installed

### Required Dependencies:
```
Flask==3.0.0          # Web framework
weasyprint==60.2      # PDF generation
```

### Installation Time:
- Flask: ~5 seconds
- WeasyPrint: ~30-60 seconds (includes dependencies)
- **Total**: ~1 minute

---

## 🖥️ Platform-Specific Setup

### Windows

#### Option 1: Using run.bat (Easiest)
```cmd
# Just double-click run.bat
# It will install dependencies and start the server
```

#### Option 2: Manual
```cmd
# Open Command Prompt or PowerShell
cd qb-bot-complete
pip install -r requirements.txt
python app.py
```

#### WeasyPrint on Windows:
If WeasyPrint installation fails:
1. Download GTK3 Runtime: https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer
2. Install GTK3
3. Then run: `pip install weasyprint`

### Mac / Linux

#### Option 1: Using run.sh
```bash
chmod +x run.sh
./run.sh
```

#### Option 2: Manual
```bash
cd qb-bot-complete
pip install -r requirements.txt
python app.py
```

#### WeasyPrint on Mac:
```bash
# Install system dependencies
brew install cairo pango gdk-pixbuf libffi

# Then install Python package
pip install weasyprint
```

#### WeasyPrint on Linux (Ubuntu/Debian):
```bash
# Install system dependencies
sudo apt-get install python3-pip python3-cffi python3-brotli \
  libpango-1.0-0 libharfbuzz0b libpangoft2-1.0-0

# Then install Python package
pip install weasyprint
```

---

## ❌ You DON'T Need Gunicorn

**For Development/Testing:**
- Just use `python app.py`
- No gunicorn needed
- Works perfectly for local use

**For Production (Optional):**
Only if deploying to a production server, you might use gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 app:app
```

But for 99% of users running this locally, **skip gunicorn entirely**.

---

## 🔧 Troubleshooting

### Error: "No module named 'flask'"
```bash
# Solution:
pip install flask
```

### Error: "No module named 'weasyprint'"
```bash
# Solution:
pip install weasyprint

# If that fails, see platform-specific WeasyPrint instructions above
```

### Error: "Port 5000 already in use"
```python
# Edit app.py, change the last line:
app.run(debug=True, host='0.0.0.0', port=5001)  # Change to 5001
```

### PDF Download Not Working
```bash
# Make sure WeasyPrint is installed:
pip list | grep weasyprint

# If not installed:
pip install weasyprint

# Restart the server:
python app.py
```

### Charts Not Showing
- Ensure internet connection (Chart.js loads from CDN)
- Clear browser cache (Ctrl+F5)
- Check browser console for errors (F12)

---

## 📝 Step-by-Step First Run

1. **Extract the ZIP file**
   ```
   qb-bot-complete.zip → Extract to a folder
   ```

2. **Open Terminal/Command Prompt**
   ```bash
   cd qb-bot-complete
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   You'll see:
   ```
   Collecting Flask==3.0.0
   Collecting weasyprint==60.2
   Installing collected packages...
   Successfully installed Flask-3.0.0 weasyprint-60.2
   ```

4. **Start the Server**
   ```bash
   python app.py
   ```
   
   You'll see:
   ```
   * Serving Flask app 'app'
   * Debug mode: on
   * Running on http://0.0.0.0:5000
   ```

5. **Open Browser**
   ```
   http://localhost:5000
   ```

6. **Test It!**
   - Enter a URL
   - Configure test
   - View results
   - Download PDF

---

## 🎯 Common Use Cases

### Local Testing (Default)
```bash
python app.py
# Access: http://localhost:5000
```

### Run on Different Port
```bash
# Edit app.py, change last line to:
app.run(debug=True, host='0.0.0.0', port=8000)

# Then access: http://localhost:8000
```

### Run on Network (Access from other devices)
```bash
# Already configured! By default runs on 0.0.0.0
# Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
# Access from other device: http://YOUR_IP:5000
```

### Production Deployment (Advanced)
```bash
# Only if deploying to production server:
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

---

## ✅ Verification Checklist

After installation, verify:
- [ ] Flask installed (`pip list | grep Flask`)
- [ ] WeasyPrint installed (`pip list | grep weasyprint`)
- [ ] Server starts without errors
- [ ] Browser opens to http://localhost:5000
- [ ] Page 1 loads correctly
- [ ] Can complete a test flow
- [ ] Charts appear on Page 3
- [ ] PDF download works

---

## 🆘 Still Having Issues?

### Check Python Version
```bash
python --version
# Should be Python 3.7 or higher
```

### Check Pip Version
```bash
pip --version
# Should work
```

### Reinstall Dependencies
```bash
pip uninstall Flask weasyprint -y
pip install -r requirements.txt
```

### Use Virtual Environment (Recommended)
```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run app
python app.py
```

---

## 📚 Additional Resources

### Official Documentation:
- Flask: https://flask.palletsprojects.com/
- WeasyPrint: https://weasyprint.org/
- Chart.js: https://www.chartjs.org/

### QB Bot Documentation:
- README.md - Quick overview
- QUICK_START.md - Fast setup guide
- PROJECT_GUIDE.md - Complete technical docs
- CHANGELOG.md - Version history

---

## 💡 Pro Tips

1. **Use Virtual Environment**
   - Keeps dependencies isolated
   - Prevents conflicts with other projects

2. **Clear Browser Cache**
   - After updates, press Ctrl+F5
   - Ensures you see latest changes

3. **Check Terminal for Errors**
   - Debug mode shows helpful error messages
   - Check terminal output if something breaks

4. **Bookmark Localhost**
   - Save http://localhost:5000 for quick access
   - No need to type it every time

5. **Keep Server Running**
   - Leave terminal open while using
   - Ctrl+C to stop server

---

**Current Version**: 2.1
**Python Required**: 3.7+
**Install Time**: ~1 minute
**Difficulty**: Easy ⭐

---

## 🎉 Ready to Go!

Just run:
```bash
pip install -r requirements.txt
python app.py
```

Then open: http://localhost:5000

No gunicorn needed! 🚀
