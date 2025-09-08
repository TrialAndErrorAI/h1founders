# RFC-002: Booking & Payment System
**Scope**: 1 session (2-3 hours)
**Priority**: LOW - Simplified to Cal.com link
**Status**: SIMPLIFIED

> **UPDATE December 2024**: Simplified to just embedding Cal.com link with Stripe integration. 
> No custom development needed - just drop in Cal.com booking link.
> Original RFC kept for reference if we need custom booking later.

## Objective
Integrate Cal.com for scheduling with Stripe for payment processing.

## User Flow
1. User clicks "Book Strategy Session"
2. Cal.com shows available slots
3. User selects time
4. Stripe checkout for $185
5. Confirmation email with Zoom link
6. Calendar invite sent

## Components

### Cal.com Setup
- Embed on /coaching page
- 45-minute slots
- Buffer time between sessions
- Availability: Specific windows
- Zoom integration

### Stripe Integration
- Product: "EB1-A Strategy Session"
- Price: $185
- Payment before booking confirms
- Refund policy page

### Email Automation
- Booking confirmation
- 24-hour reminder
- Post-session follow-up
- Receipt from Stripe

## Alternative: Tiered Pricing
- Discovery Call: $97 (30 min)
- Strategy Session: $185 (45 min)  
- Deep Dive: $497 (90 min)

## Tech Requirements
- Cal.com account (Pro)
- Stripe account
- Zoom integration
- Email service (Resend/SendGrid)

## Success Criteria
- <3 clicks to payment
- Automated scheduling
- Clean receipt/invoice
- Mobile-friendly booking

---
*Estimated: 2-3 hours*