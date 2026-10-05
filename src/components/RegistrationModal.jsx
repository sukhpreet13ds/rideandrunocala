import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import '../style/style.css';

const RegistrationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [entryType, setEntryType] = useState('poker_ride');
    const [signature, setSignature] = useState(null);
    const [typedSignature, setTypedSignature] = useState('');
    const [sigType, setSigType] = useState('draw'); // 'draw' or 'type'
    const sigCanvas = useRef({});

    const clearSignature = () => {
        sigCanvas.current.clear();
        setSignature(null);
    };

    const handleSignatureEnd = () => {
        setSignature(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    };

    if (!isOpen) return null;

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleBackdropClick = (e) => {
        if (e.target.className === 'registration-modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="registration-modal-overlay" onClick={handleBackdropClick}>
            <div className="registration-modal-content">
                <button className="registration-modal-close" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {step === 1 && (
                    <div className="reg-step-1 text-center">
                        <h2>Registration Requirements</h2>
                        <div className="reg-icon"><i className="fa-solid fa-file-signature"></i></div>
                        <p>Before you can proceed with your registration, you must review and digitally sign the event waiver.</p>
                        <p>This process ensures the safety and compliance of all participants at the Florida Horse Park.</p>
                        <button className="btn-adventure mt-4" onClick={nextStep}>PROCEED TO WAIVER</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="reg-step-2">
                        <h2>Participant Waiver & Details</h2>
                        <form className="reg-form" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                            <div className="form-group">
                                <label>Registration Type</label>
                                <select value={entryType} onChange={(e) => setEntryType(e.target.value)} required>
                                    <option value="poker_ride">Poker Ride</option>
                                    <option value="run_walk">Run, Walk or Ruck</option>
                                    <option value="general">General Admission</option>
                                </select>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>First Name</label>
                                    <input type="text" required />
                                </div>
                                <div className="form-group half">
                                    <label>Last Name</label>
                                    <input type="text" required />
                                </div>
                            </div>
                            
                            <div className="form-row">
                                <div className="form-group half">
                                    <label>Email</label>
                                    <input type="email" required />
                                </div>
                                <div className="form-group half">
                                    <label>Phone (Cell)</label>
                                    <input type="tel" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" required />
                            </div>

                            <div className="form-group">
                                <label>Minors / Children (Names & Ages, if applicable)</label>
                                <input type="text" placeholder="e.g. John (8), Sarah (12)" />
                            </div>

                            <div className="waiver-scroll-box">
                                <h4>Florida Horse Park Liability Release</h4>
                                <p>By signing this document, I acknowledge that I am aware of the risks associated with equestrian and outdoor activities. I agree to release Celebration of Life, Ride and Run for Breast Cancer, Inc. and the Florida Horse Park from any and all liability...</p>
                                <p><em>(Full PDF terms would be embedded here in production)</em></p>
                                <div className="stable-signer">
                                    <p><strong>Stable Signer:</strong> <span className="digital-sig">Adrienne Skolnik</span></p>
                                </div>
                            </div>

                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" required />
                                    <span>I agree to the terms and conditions outlined in the waiver.</span>
                                </label>
                            </div>

                            {entryType === 'poker_ride' && (
                                <div className="checkbox-group">
                                    <label className="checkbox-label">
                                        <input type="checkbox" required />
                                        <span>I have read the AEA guidelines (Poker Ride Only)</span>
                                    </label>
                                </div>
                            )}

                            <div className="checkbox-group special-checkbox">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span><strong>Are you a breast cancer survivor?</strong> Please check the box to receive the Survivor Gold Medal as our gift.</span>
                                </label>
                            </div>

                            <div className="form-group mt-3">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <label style={{ margin: 0 }}>Digital Signature</label>
                                    <div style={{ display: 'flex', gap: '10px', fontSize: '14px' }}>
                                        <label style={{ cursor: 'pointer' }}>
                                            <input type="radio" checked={sigType === 'draw'} onChange={() => setSigType('draw')} style={{ marginRight: '5px' }} /> Draw
                                        </label>
                                        <label style={{ cursor: 'pointer' }}>
                                            <input type="radio" checked={sigType === 'type'} onChange={() => setSigType('type')} style={{ marginRight: '5px' }} /> Type
                                        </label>
                                    </div>
                                </div>
                                
                                {sigType === 'draw' ? (
                                    <div style={{ border: '2px dashed #ccc', borderRadius: '8px', background: '#fcfcfc', position: 'relative' }}>
                                        <SignatureCanvas 
                                            ref={sigCanvas}
                                            penColor="#1B2431"
                                            canvasProps={{ width: 620, height: 200, className: 'sigCanvas' }} 
                                            onEnd={handleSignatureEnd}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={clearSignature}
                                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.1)', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <input 
                                            type="text" 
                                            required 
                                            placeholder="Type your full name" 
                                            value={typedSignature}
                                            onChange={(e) => setTypedSignature(e.target.value)}
                                            style={{ 
                                                fontFamily: '"Dancing Script", cursive', 
                                                fontSize: '32px', 
                                                color: '#1B2431', 
                                                width: '100%', 
                                                padding: '10px', 
                                                border: '1px solid #ccc', 
                                                borderRadius: '4px' 
                                            }}
                                        />
                                        {typedSignature && (
                                            <div style={{ marginTop: '15px', padding: '15px', background: '#f5f5f5', borderRadius: '8px', border: '1px dashed #ccc', textAlign: 'center' }}>
                                                <span style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '5px' }}>Signature Preview:</span>
                                                <span style={{ fontFamily: '"Dancing Script", cursive', fontSize: '36px', color: '#C8175D' }}>{typedSignature}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="step-actions">
                                <button type="button" className="btn-secondary" onClick={prevStep}>BACK</button>
                                <button type="submit" className="btn-adventure">SIGN & CONTINUE</button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="reg-step-3">
                        <h2>Select Tickets & Checkout</h2>
                        <form className="reg-form" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                            <div className="ticket-selection">
                                <div className="ticket-option">
                                    <div className="ticket-info">
                                        <h4>Adult Ticket</h4>
                                        <p>$35.00</p>
                                    </div>
                                    <input type="number" min="0" defaultValue="1" className="ticket-qty" />
                                </div>
                                <div className="ticket-option">
                                    <div className="ticket-info">
                                        <h4>Child (4-12)</h4>
                                        <p>$10.00</p>
                                    </div>
                                    <input type="number" min="0" defaultValue="0" className="ticket-qty" />
                                </div>
                                <div className="ticket-option">
                                    <div className="ticket-info">
                                        <h4>Child (3 & Under)</h4>
                                        <p>Free</p>
                                    </div>
                                    <input type="number" min="0" defaultValue="0" className="ticket-qty" />
                                </div>
                            </div>
                            
                            <div className="checkout-summary">
                                <h3>Total: $35.00</h3>
                            </div>

                            <div className="mock-stripe">
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="text" placeholder="**** **** **** ****" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group half">
                                        <label>Expiry</label>
                                        <input type="text" placeholder="MM/YY" required />
                                    </div>
                                    <div className="form-group half">
                                        <label>CVC</label>
                                        <input type="text" placeholder="***" required />
                                    </div>
                                </div>
                            </div>

                            <div className="step-actions">
                                <button type="button" className="btn-secondary" onClick={prevStep}>BACK</button>
                                <button type="submit" className="btn-adventure"><i className="fa-solid fa-lock"></i> PAY SECURELY</button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 4 && (
                    <div className="reg-step-4 text-center">
                        <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
                        <h2>Registration Complete!</h2>
                        <p>Thank you for registering for the Celebration of Life - Ride & Run for Breast Cancer.</p>
                        <p>Your receipt and entry tickets have been emailed to you, along with a copy of your signed waiver.</p>
                        <button className="btn-adventure mt-4" onClick={onClose}>CLOSE</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationModal;
