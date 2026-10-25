import PageIntro from "@/components/portfolio/PageIntro";
import { person } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy & Cookies",
  "How this portfolio handles contact messages, optional analytics, and cookie preferences.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="PRIVACY & COOKIES"
        title="A little clarity"
        accent="about your data."
      >
        <p>
          This personal portfolio is operated by Ali Asghar. Here’s what happens
          when you visit or get in touch.
        </p>
      </PageIntro>
      <article className="container prose-page">
        <h2>Contact messages</h2>
        <p>
          If the contact form is enabled, your name, email address, subject, and
          message are sent through Gmail to my inbox. I use them to read and
          respond to your enquiry. Please do not include passwords or sensitive
          information. You can also contact me directly at{" "}
          <a href={`mailto:${person.email}`}>{person.email}</a>.
        </p>
        <h2>Spam protection</h2>
        <p>
          The form uses validation, an automated-submission check, and rate
          limiting. When configured, a hashed network identifier is stored
          temporarily in Upstash Redis to limit repeated requests. Message
          contents are not stored there.
        </p>
        <h2>Optional analytics</h2>
        <p>
          Google Analytics is loaded only when a measurement ID is configured
          and you choose to allow analytics. It measures page views and selected
          project or contact interactions. Form field contents and email message
          text are not sent to analytics. Analytics may use cookies and process
          technical information about your visit.
        </p>
        <h2>Your choice</h2>
        <p>
          Use “Cookie preferences” in the site’s consent controls to change your
          choice. Declining analytics does not prevent navigation or contacting
          me. If you withdraw consent, this site stops analytics collection and
          removes its accessible Google Analytics cookies.
        </p>
        <h2>Hosting and external links</h2>
        <p>
          The site is hosted on Vercel, which may process request and security
          logs. External sites such as GitHub, LinkedIn, and Invo.pk have their
          own privacy practices.
        </p>
        <h2>Questions or deletion requests</h2>
        <p>
          Email <a href={`mailto:${person.email}`}>{person.email}</a> to ask
          about information you have shared or request deletion of
          correspondence. Messages are kept only as needed for the conversation
          and related obligations.
        </p>
      </article>
    </>
  );
}
