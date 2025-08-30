import CommentForm from "./CommentForm";
import "../../styles/components/PostDetail.css";

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
    <div className="postDetail">
      <button
        className="btn"
        onClick={onBackClick}
        
      >
        ← Back to Posts
      </button>

      <h1 className="postDetail_title">{post.title}</h1>
      <small className="postDetail_date">
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </small>
      <p className="postDetail_content">{post.content}</p>

      <div className="comments">
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
          <div className="comments_item" key={comment.id}>
            <p className="comment_author">{comment.authorName}</p>
            <small className="comment_date">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </small>
            <p className="comment_content">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
