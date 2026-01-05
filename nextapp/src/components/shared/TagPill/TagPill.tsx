import { Pill } from "@mantine/core";
import styles from "./tagPill.module.css";

/**
 * Props for TagPill component.
 *
 * @param label - The text label to display inside the tag pill.
 */
interface TagPillProps {
  label: string;
}

/**
 * Custom global TagPill component to display tags in a pill style.
 */
export default function TagPill({ label }: TagPillProps) {
  return (
    <Pill key={label} className={styles.tagPill}>
      {label}
    </Pill>
  );
}
