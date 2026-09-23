/**
 * The working method, in the order the story line uses it ("pin down the question,
 * agree what good looks like, then build the thing and check it against the numbers").
 * Each step cites one piece of work where it shows. No new claims: every example
 * is taken from project copy elsewhere in the content layer.
 */
export const method = [
  {
    id: "question",
    index: "01",
    title: "Pin down the question",
    example: "Hold My Code started from one requirement: an update costs an existing user one click.",
  },
  {
    id: "good",
    index: "02",
    title: "Agree what good looks like",
    example: "On AdFlex the KPIs were agreed with Sustainable Energy Ireland before any visual was built.",
  },
  {
    id: "build",
    index: "03",
    title: "Build it",
    example: "Swift for the Mac app, SQL and Python for the data, Next.js for the case studies.",
  },
  {
    id: "check",
    index: "04",
    title: "Check it against the numbers",
    example: "The NVIDIA timeline keeps a public log of the 15 claims that failed the sourcing check.",
  },
] as const;
