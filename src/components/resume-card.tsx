"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandable = Boolean(description);

  return (
    <div
      className={cn(
        "group -mx-3 flex gap-4 rounded-lg px-3 py-3 transition-colors",
        expandable && "cursor-pointer hover:bg-muted"
      )}
      onClick={() => expandable && setIsExpanded((v) => !v)}
    >
      <Avatar className="size-11 flex-none border bg-muted-background dark:bg-foreground">
        <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
        <AvatarFallback>{altText[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-grow">
        <div className="flex items-start justify-between gap-x-3">
          <div className="min-w-0">
            <h3 className="inline-flex items-center gap-2 font-medium leading-tight">
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  className="underline-offset-4 hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {title}
                </Link>
              ) : (
                title
              )}
              {badges?.map((badge) => (
                <Badge variant="secondary" className="text-xs" key={badge}>
                  {badge}
                </Badge>
              ))}
            </h3>
            {subtitle && (
              <div className="mt-0.5 text-sm text-muted-foreground">
                {subtitle}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1 text-xs tabular-nums text-muted-foreground sm:text-sm">
            {period}
            {expandable && (
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Hide details" : "Show details"}
                className="rounded p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded((v) => !v);
                }}
              >
                <ChevronDownIcon
                  className={cn(
                    "size-4 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </button>
            )}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && description && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
            >
              <span className="block pt-2">{description}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
