import SiteFooter from "@/app/(layouts)/SiteFooter";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import RegistrationSection from "@/app/(sections)/RegistrationSection";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="pt-24">
        <RegistrationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
