import React from "react";
import { Post, useAddReactionMutation } from "./postsSlice";

type ReactionsProps = {
  post: Post;
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

  const [addReaction] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        className="btn btn-ghost btn-sm"
        onClick={() => {
          const newValue =
            post.reactions[name as keyof typeof reactionEmoji] + 1;
          addReaction({
            postId: post.id,
            reactions: { ...post.reactions, [name]: newValue },
          });
        }}
      >
        {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
      </button>
    );
  });

  return <div className="flex justify-between">{reactionButtons}</div>;
};

export default Reactions;
