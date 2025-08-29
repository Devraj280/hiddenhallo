# Email Confirmation Setup Guide

This guide will help you set up email confirmation functionality for successful payments in your HiddenHallo application.

## Prerequisites

1. **Resend Account**: Sign up for a free account at [resend.com](https://resend.com)
2. **Supabase CLI**: Install Supabase CLI if you haven't already

## Setup Steps

### 1. Get Resend API Key

1. Go to [resend.com](https://resend.com) and create an account
2. Navigate to the API Keys section
3. Create a new API key
4. Copy the API key (starts with `re_`)

### 2. Configure Supabase Environment Variables

1. Open your Supabase dashboard
2. Go to Settings > Edge Functions
3. Add the following environment variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (e.g., `re_1234567890...`)

### 3. Deploy the Edge Function

1. Open your terminal and navigate to your project directory
2. Run the following command to deploy the edge function:

```bash
supabase functions deploy send-payment-confirmation
```

### 4. Verify the Setup

1. Make a test payment through your application
2. Check your email at `hiddenhalloinfo@gmail.com` for the confirmation email
3. Check the browser console for any error messages

## Email Template Features

The email confirmation includes:

- **Order Details**: Order ID, date, items, quantities, and prices
- **Payment Information**: Payment ID and method used
- **Customer Information**: Name, address, and contact details
- **Professional Styling**: Branded with HiddenHallo colors and logo
- **Responsive Design**: Works well on both desktop and mobile

## Troubleshooting

### Email Not Received

1. Check if the Resend API key is correctly set in Supabase
2. Verify the edge function is deployed successfully
3. Check browser console for error messages
4. Verify your email address is correct in the edge function

### Edge Function Errors

1. Check Supabase dashboard > Edge Functions > Logs
2. Verify the function is deployed correctly
3. Check if all environment variables are set

### Payment Success but No Email

1. The email sending is non-blocking, so payment success doesn't depend on email delivery
2. Check the browser console for email-related error messages
3. Verify the edge function is accessible

## Customization

### Changing Email Template

Edit the `emailContent` variable in `supabase/functions/send-payment-confirmation/index.ts` to customize:

- Email styling and colors
- Content layout
- Additional information to include

### Adding More Recipients

To send emails to multiple addresses, modify the `to` field in the edge function:

```typescript
to: ['hiddenhalloinfo@gmail.com', 'another@email.com'],
```

### Changing Email Subject

Modify the `subject` field in the edge function:

```typescript
subject: `Your Custom Subject - Order #${orderDetails.orderId}`,
```

## Security Notes

- The edge function is configured with `verify_jwt = false` for simplicity
- In production, consider adding authentication to the edge function
- The Resend API key is stored securely in Supabase environment variables
- Email content is sanitized to prevent injection attacks

## Support

If you encounter any issues:

1. Check the Supabase Edge Function logs
2. Verify your Resend account and API key
3. Test with a small payment first
4. Contact support if the issue persists
