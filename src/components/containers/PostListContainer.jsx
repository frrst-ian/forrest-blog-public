import { useEffect, useState } from "react";
import { getPosts } from "../../services/PostService";
import PostList from "../ui/PostList";

const PostListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  if (error) {
    return (
      <div
       className="error"
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

  return <PostList posts={posts} />;
};

export default PostListContainer;
