/**
 * Layout for entity routes (space, project, collection, object, dataset).
 * Simply passes through children - the RootLayout handles MantineProvider and AppShell.
 */
export default function EntitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
