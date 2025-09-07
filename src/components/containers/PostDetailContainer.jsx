import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, addComment } from "../../services/PostService";
import PostDetail from "../ui/PostDetail";

const PostDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getPost(id)
      .then((data) => {
        setPost(data);
        setComments(data.comments);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    addComment(id, authorName, content)
      .then((newComment) => {
        setComments([...comments, newComment]);
        setAuthorName("");
        setContent("");
        setSubmitting(false);
      })
      .catch((err) => {
        setError(err.message);
        setSubmitting(false);
      });
  };

  const handleBackClick = () => {
    navigate("/posts");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) {
    return (
      <div>
        <button
          className="btn"
          onClick={handleBackClick}
          style={{ marginBottom: "20px" }}
        >
          ← Back to Posts
        </button>
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn"
            onClick={() => window.location.reload()}
            style={{ marginTop: "10px" }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <PostDetail
      post={post}
      comments={comments}
      onBackClick={handleBackClick}
      postId={id}
      authorName={authorName}
      setAuthorName={setAuthorName}
      content={content}
      setContent={setContent}
      onSubmit={handleSubmit}
      submitting={submitting}
      error={error}
    />
  );
};

export default PostDetailContainer;
