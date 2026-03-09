"use client";

import { useEffect, useState } from "react";
import { ServiceCard } from "./service-card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useTranslations, useLocale } from "next-intl";
import Button from "../ui/Button";
import apiClient from "@/lib/api-client";
import { getConfigEnAr } from "@/lib/site-config-context";

interface ApiService {
  id: string;
  slug: string;
  category: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  tags: string;
  backgroundColor: string;
  isDark: boolean;
  sortOrder: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  software: "Software Solutions & Services",
  marketing: "Marketing",
  design: "Design",
};

export function ServicesList({
  config = {},
  locale: localeProp,
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = useTranslations("servicesPage");
  const tList = useTranslations("servicesList");
  const tServiceCard = useTranslations("serviceCard");
  const locale = useLocale();
  const effectiveLocale = localeProp ?? locale;
  const viewAll = getConfigEnAr(config, "servicesPage.filters.viewAll", effectiveLocale, t("filters.viewAll"));
  const designLabel = getConfigEnAr(config, "servicesPage.filters.design", effectiveLocale, t("filters.design"));
  const marketingLabel = getConfigEnAr(config, "servicesPage.filters.marketing", effectiveLocale, t("filters.marketing"));
  const softwareLabel = getConfigEnAr(config, "servicesPage.filters.software", effectiveLocale, t("filters.software"));
  const requestPricing = getConfigEnAr(config, "serviceCard.requestPricing", effectiveLocale, tServiceCard("requestPricing"));
  const viewWorkSamples = getConfigEnAr(config, "serviceCard.viewWorkSamples", effectiveLocale, tServiceCard("viewWorkSamples"));
  const [activeTab, setActiveTab] = useState("all");
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiClient
      .get<ApiService[]>("/api/public/services")
      .then((res) => {
        setServices(res.data ?? []);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const categoryMap: Record<string, string> = {
    all: "",
    design: "design",
    marketing: "marketing",
    software: "software",
  };

  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((s) => s.category === categoryMap[activeTab]);

  const toCardProps = (s: ApiService) => ({
    category: CATEGORY_LABELS[s.category] || s.category,
    title: locale === "ar" ? s.titleAr : s.titleEn,
    description: locale === "ar" ? s.descriptionAr : s.descriptionEn,
    tags: (() => {
      try {
        return JSON.parse(s.tags) as string[];
      } catch {
        return [];
      }
    })(),
    backgroundColor: s.backgroundColor,
    isDark: s.isDark,
  });

  if (loading) return <div className="container py-12 text-center">{tList("loading")}</div>;
  if (error) return (
    <div className="container py-12 text-center">
      <p className="text-gray-600 mb-4">{tList("errorMessage")}</p>
      <button
        type="button"
        onClick={() => {
          setError(false);
          setLoading(true);
          apiClient.get<ApiService[]>("/api/public/services")
            .then((res) => { setServices(res.data ?? []); setError(false); })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
        }}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        {tList("retry")}
      </button>
    </div>
  );

  return (
    <>
      <div className="container w-full md:w-auto overflow-x-auto no-scrollbar  md:mx-0 md:px-0  mb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="all" asChild>
              <Button
                className="py-2! px-3! h-fit! rounded-2xl! shadow-none"
                variant="light"
                BorderType="None"
              >
                {t("filters.viewAll")}
              </Button>
            </TabsTrigger>
            <TabsTrigger value="design" asChild>
              <Button
                className="py-2! px-3! h-fit! rounded-2xl! shadow-none"
                variant="light"
                BorderType="None"
              >
                {t("filters.design")}
              </Button>
            </TabsTrigger>
            <TabsTrigger value="marketing" asChild>
              <Button
                className="py-2! px-3! h-fit! rounded-2xl! shadow-none"
                variant="light"
                BorderType="None"
              >
                {t("filters.marketing")}
              </Button>
            </TabsTrigger>
            <TabsTrigger value="software" asChild>
              <Button
                className="py-2! px-3! h-fit! rounded-2xl! shadow-none"
                variant="light"
                BorderType="None"
              >
                {t("filters.software")}
              </Button>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <section className="w-full px-4 md:px-8 max-w-7xl mx-auto pb-20 flex flex-col gap-8">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            {...toCardProps(service)}
            requestPricingLabel={requestPricing}
            viewWorkSamplesLabel={viewWorkSamples}
          />
        ))}
      </section>
    </>
  );
}
