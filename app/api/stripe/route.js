import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// ✅ It's better to load this from environment variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, planId, userId } = await req.json();

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Membership Subscription',
            },
            unit_amount: Math.round(amount * 100), // in paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}&plan_id=${planId}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      metadata: {
        plan_id: planId,
        user_id: userId,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
