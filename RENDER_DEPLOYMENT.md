# Deploying QB Bot to Render.com

## 🚀 Quick Deploy to Render

### Step 1: Update requirements.txt
Make sure your `requirements.txt` includes gunicorn:
```
Flask==3.0.0
weasyprint==60.2
gunicorn==21.2.0
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Add gunicorn for Render deployment"
git push origin main
```

### Step 3: Deploy on Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: qb-bot (or your choice)
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free (or paid for better performance)

5. Click "Create Web Service"

### Step 4: Wait for Deployment
- Render will install dependencies (~2-3 minutes)
- Your app will be live at: `https://your-app-name.onrender.com`

---

## 🔧 Configuration Details

### Build Command
```bash
pip install -r requirements.txt
```
This installs Flask, WeasyPrint, and Gunicorn.

### Start Command
```bash
gunicorn app:app
```
- `gunicorn` = Production WSGI server
- `app:app` = Module name : App instance

### Environment Variables (Optional)
You can add these in Render dashboard:
- `PYTHON_VERSION`: 3.11.0 (recommended)
- `WEB_CONCURRENCY`: 2 (number of workers)

---

## ⚠️ Important for Render

### 1. WeasyPrint Dependencies
WeasyPrint requires system libraries. Add this to your repo as `packages.txt`:

```
libpango-1.0-0
libharfbuzz0b
libpangoft2-1.0-0
```

Create the file:
```bash
cat > packages.txt << EOF
libpango-1.0-0
libharfbuzz0b
libpangoft2-1.0-0
EOF
```

### 2. File Storage
Render uses **ephemeral storage** (resets on deploy). Your `test_history.json` will be lost on restart.

**Solution**: Use environment variables or external storage for persistence.

### 3. PDF Generation
WeasyPrint works on Render but may be slow on free tier. Consider:
- Upgrade to paid tier for better performance
- Or use alternative PDF library (pdfkit with wkhtmltopdf)

---

## 📁 Required Files for Render

Make sure you have:
- ✅ `requirements.txt` (with gunicorn)
- ✅ `app.py` (your Flask app)
- ✅ `templates/` folder
- ✅ `static/` folder
- ✅ `packages.txt` (for WeasyPrint)
- ✅ `render.yaml` (optional, for automatic config)

---

## 🐛 Troubleshooting

### Error: "gunicorn: command not found"
**Solution**: Add gunicorn to requirements.txt
```
gunicorn==21.2.0
```

### Error: WeasyPrint fails to install
**Solution**: Create `packages.txt` with system dependencies
```
libpango-1.0-0
libharfbuzz0b
libpangoft2-1.0-0
```

### Error: Port binding issues
**Solution**: Gunicorn automatically binds to `$PORT` on Render. No changes needed.

### App is slow
**Solution**: 
- Upgrade from Free to Starter tier
- Increase `WEB_CONCURRENCY` environment variable
- Use caching for repeated tests

---

## 🎯 Render.yaml (Optional)

Create `render.yaml` for automatic configuration:

```yaml
services:
  - type: web
    name: qb-bot
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
```

This allows "Deploy to Render" button!

---

## 🔐 Security for Production

### 1. Change Secret Key
In `app.py`, replace:
```python
app.secret_key = os.urandom(24)
```

With a fixed secret key (set as environment variable):
```python
app.secret_key = os.environ.get('SECRET_KEY', os.urandom(24))
```

Then in Render, add environment variable:
- Key: `SECRET_KEY`
- Value: (generate random string)

### 2. Disable Debug Mode
Change in `app.py`:
```python
if __name__ == '__main__':
    app.run(debug=False)  # Change to False for production
```

---

## 💰 Render Pricing

### Free Tier:
- ✅ Good for testing
- ❌ Sleeps after inactivity (slow first load)
- ❌ 750 hours/month limit
- ❌ Slower performance

### Starter Tier ($7/month):
- ✅ No sleep
- ✅ Better performance
- ✅ Custom domains
- ✅ Recommended for production

---

## 📊 Performance Tips

### 1. Use Caching
Add Redis for session storage:
```bash
pip install redis flask-session
```

### 2. Optimize PDF Generation
PDF generation is CPU-intensive. Consider:
- Queue system for PDF generation
- Generate PDFs asynchronously
- Use worker dyno for PDF tasks

### 3. Static Asset CDN
Serve static files from CDN:
- Upload CSS/JS to CDN
- Update template links
- Faster load times

---

## 🔄 Updating Your Deployment

### Method 1: Auto-deploy (Recommended)
1. Enable auto-deploy in Render dashboard
2. Push to GitHub
3. Render automatically deploys

### Method 2: Manual deploy
1. Go to Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

---

## ✅ Deployment Checklist

Before deploying:
- [ ] `gunicorn` in requirements.txt
- [ ] `packages.txt` created (for WeasyPrint)
- [ ] `render.yaml` created (optional)
- [ ] Debug mode disabled in app.py
- [ ] Secret key set as environment variable
- [ ] Tested locally with `gunicorn app:app`
- [ ] All files committed to Git
- [ ] Pushed to GitHub
- [ ] Render web service created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] App accessible at Render URL
- [ ] PDF download works
- [ ] Charts render correctly

---

## 🧪 Test Locally with Gunicorn

Before deploying to Render, test locally:

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn (same as Render)
gunicorn app:app

# Access at http://localhost:8000
```

If this works, Render deployment will work!

---

## 📝 Complete Setup Commands

```bash
# 1. Add packages.txt
cat > packages.txt << 'EOF'
libpango-1.0-0
libharfbuzz0b
libpangoft2-1.0-0
EOF

# 2. Update requirements.txt
cat > requirements.txt << 'EOF'
Flask==3.0.0
weasyprint==60.2
gunicorn==21.2.0
EOF

# 3. Git commit
git add .
git commit -m "Prepare for Render deployment"
git push origin main

# 4. Deploy on Render
# Use web interface: https://render.com
```

---

## 🌐 After Deployment

Your app will be live at:
```
https://your-app-name.onrender.com
```

Share this URL with your team!

---

## 🆘 Still Having Issues?

### Check Render Logs:
1. Go to Render dashboard
2. Click your service
3. Click "Logs" tab
4. Look for error messages

### Common errors and solutions:
- **Import errors**: Missing dependency in requirements.txt
- **WeasyPrint errors**: Missing system packages in packages.txt
- **Port errors**: Render sets $PORT automatically, don't hardcode
- **File not found**: Check file paths are relative, not absolute

---

**For local development**: Just use `python app.py`
**For Render deployment**: Use `gunicorn app:app`

Both work perfectly! 🚀
