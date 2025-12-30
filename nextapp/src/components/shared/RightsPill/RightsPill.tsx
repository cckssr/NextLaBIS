import { Pill } from "@mantine/core";
import styles from "./rightsPill.module.css";
import { OpenBISRole } from "@/types/openbis";

/**
 * Props for RightPill component.
 *
 * @param role - The OpenBIS role type (admin, power_user, user, observer).
 */
interface RightsPillProps {
  role: OpenBISRole;
}

/**
 * Maps role types to CSS module class names.
 */
function getRoleClassName(role?: OpenBISRole): string {
  const roleMap: Record<OpenBISRole, string> = {
    admin: styles.admin,
    power_user: styles.powerUser,
    user: styles.user,
    observer: styles.observer,
  };

  return role ? roleMap[role] : styles.rightPill;
}

/**
 * Custom global RightPill component to display OpenBIS role rights in a pill style.
 * Supports different visual styles for each role type.
 */
export default function RightsPill({ role }: RightsPillProps) {
  return (
    <Pill className={getRoleClassName(role)}>{role.replace("_", " ")}</Pill>
  );
}
