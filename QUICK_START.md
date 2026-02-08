# QB Bot - Quick Start Guide

## 🎯 What You Have

A complete Flask web application for UI/UX testing with:
- ✅ 3 pages (URL Input → Configuration → Results)
- ✅ Dynamic custom flows and UI requirements
- ✅ Professional yellow-accent design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Test history tracking
- ✅ Download results feature

## 🚀 Start in 3 Steps

### Option 1: Windows
```
1. Extract the ZIP file
2. Double-click run.bat
3. Open http://localhost:5000 in browser
```

### Option 2: Mac/Linux
```bash
1. Extract the ZIP file
2. Open terminal, navigate to folder
3. Run: ./run.sh
4. Open http://localhost:5000 in browser
```

### Option 3: Manual
```bash
pip install flask
python app.py
```

## 📱 How to Use

### Step 1: Enter URL (Page 1)
1. Type website URL to test
2. Select environment (Web/iOS/Android/Desktop)
3. Choose browser and language
4. Click "Run Test"

### Step 2: Configure Test (Page 2)
1. Check boxes for standard flows (Sign up, Login)
2. OR click "Custom flow" to add your own:
   - Type flow name → new row appears automatically
   - Add description
   - Delete unwanted rows with X button
3. Check boxes for UI consistency checks
4. OR click "Custom Requirement" to add your own
5. Click "Continue to Test"

### Step 3: View Results (Page 3)
- See overall score and grade
- Review detailed test results
- Check custom flows you added
- Download or reset

## 🎨 Customization

### Change Colors
Edit `static/css/style.css` line 14:
```css
--primary-yellow: #YOUR_COLOR;
```

### Change Logo
Replace `static/images/logo.png` with your logo

### Change Port
Edit `app.py` last line:
```python
app.run(debug=True, host='0.0.0.0', port=YOUR_PORT)
```

## 📂 Files Overview

```
qb-bot-complete/
├── app.py                 ← Backend logic
├── templates/            
│   ├── page1.html        ← URL input page
│   ├── page2.html        ← Configuration page (NEW!)
│   └── page3.html        ← Results page
└── static/
    ├── css/style.css     ← Styling
    └── js/               ← Interactivity
```

## ❓ Troubleshooting

**Server won't start?**
```bash
pip install flask
```

**Port 5000 in use?**
Change port in `app.py` last line to 5001 or 8000

**Can't see custom flows in results?**
Make sure you typed in the flow name field and submitted the form

## 🎓 Tutorial: Adding Custom Flows

1. Go to Page 2
2. Check "Custom flow" box
3. Type in "Flow Name" (e.g., "Password Reset")
4. Type in "Description" (e.g., "User resets forgotten password")
5. New row appears automatically for another flow
6. Continue or click "Continue to Test"
7. See your custom flow in Page 3 results!

## 📞 Need Help?

1. Read `PROJECT_GUIDE.md` for detailed info
2. Read `README.md` for overview
3. Check browser console (F12) for errors
4. Ensure all files extracted properly

## ✅ First Time Setup Checklist

- [ ] Python 3.7+ installed
- [ ] Extract all files from ZIP
- [ ] Run `pip install flask`
- [ ] Run `python app.py`
- [ ] Open http://localhost:5000
- [ ] Test all 3 pages
- [ ] Try adding custom flows
- [ ] Verify results show custom flows

---

**Ready to start?** Run the app and visit http://localhost:5000! 🚀
