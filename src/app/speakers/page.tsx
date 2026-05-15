import SiteFooter from "@/app/(layouts)/SiteFooter";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import SpeakersSection from "@/app/(sections)/SpeakersSection";

export default function SpeakersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="pt-24">
        <SpeakersSection showAll />
      </main>
      <SiteFooter />
    </div>
  );
}
