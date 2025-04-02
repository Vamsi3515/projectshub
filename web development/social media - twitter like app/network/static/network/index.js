let profile_liked_user;
let flag = 0;

document.addEventListener('DOMContentLoaded', () => {
    const newpost_form = document.querySelector('form');
    if (newpost_form) {
        newpost_form.addEventListener('submit', event => {
            fetch('/check_auth')
            .then(response => response.json())
            .then(data => {
                if(data.authenticated){
                    newPost(event);
                }else{
                    window.location.href = '/login';
                }
            });
        });
    }
    getPost();
    const follow_btns = document.querySelectorAll('.follow');
    follow_btns.forEach(follow_btn => {
        const username = follow_btn.dataset.username;
        isFollowing(username, follow_btn);
        follow_btn.addEventListener('click', event => {
            event.preventDefault();
            followUser(username, follow_btn);

        });
    });

    const user_posts = document.querySelector('.profile_page_posts');
    if (user_posts) {
        document.addEventListener('scroll', function() {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const profile_page_posts = document.querySelector('.profile_page_posts');
            const profileContainer = document.querySelector('.profile_container');
            if (window.scrollY >= headerHeight) {
                profileContainer.style.position = 'fixed';
                profileContainer.style.top = '0';
                profileContainer.style.left = '0';
                profile_page_posts.style.marginLeft = '320px';
                profile_page_posts.style.height = '100%';
            } else {
                profileContainer.style.position = 'relative';
                profile_page_posts.style.marginLeft = '30px';
                profile_page_posts.style.width = 'auto';
            }
        });
        const profile_user = user_posts.dataset.profile_user;
        profile_page_posts(profile_user);
    }
});

