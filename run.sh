#!/bin/bash

echo "Starting QB Bot - UI/UX Inspector..."
echo "======================================"
echo ""
echo "Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "Starting Flask server..."
echo "Access the application at: http://localhost:5000"
echo ""

python app.py
