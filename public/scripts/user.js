fetch('/authStatus')
    .then(response => response.json())
    .then(data => {
        const isAuthenticated = data.isAuthenticated;

        const loginNavItem = document.getElementById('login');
        const profileNavItem = document.getElementById('profile');
        const refreshNavItem = document.getElementById('refresh');
        const logoutNavItem = document.getElementById('logout');

        if (isAuthenticated) {
            profileNavItem.style.display = 'block';
            refreshNavItem.style.display = 'block';
            logoutNavItem.style.display = 'block';
            loginNavItem.style.display = 'none';
        } else {
            loginNavItem.style.display = 'block';
            profileNavItem.style.display = 'none';
            refreshNavItem.style.display = 'none';
            logoutNavItem.style.display = 'none';
        }
    })
    .catch(error => console.error('Error fetching authentication status:', error));