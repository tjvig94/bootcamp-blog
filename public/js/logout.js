async function logout() {
    try {
        const logout = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        logout.ok ? document.location.replace('/') : console.log(logout.statusText);
    } catch (error) {
        console.log(error);
    }
}

document.querySelector("#logout").addEventListener('click', logout);
