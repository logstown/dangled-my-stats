import { notFound } from "next/navigation";
import { BrowseSongs } from "./_components/BrowseSongs";
import { getAllShows, getAllSongs, getAllVenues } from "@/lib/phish-service";
import { map, uniqBy } from "lodash";
import { BrowseVenues } from "./_components/BrowseVenues";
import { BrowseTours } from "./_components/BrowseTours";

export default async function BrowseEntityPage({ params }: { params: { entity: string } }) {
  const { entity } = await params;

  switch (entity) {
    case "songs":
      const allSongsResp = await getAllSongs();
      const allSongs = uniqBy(allSongsResp.data, "songid");
      return <BrowseSongs songs={allSongs} />;
    case "venues":
      const allVenuesResp = await getAllVenues();
      const venues = map(allVenuesResp.data, (x) => ({
        ...x,
        browse_name: x.short_name || x.venuename,
      }));
      return <BrowseVenues venues={venues} />;
    case "tours":
      const allShowsResp = await getAllShows();
      return <BrowseTours shows={allShowsResp.data} />;

    default:
      notFound();
  }
}
