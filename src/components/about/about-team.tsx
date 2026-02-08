import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LinkComponent } from "@/components/ui/Link";
import { Span } from "@/components/ui/Text";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  imageColor: string;
  roundedCorner: "tl" | "tr";
}

function TeamMemberCard({
  name,
  role,
  description,
  imageUrl,
  imageColor,
  roundedCorner,
}: TeamMember) {
  const roundedClass =
    roundedCorner === "tl" ? "rounded-tl-[50px]" : "rounded-tr-[50px]";

  return (
    <div className="flex flex-col gap-4 flex-1 min-w-[240px] max-w-[384px]">
      {/* Image */}
      <div
        className={`relative w-full aspect-square ${roundedClass} overflow-hidden`}
        style={{ backgroundColor: imageColor }}
      >
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        {/* Name and Role */}
        <div>
          <h4 className="font-poppins font-semibold text-lg leading-7 text-[#181D27]">
            {name}
          </h4>
          <p className="font-poppins text-base leading-6 text-[#6941C6]">
            {role}
          </p>
        </div>

        {/* Description */}
        <p className="font-poppins text-base leading-6 text-[#535862]">
          {description}
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-[#A4A7AE] hover:text-[#181D27] transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-[#A4A7AE] hover:text-[#181D27] transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-[#A4A7AE] hover:text-[#181D27] transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export async function AboutTeam() {
  const t = await getTranslations("about");

  const teamMembers: TeamMember[] = [
    {
      name: t("team.member1.name"),
      role: t("team.member1.role"),
      description: t("team.member1.description"),
      imageUrl: "/team/member-1.jpg",
      imageColor: "#CFD4C6",
      roundedCorner: "tl",
    },
    {
      name: t("team.member2.name"),
      role: t("team.member2.role"),
      description: t("team.member2.description"),
      imageUrl: "/team/member-2.jpg",
      imageColor: "#D1E3D9",
      roundedCorner: "tr",
    },
    {
      name: t("team.member3.name"),
      role: t("team.member3.role"),
      description: t("team.member3.description"),
      imageUrl: "/team/member-3.jpg",
      imageColor: "#E3C6D1",
      roundedCorner: "tr",
    },
    {
      name: t("team.member4.name"),
      role: t("team.member4.role"),
      description: t("team.member4.description"),
      imageUrl: "/team/member-4.jpg",
      imageColor: "#CFD4C6",
      roundedCorner: "tl",
    },
    {
      name: t("team.member5.name"),
      role: t("team.member5.role"),
      description: t("team.member5.description"),
      imageUrl: "/team/member-5.jpg",
      imageColor: "#E3C6D1",
      roundedCorner: "tr",
    },
    {
      name: t("team.member6.name"),
      role: t("team.member6.role"),
      description: t("team.member6.description"),
      imageUrl: "/team/member-6.jpg",
      imageColor: "#D1E3D9",
      roundedCorner: "tr",
    },
  ];

  return (
    <section className="w-full bg-[#FDFDFD] py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-['Wix_Madefor_Display'] font-semibold text-[3rem] leading-[2.75rem] tracking-[-0.03rem] text-[#181D27] mb-5">
            {t("team.heading")}
          </h2>
          <p className="font-poppins text-2xl leading-[1.875rem] text-[#535862] max-w-[1228px] mb-10">
            {t("team.subheading")}
          </p>

          {/* View All Button */}
          <LinkComponent href="/team" className="w-auto">
            <Span
              variant="B4"
              className="text-xl flex items-center justify-center gap-2"
            >
              {t("team.viewAll")}
              <ArrowUpRight className="w-5 h-5" />
            </Span>
          </LinkComponent>
        </div>

        {/* Team Grid */}
        <div className="flex flex-col gap-16">
          {/* First Row - 3 members */}
          <div className="flex flex-wrap gap-8 justify-center">
            {teamMembers.slice(0, 3).map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>

          {/* Second Row - 3 members */}
          <div className="flex flex-wrap gap-8 justify-center">
            {teamMembers.slice(3, 6).map((member, index) => (
              <TeamMemberCard key={index + 3} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
