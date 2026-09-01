import type { NextConfig } from "next";

// Old flat city URLs → new nested service-area structure.
// permanent: true issues a 308 so users and Google carry over cleanly.
const cityRedirects = [
  ["ottawa", "ontario"],
  ["toronto", "ontario"],
  ["mississauga", "ontario"],
  ["brampton", "ontario"],
  ["hamilton", "ontario"],
  ["calgary", "alberta"],
  ["montreal", "quebec"],
  ["vancouver", "british-columbia"],
  ["winnipeg", "manitoba"],
  ["saskatoon", "saskatchewan"],
].map(([city, province]) => ({
  source: `/air-duct-cleaning-${city}`,
  destination: `/service-areas/${province}/${city}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  async redirects() {
    return cityRedirects;
  },
};

export default nextConfig;
