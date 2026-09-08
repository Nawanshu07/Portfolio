import nodemailer from 'nodemailer'

interface ContactRequest {
  method?: string
  body?: {
    name?: string
    email?: string
    phone?: string
    message?: string
  }
}

interface ContactResponse {
  setHeader: (key: string, value: string) => void
  status: (code: number) => {
    json: (data: Record<string, unknown>) => void
    end: () => void
  }
}

export default async function handler(req: ContactRequest, res: ContactResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { name, email, phone, message } = req.body || {}

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required' })
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, error: 'Email address is required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address' })
  }

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required' })
  }

  const emailUser = process.env.EMAIL_USER || 'fightforheight07@gmail.com'
  const emailPass = process.env.EMAIL_PASS || 'xvybpqlybxrlddcy'
  const receiverEmail = process.env.RECEIVER_EMAIL || 'nawanshusharma05@gmail.com'

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    const mailOptions = {
      from: `"Portfolio Contact" <${emailUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `💼 New Portfolio Message from ${name}`,
      text: `You have a new contact form submission from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
          <h2 style="color: #0f0f11; border-bottom: 2px solid #d9663d; padding-bottom: 10px; margin-top: 0;">💼 New Portfolio Message</h2>
          <p style="font-size: 15px; color: #333;">You have received a new message from your portfolio contact form:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 10px; font-weight: bold; width: 120px; border: 1px solid #dddddd;">Name:</td>
              <td style="padding: 10px; border: 1px solid #dddddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; border: 1px solid #dddddd;">Email:</td>
              <td style="padding: 10px; border: 1px solid #dddddd;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background-color: #f1f1f1;">
              <td style="padding: 10px; font-weight: bold; border: 1px solid #dddddd;">Phone:</td>
              <td style="padding: 10px; border: 1px solid #dddddd;">${phone || '<em style="color: #888;">Not provided</em>'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #d9663d; border-radius: 4px;">
            <h4 style="margin: 0 0 10px 0; color: #555;">Message:</h4>
            <p style="margin: 0; line-height: 1.5; color: #222; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error sending email:', error)
    return res.status(500).json({ success: false, error: 'Failed to send email. Server encountered an error.', details: message })
  }
}
