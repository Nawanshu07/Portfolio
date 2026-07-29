import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Parse JSON request bodies
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running smoothly' });
});

// Diagnostic connection test endpoint
app.get('/api/test-connection', async (req: Request, res: Response) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    res.status(500).json({
      success: false,
      message: 'EMAIL_USER or EMAIL_PASS environment variables are missing on Render.',
      emailUser: emailUser ? 'Set' : 'Missing',
      emailPass: emailPass ? 'Set' : 'Missing',
    });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.verify();
    res.json({
      success: true,
      message: 'SMTP connection successfully established! Server can send emails.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'SMTP Connection Failed',
      error: error.message,
      code: error.code,
      response: error.response,
    });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone, message } = req.body;

  // Simple validation
  if (!name || !name.trim()) {
    res.status(400).json({ success: false, error: 'Name is required' });
    return;
  }
  
  if (!email || !email.trim()) {
    res.status(400).json({ success: false, error: 'Email address is required' });
    return;
  }

  // Simple email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ success: false, error: 'Please provide a valid email address' });
    return;
  }

  if (!message || !message.trim()) {
    res.status(400).json({ success: false, error: 'Message is required' });
    return;
  }

  // Check email credentials
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const receiverEmail = process.env.RECEIVER_EMAIL || emailUser;

  if (!emailUser || !emailPass) {
    console.error('ERROR: Missing EMAIL_USER or EMAIL_PASS in environment variables.');
    res.status(500).json({ 
      success: false, 
      error: 'Server is not properly configured to send emails. Please set EMAIL_USER and EMAIL_PASS environment variables.' 
    });
    return;
  }

  try {
    // Configure transporter with explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for port 465 (secure TLS)
      auth: {
        user: emailUser,
        pass: emailPass, // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false // Helps bypass potential self-signed certificate/routing issues on cloud platforms
      }
    });

    // Construct the email body
    const mailOptions = {
      from: `"Portfolio Contact" <${emailUser}>`,
      to: receiverEmail,
      replyTo: email, // Allows replying directly to the user who filled the form
      subject: `💼 New Portfolio Message from ${name}`,
      text: `
You have a new contact form submission from your portfolio website.

Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Message:
------------------------------------------
${message}
------------------------------------------
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
          <h2 style="color: #0f0f11; border-bottom: 2px solid #f9cb28; padding-bottom: 10px; margin-top: 0;">💼 New Portfolio Connection</h2>
          <p style="font-size: 16px; color: #333;">You have received a new message from your portfolio contact form:</p>
          
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

          <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #f9cb28; border-radius: 4px;">
            <h4 style="margin: 0 0 10px 0; color: #555;">Message:</h4>
            <p style="margin: 0; line-height: 1.5; color: #222; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            This email was sent automatically from your Portfolio contact form.
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email. Server encountered an error.', 
      details: error.message 
    });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`Environment config:`);
  console.log(`- EMAIL_USER: ${process.env.EMAIL_USER ? 'Set' : 'NOT Set'}`);
  console.log(`- EMAIL_PASS: ${process.env.EMAIL_PASS ? 'Set (App Password)' : 'NOT Set'}`);
  console.log(`- RECEIVER_EMAIL: ${process.env.RECEIVER_EMAIL || 'Same as EMAIL_USER'}`);
  console.log(`- CORS_ORIGIN: ${allowedOrigin}`);
});
