import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailSubject = 'Thank you for contacting DrivePixel';
    const emailBody = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1f3a; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .button { background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>DrivePixel</h1>
            </div>
            <div class="content">
              <h2>Hello ${name || 'there'}!</h2>
              <p>Thank you for reaching out to us through our chatbot. We've received your inquiry about <strong>${service || 'our services'}</strong>.</p>
              <p>Our team will review your request and get back to you within 24 hours.</p>
              <p>In the meantime, feel free to explore our website to learn more about what we offer:</p>
              <ul>
                <li>IT Services & Development</li>
                <li>Real Estate Solutions</li>
                <li>E-commerce Platforms</li>
                <li>Custom Software Development</li>
              </ul>
              <p>If you have any urgent questions, please don't hesitate to contact us directly at <a href="mailto:contact@drivepixel.com">contact@drivepixel.com</a></p>
              <a href="https://www.drivepixel.com" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} DrivePixel. All rights reserved.</p>
              <p>Washington, United States</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const response = await fetch(`${backendUrl}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: emailSubject,
        html: emailBody,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send email via backend');
      // Don't fail the request if email fails
      return NextResponse.json({
        success: true,
        emailSent: false,
        message: 'Information saved, but email notification failed',
      });
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({
      success: true,
      emailSent: false,
      message: 'Information saved, but email notification failed',
    });
  }
}
