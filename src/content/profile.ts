/**
 * Who Vedant is, in his own words. Copy carried over from the v2 site
 * (src/lib/data.ts) unless DECISIONS.md lists a change.
 */

export const GITHUB_USER = "vedjrr";
export const github = (repo?: string) => `https://github.com/${GITHUB_USER}${repo ? `/${repo}` : ""}`;

export const profile = {
  name: "Vedant Ambre",
  firstName: "Vedant",
  lastName: "Ambre",
  title: "Business Analyst",
  positioning: "Business analyst who ships software.",
  /** One sentence a stranger should be able to repeat after one scroll. */
  thesis: "I scope a problem the way an analyst does, then build the fix myself.",
  email: "ambreved3@gmail.com",
  location: "Maynooth, Ireland",
  availableFrom: "Sep 2026",
  availability: "Available from Sep 2026, for business analyst roles",
  lookingFor: "Business analyst roles, from September 2026.",
  site: "https://vedantambre.com",
  socials: {
    linkedin: "https://linkedin.com/in/vedantambre",
    github: github(),
    email: "mailto:ambreved3@gmail.com",
  },
  story:
    "I came up through engineering because I liked how a clean query could change what a team believed about its own numbers. That took me from a Diploma in Computer Science and a B.Tech in Information Technology in Mumbai to a Master's in Business Analytics at Maynooth University. I still work the way I was trained as an analyst: pin down the question, agree what good looks like, then build the thing and check it against the numbers.",
  now: "Building AdFlex with Sustainable Energy Ireland for my Master's, and shipping Hold My Code updates on the side.",
} as const;

export type Profile = typeof profile;
