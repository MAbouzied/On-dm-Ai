"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { LocalizedLink } from "./localized-link";
import {
  ArrowRight,
  ChevronDown,
  Monitor,
  Zap,
  Briefcase,
  FileText,
  Share2,
  PenTool,
  Aperture,
  ArrowUp,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  PlayCircle,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "./ui/Button";

export function Header() {
  const t = useTranslations("nav");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<
    string | null
  >(null);
  const [expandedServiceCategory, setExpandedServiceCategory] = useState<
    string | null
  >(null);

  const [activeMegaContent, setActiveMegaContent] = useState<string | null>(
    null,
  ); // 'services' | 'work' | null

  const pathname = usePathname();
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobileSection(null);
    setExpandedServiceCategory(null);

    setActiveMegaContent(null);
  }, [pathname]);

  return (
    <div className="flex items-center justify-center ">
      <header className="w-full pt-6 top-0 md:top-2 px-4 pointer-events-none mx-auto   md:fixed z-50 ">
        <div className="container h-[40px] md:h-20 pr-3 pl-4 md:px-8 top-0 left-0 bg-transparent backdrop-blur-[0px] md:bg-white/80 rounded-full md:border md:border-[#E8E8E8] flex items-center justify-between p-2 pl-6 pointer-events-auto md:backdrop-blur-[8.8px]">
          <LocalizedLink href="/">
            {/* <Logo /> */}
            <Image
              src="/logo.png"
              alt="ONDM Logo"
              width={126}
              height={31}
              priority
            />
          </LocalizedLink>

          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 h-full">
            {/* Services Mega Menu Trigger */}
            <div
              className="group h-full flex items-center"
              onMouseEnter={() => setActiveMegaContent("services")}
              onMouseLeave={() => setActiveMegaContent(null)}
            >
              <Button className="p-0! bg-transparent! shadow-none! text-[#535862]! text-[16px]">
                {t("services")}{" "}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Button>

              {/* Mega Menu Content */}
              {activeMegaContent === "services" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[90vw] max-w-6xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <div className="bg-white rounded-4xl shadow-xl border border-gray-100 p-8 overflow-hidden">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {t("megaMenu.title")}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {t("megaMenu.description")}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-12">
                      {/* Column 1: Software Solutions */}
                      <div className="space-y-4">
                        <h4 className="text-teal-500 font-medium text-sm mb-4">
                          {t("megaMenu.categories.software")}
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <LocalizedLink
                              href="/services/web-development"
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                            >
                              <Monitor className="w-5 h-5 text-gray-400 group-hover/item:text-teal-500" />
                              <span className="text-gray-700 font-medium group-hover/item:text-black">
                                {t("megaMenu.items.webDev")}
                              </span>
                            </LocalizedLink>
                          </li>
                          <li>
                            <LocalizedLink
                              href="/services/app-development"
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                            >
                              <Zap className="w-5 h-5 text-gray-400 group-hover/item:text-teal-500" />
                              <span className="text-gray-700 font-medium group-hover/item:text-black">
                                {t("megaMenu.items.appDev")}
                              </span>
                            </LocalizedLink>
                          </li>
                          <li>
                            <LocalizedLink
                              href="/services/it-business"
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                            >
                              <Briefcase className="w-5 h-5 text-gray-400 group-hover/item:text-teal-500" />
                              <span className="text-gray-700 font-medium group-hover/item:text-black">
                                {t("megaMenu.items.itBusiness")}
                              </span>
                            </LocalizedLink>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: Marketing */}
                      <div className="space-y-4">
                        <h4 className="text-teal-500 font-medium text-sm mb-4">
                          {t("megaMenu.categories.marketing")}
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <LocalizedLink
                              href="/services/digital-marketing"
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                            >
                              <FileText className="w-5 h-5 text-gray-400 group-hover/item:text-teal-500" />
                              <span className="text-gray-700 font-medium group-hover/item:text-black">
                                {t("megaMenu.items.digitalMarketing")}
                              </span>
                            </LocalizedLink>
                          </li>
                          <li>
                            <LocalizedLink
                              href="/services/social-media"
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                            >
                              <Share2 className="w-5 h-5 text-gray-400 group-hover/item:text-teal-500" />
                              <span className="text-gray-700 font-medium group-hover/item:text-black">
                                {t("megaMenu.items.socialMedia")}
                              </span>
                            </LocalizedLink>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: Design */}
                      <div className="space-y-4">
                        <h4 className="text-teal-500 font-medium text-sm mb-4">
                          {t("megaMenu.categories.design")}
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <LocalizedLink
                              href="/services/branding"
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                            >
                              <PenTool className="w-5 h-5 text-gray-400 group-hover/item:text-teal-500" />
                              <span className="text-gray-700 font-medium group-hover/item:text-black">
                                {t("megaMenu.items.branding")}
                              </span>
                            </LocalizedLink>
                          </li>
                          <li>
                            <LocalizedLink
                              href="/services/ux-design"
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                            >
                              <Aperture className="w-5 h-5 text-gray-400 group-hover/item:text-teal-500" />
                              <span className="text-gray-700 font-medium group-hover/item:text-black">
                                {t("megaMenu.items.uxDesign")}
                              </span>
                            </LocalizedLink>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <LocalizedLink
                        href="/services"
                        className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                      >
                        {t("megaMenu.viewAll")}
                      </LocalizedLink>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Work Mega Menu Trigger */}
            <div
              className="group h-full flex items-center"
              onMouseEnter={() => setActiveMegaContent("work")}
              onMouseLeave={() => setActiveMegaContent(null)}
            >
              <Button className="p-0! bg-transparent! shadow-none! text-[#535862]! text-[16px]">
                {" "}
                {t("work")}{" "}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Button>

              {/* Work Mega Menu Content */}
              {activeMegaContent === "work" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[90vw] max-w-6xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <div className="bg-white rounded-4xl shadow-xl border border-gray-100 p-8 overflow-hidden">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {t("workMegaMenu.title")}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {t("workMegaMenu.description")}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="group/card">
                          <div className="bg-teal-50/50 rounded-t-2xl rounded-bl-2xl rounded-br-[4rem] overflow-hidden mb-4 aspect-video relative">
                            {/* Placeholder for project image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-32 h-32 bg-teal-900/80 blur-2xl rounded-full opacity-20 group-hover/card:opacity-30 transition-opacity" />
                              <Image
                                src="/home.svg" // Using home.svg as a placeholder since we don't have the ink image
                                alt="Project Preview"
                                width={200}
                                height={200}
                                className="w-1/2 h-auto object-contain opacity-80 group-hover/card:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {t("workMegaMenu.project.title")}
                          </h4>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                            {t("workMegaMenu.project.description")}
                          </p>
                          <LocalizedLink
                            href="/work/project-1"
                            className="inline-flex items-center gap-2 text-sm font-bold text-black hover:gap-3 transition-all"
                          >
                            {t("workMegaMenu.project.link")}
                            <div className="bg-black text-white rounded-full p-1">
                              <ArrowUpRight className="w-3 h-3" />
                            </div>
                          </LocalizedLink>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <LocalizedLink
                        href="/work"
                        className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                      >
                        {t("workMegaMenu.viewAll")}
                      </LocalizedLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <LocalizedLink
              href="/about"
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              {t("about")}
            </LocalizedLink>
            <LocalizedLink
              href="/contact"
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              {t("contact")}
            </LocalizedLink>
          </nav>

          <LocalizedLink
            href="/contact"
            className="hidden md:flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium shadow-[0px_1px_2px_0px_#0A0D120D]"
          >
            {t("chatNow")}

            <ArrowUpRight className="size-6" />
          </LocalizedLink>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-black mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full px-4 md:hidden pointer-events-auto">
            <div className="bg-white rounded-4xl shadow-xl border border-gray-100 p-6 flex flex-col gap-6 animate-in slide-in-from-top-4 fade-in duration-300">
              <nav className="flex flex-col gap-2">
                {/* Services */}
                <div className="border-b border-gray-100 py-2">
                  <button
                    onClick={() =>
                      setExpandedMobileSection(
                        expandedMobileSection === "services"
                          ? null
                          : "services",
                      )
                    }
                    className="flex items-center justify-between w-full text-left py-2"
                  >
                    <span className="text-gray-900 font-medium">
                      {t("services")}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        expandedMobileSection === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedMobileSection === "services"
                        ? "grid-rows-[1fr] opacity-100 mt-2"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border border-gray-100 rounded-2xl p-4 mb-2">
                        <div className="space-y-2 mb-4">
                          {/* Software Solutions */}
                          <div>
                            <button
                              onClick={() =>
                                setExpandedServiceCategory(
                                  expandedServiceCategory === "software"
                                    ? null
                                    : "software",
                                )
                              }
                              className="flex items-center justify-between w-full text-teal-500 font-medium py-2"
                            >
                              {t("megaMenu.categories.software")}
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  expandedServiceCategory === "software"
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`grid transition-all duration-300 ease-in-out ${
                                expandedServiceCategory === "software"
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <div className="overflow-hidden bg-gray-50 rounded-xl mt-2">
                                <div className="p-4 space-y-4">
                                  <LocalizedLink
                                    href="/services/web-development"
                                    className="flex items-center gap-3 text-gray-700"
                                  >
                                    <Monitor className="w-5 h-5 text-gray-400" />
                                    <span>{t("megaMenu.items.webDev")}</span>
                                  </LocalizedLink>
                                  <LocalizedLink
                                    href="/services/app-development"
                                    className="flex items-center gap-3 text-gray-700"
                                  >
                                    <Sparkles className="w-5 h-5 text-gray-400" />
                                    <span>{t("megaMenu.items.appDev")}</span>
                                  </LocalizedLink>
                                  <LocalizedLink
                                    href="/services/it-business"
                                    className="flex items-center gap-3 text-gray-700"
                                  >
                                    <PlayCircle className="w-5 h-5 text-gray-400" />
                                    <span>
                                      {t("megaMenu.items.itBusiness")}
                                    </span>
                                  </LocalizedLink>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Marketing */}
                          <div>
                            <button
                              onClick={() =>
                                setExpandedServiceCategory(
                                  expandedServiceCategory === "marketing"
                                    ? null
                                    : "marketing",
                                )
                              }
                              className="flex items-center justify-between w-full text-teal-500 font-medium py-2"
                            >
                              {t("megaMenu.categories.marketing")}
                              <ChevronRight
                                className={`w-4 h-4 transition-transform ${
                                  expandedServiceCategory === "marketing"
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`grid transition-all duration-300 ease-in-out ${
                                expandedServiceCategory === "marketing"
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <div className="overflow-hidden bg-gray-50 rounded-xl mt-2">
                                <div className="p-4 space-y-4">
                                  <LocalizedLink
                                    href="/services/digital-marketing"
                                    className="flex items-center gap-3 text-gray-700"
                                  >
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <span>
                                      {t("megaMenu.items.digitalMarketing")}
                                    </span>
                                  </LocalizedLink>
                                  <LocalizedLink
                                    href="/services/social-media"
                                    className="flex items-center gap-3 text-gray-700"
                                  >
                                    <Share2 className="w-5 h-5 text-gray-400" />
                                    <span>
                                      {t("megaMenu.items.socialMedia")}
                                    </span>
                                  </LocalizedLink>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Design */}
                          <div>
                            <button
                              onClick={() =>
                                setExpandedServiceCategory(
                                  expandedServiceCategory === "design"
                                    ? null
                                    : "design",
                                )
                              }
                              className="flex items-center justify-between w-full text-teal-500 font-medium py-2"
                            >
                              {t("megaMenu.categories.design")}
                              <ChevronRight
                                className={`w-4 h-4 transition-transform ${
                                  expandedServiceCategory === "design"
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`grid transition-all duration-300 ease-in-out ${
                                expandedServiceCategory === "design"
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }`}
                            >
                              <div className="overflow-hidden bg-gray-50 rounded-xl mt-2">
                                <div className="p-4 space-y-4">
                                  <LocalizedLink
                                    href="/services/branding"
                                    className="flex items-center gap-3 text-gray-700"
                                  >
                                    <PenTool className="w-5 h-5 text-gray-400" />
                                    <span>{t("megaMenu.items.branding")}</span>
                                  </LocalizedLink>
                                  <LocalizedLink
                                    href="/services/ux-design"
                                    className="flex items-center gap-3 text-gray-700"
                                  >
                                    <Aperture className="w-5 h-5 text-gray-400" />
                                    <span>{t("megaMenu.items.uxDesign")}</span>
                                  </LocalizedLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                          <LocalizedLink
                            href="/services"
                            className="flex items-center justify-between w-full text-gray-900 font-medium"
                          >
                            {t("megaMenu.viewAll")}{" "}
                            <ArrowRight className="w-4 h-4" />
                          </LocalizedLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work */}
                <div className="border-b border-gray-100 py-2">
                  <button
                    onClick={() =>
                      setExpandedMobileSection(
                        expandedMobileSection === "work" ? null : "work",
                      )
                    }
                    className="flex items-center justify-between w-full text-left py-2"
                  >
                    <span className="text-gray-900 font-medium">
                      {t("work")}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        expandedMobileSection === "work" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedMobileSection === "work"
                        ? "grid-rows-[1fr] opacity-100 mt-2"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border border-gray-100 rounded-2xl p-4 mb-2">
                        <div className="text-teal-500 font-medium mb-4 text-sm">
                          Latest work
                        </div>
                        <div className="space-y-4 mb-4">
                          {[1, 2].map((item) => (
                            <LocalizedLink
                              key={item}
                              href={`/work/project-${item}`}
                              className="flex gap-3 group"
                            >
                              <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                                <Image
                                  src="/home.svg"
                                  alt="Project"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="font-semibold text-gray-900 text-sm truncate">
                                  {t("workMegaMenu.project.title")}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {t("workMegaMenu.project.description")}
                                </p>
                              </div>
                            </LocalizedLink>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                          <LocalizedLink
                            href="/work"
                            className="flex items-center justify-between w-full text-gray-900 font-medium"
                          >
                            {t("workMegaMenu.viewAll")}{" "}
                            <ArrowRight className="w-4 h-4" />
                          </LocalizedLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="py-2">
                  <LocalizedLink
                    href="/contact"
                    className="block text-gray-900 font-medium py-2"
                  >
                    {t("contact")}
                  </LocalizedLink>
                </div>
              </nav>

              <LocalizedLink
                href="/start-project"
                className="flex items-center justify-center gap-2 bg-[#A8E5E0] text-black px-6 py-4 rounded-full hover:bg-[#8FDbd6] transition-colors font-medium text-lg mt-2"
              >
                Start a Project <ArrowUpRight className="w-5 h-5" />
              </LocalizedLink>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
