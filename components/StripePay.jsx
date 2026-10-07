'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = key ? loadStripe(key) : null;

function PayForm({ label, onPaid, onBack }) {
    const stripe = useStripe();
    const elements = useElements();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setBusy(true);
        setError('');
        const { error: err, paymentIntent } = await stripe.confirmPayment({ elements, redirect: 'if_required' });
        if (err) {
            setError(err.message || 'Payment failed. Please try again.');
            setBusy(false);
            return;
        }
        if (paymentIntent && ['succeeded', 'processing'].includes(paymentIntent.status)) {
            await onPaid();
        } else {
            setError('Payment was not completed. Please try again.');
            setBusy(false);
        }
    };

    return (
        <form onSubmit={submit} className="stripe-pay-form">
            <PaymentElement />
            {error && <p className="pay-error">{error}</p>}
            <div className="step-actions">
                {onBack && <button type="button" className="btn-secondary" onClick={onBack} disabled={busy}>BACK</button>}
                <button type="submit" className="btn-adventure" disabled={!stripe || busy}>
                    <i className="fa-solid fa-lock"></i> {busy ? 'PROCESSING…' : label}
                </button>
            </div>
        </form>
    );
}

export default function StripePay({ clientSecret, label, onPaid, onBack }) {
    if (!stripePromise) {
        return <p className="pay-error">Online payments are not available right now. Please contact info@rideandrunocala.org.</p>;
    }
    return (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#C8175D' } } }}>
            <PayForm label={label} onPaid={onPaid} onBack={onBack} />
        </Elements>
    );
}
