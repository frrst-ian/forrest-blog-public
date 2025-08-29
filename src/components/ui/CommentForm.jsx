const CommentForm = ({
  authorName,
  setAuthorName,
  content,
  setContent,
  submitting,
  onSubmit,
  error,
}) => {
  return (
    <form onSubmit={onSubmit}>
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

export default CommentForm;
