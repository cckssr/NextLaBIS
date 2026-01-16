import { Header } from "@/components/spaces/Header.server";

export interface SpaceOverviewPageProps {
  params: { spaceCode: string };
}
export default async function SpaceOverviewPage({
  params,
}: SpaceOverviewPageProps) {
  //   const data = await getSpaceOverview(params.spaceCode);
  //   return <SpaceOverviewView data={data} />;
  const { spaceCode } = params;

  // fetch space details here
  return <div>Space: {spaceCode}</div>;
}
