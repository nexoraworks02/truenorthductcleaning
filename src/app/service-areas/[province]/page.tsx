import { notFound } from "next/navigation";
import { provincePages } from "@/config/service-areas";
import { ProvinceLanding } from "@/components/ProvinceLanding";

interface PageProps {
  params: Promise<{ province: string }>;
}

export function generateStaticParams() {
  return provincePages.map((p) => ({ province: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { province } = await params;
  const page = provincePages.find((p) => p.slug === province);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `/service-areas/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/service-areas/${page.slug}`,
    },
  };
}

export default async function ProvincePage({ params }: PageProps) {
  const { province } = await params;
  const page = provincePages.find((p) => p.slug === province);
  if (!page) notFound();
  return <ProvinceLanding page={page} />;
}
