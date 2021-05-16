async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
    const user = document.querySelector('input[name="name"]')
    const response = await fetch(`/api/blogposts/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            user
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

document.querySelector('#newpost').addEventListener('submit', newFormHandler);
