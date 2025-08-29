import CommentForm from "./CommentForm";

const PostDetail = ({
  post,
  comments,
  onBackClick,
  authorName,
  setAuthorName,
  content,
  setContent,
  submitting,
  onSubmit,
  error,
}) => {
  return (
    <div>
      <button
        onClick={onBackClick}
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

      <h1>{post.title}</h1>
      <small>
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </small>
      <p>{post.content}</p>

      <div>
        <h3>Comments ({comments.length})</h3>
        <CommentForm
          authorName={authorName}
          setAuthorName={setAuthorName}
          content={content}
          setContent={setContent}
          onSubmit={onSubmit}
          submitting={submitting}
          error={error}
        />
        {comments.map((comment) => (
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
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
