import PostItemContainer from "../containers/PostItemContainer";
import "../../styles/components/PostList.css"

const PostList = ({ posts }) => {
  return (
    <div className="postList">
      <h1 className="postList_title">Forrest's Blog Posts</h1>
      {posts.map((post) => (
        <PostItemContainer key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
