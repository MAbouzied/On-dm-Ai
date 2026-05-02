import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ProductFooter() {
  const t = await getTranslations("lmsPlatform.footer");

  return (
    <footer className="border-t border-[#e9eaeb] bg-[#fff2e0]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-center text-sm text-[#535862] md:text-start">
          <span className="font-medium text-[#181d27]">{t("builtBy")}</span>
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-[#414651]">
          <li>
            <Link href="/about" className="hover:text-[#181d27]">
              {t("about")}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-[#181d27]">
              {t("contact")}
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:text-[#181d27]">
              {t("terms")}
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-[#181d27]">
              {t("privacy")}
            </Link>
          </li>
          <li>
            <Link href="/refund-policy" className="hover:text-[#181d27]">
              {t("refund")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
