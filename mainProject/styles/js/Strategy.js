
// Initialize strategy map
function initStrategyMap() {
    const ctx = document.getElementById('strategyMap').getContext('2d');
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Strategic Initiatives',
                data: [
                    { x: 2, y: 3, r: 15 },
                    { x: 3, y: 4, r: 10 },
                    { x: 4, y: 2, r: 20 }
                ],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.6)',
                    'rgba(16, 185, 129, 0.6)',
                    'rgba(245, 158, 11, 0.6)'
                ]
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Impact'
                    },
                    min: 0,
                    max: 5
                },
                y: {
                    title: {
                        display: true,
                        text: 'Effort'
                    },
                    min: 0,
                    max: 5
                }
            }
        }
    });
}

// Initialize drag and drop
document.querySelectorAll('.kanban-item').forEach(item => {
    item.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
        e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', function(e) {
        e.target.classList.remove('dragging');
    });
});

document.querySelectorAll('.kanban-column').forEach(column => {
    column.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    column.addEventListener('drop', function(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const draggingItem = document.querySelector('.dragging');
        if (draggingItem) {
            this.appendChild(draggingItem);
        }
    });
});

// Initialize
initStrategyMap();
