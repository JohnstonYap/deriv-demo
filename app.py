from flask import Flask, render_template, request, redirect, url_for, session, make_response
import os
from datetime import datetime
import json
import random

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Add utility functions to Jinja2
app.jinja_env.globals.update(min=min, max=max)

# Simple file-based history storage
HISTORY_FILE = 'test_history.json'

def load_history():
    """Load test history from file"""
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_history(history_entry):
    """Save a new test to history"""
    history = load_history()
    history.insert(0, history_entry)
    history = history[:10]  # Keep only last 10 tests
    try:
        with open(HISTORY_FILE, 'w') as f:
            json.dump(history, f)
    except:
        pass

@app.route('/')
def index():
    """Page 1: URL Input with configuration options"""
    history = load_history()
    return render_template('page1.html', history=history)

@app.route('/run-test', methods=['POST'])
def run_test():
    """Process URL and configuration, redirect to page 2"""
    url = request.form.get('url', '').strip()
    if not url:
        return redirect(url_for('index'))
    
    # Store basic configuration in session
    session['test_url'] = url
    session['test_date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    session['device'] = request.form.get('device', 'Desktop')
    session['tester_level'] = request.form.get('tester_level', 'Expert')
    session['language'] = request.form.get('language', 'English')
    
    return redirect(url_for('configure'))

@app.route('/configure')
def configure():
    """Page 2: Test Configuration"""
    if 'test_url' not in session:
        return redirect(url_for('index'))
    return render_template('page2.html')

@app.route('/results', methods=['GET', 'POST'])
def results():
    """Page 3: Dashboard Results"""
    url = session.get('test_url')
    test_date = session.get('test_date')
    device = session.get('device', 'Desktop')
    tester_level = session.get('tester_level', 'Expert')
    language = session.get('language', 'English')
    
    if not url:
        return redirect(url_for('index'))
    
    # Get configuration from page2
    if request.method == 'POST':
        # Store UX flows
        ux_flows = request.form.getlist('ux_flow')
        custom_flow_names = request.form.getlist('custom_flow_name[]')
        custom_flow_descriptions = request.form.getlist('custom_flow_description[]')
        
        # Store UI checks
        ui_checks = request.form.getlist('ui_check')
        custom_ui_requirements = request.form.getlist('custom_ui_requirement[]')
        
        # Store in session
        session['ux_flows'] = ux_flows
        session['custom_flows'] = [
            {'name': name, 'description': desc} 
            for name, desc in zip(custom_flow_names, custom_flow_descriptions)
            if name.strip()
        ]
        session['ui_checks'] = ui_checks
        session['custom_ui'] = [req for req in custom_ui_requirements if req.strip()]
    
    # Generate comprehensive test results
    results_data = generate_test_results(url, test_date, device, tester_level, language)
    
    # Save to history
    history_entry = {
        'url': url,
        'date': test_date,
        'score': results_data['overall_score'],
        'device': device,
        'total_tests': results_data['total_tests'],
        'passed_tests': results_data['passed_tests']
    }
    save_history(history_entry)
    
    return render_template('page3.html', results=results_data)

def generate_test_results(url, test_date, device, tester_level, language):
    """Generate realistic test results based on device"""
    
    # Device-specific settings
    device_specs = {
        'Mobile': {'resolution': '375x667', 'browser': 'Safari Mobile'},
        'Tablet': {'resolution': '768x1024', 'browser': 'Chrome Tablet'},
        'Desktop': {'resolution': '1920x1080', 'browser': 'Chrome'}
    }
    
    specs = device_specs.get(device, device_specs['Desktop'])
    
    # Generate overall score
    base_score = random.randint(70, 95)
    if device == 'Mobile':
        overall_score = base_score - random.randint(0, 5)
    else:
        overall_score = base_score
    
    # Get selected flows from session
    selected_flows = session.get('ux_flows', ['signup', 'login'])
    custom_flows = session.get('custom_flows', [])
    
    # UX Flow results - start with selected standard flows
    ux_flows = []
    
    if 'signup' in selected_flows:
        ux_flows.append({
            'scenario': 'Sign up flow',
            'expected': 'Smooth registration process',
            'actual': 'Working as expected',
            'status': 'pass'
        })
    
    if 'login' in selected_flows:
        ux_flows.append({
            'scenario': 'Login flow',
            'expected': 'Quick authentication',
            'actual': 'Minor delay (2s)' if device == 'Mobile' else 'Fast and responsive',
            'status': 'warning' if device == 'Mobile' else 'pass'
        })
    
    # Add custom flows with random status
    for custom_flow in custom_flows:
        ux_flows.append({
            'scenario': custom_flow['name'],
            'expected': custom_flow['description'],
            'actual': random.choice(['Working correctly', 'Minor issues found', 'Needs improvement']),
            'status': random.choice(['pass', 'pass', 'warning', 'fail'])
        })
    
    # Responsiveness results
    responsiveness = [
        {'device': 'Mobile (375x667)', 'percentage': random.randint(85, 98), 'issues': 'Minor spacing issue'},
        {'device': 'Tablet (768x1024)', 'percentage': random.randint(80, 95), 'issues': 'Grid adapts well'},
        {'device': 'Desktop (1920x1080)', 'percentage': random.randint(75, 92), 'issues': 'Some max-width needed'}
    ]
    
    # Test scope
    test_scope = [
        {'name': 'Layout & visual consistency', 'checked': True},
        {'name': 'Responsiveness', 'checked': True},
        {'name': 'Accessibility', 'checked': random.choice([True, False])},
        {'name': 'Navigation & user flow', 'checked': True},
        {'name': 'Micro-interactions & animations', 'checked': True},
        {'name': 'Error states & empty states', 'checked': random.choice([True, False])}
    ]
    
    # Get selected UI checks from session
    selected_ui = session.get('ui_checks', ['color', 'typography', 'spacing', 'icons', 'branding'])
    custom_ui = session.get('custom_ui', [])
    
    # UI Consistency - start with selected standard checks
    ui_consistency = []
    
    ui_check_mapping = {
        'color': {'item': 'Color usage matches design', 'notes': 'Matches design system'},
        'typography': {'item': 'Typography consistent', 'notes': 'Consistent font weights'},
        'spacing': {'item': 'Spacing & alignment correct', 
                    'notes': random.choice(['Header misaligned 2px', 'Perfect alignment'])},
        'icons': {'item': 'Icons & imagery consistent', 'notes': 'All assets loaded'},
        'branding': {'item': 'Branding applied correctly', 'notes': 'Logo correct'}
    }
    
    for check in selected_ui:
        if check in ui_check_mapping:
            check_data = ui_check_mapping[check]
            status = 'fail' if check == 'spacing' and 'misaligned' in check_data['notes'] else 'pass'
            ui_consistency.append({
                'item': check_data['item'],
                'status': status,
                'notes': check_data['notes']
            })
    
    # Add custom UI requirements
    for custom_requirement in custom_ui:
        ui_consistency.append({
            'item': custom_requirement,
            'status': random.choice(['pass', 'pass', 'warning', 'fail']),
            'notes': random.choice(['Implemented correctly', 'Minor inconsistencies', 'Needs attention'])
        })
    
    # Accessibility
    accessibility_items = [
        {'item': 'Color contrast acceptable (WCAG AA)', 'checked': True},
        {'item': 'Text readable at 200% zoom', 'checked': True},
        {'item': 'Keyboard navigation works', 'checked': True},
        {'item': 'Focus states visible', 'checked': random.choice([True, False])},
        {'item': 'Screen reader labels present', 'checked': random.choice([True, False])}
    ]
    
    # Interaction & Feedback
    interactions = [
        {'element': 'Buttons', 'expected': 'Hover/Active/Disabled', 'result': 'pass'},
        {'element': 'Forms', 'expected': 'Validation & errors', 'result': 'pass'},
        {'element': 'Loaders', 'expected': 'Clear indicators', 'result': random.choice(['warning', 'pass'])},
        {'element': 'Animations', 'expected': 'Smooth & meaningful', 'result': 'pass'}
    ]
    
    # Issues
    issues = []
    if random.random() > 0.3:
        issues.append({
            'id': 'UX-01', 'type': 'UX', 'severity': 'high',
            'description': 'Payment gateway timeout during checkout',
            'steps': 'Cart → Checkout → Payment → Submit'
        })
    
    if device == 'Mobile' and random.random() > 0.4:
        issues.append({
            'id': 'UI-02', 'type': 'UI', 'severity': 'medium',
            'description': 'Header logo misaligned on mobile',
            'steps': 'Resize to 375x667 → Check header'
        })
    
    if random.random() > 0.5:
        issues.append({
            'id': 'UX-03', 'type': 'Accessibility', 'severity': 'low',
            'description': 'Loading spinner contrast low',
            'steps': 'Trigger loading → Check contrast'
        })
    
    # Calculate totals
    total_tests = len(ux_flows) + len(ui_consistency) + len(interactions)
    passed_tests = sum(1 for f in ux_flows if f['status'] == 'pass')
    passed_tests += sum(1 for u in ui_consistency if u['status'] == 'pass')
    passed_tests += sum(1 for i in interactions if i['result'] == 'pass')
    
    failed_tests = sum(1 for f in ux_flows if f['status'] == 'fail')
    failed_tests += sum(1 for u in ui_consistency if u['status'] == 'fail')
    failed_tests += sum(1 for i in interactions if i['result'] == 'fail')
    
    warning_tests = sum(1 for f in ux_flows if f['status'] == 'warning')
    warning_tests += sum(1 for u in ui_consistency if u['status'] == 'warning')
    warning_tests += sum(1 for i in interactions if i['result'] == 'warning')
    
    # Overall assessment
    ui_quality = round(random.uniform(3.5, 5.0), 1)
    ux_quality = round(random.uniform(3.8, 5.0), 1)
    
    return {
        'url': url,
        'test_date': test_date,
        'overall_score': overall_score,
        'grade': get_grade(overall_score),
        'device': device,
        'resolution': specs['resolution'],
        'browser': specs['browser'],
        'tester_level': tester_level,
        'language': language,
        'total_tests': total_tests,
        'passed_tests': passed_tests,
        'failed_tests': failed_tests,
        'warning_tests': warning_tests,
        'ux_flows': ux_flows,
        'responsiveness': responsiveness,
        'test_scope': test_scope,
        'ui_consistency': ui_consistency,
        'accessibility': accessibility_items,
        'interactions': interactions,
        'issues': issues,
        'ui_quality': ui_quality,
        'ux_quality': ux_quality
    }

def get_grade(score):
    """Get letter grade from score"""
    if score >= 90: return 'A'
    elif score >= 80: return 'B'
    elif score >= 70: return 'C'
    elif score >= 60: return 'D'
    else: return 'F'

@app.route('/download-results')
def download_results():
    """Generate downloadable results"""
    url = session.get('test_url', 'N/A')
    test_date = session.get('test_date', 'N/A')
    device = session.get('device', 'N/A')
    
    results_text = f"QB Bot - UI/UX Testing Report\n"
    results_text += f"{'=' * 60}\n\n"
    results_text += f"URL: {url}\n"
    results_text += f"Test Date: {test_date}\n"
    results_text += f"Device: {device}\n\n"
    results_text += f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
    
    response = make_response(results_text)
    response.headers['Content-Type'] = 'text/plain'
    response.headers['Content-Disposition'] = f'attachment; filename=qb-bot-{datetime.now().strftime("%Y%m%d-%H%M%S")}.txt'
    
    return response

@app.route('/reset')
def reset():
    """Clear session and start over"""
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)