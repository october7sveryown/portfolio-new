import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

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
  return (
    <Link href={href || "#"} className="block cursor-pointer group">
      <div className="flex gap-4 lg:gap-6">
        <div className="flex-none">
          <Avatar className="border size-16 lg:size-20 bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow flex-col min-w-0">
          <div className="flex items-start justify-between gap-x-2 mb-2">
            <h3 className="inline-flex items-center font-semibold leading-none text-sm sm:text-base">
              {title}
              {badges && badges.length > 0 && (
                <span className="inline-flex gap-x-1 ml-2">
                  {badges.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      className="align-middle text-xs"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </span>
              )}
              <ChevronRightIcon className="size-4 ml-1 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
            </h3>
            <div className="text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap">
              {period}
            </div>
          </div>
          {subtitle && <div className="font-sans text-sm text-muted-foreground mb-2">{subtitle}</div>}
          {description && <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>}
        </div>
      </div>
    </Link>
  );
};
