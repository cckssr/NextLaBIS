import { useState } from "react";

export function useDescriptionProps() {
  // line clamp for long descriptions. If hovered, show full description

  // state to check if mouse hovers over the input field
  const [isClicked, setIsClicked] = useState(false);

  return {
    onClick: () => setIsClicked(!isClicked),
    style: {
      display: "-webkit-box",
      WebkitLineClamp: isClicked ? "unset" : 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      cursor: "pointer",
    },
  };
}
