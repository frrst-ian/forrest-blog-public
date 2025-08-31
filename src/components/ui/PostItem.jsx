import "../../styles/components/PostItem.css";
import { Anchor } from 'lucide-react';

const PostItem = ({ post, previewContent, onPostClick }) => {
  return (
    <div className="postItem" onClick={onPostClick}>
      <div className="postItem_title_wrapper">
        <Anchor/>
        <h2 className="postItem_title">{post.title}</h2>
      </div>
      <p className="postItem_para">{previewContent}</p>
    </div>
  );
};

export default PostItem;
