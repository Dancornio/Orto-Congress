import SiteFooter from "@/app/(layouts)/SiteFooter";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import SubmitSection from "@/app/(sections)/SubmitSection";

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="pt-24">
        <SubmitSection showAll />
      </main>
      <SiteFooter />
    </div>
  );
}
