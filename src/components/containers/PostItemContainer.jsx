import { useNavigate } from "react-router-dom";
import PostItem from "../ui/PostItem";

const PostItemContainer = ({ post }) => {
  const navigate = useNavigate();
  const previewContent = post.content.split(".")[0] + ".";

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <PostItem
      post={post}
      previewContent={previewContent}
      onPostClick={handlePostClick}
    />
  );
};

export default PostItemContainer;
