import AddPostForm from "features/posts/AddPostForm";
import PostsList from "features/posts/PostsList";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <AddPostForm />
      <PostsList />
    </div>
  );
};

export default App;
