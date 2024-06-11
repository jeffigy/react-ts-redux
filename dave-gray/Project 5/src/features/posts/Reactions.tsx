import React from "react";
import { PostType, reactionAdded } from "./postsSlice";
import { useAppDispatch } from "app/hooks";

type ReactionsProps = {
  post: PostType;
};

const Reactions: React.FC<ReactionsProps> = ({ post }) => {
  const reactionEmoji: Record<
    "thumbsUp" | "wow" | "heart" | "rocket" | "coffee",
    string
  > = {
    thumbsUp: "👍",
    wow: "😲",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };

  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        className="btn btn-ghost btn-sm"
        onClick={() =>
          dispatch(
            reactionAdded({
              postId: post.id,
              reaction: name as keyof typeof reactionEmoji,
            }),
          )
        }
      >
        {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
      </button>
    );
  });

  return <div className="flex justify-between">{reactionButtons}</div>;
};

export default Reactions;
