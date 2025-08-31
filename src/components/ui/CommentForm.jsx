import "../../styles/components/CommentForm.css";

const CommentForm = ({
  authorName,
  setAuthorName,
  content,
  setContent,
  submitting,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="commentForm">
      <input
        name="author"
        type="text"
        placeholder="Name"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />

      <textarea
        name="content"
        placeholder="Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button className="btn" type="submit" disabled={submitting}>
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
