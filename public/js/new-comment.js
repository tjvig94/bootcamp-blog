async function newFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment"]').value.trim();
    const user = document.querySelector('input[name="name"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/blogposts/comment`, {
        method: 'POST',
        body: JSON.stringify({
            comment_text,
            user,
            post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        console.log(response.statusText);
    }
};

document.querySelector('#newcomment').addEventListener('submit', newFormHandler);
