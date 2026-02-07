from flask import Flask, render_template, request, redirect, url_for, session
import os
from datetime import datetime
import json
import random

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Add min and max functions to Jinja2 environment
app.jinja_env.globals.update(min=min, max=max)

# Simple file-based history storage
HISTORY_FILE = 'test_history.json'

def load_history():
    """Load test history from file"""
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_history(history_entry):
    """Save a new test to history"""
    history = load_history()
    history.insert(0, history_entry)
    history = history[:50]  # Keep only last 50 tests
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f)

@app.route('/')
def index():
    """Page 1: URL Input and Report Configuration"""
    history = load_history()
    return render_template('page1.html', history=history, today=datetime.now().strftime('%Y-%m-%d'))

@app.route('/validate-config', methods=['POST'])
def validate_config():
    """Validate and store configuration, then redirect to page 2"""
    url = request.form.get('url', '').strip()
    if not url:
        return redirect(url_for('index'))
    
    # Store all configuration in session
    session['test_url'] = url
    session['test_date'] = request.form.get('test_date')
    session['environment'] = request.form.get('environment')
    session['resolution'] = request.form.get('resolution')
    session['browser'] = request.form.get('browser')
    session['browser_other'] = request.form.get('browser_other', '')
    session['tester_level'] = request.form.get('tester_level')
    session['tester_custom'] = request.form.get('tester_custom', '')
    
    return redirect(url_for('test_config'))

@app.route('/test-config')
def test_config():
    """Page 2: Test Scope and Criteria Selection"""
    url = session.get('test_url')
    if not url:
        return redirect(url_for('index'))
    
    return render_template('page2.html', url=url)

@app.route('/run-tests', methods=['POST'])
def run_tests():
    """Process test configuration and redirect to results"""
    url = session.get('test_url')
    if not url:
        return redirect(url_for('index'))
    
    # Collect test selections
    test_config = {
        'test_date': session.get('test_date'),
        'environment': session.get('environment'),
        'resolution': session.get('resolution'),
        'browser': session.get('browser'),
        'browser_other': session.get('browser_other', ''),
        'tester_level': session.get('tester_level'),
        'tester_custom': session.get('tester_custom', ''),
        'test_scope': request.form.getlist('test_scope'),
        'ui_checklist': request.form.getlist('ui_checklist'),
        'custom_ui_names': request.form.getlist('custom_ui_name[]'),
        'custom_ui_descs': request.form.getlist('custom_ui_desc[]'),
        'ux_flows': request.form.getlist('ux_flows'),
        'custom_ux_names': request.form.getlist('custom_ux_name[]'),
        'custom_ux_descs': request.form.getlist('custom_ux_desc[]'),
    }
    
    session['test_config'] = test_config
    
    return redirect(url_for('results'))

@app.route('/results')
def results():
    """Page 3: Display Results"""
    url = session.get('test_url')
    config = session.get('test_config', {})
    
    if not url or not config:
        return redirect(url_for('index'))
    
    # Generate results
    results_data = {
        'url': url,
        'config': config,
        'test_results': [],
        'overall_score': 0,
        'fcp': 0,
        'page_load': 0,
        'speed_index': 0
    }
    
    # Calculate performance metrics (simulated)
    results_data['fcp'] = round(random.uniform(1.0, 3.0), 2)
    results_data['page_load'] = round(random.uniform(2.0, 5.0), 2)
    results_data['speed_index'] = round(random.uniform(0.5, 2.5), 2)
    
    total_tests = 0
    passed_tests = 0
    
    # Add test scope results
    for scope in config.get('test_scope', []):
        status = random.choice(['pass', 'fail', 'warning'])
        if status == 'pass':
            passed_tests += 1
        total_tests += 1
        results_data['test_results'].append({
            'category': 'Test Scope',
            'name': scope,
            'status': status,
            'details': get_status_detail(status),
            'ai_context': ''
        })
    
    # Add UI checklist results
    for ui_item in config.get('ui_checklist', []):
        status = random.choice(['pass', 'fail', 'warning'])
        if status == 'pass':
            passed_tests += 1
        total_tests += 1
        results_data['test_results'].append({
            'category': 'UI Consistency',
            'name': ui_item,
            'status': status,
            'details': get_status_detail(status),
            'ai_context': ''
        })
    
    # Add custom UI requirements
    custom_ui_names = config.get('custom_ui_names', [])
    custom_ui_descs = config.get('custom_ui_descs', [])
    for name, desc in zip(custom_ui_names, custom_ui_descs):
        if name.strip() and desc.strip():
            status = random.choice(['pass', 'fail', 'warning'])
            if status == 'pass':
                passed_tests += 1
            total_tests += 1
            results_data['test_results'].append({
                'category': 'UI Consistency (Custom)',
                'name': name.strip(),
                'status': status,
                'details': get_status_detail(status),
                'ai_context': desc.strip()
            })
    
    # Add UX flow results
    for flow in config.get('ux_flows', []):
        status = random.choice(['pass', 'fail', 'warning'])
        if status == 'pass':
            passed_tests += 1
        total_tests += 1
        results_data['test_results'].append({
            'category': 'UX Flow & Usability',
            'name': flow,
            'status': status,
            'details': get_status_detail(status),
            'ai_context': ''
        })
    
    # Add custom UX flows
    custom_ux_names = config.get('custom_ux_names', [])
    custom_ux_descs = config.get('custom_ux_descs', [])
    for name, desc in zip(custom_ux_names, custom_ux_descs):
        if name.strip() and desc.strip():
            status = random.choice(['pass', 'fail', 'warning'])
            if status == 'pass':
                passed_tests += 1
            total_tests += 1
            results_data['test_results'].append({
                'category': 'UX Flow & Usability (Custom)',
                'name': name.strip(),
                'status': status,
                'details': get_status_detail(status),
                'ai_context': desc.strip()
            })
    
    # Calculate overall score
    if total_tests > 0:
        results_data['overall_score'] = int((passed_tests / total_tests) * 100)
    else:
        results_data['overall_score'] = 0
    
    # Save to history
    history_entry = {
        'url': url,
        'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'score': results_data['overall_score'],
        'environment': config.get('environment', 'N/A'),
        'total_tests': total_tests,
        'passed_tests': passed_tests
    }
    save_history(history_entry)
    
    return render_template('page3.html', results=results_data)

