import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LinkComponent } from "@/components/ui/Link";
import { Span } from "@/components/ui/Text";
import { getTranslations } from "next-intl/server";
import { getPublicTeam } from "@/lib/api";

interface ApiTeamMember {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  photoUrl: string | null;
  sortOrder: number;
}

function TeamMemberCard({
  name,
  role,
  description,
  imageUrl,
  imageColor,
  roundedCorner,
}: {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  imageColor: string;
  roundedCorner: "tl" | "tr";
}) {
  const roundedClass =
    roundedCorner === "tl" ? "rounded-tl-[50px]" : "rounded-tr-[50px]";

  return (
    <div className="flex flex-col gap-4 flex-1 min-w-[240px] max-w-[384px]">
      <div
        className={`relative w-full aspect-square ${roundedClass} overflow-hidden`}
        style={{ backgroundColor: imageColor }}
      >
        <Image
          src={imageUrl || "/placeholder-team.jpg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="font-poppins font-semibold text-lg leading-7 text-[#181D27]">
            {name}
          </h4>
          <p className="font-poppins text-base leading-6 text-[#6941C6]">
            {role}
          </p>
        </div>
        <p className="font-poppins text-base leading-6 text-[#535862]">
          {description}
        </p>
      </div>
    </div>
  );
}

const IMAGE_COLORS = ["#CFD4C6", "#D1E3D9", "#E3C6D1"];
const ROUNDED: ("tl" | "tr")[] = ["tl", "tr", "tr", "tl", "tr", "tr"];

export async function AboutTeam({
  locale = "en",
  config = {},
}: {
  locale?: string;
  config?: Record<string, string>;
}) {
  const t = await getTranslations("about");
  const heading = locale === "ar" ? (config["about.team.headingAr"] ?? t("team.heading")) : (config["about.team.headingEn"] ?? t("team.heading"));
  const subheading = locale === "ar" ? (config["about.team.subheadingAr"] ?? t("team.subheading")) : (config["about.team.subheadingEn"] ?? t("team.subheading"));
  const viewAll = locale === "ar" ? (config["about.team.viewAllAr"] ?? t("team.viewAll")) : (config["about.team.viewAllEn"] ?? t("team.viewAll"));

  let members: ApiTeamMember[] = [];
  try {
    members = await getPublicTeam();
  } catch {
    // Fallback to empty
  }

  const toCard = (m: ApiTeamMember, i: number) => ({
    name: locale === "ar" ? m.nameAr : m.nameEn,
    role: locale === "ar" ? m.roleAr : m.roleEn,
    description: locale === "ar" ? m.bioAr : m.bioEn,
    imageUrl: m.photoUrl || "/placeholder-team.jpg",
    imageColor: IMAGE_COLORS[i % IMAGE_COLORS.length],
    roundedCorner: ROUNDED[i % ROUNDED.length],
  });

  return (
    <section className="w-full bg-[#FDFDFD] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-['Wix_Madefor_Display'] font-semibold text-[3rem] leading-[2.75rem] tracking-[-0.03rem] text-[#181D27] mb-5">
            {heading}
          </h2>
          <p className="font-poppins text-2xl leading-[1.875rem] text-[#535862] max-w-[1228px] mb-10">
            {subheading}
          </p>
          {config["about.team.hideViewAll"] !== "true" && (
            <LinkComponent href="/team" className="w-auto">
              <Span variant="B4" className="text-xl flex items-center justify-center gap-2">
                {viewAll}
                <ArrowUpRight className="w-5 h-5" />
              </Span>
            </LinkComponent>
          )}
        </div>

        <div className="flex flex-col gap-16">
          <div className="flex flex-wrap gap-8 justify-center">
            {members.slice(0, 3).map((m, i) => (
              <TeamMemberCard key={m.id} {...toCard(m, i)} />
            ))}
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {members.slice(3, 6).map((m, i) => (
              <TeamMemberCard key={m.id} {...toCard(m, i + 3)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
