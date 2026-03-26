import Link from 'next/link'

export const metadata = {
  title: 'Tokusho Act Notice (特定商取引法に基づく表記) | Akiya Japan',
}

const rows = [
  {
    label: '販売事業者名',
    en: 'Business Name',
    value: 'Mitora Trinity Japan',
  },
  {
    label: '運営責任者',
    en: 'Representative',
    value: 'Takahiro Kamuro',
  },
  {
    label: '所在地',
    en: 'Address',
    value: '1-25-6 Shirasagi, Nakano-ku, Tokyo, Japan',
  },
  {
    label: '電話番号',
    en: 'Phone',
    value: 'Available upon request / 請求があった場合、遅滞なく開示いたします',
  },
  {
    label: 'メールアドレス',
    en: 'Email',
    value: 'akiya.japan247@gmail.com',
  },
  {
    label: '販売URL',
    en: 'Website',
    value: 'https://akiya.tacky-consulting.com',
  },
  {
    label: '販売価格',
    en: 'Price',
    value: 'Subscription plan: $7.99 USD / month (tax included) / サブスクリプションプラン：$7.99 USD / 月（税込）',
  },
  {
    label: '商品・サービスの内容',
    en: 'Service Description',
    value: 'Access to a nationwide database of vacant homes and akiya (古民家) in Japan. View property details including address, photos, and contact info. This is an information service only — we do not provide real estate brokerage. / 日本全国の空き家・古民家物件データベースへのアクセス権。情報提供サービスであり、不動産売買仲介は行いません。',
  },
  {
    label: '支払方法',
    en: 'Payment Method',
    value: 'Credit card (Stripe) / クレジットカード（Stripe決済）',
  },
  {
    label: '支払時期',
    en: 'Payment Timing',
    value: 'Charged at subscription start; auto-renewed monthly. / サブスクリプション申込時に決済。以降は月次自動更新。',
  },
  {
    label: 'サービス提供時期',
    en: 'Service Start',
    value: 'Immediate access upon payment / 決済完了後、即時アクセス可能',
  },
  {
    label: 'キャンセルポリシー',
    en: 'Cancellation Policy',
    value: 'Cancel anytime from your account page. Access continues until the next billing date. Refunds are not provided as a general rule. / マイページよりいつでも解約可能。解約後は次回更新日まで利用継続可能。返金は原則対応しておりません。',
  },
  {
    label: '返金ポリシー',
    en: 'Refund Policy',
    value: 'Due to the nature of digital content, refunds are not generally provided. Please contact support for service failures. / デジタルコンテンツの性質上、原則として返金はお断りしております。サービス障害等の場合はサポートまでお問合せください。',
  },
  {
    label: '動作環境',
    en: 'System Requirements',
    value: 'Internet connection and a modern browser (Chrome, Safari, Firefox, etc.)',
  },
]

export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#1a0e06]/95 text-white px-5 py-4">
        <Link href="/" className="text-[#c9a96e] font-bold text-lg">← Akiya Japan</Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          Tokusho Act Notice
        </h1>
        <p className="text-sm text-stone-500 mb-8 pb-4 border-b border-stone-200">
          特定商取引法に基づく表記（Specified Commercial Transactions Act）
        </p>

        <table className="w-full text-sm">
          <tbody className="divide-y divide-stone-100">
            {rows.map(({ label, en, value }) => (
              <tr key={label} className="flex flex-col sm:flex-row">
                <td className="sm:w-52 py-3 pr-4 font-medium text-stone-600 bg-stone-50 px-3">
                  <span className="block text-stone-800">{en}</span>
                  <span className="block text-xs text-stone-400 mt-0.5">{label}</span>
                </td>
                <td className="py-3 px-3 text-stone-700 leading-relaxed">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-10 text-xs text-stone-400">
          ※ 法令に基づき、請求があった場合は住所・電話番号を遅滞なく開示いたします。
        </p>
      </main>

      <footer className="bg-stone-50 border-t border-stone-200 py-8 text-center text-xs text-stone-400">
        <Link href="/" className="hover:text-stone-600">Akiya Japan</Link>
        {' · '}
        <Link href="/en/privacy" className="hover:text-stone-600">Privacy Policy</Link>
        {' · '}
        <Link href="/en/terms" className="hover:text-stone-600">Terms of Service</Link>
      </footer>
    </div>
  )
}
