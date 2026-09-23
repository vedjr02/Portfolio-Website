import { Chapter, Eyebrow, Scene } from "@/components/Chapter";
import { contact } from "@/content/contact";

export function Contact() {
  return (
    <Chapter id="contact" label="07 — Contact">
      <Scene state="point" className="wrap flex flex-col justify-end pt-[20vh] pb-[12vh]" minHeight="110svh">
        <Eyebrow index="07">Contact · converge</Eyebrow>
        <h2 id="contact-title" className="t-chapter mt-6 max-w-[16ch]">
          {contact.heading}
        </h2>
        <p className="t-lead mt-5 text-paper-2">{contact.line}</p>
        <a
          href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`}
          className="mt-10 block w-fit font-display text-[clamp(2.2rem,7.4vw,7rem)] leading-none tracking-[-0.03em] break-all text-paper decoration-signal decoration-1 underline-offset-[0.12em] hover:underline"
        >
          {contact.email}
        </a>
        <ul className="mt-10 flex flex-wrap gap-3">
          <li>
            <a href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.subject)}`} className="btn btn-signal">
              Write an email
            </a>
          </li>
          {contact.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="btn btn-ghost" target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Scene>
    </Chapter>
  );
}
