import nodemailer from 'nodemailer'

const recipient = 'nawanshusharma05@gmail.com'
const clean = value => typeof value === 'string' ? value.trim() : ''

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }
  if (request.headers['content-type']?.split(';')[0] !== 'application/json') {
    return response.status(415).json({ error: 'Expected JSON.' })
  }

  const name = clean(request.body?.name)
  const email = clean(request.body?.email)
  const message = clean(request.body?.message)
  if (!name || name.length > 120 || email.length > 254 ||
      !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(email) ||
      !message || message.length > 5000) {
    return response.status(400).json({ error: 'Check your name, email, and message.' })
  }

  const user = process.env.GMAIL_SENDER?.trim()
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '')
  if (!user || !pass) {
    return response.status(503).json({ error: 'Email delivery is unavailable.' })
  }

  try {
    const mailer = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      connectionTimeout: 6000,
      greetingTimeout: 6000,
      socketTimeout: 10000,
    })
    await mailer.sendMail({
      from: user,
      to: recipient,
      replyTo: { name, address: email },
      subject: 'New portfolio inquiry',
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    })
    return response.status(200).json({ sent: true })
  } catch (error) {
    console.error('Contact email failed', error.code ?? 'unknown')
    return response.status(502).json({ error: 'Email delivery failed.' })
  }
}
