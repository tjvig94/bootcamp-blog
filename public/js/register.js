async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#register').addEventListener('submit', newFormHandler);
