import { Nav, Footer } from '@/components/Nav'

export const metadata = {
  title: 'Terms of Service | Japan Property Data Library',
  description: 'Terms of Service for Japan Property Data Library.',
}

export default function TermsPage() {
  return (
    <>
      <Nav lang="en" />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl font-bold text-[#1a0e06] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#8a7a68] mb-10">Last updated: March 2025</p>

        {[
          {
            title: '1. Service Description',
            body: 'Japan Property Data Library provides access to a structured database of vacant residential properties (akiya) in Japan. The service is for informational and research purposes only. We do not provide real estate brokerage, agency, advisory, or negotiation services of any kind.',
          },
          {
            title: '2. Subscription',
            body: 'Full data access requires a paid subscription. Monthly plan: $7.99 USD/month. Annual plan: $79.99 USD/year (~$6.67/month). Subscriptions are billed on the selected cycle and may be cancelled at any time. Cancellation takes effect at the end of the current billing period. No refunds are provided for partial billing periods.',
          },
          {
            title: '3. Acceptable Use',
            body: 'You may use the data for personal research, investment analysis, and informational purposes. You may not reproduce, resell, redistribute, or commercially exploit the database content without written permission.',
          },
          {
            title: '4. Data Accuracy',
            body: 'Property data is collected from publicly available sources and registered by property owners. We do not guarantee the accuracy, completeness, or currency of any data. All decisions based on this data are made at the user\'s sole risk.',
          },
          {
            title: '5. No Real Estate Services',
            body: 'This platform is a data service only. We are not a licensed real estate agent, broker, or advisor. Any contact with property registrants is a direct interaction between the user and the registrant. We are not a party to any transaction.',
          },
          {
            title: '6. Intellectual Property',
            body: 'The database structure, curation, and English translations are proprietary to Japan Property Data Library. Individual property records submitted by registrants remain the property of those registrants.',
          },
          {
            title: '7. Limitation of Liability',
            body: 'To the maximum extent permitted by law, Japan Property Data Library shall not be liable for any direct, indirect, incidental, or consequential damages arising from use of this service or reliance on data contained herein.',
          },
          {
            title: '8. Governing Law',
            body: 'These terms are governed by the laws of Japan. Any disputes shall be resolved in the courts of Japan.',
          },
          {
            title: '9. Contact',
            body: 'For inquiries regarding these terms, please contact: admin@tacky-consulting.com',
          },
        ].map((s) => (
          <section key={s.title} className="mb-8">
            <h2 className="font-bold text-[#1a0e06] mb-2">{s.title}</h2>
            <p className="text-sm text-[#8a7a68] leading-relaxed">{s.body}</p>
          </section>
        ))}
      </main>
      <Footer lang="en" />
    </>
  )
}
