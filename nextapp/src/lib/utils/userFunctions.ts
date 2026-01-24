import { OpenbisUser } from "../model/OpenBISModel";

/**
 * Format user name for display.
 * Uses first and last name if available, otherwise falls back to user ID.
 *
 * @param user The OpenbisUser object.
 * @returns A formatted string user name.
 */
export function formatUserName(user: OpenbisUser): string {
  if (user.firstName || user.lastName) {
    return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  } else {
    return user.userId;
  }
}
