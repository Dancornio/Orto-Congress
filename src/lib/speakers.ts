import rawSpeakers from "@/data/speakers.json";

export type Speaker = {
  slug: string;
  name: string;
  title: string;
  affiliation: string;
  keynote: boolean;
  track: string;
  bio: string;
  topics: string[];
  image: string;
};

export const speakers = rawSpeakers as Speaker[];

export function getSpeaker(slug: string): Speaker | undefined {
  return speakers.find((speaker) => speaker.slug === slug);
}
