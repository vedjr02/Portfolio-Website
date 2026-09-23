import { Chapter, Eyebrow, Scene } from "@/components/Chapter";
import { groups, projects } from "@/content/projects";

const sorted = [...projects].sort((a, b) => b.sort.localeCompare(a.sort));

export function Index() {
  return (
    <Chapter id="index" label="05 — Index">
      <Scene state="clusters" className="wrap flex items-end pb-[8vh]" minHeight="110svh">
        <div className="scrim max-w-[42rem]">
          <Eyebrow index="05">Index · all {projects.length} projects</Eyebrow>
          <h2 id="index-title" className="t-chapter mt-6">
            Everything, including the small stuff.
          </h2>
          <p className="t-body mt-5 max-w-[34rem]">
            Each cluster is one project, sized by scope: shipped products and multi-module systems are largest,
            single-feature experiments smallest. Nothing here is sized by traffic.
          </p>
        </div>
      </Scene>
      <div className="wrap relative z-[1] pb-[14vh]">
        <div className="overflow-hidden rounded-[14px] border border-rule bg-[rgb(21_20_29/0.92)]">
          <table className="w-full border-collapse text-left text-[14px]">
            <caption className="sr-only">All {projects.length} projects, newest first</caption>
            <thead>
              <tr className="t-label border-b border-rule">
                <th scope="col" className="py-3 pl-5 font-normal">Name</th>
                <th scope="col" className="hidden py-3 font-normal md:table-cell">Kind</th>
                <th scope="col" className="hidden py-3 font-normal lg:table-cell">Group</th>
                <th scope="col" className="py-3 font-normal">Date</th>
                <th scope="col" className="py-3 pr-5 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr key={p.id} className="border-b border-rule last:border-0">
                  <td className="py-3 pl-5">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-[13px] text-paper-3">{p.summary}</p>
                  </td>
                  <td className="hidden py-3 pr-3 text-paper-2 md:table-cell">{p.kind}</td>
                  <td className="hidden py-3 pr-3 text-paper-2 lg:table-cell">{groups[p.group].label}</td>
                  <td className="t-mono py-3 pr-3 text-[13px] text-paper-2">{p.date}</td>
                  <td className="py-3 pr-5 text-[13px] whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`dot ${p.status === "Live" ? "bg-signal" : p.status === "In progress" ? "border border-signal" : "bg-dust"}`}
                      />
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Chapter>
  );
}
