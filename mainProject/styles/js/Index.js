// Navigation event listeners
["Risk", "Strategy", "Compliance", "Team", "Data", "Auditing", "Settings"].forEach(page => {
    document.getElementById(`${page.toLowerCase()}-btn`)?.addEventListener('click', () => {
        window.location.href = `../mainProject/Pages/${page}.html`;
    });
});





