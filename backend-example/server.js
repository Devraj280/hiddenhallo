const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email confirmation endpoint
app.post('/api/send-payment-confirmation', async (req, res) => {
  try {
    const { to, subject, html, orderDetails, paymentInfo } = req.body;

    // Validate required fields
    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html'
      });
    }

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HiddenHallo <noreply@hiddenhallo.com>',
        to: to,
        subject: subject,
        html: html,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Resend API error:', errorData);
      throw new Error(`Failed to send email: ${emailResponse.statusText}`);
    }

    const result = await emailResponse.json();

    // Log successful email sending
    console.log('Payment confirmation email sent successfully:', {
      orderId: orderDetails?.orderId,
      paymentId: paymentInfo?.paymentId,
      emailId: result.id
    });

    res.json({
      success: true,
      message: 'Payment confirmation email sent successfully',
      emailId: result.id
    });

  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send confirmation email'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email service is running' });
});

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
