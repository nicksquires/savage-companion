import logo2 from "@/public/images/svglogo_white_logo_only.png";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="flex justify-center mb-10">
          <Image src={logo2} className="w-27 opacity-90" alt="Logo" />
        </div>

        <h1 className="font-header text-5xl md:text-6xl text-center tracking-tighter mb-4">
          Privacy Policy
        </h1>
        <p className="text-center text-base-content/60">
          Last updated: May 21, 2026
        </p>

        <div className="prose prose-invert max-w-none mt-12 space-y-8 text-base-content/90">
          <p>
            At <strong className="text-primary">eSquires Studios</strong>, we
            respect your privacy. This Privacy Policy explains how we collect,
            use, and protect your information when you use Savage Companion.
          </p>

          <section>
            <h2 className="font-header text-2xl">Information We Collect</h2>
            <div className="mx-4 m-1">
              <p>We currently collect minimal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (email, username, password hash)</li>
                <li>Characters and campaigns you create</li>
                <li>Usage statistics (anonymous)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-header text-2xl">Cookies &amp; Tracking</h2>
            <p className="mx-4 my-1">
              We currently use only essential cookies for authentication and
              site functionality. No advertising or third-party tracking cookies
              are used at this time. We may introduce optional analytics in the
              future, which you will be able to opt out of.
            </p>
          </section>

          <section>
            <h2 className="font-header text-2xl">
              How We Use Your Information
            </h2>
            <p className="mx-4 my-1">
              We use your data solely to provide and improve the service -
              specifically to save your characters, campaigns, and allow you to
              play with friends.
            </p>
          </section>

          <section>
            <h2 className="font-header text-2xl">Data Sharing</h2>
            <p className="mx-4 my-1">
              We do not sell your data. We may share anonymized usage data for
              development purposes, but never personally identifiable
              information.
            </p>
          </section>

          <section>
            <h2 className="font-header text-2xl">Your Rights</h2>
            <p className="mx-4 my-1">
              You can request deletion of your account and all associated data
              at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-header text-2xl">Contact</h2>
            <p className="mx-4 my-1">
              Nicholas Squires
              <br />
              eSquires Studios
              {/* <br />
              <a
                href="mailto:nic"
                className="link text-primary"
              >
                privacy@esquires.dev
              </a> */}
            </p>
          </section>
        </div>

        <div className="mt-20 text-center text-sm text-base-content/50">
          © {new Date().getFullYear()} eSquires Studios
        </div>
      </div>
    </div>
  );
}
