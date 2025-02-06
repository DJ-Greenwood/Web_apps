// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
});

function showSection(sectionId) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show selected section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function showAlert(message, type) {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert ${type}`;
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

function loadSettings() {
    // Load API settings
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
        document.getElementById('apiKey').value = apiKey;
    }

    // Load other settings
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    
    // Apply saved settings to form elements
    Object.keys(settings).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = settings[key];
            } else {
                element.value = settings[key];
            }
        }
    });
}

function saveSettings() {
    // Save API key
    const apiKey = document.getElementById('apiKey').value;
    if (apiKey) {
        localStorage.setItem('apiKey', apiKey);
    }

    // Collect all settings
    const settings = {
        model: document.getElementById('model').value,
        riskThreshold: document.getElementById('riskThreshold').value,
        assessmentFrequency: document.getElementById('assessmentFrequency').value,
        emailNotif: document.getElementById('emailNotif').checked,
        riskAlerts: document.getElementById('riskAlerts').checked,
        weeklyReports: document.getElementById('weeklyReports').checked,
        theme: document.getElementById('theme').value,
        dateFormat: document.getElementById('dateFormat').value
    };

    // Save to localStorage
    localStorage.setItem('settings', JSON.stringify(settings));
    showAlert('Settings saved successfully!', 'success');
}

document.getElementById('model').addEventListener('change', function () {
    const selectedModel = this.value; // Get selected value
    localStorage.setItem('model', selectedModel); // Save to local storage
    console.log(`Model updated to: ${selectedModel}`);
});
