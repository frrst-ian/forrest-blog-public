import PostItemContainer from "../containers/PostItemContainer";

const PostList = ({ posts }) => {
  return (
    <div>
      <h1>Forrest's Blog Posts</h1>
      {posts.map((post) => (
        <PostItemContainer key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
