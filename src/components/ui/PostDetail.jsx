import CommentForm from "./CommentForm";
import "../../styles/components/PostDetail.css";

import { CalendarFold, User } from "lucide-react";

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
      <button className="btn" onClick={onBackClick}>
        ← Back to Posts
      </button>
      <h1 className="postDetail_title">{post.title}</h1>
      <div className="postDetail_date">
        <CalendarFold />
        <small className="postDetail_date">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </small>
      </div>
      <p
        className="postDetail_content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      >
      </p>
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
            <div className="comment_author">
              <User />
              <p>{comment.authorName}</p>
            </div>
            <div className="comment_date">
              <CalendarFold />
              <small className="comment_date">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </small>
            </div>
            <p className="comment_content">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
