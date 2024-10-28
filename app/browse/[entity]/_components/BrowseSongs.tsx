"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
// import { RandomThing } from '@/components/RandomThing'
import { Song } from "@/lib/models";
import { CheckedState } from "@radix-ui/react-checkbox";
import { groupBy, map, replace, sortBy, split, words } from "lodash";
import { FilterIcon, SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function isLetter(character: string) {
  return character.toLowerCase() != character.toUpperCase();
}

function getLetter(song: Song) {
  const songWords = words(song.song);
  const firstChar = songWords[0] === "The" ? songWords[1][0] : song.song[0];

  return isLetter(firstChar) ? firstChar.toUpperCase() : "#";
}

function getDebutYear(song: Song) {
  return split(song.debut, "-")[0];
}

function getLastPlayedYear(song: Song) {
  return split(song.last_played, "-")[0];
}

export function BrowseSongs({ songs }: { songs: Song[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalsOnly, setOriginalsOnly] = useState<CheckedState>(false);
  const [selectedSortBy, setSelectedSortBy] = useState("letter");
  const [timesPlayed, setTimesPlayed] = useState([10]);

  const songsByCategory = useMemo(() => {
    const grouped = groupBy(songs, (x: Song) => {
      switch (selectedSortBy) {
        case "letter":
          return getLetter(x);
        case "debut":
          return getDebutYear(x);
        case "last_played":
          return getLastPlayedYear(x);
      }
    });

    return map(grouped, (songs: Song[], category: string) => {
      songs = sortBy(songs, (x: Song) => {
        const songWords = words(x.song);
        return songWords[0] === "The" ? replace(x.song, "The ", "") : x.song;
      })
        .filter((song) => !originalsOnly || song.artist === "Phish")
        .filter((song) => song.song.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((song) => Number(song.times_played) >= timesPlayed[0]);

      return { category, songs };
    }).filter(({ songs }) => songs.length);
  }, [songs, selectedSortBy, searchTerm, originalsOnly, timesPlayed]);

  return (
    <div>
      {/* <label className="input input-bordered input-primary flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? <XIcon size={20} onClick={() => setSearchTerm("")} /> : <SearchIcon size={20} />}
          </label> */}
      {/* <RandomThing allSongs={songs} /> */}
      <div className="flex justify-between items-end flex-wrap gap-8">
        <h1 className="text-2xl font-medium tracking-tight">Browse Songs</h1>
        <div className="flex gap-16 items-end flex-wrap">
          <div className="flex flex-col gap-2">
            <Label>Sort By</Label>
            <Select value={selectedSortBy} onValueChange={(e) => setSelectedSortBy(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="letter">Letter</SelectItem>
                  <SelectItem value="debut">Debut Date</SelectItem>
                  <SelectItem value="last_played">Last Played Date</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <Checkbox id="originals-only" checked={originalsOnly} onCheckedChange={setOriginalsOnly} />
            <label htmlFor="originals-only" className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Originals Only
            </label>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="">
              Times Played: <strong>{timesPlayed}</strong>
            </label>
            <Slider className="w-[400px]" value={timesPlayed} onValueChange={setTimesPlayed} max={100} min={1} step={1} />
          </div>
        </div>
      </div>
      <Card className="song-grid mt-10 p-8 bg-secondary">
        {songsByCategory.map(({ category, songs }) => (
          <div key={category} className="mb-6">
            <h2 className="pb-2 text-2xl font-semibold text-primary">{category}</h2>
            <ul>
              {songs.map((song: Song) => (
                <li key={song.slug} className="truncate">
                  <Link className="link-hover link" href={`/song/${song.slug}`}>
                    {song.song}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  );
}