function newPost(event) {
    event.preventDefault();
    const content = document.querySelector('#post_textarea').value;
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const messageElement = document.querySelector('#message');

    fetch('/newpost', {
        method: 'POST',
        body: JSON.stringify({
            content: content,
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => response.json())
    .then(result => {
        document.querySelector('#post_textarea').value = '';
        if (result.message) {
            messageElement.className = 'alert alert-success';
            function clearMessage(){
                messageElement.remove();
            }
            messageElement.innerHTML = result.message;
            setTimeout(clearMessage, 3000);
            getPost();
        }
    })
    .catch(error => {
        console.log("Error:", error);
    });
}

function getPost(page = 1) {
    flag = 0;
    fetch(`/getpost?page=${page}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const posts = data.posts;
        const user = data.user;
        const postContainer = document.querySelector('.post_container');
        if (postContainer) {
            postContainer.innerHTML = '';
            loadPosts(posts, user, postContainer);
        }
        
        const paginationContainer = document.querySelector('.pagination_container');
        if (paginationContainer) {
            paginationContainer.innerHTML = '';
            if (data.has_previous) {
                const prevButton = document.createElement('button');
                prevButton.innerHTML = 'Previous';
                prevButton.className = 'pagination_btn pagination_btn_prev';
                prevButton.addEventListener('click', () => getPost(data.page_number - 1));
                paginationContainer.appendChild(prevButton);
            }
            if (data.has_next) {
                const nextButton = document.createElement('button');
                nextButton.innerHTML = 'Next';
                nextButton.className = 'pagination_btn pagination_btn_next';
                nextButton.addEventListener('click', () => getPost(data.page_number + 1));
                paginationContainer.appendChild(nextButton);
            }
        }
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
}

function profile_page_posts(user, page = 1) {
    flag = 0;
    username = {
        'username' : user
    }
    profile_liked_user = user;
    fetch(`/user/post/${user}?page=${page}`)
    .then(response => response.json())
    .then(data => {
        const posts = data.posts;
        const postContainer = document.querySelector('.profile_page_posts');
        if (postContainer) {
            postContainer.innerHTML = '';
            loadPosts(posts, username, postContainer);

            const paginationContainer = document.querySelector('.pagination_container_user_posts');
            if (paginationContainer) {
                paginationContainer.innerHTML = '';
                if (data.has_previous) {
                    const prevButton = document.createElement('button');
                    prevButton.innerHTML = 'Previous';
                    prevButton.className = 'pagination_btn pagination_btn_prev';
                    prevButton.addEventListener('click', () => profile_page_posts(username, data.page_number - 1));
                    paginationContainer.appendChild(prevButton);
                }
                if (data.has_next) {
                    const nextButton = document.createElement('button');
                    nextButton.innerHTML = 'Next';
                    nextButton.className = 'pagination_btn pagination_btn_next';
                    nextButton.addEventListener('click', () => profile_page_posts(username, data.page_number + 1));
                    paginationContainer.appendChild(nextButton);
                }
            }
        }
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
}

function postLiked(postid) {
    const heart_icon = document.querySelector(`#heart_icon_${postid}`);
    const csrf_token = document.querySelector('#csrf_token').value;
    fetch(`/likepost/${postid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token
        }
    })
    .then(response => response.json())
    .then(post => {
        if (post.isLiked) {
            heart_icon.className = 'fa fa-heart';
        } else {
            heart_icon.className = 'fa fa-heart-o';
        }

        const isFollowingPage = document.querySelector('.following_page');
        const isProfilePage = document.querySelector('.profile_page_posts');

        if (isFollowingPage) {
            get_following_posts();
        } else if (isProfilePage) {
            profile_page_posts(profile_liked_user);
        } else {
            getPost();
        }
    })
    .catch(error => {
        console.error('Error fetching likes status:', error);
    });
}

function followUser(username, follow_btn) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    fetch(`/follow/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.message) {
            console.log(result.message);
        } else {
            console.log("Error: Something went wrong");
        }
        const currentUserFollowingCount = document.querySelector('.current_user_following_count');
        const currentUserFollowersCount = document.querySelector('.current_user_followers_count');
        const profileUserFollowingCount = document.querySelector('.profile_user_following_count');
        const profileUserFollowersCount = document.querySelector('.profile_user_followers_count');

        if (currentUserFollowingCount) {
            currentUserFollowingCount.innerHTML = result.current_user_following_count;
        }
        if (currentUserFollowersCount) {
            currentUserFollowersCount.innerHTML = result.current_user_followers_count;
        }
        if (profileUserFollowingCount) {
            profileUserFollowingCount.innerHTML = result.profile_user_following_count;
        }
        if (profileUserFollowersCount) {
            profileUserFollowersCount.innerHTML = result.profile_user_followers_count;
        }

        isFollowing(username, follow_btn);
    })
    .catch(error => {
        console.log("Error:", error);
    });
}

function get_following_posts(page = 1) {
    flag = 1;
    fetch(`/posts/following?page=${page}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        const postContainer = document.querySelector('.post_container');
        if (postContainer) {
            postContainer.innerHTML = '';
            const posts = data.posts;
            const user = data.user;
            loadPosts(posts, user, postContainer);
        }
        
        const paginationContainer = document.querySelector('.pagination_container');
        if (paginationContainer) {
            paginationContainer.innerHTML = '';
            if (data.has_previous) {
                const prevButton = document.createElement('button');
                prevButton.innerHTML = 'Previous';
                prevButton.className = 'pagination_btn pagination_btn_prev';
                prevButton.addEventListener('click', () => get_following_posts(data.page_number - 1));
                paginationContainer.appendChild(prevButton);
            }
            if (data.has_next) {
                const nextButton = document.createElement('button');
                nextButton.innerHTML = 'Next';
                nextButton.className = 'pagination_btn pagination_btn_next';
                nextButton.addEventListener('click', () => get_following_posts(data.page_number + 1));
                paginationContainer.appendChild(nextButton);
            }
        }
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
}

function editPostHandler(postElement, post, user) {
    const postContent = postElement.querySelector('.post_content');
    const editTextarea = document.createElement('textarea');
    editTextarea.className = 'edit_textarea';
    editTextarea.value = post.content;

    const saveButton = document.createElement('button');
    saveButton.className = 'save_button';
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', () => saveEditedPost(post.id, editTextarea.value, postElement, user=user));

    postContent.innerHTML = '';
    postContent.appendChild(editTextarea);
    postContent.appendChild(saveButton);
}

function saveEditedPost(postId, newContent, postElement, user) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    fetch(`/edit/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            content: newContent,
        }),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        }
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            const postContent = postElement.querySelector('.post_content');
            postContent.innerHTML = newContent;
            profile_page_posts(user=user);
            getPost();
        } else {
            console.error('Error saving post:', result.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function isFollowing(username, follow_btn) {
    fetch(`/isfollowing/${username}`)
    .then(response => response.json())
    .then(data => {
        follow_btn.innerHTML = data.isFollowing ? 'Unfollow' : 'Follow';
    })
    .catch(error => {
        console.error('Error checking follow status:', error);
    });
}

function loadPosts(posts, username, postContainer) {
    if (posts.length === 0) {
        postContainer.innerHTML = '<p id="no_posts">No posts found.</p>';
    } else {
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post_element';
            postElement.innerHTML = `
                <div class="post_info">
                    <div class="post_username"><strong><a href="#" class="profile_link" data-username="${post.username}">${post.username}</a></strong></div>
                    <a href="#" class="edit_post" data-user="${post.username}"></a>
                    <div class="post_content">${post.content}</div>
                    <div class="post_timestamp">${post.timestamp}</div>
                    <i id="heart_icon_${post.id}" aria-hidden="true">
                        <span id="likes_count_${post.id}">${post.likes}</span>
                    </i>
                    <div class="post_comment">Comment</div>
                </div>
            `;

            const editPost = postElement.querySelector('.edit_post');
            if (flag == 1) {
                editPost.remove();
            } else {
                console.log("name",username);
                console.log("name",post.username);
                if (username.username.toLowerCase() === post.username.toLowerCase()) {
                    editPost.innerHTML = 'Edit';
                    editPost.addEventListener('click', event => {
                        event.preventDefault();
                        editPostHandler(postElement, post, username.username);
                    });
                } else {
                    editPost.remove();
                }
            }

            const heartIcon = postElement.querySelector(`#heart_icon_${post.id}`);
            heartIcon.className = post.isLiked ? 'fa fa-heart' : 'fa fa-heart-o';
            heartIcon.title = post.isLiked ? 'unlike' : 'like';
            heartIcon.addEventListener('click', () => {
                fetch('/check_auth')
                .then(response => response.json())
                .then(data => {
                    if (data.authenticated) {
                        postLiked(post.id);
                    } else {
                        window.location.href = '/login';
                    }
                });
            });

            postContainer.appendChild(postElement);
        });

        document.querySelectorAll('.profile_link').forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const username = link.dataset.username;
                window.location.href = `/user/${username}`;
            });
        });
    }
}