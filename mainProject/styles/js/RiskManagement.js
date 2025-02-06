// Risk Management Dashboard
// Sample risk data
let risks = [
    { id: 1, name: "Data Breach", category: "operational", probability: 4, impact: 5, mitigation: "Implement enhanced security protocols" },
    { id: 2, name: "Market Volatility", category: "financial", probability: 3, impact: 4, mitigation: "Diversify investment portfolio" },
    { id: 3, name: "Regulatory Changes", category: "compliance", probability: 3, impact: 3, mitigation: "Monitor regulatory updates" }
];

// Initialize risk matrix
function initRiskMatrix() {
    const ctx = document.getElementById('riskMatrix').getContext('2d');
    const bubbleData = risks.map(risk => ({
        x: risk.probability,
        y: risk.impact,
        r: 10
    }));

    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Risks',
                data: bubbleData,
                backgroundColor: bubbleData.map(b => 
                    getRiskColor(b.x * b.y)
                )
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Probability'
                    },
                    min: 0,
                    max: 6,
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Impact'
                    },
                    min: 0,
                    max: 6,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Get risk color based on severity
function getRiskColor(severity) {
    if (severity > 15) return '#dc2626';
    if (severity > 8) return '#f59e0b';
    return '#10b981';
}

// Get risk level badge
function getRiskBadge(probability, impact) {
    const severity = probability * impact;
    const level = severity > 15 ? 'high' : severity > 8 ? 'medium' : 'low';
    return `<span class="risk-badge ${level}">${level}</span>`;
}

// Populate risk table
function updateRiskTable() {
    const tableBody = document.getElementById('riskTable');
    tableBody.innerHTML = risks.map(risk => `
        <tr>
            <td>${risk.name}</td>
            <td>${risk.category}</td>
            <td>${risk.probability}</td>
            <td>${risk.impact}</td>
            <td>${getRiskBadge(risk.probability, risk.impact)}</td>
            <td class="actions">
                <button onclick="editRisk(${risk.id})">Edit</button>
                <button onclick="deleteRisk(${risk.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Modal functions
function showModal() {
    document.getElementById('riskModal').style.display = 'block';
}

function hideModal() {
    document.getElementById('riskModal').style.display = 'none';
    document.getElementById('riskForm').reset();
}

// Form submission
document.getElementById('riskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newRisk = {
        id: risks.length + 1,
        name: document.getElementById('riskName').value,
        category: document.getElementById('category').value,
        probability: parseInt(document.getElementById('probability').value),
        impact: parseInt(document.getElementById('impact').value),
        mitigation: document.getElementById('mitigation').value
    };
    risks.push(newRisk);
    updateRiskTable();
    hideModal();
    initRiskMatrix();
});

// Initialize
initRiskMatrix();
updateRiskTable();
