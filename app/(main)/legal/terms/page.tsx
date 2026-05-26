import logo2 from "@/public/images/svglogo_white_logo_only.png";
import Image from "next/image";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="flex justify-center mb-10">
          <Image src={logo2} className="w-27 opacity-90" alt="Logo" />
        </div>

        <h1 className="font-header text-5xl md:text-6xl text-center tracking-tighter mb-4">
          Terms of Service
        </h1>
        <p className="text-center text-base-content/60">
          Last updated: May 19, 2026
        </p>

        <div className="prose prose-invert max-w-none mt-12 space-y-8 text-base-content/90">
          <p className="mx-4 mb-10">
            Welcome to Savage Companion - an unofficial fan tool for the Savage
            Worlds roleplaying game.
          </p>

          <section className="px-4">
            <h2 className="font-header text-3xl">1. Acceptance of Terms</h2>
            <p className="mx-4 my-1">
              By using WildCard, you agree to these Terms of Service. If you do
              not agree, please do not use the service.
            </p>
          </section>

          <section className="px-4">
            <h2 className="font-header text-3xl">2. Fan Content Disclaimer</h2>
            <p className="mx-4 my-1">
              WildCard is an unofficial, fan-created application. It is not
              affiliated with, endorsed by, or sponsored by Pinnacle
              Entertainment Group. Savage Worlds is © Pinnacle Entertainment
              Group.
            </p>
          </section>

          <section className="px-4">
            <h2 className="font-header text-3xl">3. User Content</h2>
            <p className="mx-4 my-1">
              You retain ownership of characters and campaigns you create. By
              using the service, you grant us a license to host and display your
              content for the purpose of providing the service.
            </p>
          </section>

          <section className="px-4">
            <h2 className="font-header text-3xl">4. Prohibited Conduct</h2>
            <p className="mx-4 my-1">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Upload harmful code or malware</li>
              <li>Impersonate others</li>
              <li>Attempt to reverse engineer the platform</li>
              <li>
                Use the service for commercial purposes without permission
              </li>
            </ul>
          </section>

          <section className="px-4">
            <h2 className="font-header text-3xl">5. Termination</h2>
            <p className="mx-4 my-1">
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </section>

          <section className="px-4">
            <h2 className="font-header text-3xl">6. Limitation of Liability</h2>
            <p className="mx-4 my-1">
              The service is provided "as is". We are not liable for any loss of
              data, characters, or campaigns.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-base-content/10 text-sm text-base-content/60">
            © {new Date().getFullYear()} eSquires Studios • Nicholas Squires
          </div>
        </div>
      </div>
    </div>
  );
}
