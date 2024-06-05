import { useAppSelector } from "app/hooks";
import { PostType, selectAllPosts } from "./postsSlice";

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  return (
    <section className="flex flex-col space-y-7">
      <h2 className="text-2xl font-black">Posts</h2>
      {posts &&
        posts.map((post: PostType) => (
          <div className="card card-bordered bg-slate-700" key={post.id}>
            <div className="card-body">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p>{post.content.substring(0, 100)}</p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default PostsList;
