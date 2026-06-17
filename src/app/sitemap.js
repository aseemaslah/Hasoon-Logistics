export default async function sitemap() {
  const baseUrl = "https://hasoonlogistics.com";
  
  const staticRoutes = [
    "",
    "/services/freight-forwarding",
    "/services/air-freight",
    "/services/sea-freight",
    "/services/road-transportation",
    "/services/warehousing",
    "/services/customs-clearance",
    "/uae",
    "/india",
    "/saudi-arabia",
    "/china"
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));
}
