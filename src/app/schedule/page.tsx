import SiteFooter from "@/app/(layouts)/SiteFooter";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import ProgramSection from "@/app/(sections)/ProgramSection";

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="pt-24">
        <ProgramSection showAll />
      </main>
      <SiteFooter />
    </div>
  );
}
