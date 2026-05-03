import { NextResponse } from 'next/server'

const KEY = '12bca41ebd8d4c0e8be67d1b4a54ba00'
const HOST = 'akiya.mitorahub.com'

const URLS = [
  `https://${HOST}/en`,
  `https://${HOST}/en/akiya`,
  `https://${HOST}/en/faq`,
  `https://${HOST}/en/guide`,
  `https://${HOST}/en/about`,
]

export async function POST() {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS,
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  return NextResponse.json({ status: res.status, ok: res.ok })
}
