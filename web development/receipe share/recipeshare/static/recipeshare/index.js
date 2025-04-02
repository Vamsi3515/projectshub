document.addEventListener('DOMContentLoaded', () => {
    let edited_comment = 0;

    const commentBoxForm = document.querySelector('.comment_box_form');
    const userComment = document.querySelector('.user_comment');

    var successMsg = document.getElementById("successMSG");
    if (successMsg) {
        setTimeout(function() {
            successMsg.style.display = "none";
        }, 2000);
    }

    handleFavorites();
    handleLikes();

    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', handleFormSubmit);
    }

    const editBtn = document.querySelector('.edit_comment');
    if (editBtn) {
        editBtn.addEventListener('click', function(event) {
            event.preventDefault();
            comment = this.dataset.comment;
            rating = this.dataset.rating;
            document.querySelector('.user_comment').style.display = "none";
            commentBoxForm.style.display = 'block';
            document.querySelector('.leave_comment_text').innerHTML = 'Edit your comment';
            document.querySelector(`input[name="rating"][value="${rating}"]`).checked = true;
            document.querySelector('#comment').innerHTML = comment;
            document.querySelector('.comment_submit').addEventListener('submit', handleFormSubmit);
            edited_comment = 1;
        });
    }

    const editPostButtons = document.querySelectorAll('.fa-edit');

    editPostButtons.forEach(editButton => {
        editButton.addEventListener('click', function(event) {
            event.preventDefault();

            const title = this.dataset.title;
            const description = this.dataset.description;
            const image = this.dataset.image;
            const postid = this.dataset.postid;

            localStorage.setItem('editTitle', title);
            localStorage.setItem('editDescription', description);
            localStorage.setItem('editImage', image);
            localStorage.setItem('editPostID', postid);
            window.location.href = "/user/newpost";
        });
    });

    if (window.location.pathname === '/user/newpost') {
        const title = localStorage.getItem('editTitle');
        const description = localStorage.getItem('editDescription');
        const image = localStorage.getItem('editImage');
        const postID = localStorage.getItem('editPostID');

        if (title && description && image) {
            document.querySelector('.card-title').innerHTML = 'Edit Post';
            document.querySelector('#recipe_name').value = title;
            document.querySelector('#description').value = description;
            document.querySelector('#image_url').value = image;
            const form = document.querySelector('#new_post_form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(form);
                fetch(`/user/newpost/${postID}/edit`, {
                    method: 'POST',
                    body: formData,
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.log(result.error);
                } else {
                    console.log(result.message);
                    window.location.reload();
                }
            });
        });

            localStorage.removeItem('editTitle');
            localStorage.removeItem('editDescription');
            localStorage.removeItem('editImage');
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const postId = form.querySelector('.comment_submit').dataset.postid;
        fetch('/auth/user_status')
        .then(response => response.json())
        .then(data => {
            if (!data.is_authenticated) {
                window.location.href = '/login';
            } else {
                let url = edited_comment ? `/recipe/view/${postId}/comment/edit` : `/recipe/view/${postId}/comment`;
                fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if (result.error) {
                        console.log(result.error);
                    } else {
                        console.log(result.message);
                        window.location.reload();
                    }
                });
            }
        });
    }
    
    if (commentBoxForm) {
        const postID = commentBoxForm.dataset.postid;
        if (postID) {
            isCommented(postID);
        } else {
            console.error('Post ID not found in comment_box_form');
        }
    }

    const followbtns = document.querySelectorAll('.profile-follow');
    followbtns.forEach(btn => {
        btn.addEventListener('click', function(event){
            fetch('/auth/user_status')
            .then(response => response.json())
            .then(data => {
            if (!data.is_authenticated) {
                window.location.href = '/login';
            } else {
                event.preventDefault();
            author = this.dataset.author;
            fetch(`/profile/${author}/follow`, {
                method : 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('[name="csrfmiddlewaretoken"]').value,
                    'Content-Type': 'application/json' 
                }
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.log(result.error);
                } else {
                    console.log(result.success);
                    window.location.reload();
                }
            });
            }
            });
        });      
    });

});


function isCommented(post_id) {
    const commentBoxForm = document.querySelector('.comment_box_form');
        const userComment = document.querySelector('.user_comment');
    fetch('/auth/user_status')
    .then(response => response.json())
    .then(data => {
        if (!data.is_authenticated) {
            commentBoxForm.style.display = 'block';
            userComment.style.display = 'none';
        } else {
        fetch(`/iscommented/${post_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.is_already_commented);
                if(data.is_already_commented) {
                    userComment.style.display = 'block';
                    commentBoxForm.style.display = 'none';
                } else {
                    commentBoxForm.style.display = 'block';
                    userComment.style.display = 'none';
                }
            })
            .catch(error => console.error('Error fetching comment status:', error));
            }
        });
}

function handleFavorites() {
    const favorites = document.querySelectorAll('.favorite');
    favorites.forEach(favorite => {
        favorite.addEventListener('click', function(event) {
            event.preventDefault();
            const post_id = this.dataset.postid;

            fetch('/auth/user_status')
                .then(response => response.json())
                .then(data => {
                    if (!data.is_authenticated) {
                        window.location.href = '/login';
                    } else {
                        fetch(`/${post_id}/addtofavorite`, {
                            method: 'POST',
                            headers: {
                                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                            }
                        })
                            .then(response => response.json())
                            .then(result => {
                                if (result.success) {
                                    console.log(result.success);
                                    const icon = this.querySelector('i');
                                    if (icon.classList.contains('fa-heart-o')) {
                                        icon.classList.remove('fa-heart-o');
                                        icon.classList.add('fa-heart');
                                        this.title = "Remove from favorites";
                                    } else {
                                        icon.classList.remove('fa-heart');
                                        icon.classList.add('fa-heart-o');
                                        this.title = "Add to favorites";
                                    }
                                } else {
                                    console.log(result.error);
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    }
                });
        });
    });
}

function handleLikes(){
    const likes = document.querySelectorAll('.like_post');
    likes.forEach(like => {
        like.addEventListener('click', function(event){
            const post_id = this.dataset.postid;
            fetch('/auth/user_status')
            .then(response => response.json())
            .then(data => {
                if (!data.is_authenticated) {
                    window.location.href = '/login';
                } else {
                    fetch(`/${post_id}/like`, {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                        }
                    })
                    .then(response => response.json())
                    .then(result => {
                        if(result.success){
                            console.log(result.success);
                            const icon = this.querySelector('i');
                            if (icon.classList.contains('fa-thumbs-up')) {
                                icon.classList.remove('fa-thumbs-up');
                                icon.classList.add('fa-thumbs-o-up');
                                this.title = "like post";
                            } else {
                                icon.classList.remove('fa-thumbs-o-up');
                                icon.classList.add('fa-thumbs-up');
                                this.title = "unlike post";
                            }
                        }else{
                            console.log(result.error);
                        }
                    });
                }
            });
        });
    });
}