import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { getPublicContactPage } from "@/lib/api";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations("contactPage");
  const tForm = await getTranslations("contactForm");
  const tMap = await getTranslations("contactMap");
  const config = await getPublicContactPage();

  const title = (locale === "ar" ? config["contact.titleAr"] : config["contact.titleEn"]) ?? t("title");
  const description = (locale === "ar" ? config["contact.descriptionAr"] : config["contact.descriptionEn"]) ?? t("description");
  const whatsappText = locale === "ar"
    ? (config["contact.whatsappTextAr"] ?? t("whatsapp"))
    : (config["contact.whatsappTextEn"] ?? t("whatsapp"));
  const callText = locale === "ar"
    ? (config["contact.callTextAr"] ?? t("call"))
    : (config["contact.callTextEn"] ?? t("call"));
  const meetingText = locale === "ar"
    ? (config["contact.meetingTextAr"] ?? t("meeting"))
    : (config["contact.meetingTextEn"] ?? t("meeting"));
  const formHeading = locale === "ar"
    ? (config["contact.formHeadingAr"] ?? "Send us a message")
    : (config["contact.formHeadingEn"] ?? "Send us a message");

  return (
    <main className="min-h-screen bg-white">
      <ContactHero
        title={title}
        description={description}
        whatsappText={whatsappText}
        callText={callText}
        meetingText={meetingText}
        whatsappUrl={config["contact.whatsappUrl"] || undefined}
        phoneNumber={config["contact.phoneNumber"] || undefined}
        meetingUrl={config["contact.meetingUrl"] || undefined}
        mapLatitude={config["contact.mapLatitude"] || undefined}
        mapLongitude={config["contact.mapLongitude"] || undefined}
        mapZoom={config["contact.mapZoom"] || undefined}
        mapMarkerLatitude={config["contact.mapMarkerLatitude"] || undefined}
        mapMarkerLongitude={config["contact.mapMarkerLongitude"] || undefined}
        loadingText={tMap("loading")}
      />
      <ContactForm
        formHeading={formHeading}
        nameLabel={tForm("nameLabel")}
        emailLabel={tForm("emailLabel")}
        phoneLabel={tForm("phoneLabel")}
        messageLabel={tForm("messageLabel")}
        submit={tForm("submit")}
        sending={tForm("sending")}
        success={tForm("success")}
        error={tForm("error")}
      />
    </main>
  );
}
