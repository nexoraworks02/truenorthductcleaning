import { notFound } from "next/navigation";
import { cityPages, provinceSlugOf } from "@/config/cities";
import { CityLanding } from "@/components/CityLanding";

interface PageProps {
  params: Promise<{ province: string; city: string }>;
}

export function generateStaticParams() {
  return cityPages.map((c) => ({
    province: provinceSlugOf(c.provinceName),
    city: c.citySlug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { province, city } = await params;
  const page = cityPages.find(
    (c) => c.citySlug === city && provinceSlugOf(c.provinceName) === province
  );
  if (!page) return {};
  const path = `/service-areas/${province}/${city}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { province, city } = await params;
  const page = cityPages.find(
    (c) => c.citySlug === city && provinceSlugOf(c.provinceName) === province
  );
  if (!page) notFound();
  return <CityLanding page={page} />;
}
