document.addEventListener('DOMContentLoaded', function() {
    const button = document.createElement('div');
    Object.assign(button.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        width: '50px', height: '50px', backgroundColor: '#007bff',
        borderRadius: '50%', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#fff', fontSize: '24px'
    });
    button.innerHTML = '+';
    document.body.appendChild(button);

    const menu = document.createElement('div');
    Object.assign(menu.style, {
        position: 'fixed', bottom: '80px', right: '20px',
        backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px', overflow: 'hidden', display: 'none'
    });
    document.body.appendChild(menu);

    const pageMapping = {
        "Home": "Index.html",
        "Risk": "Risk.html",
        "Strategy": "Strategy.html",
        "Team": "Team.html",
        "Data": "Data.html",
        "Audit": "Auditing.html",
        "Settings": "Settings.html"
    };

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();
    Object.keys(pageMapping)
        .filter(page => page.toLowerCase() !== currentPage)
        .forEach(page => {
            const menuItem = document.createElement('div');
            Object.assign(menuItem.style, { padding: '10px 20px', cursor: 'pointer' });
            menuItem.innerText = page;
            menuItem.addEventListener('click', () => window.location.href = pageMapping[page]);
            menu.appendChild(menuItem);
        });

    button.addEventListener('click', () => menu.style.display = menu.style.display === 'none' ? 'block' : 'none');
});
