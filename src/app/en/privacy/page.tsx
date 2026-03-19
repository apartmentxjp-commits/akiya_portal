import { Nav, Footer } from '@/components/Nav'

export const metadata = {
  title: 'Privacy Policy | Japan Property Data Library',
  description: 'Privacy Policy for Japan Property Data Library — akiya.tacky-consulting.com',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav lang="en" />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl font-bold text-[#1a0e06] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#8a7a68] mb-10">Last updated: March 2025</p>

        {[
          {
            title: '1. Introduction',
            body: 'Japan Property Data Library ("we", "our", or "us") operates akiya.tacky-consulting.com. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.',
          },
          {
            title: '2. Information We Collect',
            body: 'We collect information you provide when subscribing to our service, including your email address and payment information (processed securely by Stripe). We also collect standard web analytics data such as page views and browser type.',
          },
          {
            title: '3. How We Use Your Information',
            body: 'We use your information to: provide and manage your subscription; process payments via Stripe; send transactional emails related to your account; and improve our service. We do not sell your personal data to third parties.',
          },
          {
            title: '4. Payment Processing',
            body: 'All payments are processed by Stripe, Inc. We do not store credit card numbers or payment credentials on our servers. Stripe\'s privacy policy is available at stripe.com/privacy.',
          },
          {
            title: '5. Data Retention',
            body: 'We retain your account information for as long as your subscription is active or as needed to provide our services. You may request deletion of your data at any time by contacting us.',
          },
          {
            title: '6. Cookies',
            body: 'We use essential cookies to maintain your session and subscription status. We do not use advertising or tracking cookies.',
          },
          {
            title: '7. Third-Party Services',
            body: 'We use Supabase for database hosting and Stripe for payment processing. Both services maintain their own privacy policies and comply with applicable data protection regulations.',
          },
          {
            title: '8. Your Rights',
            body: 'You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at the address below.',
          },
          {
            title: '9. Contact',
            body: 'For privacy-related inquiries, please contact: admin@tacky-consulting.com',
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
