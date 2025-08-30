import "../../styles/components/PostItem.css";

const PostItem = ({ post, previewContent, onPostClick }) => {
  return (
    <div className="postItem" onClick={onPostClick}>
      <h2 className="postItem_title">{post.title}</h2>
      <p className="postItem_para">{previewContent}</p>
    </div>
  );
};

export default PostItem;
