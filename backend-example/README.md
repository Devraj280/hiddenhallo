# HiddenHallo Email Service

This is a simple backend service that handles sending payment confirmation emails for HiddenHallo.

## Features

- Sends professional HTML email confirmations
- Integrates with Resend email service
- Includes order details, payment information, and customer details
- Error handling and logging
- CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

1. Copy the environment example file:
```bash
cp env.example .env
```

2. Edit `.env` and add your Resend API key:
```env
RESEND_API_KEY=re_your_api_key_here
PORT=3001
NODE_ENV=development
```

### 3. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy the key (starts with `re_`)

### 4. Run the Service

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The service will run on `http://localhost:3001`

## API Endpoints

### POST /api/send-payment-confirmation

Sends a payment confirmation email.

**Request Body:**
```json
{
  "to": "hiddenhalloinfo@gmail.com",
  "subject": "Payment Confirmation - Order #HH123456",
  "html": "<html>...</html>",
  "orderDetails": {
    "orderId": "HH123456",
    "date": "2024-01-15",
    "items": [...],
    "subtotal": 1000,
    "shipping": 55,
    "tax": 180,
    "discount": 0,
    "total": 1235,
    "customerInfo": {...}
  },
  "paymentInfo": {
    "paymentId": "pay_123456789",
    "paymentMethod": "razorpay",
    "paymentStatus": "completed"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment confirmation email sent successfully",
  "emailId": "email_id_from_resend"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Email service is running"
}
```

## Frontend Integration

Update your frontend to use the direct email service:

```typescript
import { sendPaymentConfirmationEmailDirect } from '@/lib/emailServiceDirect';

// In your payment success handler
const emailResult = await sendPaymentConfirmationEmailDirect(
  orderDetails,
  paymentInfo
);

if (emailResult.success) {
  console.log('Email sent successfully');
} else {
  console.error('Email failed:', emailResult.error);
}
```

## Email Template

The email includes:

- **Header**: HiddenHallo branding with success message
- **Order Details**: Order ID, date, items, quantities, prices
- **Payment Information**: Payment ID and method
- **Customer Information**: Name, address, contact details
- **Professional Styling**: Responsive design with HiddenHallo colors
- **Footer**: Contact information and branding

## Customization

### Changing Email Template

Edit the `emailContent` variable in `src/lib/emailServiceDirect.ts` to customize:

- Colors and styling
- Layout and content
- Additional information

### Adding More Recipients

Modify the `to` field in the API call:

```typescript
to: ['hiddenhalloinfo@gmail.com', 'another@email.com']
```

### Changing Email Subject

Update the subject line in the API call:

```typescript
subject: `Your Custom Subject - Order #${orderDetails.orderId}`
```

## Deployment

### Local Development

1. Start the backend service: `npm run dev`
2. Update your frontend to call `http://localhost:3001/api/send-payment-confirmation`
3. Test with a payment

### Production Deployment

1. Deploy to your preferred hosting service (Heroku, Vercel, Railway, etc.)
2. Set environment variables in your hosting platform
3. Update frontend API calls to use your production URL
4. Ensure CORS is configured for your domain

## Troubleshooting

### Email Not Sending

1. Check if Resend API key is correct
2. Verify the service is running
3. Check server logs for errors
4. Test the health endpoint

### CORS Errors

1. Ensure CORS is properly configured
2. Check if the frontend URL is allowed
3. Verify the API endpoint URL is correct

### Resend API Errors

1. Check your Resend account status
2. Verify API key permissions
3. Check email sending limits
4. Review Resend dashboard for errors

## Security Notes

- Keep your Resend API key secure
- Use environment variables for sensitive data
- Consider rate limiting for production
- Monitor email sending logs
- Validate input data before processing

## Support

For issues:

1. Check server logs
2. Verify environment variables
3. Test with a simple email first
4. Contact support if needed
