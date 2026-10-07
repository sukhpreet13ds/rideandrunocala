'use client';

import { useState } from 'react';
import { T, useSite } from '@/lib/content-context';
import StripePay from './StripePay';

const DonateModal = ({ isOpen, onClose }) => {
    const { settings } = useSite();
    const { presets, defaultAmount } = settings.donation;
    const [stage, setStage] = useState('form'); // form | pay | done
    const [amount, setAmount] = useState(String(defaultAmount));
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', anonymous: false });
    const [intent, setIntent] = useState(null);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    if (!isOpen) return null;

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    const close = () => {
        onClose();
        if (stage === 'done') {
            setStage('form');
            setIntent(null);
        }
    };

    const start = async (e) => {
        e.preventDefault();
        setError('');
        setBusy(true);
        try {
            const res = await fetch('/api/donate/intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, amount: Number(amount) }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Could not start donation');
            setIntent(data);
            setStage('pay');
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    };

    const paid = async () => {
        await fetch('/api/donate/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ donationId: intent.donationId }),
        }).catch(() => {});
        setStage('done');
    };

    return (
        <div className="registration-modal-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="registration-modal-content donate-modal">
                <button className="registration-modal-close" onClick={close} aria-label="Close">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {stage === 'done' ? (
                    <div className="text-center">
                        <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
                        <h2><T id="donate.thanks.title" /></h2>
                        <p><T id="donate.thanks.body" /></p>
                        <button className="btn-adventure mt-4" onClick={close}>CLOSE</button>
                    </div>
                ) : (
                    <>
                        <h2><T id="donate.title" /></h2>
                        <p className="donate-desc"><T id="donate.description" /></p>

                        {stage === 'form' && (
                            <form onSubmit={start} className="reg-form">
                                <h4 className="donate-choose"><T id="donate.choose" /></h4>
                                <div className="donate-presets">
                                    {presets.map((p) => (
                                        <button type="button" key={p} className={`donate-preset ${Number(amount) === p ? 'active' : ''}`} onClick={() => setAmount(String(p))}>${p}</button>
                                    ))}
                                </div>
                                <div className="donate-amount-input">
                                    <span>$</span>
                                    <input type="number" min={settings.donation.minAmount} step="1" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                <div className="donate-note"><i className="fa-regular fa-lightbulb"></i> <T id="donate.didyouknow" /></div>

                                <div className="form-group"><label>Full name *</label><input required value={form.name} onChange={set('name')} /></div>
                                <div className="form-row">
                                    <div className="form-group half"><label>Email *</label><input type="email" required value={form.email} onChange={set('email')} /></div>
                                    <div className="form-group half"><label>Phone</label><input value={form.phone} onChange={set('phone')} /></div>
                                </div>
                                <div className="form-group"><label>Message (optional)</label><textarea rows="2" value={form.message} onChange={set('message')} /></div>
                                <label className="donate-check"><input type="checkbox" checked={form.anonymous} onChange={set('anonymous')} /> Make my donation anonymous</label>

                                {error && <p className="pay-error">{error}</p>}
                                <div className="step-actions">
                                    <button type="submit" className="btn-adventure" disabled={busy}>{busy ? 'PLEASE WAIT…' : 'CONTINUE →'}</button>
                                </div>
                            </form>
                        )}

                        {stage === 'pay' && (
                            <>
                                <p className="donate-summary">Donating <strong>${(intent.amountCents / 100).toFixed(2)}</strong></p>
                                <StripePay clientSecret={intent.clientSecret} label={`DONATE $${(intent.amountCents / 100).toFixed(2)}`} onPaid={paid} onBack={() => setStage('form')} />
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default DonateModal;
