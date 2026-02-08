import Image from "next/image";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { LinkComponent } from "../ui/Link";
import ArrowUp from "@/icons/ArrowUp";
import { ArrowUpRight } from "lucide-react";

const workContent = [
  {
    projectName: "ABAQ LEARNING",
    badge: "Web and App development",
    image: "Dashboard v3 1.png",
    bgColor: "bg-white",
    textColor: "text-black",
    top: "top-4 md:top-32",
    shadow: "shadow-[0px_10px_30px_rgba(0,0,0,0.1)]",
  },
  {
    projectName: "ABAQ LEARNING",
    badge: "Social media marketing",
    image: "Dashboard v3 1.png",
    bgColor: "bg-[#D9F9F9]",
    textColor: "text-black",
    top: "top-8 md:top-36",
  },
  {
    projectName: "ABAQ LEARNING",
    badge: "Operation management",
    image: "Dashboard v3 1.png",
    bgColor: "bg-black",
    textColor: "text-white",
    top: "top-12 md:top-40",
    buttonColor: "bg-[#EBF7FF]!",
  },
];

export default function WorkContent() {
  return (
    <div className="container relative flex flex-col gap-10">
      {workContent.map((item, index) => (
        <div
          key={index}
          className={`sticky ${item.top} py-6.5 px-4 md:px-15 flex flex-col gap-10 rounded-[26px] ${item.bgColor} h-68.75 md:h-186.25 overflow-hidden`}
        >
          {/* head */}
          <div className={` space-y-6 ${item.textColor}`}>
            <Button
              className={`capitalize text-[15px] leading-6 py-0.5! px-2.5! h-fit! font-light! ${item.buttonColor}`}
            >
              {item.projectName}
            </Button>

            <div className="flex items-center justify-between">
              <p className={`text-sm md:text-4xl ${item.textColor}`}>
                {item.badge}
              </p>

              <LinkComponent
                href="#"
                className={`shadow-none bg-transparent ${item.textColor} group`}
              >
                View full project{" "}
                <span>
                  <ArrowUpRight className="size-6 group-hover:rotate-45 transition-transform duration-150" />
                </span>
              </LinkComponent>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative w-full bg-white aspect-video rounded-t-[54px] ${item.shadow}`}
          >
            <Image
              src={`/${item.image}`}
              alt={item.projectName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
