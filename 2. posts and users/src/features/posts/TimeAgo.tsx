import { formatDistanceToNow, parseISO } from "date-fns";

import React from "react";

type TimeAgoProps = {
  timestamp: string;
};

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp }) => {
  let timeAgo: string = ""; // Update the type to string
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  ); // Display the timeAgo value
};
export default TimeAgo;
