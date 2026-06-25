import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  robots: { index: true, follow: true },
};

const updated = "June 2026"; // 👈 update when the policy changes

export default function PrivacyPage() {
  return (
    <>
      {/* Simple header */}
      <header className="border-b border-navy-900/10 bg-stone-50">
        <div className="container-x flex items-center justify-between py-4">
          <Link href="/" aria-label="Malpass Brickwork home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </header>

      <main className="bg-stone-100">
        <div className="container-x max-w-3xl py-16 sm:py-24">
          <p className="eyebrow mb-3 text-brick-600">Legal</p>
          <h1 className="text-4xl font-extrabold text-navy-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-navy-900/60">Last updated: {updated}</p>

          <div className="mt-10 space-y-8 text-navy-900/75 [&_h2]:mb-3 [&_h2]:mt-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy-900 [&_li]:mb-1.5 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <section>
              <p>
                This policy explains how {site.name}{" "}
                (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses your
                personal information
                when you contact us or use this website. We take your privacy
                seriously and only ask for what we need to quote and carry out
                your work.
              </p>
            </section>

            <section>
              <h2>What we collect</h2>
              <ul>
                <li>
                  Your name and contact details (phone number, email, address or
                  postcode) when you fill in our quote form, message us on
                  WhatsApp, call, or email.
                </li>
                <li>Details about the job you ask us to quote for.</li>
                <li>
                  Basic technical information your browser sends automatically,
                  such as device type, used only to keep the site working.
                </li>
              </ul>
            </section>

            <section>
              <h2>How we use it</h2>
              <ul>
                <li>To prepare and discuss your quote.</li>
                <li>To carry out and manage any work you book with us.</li>
                <li>To respond to your enquiries and keep in touch about the job.</li>
              </ul>
              <p>
                We do not sell your information, and we do not send marketing
                unless you have asked us to.
              </p>
            </section>

            <section>
              <h2>Lawful basis</h2>
              <p>
                We process your information to take steps at your request before
                entering into a contract and to perform that contract, and where
                we have a legitimate interest in responding to your enquiry.
              </p>
            </section>

            <section>
              <h2>Sharing your information</h2>
              <p>
                When you contact us through WhatsApp, your message is handled by
                WhatsApp under its own privacy terms. We use a website host to
                run this site. We only share information with trusted suppliers
                where it is needed to provide our service, and never for their
                own marketing.
              </p>
            </section>

            <section>
              <h2>How long we keep it</h2>
              <p>
                We keep enquiry and job records only for as long as needed for
                the work and our legal obligations, then delete them securely.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                You can ask us for a copy of the information we hold about you,
                ask us to correct or delete it, or object to how we use it. To
                make a request, contact us using the details below.
              </p>
            </section>

            <section>
              <h2>Contact us</h2>
              <p>
                {site.name}
                <br />
                Phone:{" "}
                <a className="text-royal hover:underline" href={`tel:${site.phoneDial}`}>
                  {site.phoneDisplay}
                </a>
                <br />
                Email:{" "}
                <a className="text-royal hover:underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
