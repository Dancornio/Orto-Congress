import Script from "next/script";

import { site } from "@/lib/site";

export default function EventJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: site.name,
    startDate: "2026-08-16T08:30:00-03:00",
    endDate: "2026-08-18T18:00:00-03:00",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: site.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressLocality: "Brasilia",
        addressRegion: "DF",
        addressCountry: "BR"
      }
    },
    image: ["/og.svg"],
    description: site.theme,
    organizer: {
      "@type": "Organization",
      name: site.shortName,
      url: "https://exemplo.org"
    },
    offers: [
      {
        "@type": "Offer",
        price: "890",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: "https://exemplo.org/register"
      }
    ]
  };

  return (
    <Script id="event-jsonld" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </Script>
  );
}
