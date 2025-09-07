const BASE_URL = "https://forrest-blog-backend.onrender.com";

export async function getPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Error ${response.status}: Failed to load posts`
      );
    }

    return data;
  } catch (err) {
    throw new Error(`Failed to fetch posts: ${err.message}`);
  }
}

export async function getPost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Post not found");
      } else if (response.status === 400) {
        throw new Error(data.message || "Invalid post ID");
      } else {
        throw new Error(
          data.message || `Error ${response.status}: Failed to load post`
        );
      }
    }
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch post : ${err.message}`);
  }
}

export async function addComment(postId, authorName, content) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authorName, content })
    })
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || `Error ${response.status}: Failed to post comment`
      );
    }
    return data;
  } catch (err) {
    throw new Error(`Failed to create comment : ${err.message}`);
  }
}
