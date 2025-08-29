const PostItem = ({ post, previewContent, onPostClick }) => {
  return (
    <div
      onClick={onPostClick}
      style={{
        cursor: "pointer",
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

export default PostItem;
