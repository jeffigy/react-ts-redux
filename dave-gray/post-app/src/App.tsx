import Layout from "components/Layout";
import AddPostForm from "features/posts/AddPostForm";
import EditPost from "features/posts/EditPost";
import PostsList from "features/posts/PostsList";
import SinglePostPage from "features/posts/SinglePostPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPost />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
