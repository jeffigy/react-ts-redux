import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { Post, reactionAdded } from "./postSlice";
import { HStack, IconButton } from "@chakra-ui/react";

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
  const dispatch = useAppDispatch();
  return (
    <HStack>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
        </button>
      ))}
    </HStack>
  );
};
export default ReactionButtons;
