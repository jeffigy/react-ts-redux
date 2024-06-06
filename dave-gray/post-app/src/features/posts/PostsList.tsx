import { useAppSelector } from "app/hooks";
import { PostType, selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";

const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  const orderedPosts = posts
    .slice()
    .sort((a: PostType, b: PostType) => b.date.localeCompare(a.date));
  return (
    <section className="flex flex-col space-y-7">
      <h2 className="text-2xl font-black">Posts</h2>
      {posts &&
        orderedPosts.map((post: PostType) => (
          <div className="card card-bordered bg-slate-700" key={post.id}>
            <div className="card-body">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p>{post.content.substring(0, 100)}</p>
              <p className="font-thin">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
              </p>
              <Reactions post={post} />
            </div>
          </div>
        ))}
    </section>
  );
};

export default PostsList;
