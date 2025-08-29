import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

import "./App.css";

/**
 * CommentForm Component
 * Handles adding new comments to a specific post
 * Props: postId (which post to comment on), onCommentAdded (callback when comment is successfully added)
 */
const CommentForm = ({ postId, onCommentAdded }) => {
  // State for form inputs - these update as user types
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");

  // State for UI feedback - shows loading/error states
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    // Set UI state to show we're submitting
    setSubmitting(true);
    setError(""); // Clear any previous errors

    // Send POST request to backend API
    fetch(`http://localhost:3000/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorName, content }),
    })
      .then(async (response) => {
        const data = await response.json();

        // Check if backend returned an error
        if (!response.ok) {
          throw new Error(
            data.message || `Error ${response.status}: Failed to post comment`
          );
        }
        return data;
      })
      .then((newComment) => {
        onCommentAdded(newComment);

        // Clear form inputs for next comment
        setAuthorName("");
        setContent("");
        setSubmitting(false);
      })
      .catch((err) => {
        // Something went wrong - show error message to user
        setError(err.message);
        setSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Show error message if there is one */}
      {error && (
        <div
          style={{
            color: "red",
            backgroundColor: "#ffe6e6",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px",
            border: "1px solid red",
          }}
        >
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Your Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />

      <textarea
        placeholder="Your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

/**
 * PostDetail Component
 * Shows full post content, comments, and allows adding new comments
 * Gets post ID from URL parameters
 */
const PostDetail = () => {
  const { id } = useParams(); // Extract post ID from URL
  const navigate = useNavigate(); // Hook for navigation

  // State for post data and comments
  const [post, setPost] = useState(null); // Will hold the post object
  const [comments, setComments] = useState([]); // Array of comment objects

  // State for UI feedback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Store any error messages

  // useEffect runs when component mounts or when 'id' changes
  // This handles fetching post data when navigating to different posts
  useEffect(() => {
    setLoading(true); // Show loading spinner
    setError(""); // Clear any previous errors

    // Fetch post data from backend API
    fetch(`http://localhost:3000/posts/${id}`)
      .then(async (response) => {
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
      })
      .then((data) => {
        setPost(data);
        setComments(data.comments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]); // Dependency array: re-run effect when post ID changes

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]); // Add new comment to existing array
  };

  const handleBackClick = () => {
    navigate("/posts");
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        <button onClick={handleBackClick} style={{ marginBottom: "20px" }}>
          ← Back to Posts
        </button>
        <div
          style={{
            color: "red",
            backgroundColor: "#ffe6e6",
            padding: "20px",
            borderRadius: "4px",
            border: "1px solid red",
            textAlign: "center",
          }}
        >
          <h2>Error</h2>
          <p>{error}</p>
          {/* Allow user to retry by refreshing the page */}
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "10px" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main post detail view
  return (
    <div>
      <button
        onClick={handleBackClick}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Back to Posts
      </button>

      {/* Post content */}
      <h1>{post.title}</h1>
      <small>
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </small>
      <p>{post.content}</p>

      {/* Comments section */}
      <div>
        <h3>Comments ({comments.length})</h3>

        {/* Comment form - passes postId and callback function as props */}
        <CommentForm postId={id} onCommentAdded={handleCommentAdded} />

        {/* Render all comments */}
        {comments.map((comment) => {
          return (
            <div
              key={comment.id}
              style={{
                border: "1px solid #eee",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            >
              <p>
                <strong>{comment.authorName}</strong>
              </p>
              <small>
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </small>
              <p>{comment.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * PostItem Component
 * Displays a single post preview in the posts list
 * Props: post (object containing post data)
 */
const PostItem = ({ post }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Create preview text from first sentence of post content
  const previewContent = post.content.split(".")[0] + ".";

  function handlePostClick() {
    navigate(`/posts/${post.id}`); // Navigate to post detail page
  }

  return (
    <div
      onClick={handlePostClick}
      style={{
        cursor: "pointer", // Show it's clickable
        padding: "15px",
        border: "1px solid #eee",
        marginBottom: "10px",
        borderRadius: "4px",
        hover: { backgroundColor: "#f9f9f9" },
      }}
    >
      <h1>{post.title}</h1>
      <p>{previewContent}</p>
    </div>
  );
};

/**
 * PostList Component
 * Displays a list of all posts
 * Props: posts (array of post objects)
 */
const PostList = ({ posts }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      {/* Map through posts array and create PostItem for each */}
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

/**
 * Main App Component
 * Handles routing and fetches initial posts data
 * This is the root component that manages app-wide state
 */
const App = () => {
  // State for all posts data
  const [posts, setPosts] = useState([]); // Will hold array of all posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect runs once when app loads to fetch all posts
  useEffect(() => {
    // Fetch posts from backend API
    fetch("http://localhost:3000/posts")
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || `Error ${response.status}: Failed to load posts`
          );
        }
        return data;
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array = run only once when component mounts

  if (loading) return <div>Loading...</div>;

  // Show error if initial data fetch failed
  if (error) {
    return (
      <div
        style={{
          color: "red",
          backgroundColor: "#ffe6e6",
          padding: "20px",
          borderRadius: "4px",
          border: "1px solid red",
          textAlign: "center",
          margin: "20px",
        }}
      >
        <h2>Error Loading Posts</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: "10px" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Main app render with routing
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        {/* Route for posts list page - passes posts data as prop */}
        <Route path="/posts" element={<PostList posts={posts} />} />
        {/* Route for individual post page - :id is a URL parameter */}
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