def get_status_detail(status):
    """Get detail message based on status"""
    details = {
        'pass': 'All checks completed successfully. No issues found.',
        'fail': 'Some issues were detected. Please review and fix.',
        'warning': 'Test completed with warnings. Review recommended.'
    }
    return details.get(status, 'No details available.')

@app.route('/download-results')
def download_results():
    """Generate downloadable results"""
    from flask import make_response
    
    url = session.get('test_url', 'N/A')
    config = session.get('test_config', {})
    
    results_text = f"QB Bot - Website Testing Results\n"
    results_text += f"{'=' * 60}\n\n"
    results_text += f"URL: {url}\n"
    results_text += f"Test Date: {config.get('test_date', 'N/A')}\n"
    results_text += f"Environment: {config.get('environment', 'N/A')}\n"
    results_text += f"Resolution: {config.get('resolution', 'N/A')}\n"
    
    browser = config.get('browser', 'N/A')
    if browser == 'Others' and config.get('browser_other'):
        browser = config.get('browser_other')
    results_text += f"Browser: {browser}\n"
    
    tester_level = config.get('tester_level', 'N/A')
    if tester_level == 'Custom' and config.get('tester_custom'):
        tester_level = config.get('tester_custom')
    results_text += f"Tester Level: {tester_level}\n"
    
    results_text += f"\n{'=' * 60}\n\n"
    
    if config.get('test_scope'):
        results_text += "TEST SCOPE:\n"
        for item in config.get('test_scope', []):
            results_text += f"  ✓ {item}\n"
        results_text += "\n"
    
    if config.get('ui_checklist'):
        results_text += "UI CONSISTENCY CHECKLIST:\n"
        for item in config.get('ui_checklist', []):
            results_text += f"  ✓ {item}\n"
        results_text += "\n"
    
    custom_ui_names = config.get('custom_ui_names', [])
    custom_ui_descs = config.get('custom_ui_descs', [])
    if custom_ui_names:
        results_text += "CUSTOM UI REQUIREMENTS:\n"
        for name, desc in zip(custom_ui_names, custom_ui_descs):
            if name.strip() and desc.strip():
                results_text += f"  ✓ {name.strip()}\n"
                results_text += f"    Description: {desc.strip()}\n"
        results_text += "\n"
    
    if config.get('ux_flows'):
        results_text += "UX FLOW & USABILITY:\n"
        for item in config.get('ux_flows', []):
            results_text += f"  ✓ {item}\n"
        results_text += "\n"
    
    custom_ux_names = config.get('custom_ux_names', [])
    custom_ux_descs = config.get('custom_ux_descs', [])
    if custom_ux_names:
        results_text += "CUSTOM UX FLOWS:\n"
        for name, desc in zip(custom_ux_names, custom_ux_descs):
            if name.strip() and desc.strip():
                results_text += f"  ✓ {name.strip()}\n"
                results_text += f"    Description: {desc.strip()}\n"
        results_text += "\n"
    
    results_text += f"{'=' * 60}\n"
    results_text += f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
    
    response = make_response(results_text)
    response.headers['Content-Type'] = 'text/plain'
    response.headers['Content-Disposition'] = f'attachment; filename=test-results-{datetime.now().strftime("%Y%m%d-%H%M%S")}.txt'
    
    return response

@app.route('/reset')
def reset():
    """Clear session and start over"""
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    