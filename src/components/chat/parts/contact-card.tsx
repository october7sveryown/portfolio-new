import { DATA } from "@/data/resume";
import { MailIcon } from "lucide-react";
import Link from "next/link";

export function ContactCard() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border px-3 py-3">
      <Link
        href={`mailto:${DATA.contact.email}`}
        className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background"
      >
        <MailIcon className="size-3.5" />
        {DATA.contact.email}
      </Link>
      {Object.entries(DATA.contact.social).map(([name, social]) => (
        <Link
          key={name}
          href={social.url}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <social.icon className="size-3.5" />
          {name}
        </Link>
      ))}
    </div>
  );
}
