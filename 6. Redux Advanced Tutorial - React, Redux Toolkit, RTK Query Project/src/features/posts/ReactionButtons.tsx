import React from "react";
import { Post, useAddReactionMutation } from "./postSlice";
import { HStack } from "@chakra-ui/react";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😲",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕️",
};
type ReactionButtonsProps = {
  post: Post;
};

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post }) => {
  const [addReaction] = useAddReactionMutation();
  return (
    <HStack>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() => {
            const newValue =
              post.reactions[name as keyof typeof reactionEmoji] + 1;
            addReaction({
              postId: post.id,
              reaction: name as keyof typeof reactionEmoji,
            });
          }}
        >
          {emoji}
        </button>
      ))}
    </HStack>
  );
};
export default ReactionButtons;
