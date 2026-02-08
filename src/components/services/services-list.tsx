"use client";

import { useState } from "react";
import { ServiceCard } from "./service-card";
import { SERVICES_LIST } from "@/lib/constants";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useTranslations } from "next-intl";
import Button from "../ui/Button";

export function ServicesList() {
  const t = useTranslations("servicesPage");
  const [activeTab, setActiveTab] = useState("all");

  const categoryMap: Record<string, string> = {
    all: "",
    design: "Design",
    marketing: "Marketing",
    software: "Software Solutions & Services",
  };

  const filteredServices =
    activeTab === "all"
      ? SERVICES_LIST
      : SERVICES_LIST.filter(
          (service) => service.category === categoryMap[activeTab],
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
        {filteredServices.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </section>
    </>
  );
}
