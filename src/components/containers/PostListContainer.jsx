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

  if (loading) return <div>Loading...</div>;

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

  return <PostList posts={posts} />;
};

export default PostListContainer;
