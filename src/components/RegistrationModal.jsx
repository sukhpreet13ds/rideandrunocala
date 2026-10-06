import React, { useState } from 'react';
import '../style/style.css';
import partner2 from '../assets/partner2.png';

const RegistrationModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);
    const [entryType, setEntryType] = useState('poker_ride'); // 'poker_ride', 'walk_run_ruck', 'general_admission'

    // Auto-fill signatures and initials states
    const [savedSignature, setSavedSignature] = useState('');
    const [savedInitial, setSavedInitial] = useState('');

    // Signatures
    const [sigPage1, setSigPage1] = useState('');
    const [sigPage5Main, setSigPage5Main] = useState('');
    const [sigPage5Spouse, setSigPage5Spouse] = useState('');

    // Initials
    const [initialP3, setInitialP3] = useState('');
    const [initialP4, setInitialP4] = useState('');
    const [initialPoints, setInitialPoints] = useState(Array(7).fill(''));

    // Checkbox validation states
    const [aeaAgreed, setAeaAgreed] = useState(false);
    const [pokerEndAgreed, setPokerEndAgreed] = useState(false);

    // Form field states
    const [printName1, setPrintName1] = useState('');
    const [date1, setDate1] = useState('');
    const [email1, setEmail1] = useState('');

    const [printNameOther, setPrintNameOther] = useState('');
    const [dateOther, setDateOther] = useState('');
    const [emailOther, setEmailOther] = useState('');

    // Error warning state
    const [validationError, setValidationError] = useState('');

    if (!isOpen) return null;

    // Signature handlers
    const handleSigChange = (setter, val) => {
        setter(val);
        if (val.trim()) {
            setSavedSignature(val);
        }
        if (validationError) setValidationError('');
    };

    const handleSigClick = (currentVal, setter) => {
        if (!currentVal && savedSignature) {
            setter(savedSignature);
        }
        if (validationError) setValidationError('');
    };

    // Initial handlers
    const handleInitialChange = (setter, val) => {
        setter(val);
        if (val.trim()) {
            setSavedInitial(val);
        }
    };

    const handleInitialClick = (currentVal, setter) => {
        if (!currentVal && savedInitial) {
            setter(savedInitial);
        }
    };

    // Section 8 (7 points) initial handler
    const handleSection8InitialChange = (index, val) => {
        const updated = [...initialPoints];
        updated[index] = val;
        setInitialPoints(updated);
        if (val.trim()) {
            setSavedInitial(val);
        }
    };

    const handleSection8InitialClick = (index) => {
        if (!initialPoints[index] && savedInitial) {
            const updated = [...initialPoints];
            updated[index] = savedInitial;
            setInitialPoints(updated);
        }
    };

    const nextStep = () => {
        if (step === 1) {
            setStep(2);
            setIsLoadingPdf(true);
            setTimeout(() => {
                setIsLoadingPdf(false);
            }, 1000); // 1 second loading range before showing PDF pages
        } else {
            setStep(step + 1);
        }
    };

    const handleSaveAndContinue = () => {
        if (entryType === 'poker_ride') {
            const hasSignature = (sigPage1 && sigPage1.trim()) || (sigPage5Main && sigPage5Main.trim()) || (savedSignature && savedSignature.trim());
            if (!printName1.trim()) {
                setValidationError('Please print your name in the required form fields on Page 1.');
                return;
            }
            if (!date1) {
                setValidationError('Please enter the date on the waiver form (Page 1).');
                return;
            }
            if (!hasSignature) {
                setValidationError('Please provide your digital signature on the waiver.');
                return;
            }
            if (!email1.trim()) {
                setValidationError('Please enter your email address on the waiver (Page 1).');
                return;
            }
            if (!aeaAgreed) {
                setValidationError('Please check and confirm: "I have read the AEA guidelines" (before Page 3).');
                return;
            }
            if (!pokerEndAgreed) {
                setValidationError('Please check and agree to the Safety Guidelines & Rules at the end of the Poker Trail Ride.');
                return;
            }
        } else {
            const hasSignature = (sigPage1 && sigPage1.trim()) || (savedSignature && savedSignature.trim());
            if (!printNameOther.trim()) {
                setValidationError('Please print your name on the waiver form.');
                return;
            }
            if (!dateOther) {
                setValidationError('Please select the date on the waiver form.');
                return;
            }
            if (!hasSignature) {
                setValidationError('Please provide your digital signature on the waiver form.');
                return;
            }
            if (!emailOther.trim()) {
                setValidationError('Please enter your email address on the waiver form.');
                return;
            }
        }

        setValidationError('');
        nextStep();
    };

    const prevStep = () => setStep(step - 1);

    const handleBackdropClick = (e) => {
        if (e.target.className === 'registration-modal-overlay') {
            onClose();
        }
    };

    const getFormTitle = () => {
        if (entryType === 'poker_ride') return 'For The Poker Ride';
        if (entryType === 'walk_run_ruck') return 'For The Walk Run Ruck';
        return 'General Admission Tickets';
    };

    return (
        <div className="registration-modal-overlay" onClick={handleBackdropClick}>
            <div className="registration-modal-content" style={{ maxWidth: '820px', width: '95%' }}>
                <button className="registration-modal-close" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {step === 1 && (
                    <div className="reg-step-1 text-center">
                        <h2>Registration Requirements</h2>
                        <div className="reg-icon"><i className="fa-solid fa-file-signature"></i></div>
                        <p>Before you can proceed with your registration, you must review and digitally sign the event liability waiver.</p>
                        <p>This process ensures the safety and compliance of all participants at the Florida Horse Park.</p>
                        <button className="btn-adventure mt-4" onClick={nextStep}>PROCEED TO WAIVER</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="reg-step-2">
                        {/* Top Bar Switcher - 3 Toggles */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ fontWeight: 'bold', color: '#1B2431', fontSize: '14px' }}>
                                Form Type: <span style={{ color: '#C8175D' }}>{getFormTitle()}</span>
                            </div>
                            <div className="form-type-toggle-container" style={{ margin: 0, padding: '4px', gap: '6px' }}>
                                <button
                                    type="button"
                                    className={`form-toggle-btn ${entryType === 'poker_ride' ? 'active' : ''}`}
                                    onClick={() => { setEntryType('poker_ride'); setValidationError(''); }}
                                    style={{ padding: '6px 12px', fontSize: '12px' }}
                                >
                                    For The Poker Ride
                                </button>
                                <button
                                    type="button"
                                    className={`form-toggle-btn ${entryType === 'walk_run_ruck' ? 'active' : ''}`}
                                    onClick={() => { setEntryType('walk_run_ruck'); setValidationError(''); }}
                                    style={{ padding: '6px 12px', fontSize: '12px' }}
                                >
                                    For The Walk Run Ruck
                                </button>
                                <button
                                    type="button"
                                    className={`form-toggle-btn ${entryType === 'general_admission' ? 'active' : ''}`}
                                    onClick={() => { setEntryType('general_admission'); setValidationError(''); }}
                                    style={{ padding: '6px 12px', fontSize: '12px' }}
                                >
                                    General Admission Tickets
                                </button>
                            </div>
                        </div>

                        {isLoadingPdf ? (
                            <div className="fake-pdf-container" style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="pdf-top-loading-box">
                                    <div className="pdf-loading-header">
                                        <i className="fa-solid fa-file-pdf"></i>
                                        <span>Loading PDF Document...</span>
                                    </div>
                                    <div className="pdf-loading-range-track">
                                        <div className="pdf-loading-range-bar"></div>
                                    </div>
                                    <div className="pdf-loading-range-text">Rendering document pages ({getFormTitle()})...</div>
                                </div>
                            </div>
                        ) : (
                            <div className="fake-pdf-container" style={{ height: '70vh' }}>
                            {/* ========================================================================= */}
                            {/* POKER RIDE FORM (10 PAGES TOTAL) */}
                            {/* ========================================================================= */}
                            {entryType === 'poker_ride' ? (
                                <>
                                    {/* PAGE 1: FHP Poker Ride Participants Waiver */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center">
                                            <img src={partner2} alt="Florida Horse Park" className="pdf-logo" />
                                            <h3 className="pdf-title">FOR POKER RIDE PARTICIPANTS</h3>
                                            <h4 className="pdf-subtitle">FLORIDA AGRICULTURE & HORSE PARK AUTHORITY, INC.</h4>
                                            <h4 className="pdf-subtitle">COMPLETE RELEASE FROM LIABILITY IN CASE OF INJURY OR LOSS, WAIVER</h4>
                                            <h4 className="pdf-subtitle">INDEMNITY AGREEMENT</h4>
                                        </div>
                                        
                                        <div className="pdf-body mt-3">
                                            <p>I/we understand that horseback riding and related activities, such as eventing and jumping, are very dangerous, and involve the risk of serious injury and/or death, and/or property damage, including injury and/or death to horses, spectators, and others. Accordingly, I/we agree that any activity engaged in by me on the premises owned by the state of Florida, or related to horses, or horseback riding, if on the premises, is done at my own risk.</p>
                                            
                                            <p>Accordingly, I/we release and agree to hold harmless the state of Florida, the Florida Agriculture & Horse Park Authority along with its board of directors and employees, and any and all persons or entities who are guarantors or indemnitors of the above, all agents, employees, promoters, sponsors, other horse riders, horse owners, advertisers, sales persons, photographers, volunteers, (hereinafter called Releasees) from all liability for negligence or otherwise.</p>
                                            
                                            <p>I/we assume full responsibility for the risk of bodily injury, illness, communicable or infectious disease/virus, death of myself and/or my horse(s) and any property damage due to negligence of Releasees or otherwise while the premises owned by the state of Florida, the Florida Agriculture & Horse Park Authority along with its board of directors and employees or heavily engaged in horseback riding-related activities, and/or while training, riding, competing, officiating, observing, volunteering, teaching, boarding, working for, or for any purpose relating to horseback riding, eventing, or participating as rider or spectator in such activities.</p>
                                            
                                            <p>I/we agree not to sue any Releasees, and I/we release and agree to indemnity for the Releasees form and for all liability for the undersigned, his/her person, representatives, assignees, heirs, and demands therefore on account of injury to her person or property, or communicable disease, or death of undersigned whether caused by negligence of the Releasees or otherwise.</p>
                                            
                                            <p>I/we have read and voluntarily signed the release and waiver of liability and indemnity agreement and further agree that no oral representations, statements or inducements apart from the foregoing written agreements have been made nor shall be made except by written and signed addendum</p>
                                        </div>

                                        <div className="pdf-warning text-center mt-3">
                                            <strong>WARNING</strong>
                                            <p><em>Under Florida law, an equine activity sponsor or equine professional is not liable for an injury to or the death of, a participant in equine activities resulting from the inherent risks of equine activities.</em></p>
                                        </div>

                                        <div className="pdf-agreement text-center mt-3">
                                            <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>I HAVE READ THIS ENTIRE RELEASE AND AGREE TO ITS CONTENTS.</h4>
                                            <strong>MINOR CHILDREN COVERED BY THIS RELEASE</strong>
                                            <p className="pdf-small-text" style={{ fontSize: '11px', margin: '2px 0 10px 0' }}>If signing as the parent or legal guardian of minor child(ren), list each minor's full name below.</p>
                                        </div>

                                        <div className="pdf-form-fields">
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 1:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 2:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row', marginTop: '10px' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 3:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 4:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row', marginTop: '14px' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Print Name/s:</label>
                                                    <input
                                                        type="text"
                                                        className="pdf-line-input"
                                                        style={{ width: '100%' }}
                                                        value={printName1}
                                                        onChange={(e) => { setPrintName1(e.target.value); if (validationError) setValidationError(''); }}
                                                    />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Date:</label>
                                                    <input
                                                        type="date"
                                                        className="pdf-line-input"
                                                        style={{ width: '100%' }}
                                                        value={date1}
                                                        onChange={(e) => { setDate1(e.target.value); if (validationError) setValidationError(''); }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row', marginTop: '14px' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Sign Name:</label>
                                                    <input
                                                        type="text"
                                                        className="pdf-line-input"
                                                        placeholder={savedSignature ? `(Click to apply "${savedSignature}")` : "(Digital Signature)"}
                                                        value={sigPage1}
                                                        onChange={(e) => handleSigChange(setSigPage1, e.target.value)}
                                                        onClick={() => handleSigClick(sigPage1, setSigPage1)}
                                                        onFocus={() => handleSigClick(sigPage1, setSigPage1)}
                                                        style={{ width: '100%', fontFamily: '"Brush Script MT", cursive', fontSize: '19px', cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Email:</label>
                                                    <input
                                                        type="email"
                                                        className="pdf-line-input"
                                                        style={{ width: '100%' }}
                                                        value={email1}
                                                        onChange={(e) => { setEmail1(e.target.value); if (validationError) setValidationError(''); }}
                                                    />
                                                </div>
                                            </div>
                                            <p className="pdf-small-text mt-1" style={{ fontSize: '11px', color: '#666' }}>(must be over 21 years of age)</p>
                                        </div>

                                        <div className="pdf-footer text-center mt-4" style={{ fontSize: '11px' }}>
                                            <p>Florida Horse Park<br/>11008 S Hwy 475, Ocala FL 34480<br/>(352) 307-6699</p>
                                        </div>
                                    </div>

                                    {/* PAGE 2: Rules and Regulations */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-3">
                                            <img src={partner2} alt="Florida Horse Park" className="pdf-logo" />
                                            <h4 className="pdf-subtitle mt-2">RULES AND REGULATIONS</h4>
                                        </div>
                                        
                                        <div className="pdf-body" style={{ fontSize: '12.5px' }}>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Animals of any kind brought to the facility must observe all regulations of the State of Florida Animal Health Division, and for equines must include a valid proof of a Negative Coggins Test (within prior 12 months).</li>
                                                <li className="mb-2">FHP requires all animals to be treated in a humane manner in accordance with state humane society guidelines.</li>
                                                <li className="mb-2">Dogs must always be on a leash and under control of the handler.</li>
                                                <li className="mb-2">All trash and manure must be disposed of in designated areas only.</li>
                                                <li className="mb-2">All motorized vehicles, including but not limited to cars, trucks, golf carts, motorcycles, mopeds, ATVs, etc shall be operated by a licensed driver.</li>
                                                <li className="mb-2">Grey water or sewage dumping is not permitted.</li>
                                                <li className="mb-2">No smoking in offices, stable pavilions, spectator pavilions, equine buildings, equipment, bleachers or arenas.</li>
                                                <li className="mb-2">All obstacles/jumps on the cross-country course are only to be used on scheduled schooling days. (see our website at <span style={{ color: '#0284c7' }}>www.flhorsepark.com</span> for a list of schooling days)</li>
                                                <li className="mb-2">Arenas (including grass, fiber and covered) are not to be used unless scheduled in advance and approved.</li>
                                                <li className="mb-2">Please report any damage to the facilities by calling (352)307-6699 or email <span style={{ color: '#0284c7' }}>maintenance@flhorsepark.com</span></li>
                                                <li className="mb-2">The Florida Horse Park reserves the right to remove dangerous, disruptive or unlawful persons from the property.</li>
                                                <li className="mb-2">Absolutely NO LUNGING IN THE COVERED ARENA, FIBER ARENAS OR GRASS ARENAS. The small sand arenas northeast of the covered arena is designated for lunging.</li>
                                                <li className="mb-2">Open campfires are not permitted. Fires should be in contained fire rings.</li>
                                                <li className="mb-2">Please have fun and be safe.</li>
                                            </ol>
                                        </div>

                                        <div className="pdf-contact-grid mt-4" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                                            <div>
                                                <p className="mb-1" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Peterson Smith Equine Hospital</p>
                                                <p className="mb-0">4747 SW 60th Ave</p>
                                                <p className="mb-0">Ocala, FL, 34474</p>
                                                <p className="mb-0">(352) 237-6151</p>
                                            </div>
                                            <div>
                                                <p className="mb-1" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>AdventHealth Ocala</p>
                                                <p className="mb-0">1500 SW 1st avenue</p>
                                                <p className="mb-0">Ocala, FL, 34471</p>
                                                <p className="mb-0">(352)351-7200</p>
                                            </div>
                                        </div>

                                        <div className="text-center mt-3" style={{ color: 'red', fontWeight: 'bold', fontSize: '13px' }}>
                                            IF AN EMERGENCY, PLEASE CALL 911
                                        </div>

                                        <div className="pdf-footer text-center mt-4" style={{ fontSize: '11px' }}>
                                            <p>Florida Horse Park<br/>11008 S Hwy 475, Ocala FL 34480<br/>(352) 307-6699</p>
                                        </div>
                                    </div>

                                    {/* LINE FOR CHECKBOX BEFORE THIRD PAGE: AEA GUIDELINES */}
                                    <div className="pdf-aea-guidelines-box">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0, width: '100%' }}>
                                            <input
                                                type="checkbox"
                                                id="aeaGuidelinesCheckbox"
                                                checked={aeaAgreed}
                                                onChange={(e) => {
                                                    setAeaAgreed(e.target.checked);
                                                    if (e.target.checked && validationError) setValidationError('');
                                                }}
                                                style={{ transform: 'scale(1.2)' }}
                                            />
                                            <span><strong>I have read the AEA guidelines</strong> (Safety Guidelines ‘Celebration of Life’ for Poker Trail Ride participants)</span>
                                        </label>
                                    </div>

                                    {/* PAGE 3 (Poker Ride Waiver Page 1 of 3) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-2">
                                            <h3 className="pdf-title" style={{ fontSize: '18px' }}>POKER RIDE PARTICIPANTS</h3>
                                            <h4 className="pdf-subtitle" style={{ fontSize: '15px' }}>WAIVER, AGREEMENT, AND LIABILITY RELEASE - Florida</h4>
                                            <p style={{ textDecoration: 'underline', fontWeight: 'bold', fontSize: '13px', margin: '4px 0 10px 0' }}>READ CAREFULLY BEFORE SIGNING</p>
                                        </div>

                                        <div className="pdf-warning-box">
                                            <strong>WARNING</strong>
                                            <p>Under Florida law, an equine activity sponsor or equine professional is not liable for an injury to, or the death of, a participant in equine activities resulting from the inherent risks of equine activities.</p>
                                        </div>

                                        <div className="pdf-body">
                                            <p style={{ fontSize: '12px' }}>
                                                I agree to this agreement with Celebration Of Life Ride & Run For Breast Cancer Inc who is a non-profit corporation or LLC (hereafter referred to as <strong>“Stable”</strong>) as a condition for his/her/its/their allowing me and the persons identified below (if any), to do any or all of the following at any time and at any location: enter Stable’s premises, land, facilities, barns, arenas, paddocks, pastures, and surrounding land; be near horses, ponies, mules, or donkeys (hereafter, "equines"), work with, handle, ride, drive, and/or receive instruction or guidance related to riding, driving, handling and/or working with equines. (All of these activities, individually and collectively, will be referred to as <strong>“The Activities”</strong> throughout this document.)
                                            </p>
                                        </div>

                                        <div className="pdf-form-fields" style={{ fontSize: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '8px' }}>
                                                <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>NAME <em>(Please print clearly)</em>:</label>
                                                <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '8px' }}>
                                                <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>NAME OF OTHER CONTRACTING PARTY (Spouse or Other Parent):</label>
                                                <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '8px' }}>
                                                <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>ADDRESS:</label>
                                                <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                                <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap', flexShrink: 0 }}>PHONE:</span>
                                                <div style={{ display: 'flex', alignItems: 'flex-end', flex: '1 1 110px', minWidth: '90px' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '4px' }}>[Home]</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1, minWidth: '40px' }} />
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'flex-end', flex: '1 1 110px', minWidth: '90px' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '4px' }}>[Work]</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1, minWidth: '40px' }} />
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'flex-end', flex: '1 1 110px', minWidth: '90px' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '4px' }}>[Cell/Other]</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1, minWidth: '40px' }} />
                                                </div>
                                            </div>

                                            <p style={{ margin: '10px 0 6px 0', fontSize: '12px' }}>
                                                To the fullest extent allowed by law, I also make this agreement on behalf of the following who is/are my child/children or legal ward(s):
                                            </p>
                                            
                                            <div className="pdf-responsive-row" style={{ display: 'flex', gap: '20px', marginBottom: '6px' }}>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '4px' }}>1.</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                                    <label style={{ marginLeft: '6px', marginRight: '4px' }}>AGE:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '40px' }} />
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '4px' }}>2.</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                                    <label style={{ marginLeft: '6px', marginRight: '4px' }}>AGE:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '40px' }} />
                                                </div>
                                            </div>
                                            <div className="pdf-responsive-row" style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '4px', whiteSpace: 'nowrap' }}>Date of Birth:</label>
                                                    <input type="date" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '4px', whiteSpace: 'nowrap' }}>Date of Birth:</label>
                                                    <input type="date" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pdf-body mt-2" style={{ fontSize: '12px' }}>
                                            <p>All parts of this document apply to me and each of the children or legal wards listed above. [We will collectively call ourselves “I,” “me,” or “my” throughout this document.]</p>
                                            <p style={{ fontWeight: 'bold', margin: '6px 0' }}>IT IS AGREED AS FOLLOWS:</p>
                                            <p><strong>1. Consideration/Binding Effect.</strong> I am signing this document in consideration for being allowed to engage in any or all of The Activities now and in the future. <strong>I understand that although I am signing this document today, I intend for it to be valid and binding when I engage in any or all of The Activities at any time in the future and at any location.</strong></p>
                                            <p><strong>2. Risks of Equine Activities.</strong> I understand that anyone riding, driving, handling, working with, or even near an equine at any location can suffer bodily and other injuries. Among other things, equines are unpredictable by nature. For example, when frightened, angry, or under stress, the natural instincts of an equine are to jump forward or sideways, back up quickly, or run away from real or perceived danger by trotting or galloping. Equines also have the ability to kick, buck, rear up, spin around, strike, or bite. I know that equines can do these and other things without warning. I also understand that all equines, even if they have no history of hurting anyone, are powerful and have the potential to be dangerous to people, equines, and other animals.</p>
                                            <p>I also understand that riding, driving, handling, working with, or even being near an equine can expose me to numerous hazards, which could include dangers or conditions which are an integral part of equine activities, including, but not limited to: (a) The propensity of equines to behave in ways that may result in injury, harm, or death to persons on or around them; (b) The unpredictability of an equine’s reaction</p>
                                        </div>

                                        <div className="pdf-page-number">Page 1 of 3</div>
                                    </div>

                                    {/* PAGE 4 (Poker Ride Waiver Page 2 of 3) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-body" style={{ fontSize: '12px' }}>
                                            <p>
                                                to such things as sounds, sudden movement, and unfamiliar objects, persons, or other animals; (c) Certain hazards such as surface and subsurface conditions; (d) Collisions with other equines or objects; and (e) The potential of a participant to act in a negligent manner that may contribute to injury to the participant or others, such as failing to maintain control over the animal or not acting within his or her ability. <em>I understand these risks and dangers that are inherent in equine-related activities, and I agree to assume all of them. I also understand that these are just <u>some</u> of the risks, and I agree to assume others that are not mentioned in this document. I am NOT relying on Stable to list all possible equine-related risks in this document or at any time, now or in the future.</em>
                                            </p>

                                            <div className="pdf-initial-section-row">
                                                <div style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'flex-end', marginRight: '8px', flexShrink: 0 }}>
                                                    <span style={{ fontWeight: 'bold' }}>INITIAL HERE:</span>
                                                    <input
                                                        type="text"
                                                        className="pdf-initial-input"
                                                        placeholder={savedInitial || "initial"}
                                                        value={initialP3}
                                                        onChange={(e) => handleInitialChange(setInitialP3, e.target.value)}
                                                        onClick={() => handleInitialClick(initialP3, setInitialP3)}
                                                        onFocus={() => handleInitialClick(initialP3, setInitialP3)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <div>
                                                    <strong>3. WAIVER AND LIABILITY RELEASE:</strong> As consideration for being allowed to engage in any or all of The Activities, now and in the future and at any location, <u>I (on behalf of myself and my spouse, parents, heirs, representatives, assigns, minor child/ren or legal wards) am voluntarily agreeing to each of the following</u>: (a) Stable and his/her/its/their respective officers, directors, members, managers, employees, agents, heirs, family members, assigns, representatives, affiliated persons, and others acting on their behalf (hereafter referred to collectively as <strong>“The Released Parties”</strong>) shall <u>not be liable</u> for any losses, injuries, or damages that I (which includes the signer and signer's minor child/children or legal wards) may sustain as a result of engaging in any of The Activities at any time or at any location; and (b) I fully and forever <u>release, waive, agree not to sue, and discharge</u> all claims, demands, damages, legal actions, causes of action, or rights of action (whether they occur now or in the future, and whether they are known or unknown, anticipated or unanticipated) against The Released Parties, whether caused by their ordinary negligence, a violation of a provision of the Florida Equine Activity Liability Act, or other legal liability resulting from or arising out of my/our engaging in The Activities at any time and at any location. The term "damages" means, for example, medical expenses any and all claims or losses because of bodily injuries, mental/emotional injuries, or property damages, death, expenses, and/or personal property damages. This document is intended to apply and be binding regardless of whether I am riding, driving, handling, or near equines. (However, it is understood that I am not releasing The Released Parties from liability for injuries that are intentionally caused, and am not releasing any of them from liabilities that may arise from a violation of Section 90(e) of Florida’s Equine Activity Liability Law, which involves intentionally caused injuries.)
                                                </div>
                                            </div>

                                            <div className="pdf-initial-section-row">
                                                <div style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'flex-end', marginRight: '8px', flexShrink: 0 }}>
                                                    <span style={{ fontWeight: 'bold' }}>INITIAL HERE:</span>
                                                    <input
                                                        type="text"
                                                        className="pdf-initial-input"
                                                        placeholder={savedInitial || "initial"}
                                                        value={initialP4}
                                                        onChange={(e) => handleInitialChange(setInitialP4, e.target.value)}
                                                        onClick={() => handleInitialClick(initialP4, setInitialP4)}
                                                        onFocus={() => handleInitialClick(initialP4, setInitialP4)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <div>
                                                    <strong>4. INDEMNIFICATION.</strong> To the fullest extent permitted by law, I also agree to indemnify and hold harmless <strong>The Released Parties</strong> against any and all claims, demands, actions, liabilities, losses, or suits that are brought against The Released Parties (or either of them) which are in any way connected with my/our participation in any of the Activities at any time and at any location, including claims that allege acts or omissions of <strong>The Released Parties</strong> that are negligent or in violation of a state Equine Activity Liability Act. This indemnification shall also include reimbursement of reasonable attorney fees incurred by <strong>Stable</strong> or by others on its behalf.
                                                </div>
                                            </div>

                                            <p>
                                                <strong>5. Helmets.</strong> I understand that Florida law [F.S.A. §773.06] requires children younger than age 16 to wear properly fitted and securely fastened ASTM-standard equestrian protective headgear while riding equines at various locations described in the law. I also understand that, for my own protection, I should purchase and wear properly fitted and secured ASTM-standard/SEI-certified protective headgear that is designed for use when riding, driving, or near equines. <strong>I am NOT relying on Stable to provide headgear, to check headgear I may wear, or to monitor my compliance with this suggestion at any time.</strong>
                                            </p>

                                            <div style={{ margin: '12px 0' }}>
                                                <p style={{ marginBottom: '6px' }}><strong>6. Emergencies.</strong> Person(s) to Contact in Case of Emergency:</p>
                                                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '6px' }}>
                                                    <label style={{ marginRight: '6px' }}>Name:</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                                <div className="pdf-responsive-row" style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                                                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                        <label style={{ marginRight: '6px' }}>Phone:</label>
                                                        <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                                    </div>
                                                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                        <label style={{ marginRight: '6px' }}>Relationship:</label>
                                                        <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <p style={{ marginTop: '12px' }}>
                                                <strong>7. Florida law applies to this document</strong>, and I agree that this document shall be enforced to the greatest extent permitted by law. If any clause conflicts with applicable law, only that clause will be null and void but the remainder shall stay in full force and effect. This document can <u>only</u> be modified in writing and signed by me and Celebration Of Life Ride & Run For Breast Cancer Inc (on behalf of <strong>Stable</strong>). I agree to pay any attorney fees and costs for <strong>The Released Parties</strong> (or either of them) to enforce this Agreement, and I agree to indemnify and hold harmless <strong>The Released Parties</strong> for such fees and costs.
                                            </p>
                                        </div>

                                        <div className="pdf-page-number">Page 2 of 3</div>
                                    </div>

                                    {/* PAGE 5 (Poker Ride Waiver Page 3 of 3) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header mb-3">
                                            <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                                8. ALSO, I REPRESENT (<u>please check and initial each box below</u>):
                                            </h4>
                                        </div>

                                        <div className="pdf-checkbox-list" style={{ fontSize: '11.5px' }}>
                                            {/* Point 1 */}
                                            <div className="pdf-checkbox-item">
                                                <input
                                                    type="text"
                                                    className="pdf-initial-input"
                                                    placeholder={savedInitial || "initial"}
                                                    value={initialPoints[0]}
                                                    onChange={(e) => handleSection8InitialChange(0, e.target.value)}
                                                    onClick={() => handleSection8InitialClick(0)}
                                                    onFocus={() => handleSection8InitialClick(0)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { if (e.target.checked) handleSection8InitialClick(0); }}
                                                />
                                                <div><strong>I AM AT OR OVER 18 YEARS OF AGE;</strong></div>
                                            </div>

                                            {/* Point 2 */}
                                            <div className="pdf-checkbox-item">
                                                <input
                                                    type="text"
                                                    className="pdf-initial-input"
                                                    placeholder={savedInitial || "initial"}
                                                    value={initialPoints[1]}
                                                    onChange={(e) => handleSection8InitialChange(1, e.target.value)}
                                                    onClick={() => handleSection8InitialClick(1)}
                                                    onFocus={() => handleSection8InitialClick(1)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { if (e.target.checked) handleSection8InitialClick(1); }}
                                                />
                                                <div><strong>I AM OF SOUND MIND AND AM NOT SUFFERING FROM SHOCK OR UNDER THE INFLUENCE OF ALCOHOL, DRUGS, OR INTOXICANTS THAT AFFECT MY ABILITY TO READ AND UNDERSTAND THIS DOCUMENT;</strong></div>
                                            </div>

                                            {/* Point 3 */}
                                            <div className="pdf-checkbox-item">
                                                <input
                                                    type="text"
                                                    className="pdf-initial-input"
                                                    placeholder={savedInitial || "initial"}
                                                    value={initialPoints[2]}
                                                    onChange={(e) => handleSection8InitialChange(2, e.target.value)}
                                                    onClick={() => handleSection8InitialClick(2)}
                                                    onFocus={() => handleSection8InitialClick(2)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { if (e.target.checked) handleSection8InitialClick(2); }}
                                                />
                                                <div><strong>I HAVE READ THIS ENTIRE DOCUMENT (ALL THREE PAGES), AND I FULLY UNDERSTAND IT;</strong></div>
                                            </div>

                                            {/* Point 4 */}
                                            <div className="pdf-checkbox-item">
                                                <input
                                                    type="text"
                                                    className="pdf-initial-input"
                                                    placeholder={savedInitial || "initial"}
                                                    value={initialPoints[3]}
                                                    onChange={(e) => handleSection8InitialChange(3, e.target.value)}
                                                    onClick={() => handleSection8InitialClick(3)}
                                                    onFocus={() => handleSection8InitialClick(3)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { if (e.target.checked) handleSection8InitialClick(3); }}
                                                />
                                                <div><strong>I INTEND FOR THIS DOCUMENT TO BE VALID AND BINDING TODAY AND AT ALL TIMES IN THE FUTURE;</strong></div>
                                            </div>

                                            {/* Point 5 */}
                                            <div className="pdf-checkbox-item">
                                                <input
                                                    type="text"
                                                    className="pdf-initial-input"
                                                    placeholder={savedInitial || "initial"}
                                                    value={initialPoints[4]}
                                                    onChange={(e) => handleSection8InitialChange(4, e.target.value)}
                                                    onClick={() => handleSection8InitialClick(4)}
                                                    onFocus={() => handleSection8InitialClick(4)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { if (e.target.checked) handleSection8InitialClick(4); }}
                                                />
                                                <div><strong>I AM AWARE THAT THIS DOCUMENT IS LEGALLY BINDING AND THAT BY SIGNING IT I AM GIVING UP LEGAL RIGHTS AND/OR REMEDIES;</strong></div>
                                            </div>

                                            {/* Point 6 */}
                                            <div className="pdf-checkbox-item">
                                                <input
                                                    type="text"
                                                    className="pdf-initial-input"
                                                    placeholder={savedInitial || "initial"}
                                                    value={initialPoints[5]}
                                                    onChange={(e) => handleSection8InitialChange(5, e.target.value)}
                                                    onClick={() => handleSection8InitialClick(5)}
                                                    onFocus={() => handleSection8InitialClick(5)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { if (e.target.checked) handleSection8InitialClick(5); }}
                                                />
                                                <div><strong>BY SIGNING THIS DOCUMENT, I ACKNOWLEDGE THAT IF ANYONE IS HURT OR PROPERTY DAMAGED BY PARTICIPATION OF MYSELF AND/OR MY MINOR CHILD/REN IN ANY OF THE ACTIVITIES, I MAY BE FOUND BY A COURT OF LAW TO HAVE WAIVED MY RIGHT TO BRING A LAWSUIT AGAINST ANY OR ALL OF THE RELEASED PARTIES; AND</strong></div>
                                            </div>

                                            {/* Point 7 */}
                                            <div className="pdf-checkbox-item">
                                                <input
                                                    type="text"
                                                    className="pdf-initial-input"
                                                    placeholder={savedInitial || "initial"}
                                                    value={initialPoints[6]}
                                                    onChange={(e) => handleSection8InitialChange(6, e.target.value)}
                                                    onClick={() => handleSection8InitialClick(6)}
                                                    onFocus={() => handleSection8InitialClick(6)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => { if (e.target.checked) handleSection8InitialClick(6); }}
                                                />
                                                <div><strong>ALL OF THE INFORMATION THAT I HAVE PROVIDED IS TRUE AND ACCURATE.</strong></div>
                                            </div>
                                        </div>

                                        {/* SIGNATURE FIELDS */}
                                        <div className="pdf-form-fields mt-4" style={{ fontSize: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
                                                <label style={{ whiteSpace: 'nowrap', marginRight: '6px', fontWeight: 'bold' }}>SIGNATURE:</label>
                                                <input
                                                    type="text"
                                                    className="pdf-line-input"
                                                    placeholder={savedSignature ? `(Click to apply "${savedSignature}")` : "(Sign here)"}
                                                    value={sigPage5Main}
                                                    onChange={(e) => handleSigChange(setSigPage5Main, e.target.value)}
                                                    onClick={() => handleSigClick(sigPage5Main, setSigPage5Main)}
                                                    onFocus={() => handleSigClick(sigPage5Main, setSigPage5Main)}
                                                    style={{ flex: 1, fontFamily: '"Brush Script MT", cursive', fontSize: '20px', cursor: 'pointer' }}
                                                />
                                            </div>
                                            <div className="pdf-responsive-row" style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '12px' }}>
                                                <div style={{ flex: 2, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>PRINT NAME HERE:</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>DATE :</label>
                                                    <input type="date" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                            </div>

                                            <p style={{ margin: '10px 0 4px 0', fontSize: '11px', fontWeight: 'bold' }}>SIGNATURE OF OTHER CONTRACTING PARTY (Spouse/ Other Parent):</p>
                                            <div className="pdf-responsive-row" style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '8px' }}>
                                                <div style={{ flex: 2, display: 'flex', alignItems: 'flex-end' }}>
                                                    <input
                                                        type="text"
                                                        className="pdf-line-input"
                                                        placeholder={savedSignature ? `(Click to apply "${savedSignature}")` : "(Digital Signature)"}
                                                        value={sigPage5Spouse}
                                                        onChange={(e) => handleSigChange(setSigPage5Spouse, e.target.value)}
                                                        onClick={() => handleSigClick(sigPage5Spouse, setSigPage5Spouse)}
                                                        onFocus={() => handleSigClick(sigPage5Spouse, setSigPage5Spouse)}
                                                        style={{ width: '100%', fontFamily: '"Brush Script MT", cursive', fontSize: '18px', cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>DATE :</label>
                                                    <input type="date" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                            </div>

                                            <div className="pdf-responsive-row" style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '16px' }}>
                                                <div style={{ flex: 2, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>PRINT NAME HERE:</label>
                                                    <input type="text" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '6px' }}>DATE :</label>
                                                    <input type="date" className="pdf-line-input" style={{ flex: 1 }} />
                                                </div>
                                            </div>

                                            {/* ACCEPTED BY STABLE REPRESENTATIVE */}
                                            <div style={{ margin: '14px 0 8px 0' }}>
                                                <div style={{ fontWeight: 'bold' }}>ACCEPTED BY:</div>
                                                <div style={{ fontWeight: 'bold', fontSize: '11px' }}>“STABLE” REPRESENTATIVE</div>
                                                <div style={{ display: 'flex', alignItems: 'flex-end', margin: '6px 0' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '8px' }}>SIGNATURE:</label>
                                                    <span style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '26px', color: '#002B49', borderBottom: '1.5px solid #222', paddingRight: '20px' }}>
                                                        Adrienne Skolnik
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                    <label style={{ whiteSpace: 'nowrap', marginRight: '8px' }}>DATE OF SIGNATURE:</label>
                                                    <span style={{ borderBottom: '1.5px solid #222', paddingRight: '20px', fontWeight: 'bold' }}>
                                                        OCTOBER 28, 2026
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pdf-warning-box mt-3">
                                            <strong>WARNING</strong>
                                            <p>Under Florida law, an equine activity sponsor or equine professional is not liable for an injury to, or the death of, a participant in equine activities resulting from the inherent risks of equine activities.</p>
                                        </div>

                                        <div className="pdf-page-number">Page 3 of 3</div>
                                    </div>

                                    {/* ========================================================================= */}
                                    {/* 5 ADDITIONAL PAGES: CELEBRATION OF LIFE - INSURANCE SAFETY REQUIREMENTS */}
                                    {/* ========================================================================= */}

                                    {/* PAGE 6 (Insurance Safety Requirements Page 1) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-4">
                                            <h3 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Celebration of Life</h3>
                                            <h4 style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '14px', margin: '6px 0' }}>INSURANCE SAFETY GROUP REQUIREMENTS</h4>
                                        </div>

                                        <div className="pdf-body" style={{ fontSize: '12px' }}>
                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '14px 0 8px 0' }}>Boarding, Training & Breeding Stables</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Hold harmless and/or liability release agreements must be obtained from all boarders and riders.</li>
                                                <li className="mb-2">Stable rules and emergency numbers should be posted in prominent places throughout the stable area. Most states have equine liability laws. Most of those laws have specific wording for warning postings and contracts.</li>
                                                <li className="mb-2">Evidence of liability insurance should be obtained from independent contractors or anyone using the facility.</li>
                                                <li className="mb-2">Riding arenas and areas should be well maintained, clear of debris and obstacles.</li>
                                                <li className="mb-2">Arenas and schooling corrals should be adequate in size to accommodate the maximum number of riders that will be using the facility at any one time.</li>
                                                <li className="mb-2">Premises should be fenced with design and materials required for horse farms. Fence should be well constructed and in good repair. The fence should be at least 4 feet high with "horse proof" gate latches and difficult for children to open.</li>
                                                <li className="mb-2">Barn isles and stalls must be free of debris and obstacles. Floors should be sufficiently rough to avoid slipping when wet, Stall latches should be "horse proof" and difficult for children to open. Horses should be hand led in and out of barn. No mounting, dismounting or hacking in the barn isle.</li>
                                                <li className="mb-2">Rails on fencing used for outside riding arenas should be attached inside the posts. More resistance when pushed against.</li>
                                                <li className="mb-2">No smoking in barns or in the vicinity of stored hay or feed.</li>
                                            </ol>

                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '16px 0 8px 0' }}>Riding Instruction</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">AEA does not require designated riding instructor certification at this time. AEA does require that the instructor be highly experienced in horse care, stable management and riding instruction.</li>
                                                <li className="mb-2">All riding instruction must take place in an enclosed arena unless special purpose such as trail riding in which event trail ride regulations will apply.</li>
                                                <li className="mb-2">All students must be offered protective headgear. Headgear is mandatory for hazardous equine riding activities such polo, polocrosse, hunter/jumper, eventing, steeplechase, etc.</li>
                                                <li className="mb-2">All riders will be equipped with riding boots, paddock shoes or footwear with adequate heel for riding.</li>
                                                <li className="mb-2">All students will sign AEA approved acknowledgment of risk form before taking lessons.</li>
                                                <li className="mb-2">All tack and equipment must be in good condition and suited for discipline being taught.</li>
                                            </ol>

                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '16px 0 8px 0' }}>Pony Rides</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Ponies should be at least 4 1/2 years old, trained, desensitized with a gentle disposition.</li>
                                                <li className="mb-2">No stallions or mares in season can be used in pony ride operations.</li>
                                            </ol>
                                        </div>

                                        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '13px', marginTop: '20px' }}>1</div>
                                    </div>

                                    {/* PAGE 7 (Insurance Safety Requirements Page 2) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-4">
                                            <h3 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Celebration of Life</h3>
                                            <h4 style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '14px', margin: '6px 0' }}>INSURANCE SAFETY GROUP REQUIREMENTS</h4>
                                        </div>

                                        <div className="pdf-body" style={{ fontSize: '12px' }}>
                                            <ol start={3} style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">All pony rides must be given in a fenced enclosure (portable corral or arena) capable of containing a full size horse. The most suitable portable fencing is welded pipe or gate panels. Fencing should be free from sharp edges or projections and all staking should be clearly marked with colored tape.</li>
                                                <li className="mb-2"><strong>NO SEAT or RESTRAINT BELT ALLOWED.</strong></li>
                                                <li className="mb-2">Child must be provided with SEI ASTM Standard protective headgear.</li>
                                                <li className="mb-2">A pony saddle must be used on a quiet, reliable animal. Saddles, tack, lead lines and equipment must be inspected constantly and be of durable, high quality construction.</li>
                                                <li className="mb-2">It is not desirable to use reins and a bit for pony ride operations. Ponies are best led with a caveson or strong halter with an obedience chain over the nose. Side reins are not to be used.</li>
                                                <li className="mb-2">Pony size is defined as 56" or less at the withers. Larger horse should not be used for pony rides.</li>
                                                <li className="mb-2">Minimum child age is 3 years old but size will be determined by the individual operator using good judgment and common sense. The child should be capable of sitting in the saddle without support.</li>
                                                <li className="mb-2">Only Staff members, not parents, must supervise each child while mounting, leading and dismounting from pony. Parents, Guardians or other care givers should not act as handlers or leaders of the pony rides.</li>
                                                <li className="mb-2">Always check the girth for tightness with each rider.</li>
                                            </ol>

                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '16px 0 8px 0' }}>Petting Zoo</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Hand washing stations must be used to prevent transmission of bacteria and communicable disease. To reduce the chance of disease transmission, hand washing stations sufficient to accommodate the maximum anticipated attendance must be provided. The stations will include the appropriate number of anti-bacterial liquid soap dispensers and a water source or anti-bacterial hand-wipes. If soap and water are not available, alcohol-based hand sanitizers [or anti-bacterial hand wipes] may be provided but this is a less preferable option. Signage which clearly explains the safety reasons for hand washing shall be clearly posted near the hand washing stations and near the exit.</li>
                                                <li className="mb-2">Animals must be in fenced enclosure.</li>
                                                <li className="mb-2">No large, exotic or dangerous animals.</li>
                                                <li className="mb-2">Manure and soiled animal bedding should be removed from petting zoo area on a frequent periodic basis. Animal waste and waste removal tools should be stored in areas restricted from public access.</li>
                                            </ol>

                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '16px 0 8px 0' }}>Horse Shows & Special Events</h5>
                                            <h6 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '12px', margin: '8px 0 4px 0' }}>Premises</h6>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Arenas and schooling corrals should be adequate in size to adequately accommodate the riders that will be using the facility.</li>
                                                <li className="mb-2">Separate areas for parking, warm-up, competition, food service, and spectators must be designated, marked, fenced and /or roped off as appropriate and necessary. Areas where horses are being led or ridden should be off limits for casual spectators, who may have no knowledge of safe zones around horses.</li>
                                                <li className="mb-2">The number of horses in a warm-up or staging area must be controlled to avoid potential accidents. Spectators must stay in assigned observation areas a safe distance from horse activity.</li>
                                            </ol>
                                        </div>

                                        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '13px', marginTop: '20px' }}>2</div>
                                    </div>

                                    {/* PAGE 8 (Insurance Safety Requirements Page 3) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-4">
                                            <h3 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Celebration of Life</h3>
                                            <h4 style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '14px', margin: '6px 0' }}>INSURANCE SAFETY GROUP REQUIREMENTS</h4>
                                        </div>

                                        <div className="pdf-body" style={{ fontSize: '12px' }}>
                                            <ol start={4} style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Premises should be fenced with design and materials required for horse exposures. Fence should be well constructed and in good repair. The fence should be at least 4 feet high with "horse proof" gate latches and difficult for children to open.</li>
                                                <li className="mb-2">Rails on fencing used for riding arenas must be attached inside the posts.</li>
                                                <li className="mb-2">Dogs, if allowed at all on the grounds, must be restrained on leads at all times. If they are NOT allowed, signs should be posted on access roads and in parking areas to give owners adequate warning. If dogs are banned, this should be stated on any prize list or activity announcement.</li>
                                                <li className="mb-2">Premises owners, vendors and independent contractors must carry insurance.</li>
                                                <li className="mb-2">Motorcycles, Mopeds, All-Terrain Vehicles, Golf Carts, and Bicycles, if allowed, should be restricted on the grounds to separate them from areas where horses will be moving about, with signage to make clear where they are and are not allowed. If the organizing committee needs to use such vehicles for the running of the event, they must make certain that the drivers are thoroughly familiar with the vehicle's controls, as well as what a horse's reaction may be to the vehicle.</li>
                                                <li className="mb-2">Any horse or rider acting in a reckless, unsafe or unreasonable manner will be required to leave the premises or event.</li>
                                                <li className="mb-2">Stable rules and emergency numbers should be posted in prominent places throughout the stable area. Most states have equine liability laws. Most of those laws have specific wording for warning postings and contracts.</li>
                                                <li className="mb-2">Management must plan for the logistics of emergency medical and veterinary support in case of accident or illness. If the support people are on call rather than on the grounds, access to the emergency site must be kept clear and someone provided to guide them from the facility entrance to where they are needed.</li>
                                                <li className="mb-2">Smoking must be banned from bedding storage and stabling areas; for show or activity areas fire and local government codes and laws must be observed.</li>
                                                <li className="mb-2">Any temporary electrical lines must be checked and approved by a qualified electrician. Public address and other communication equipment should also be checked for safety, and should be able to be heard throughout the grounds.</li>
                                            </ol>

                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '16px 0 8px 0' }}>Participants</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">All participants must sign an acknowledgement of risk and liability release in a form approved by underwriter and state in which activity takes place. A copy of the release must be filed with company before the event date</li>
                                                <li className="mb-2"><strong>Injury to athletic participants in specific activities are excluded from coverage. All participants ride or participate at their own risk!</strong></li>
                                                <li className="mb-2">ALL exhibitors in over fences classes and hunter classes must wear protective head gear passing testing standards. All junior exhibitors riding anywhere on the grounds must wear protective head gear with harnesses buckled or they will be prohibited from riding anywhere other than the show ring. Proper shoes with heels should also be required. No loose clothing permitted.</li>
                                                <li className="mb-2">Volunteers for the event must be thoroughly briefed about the nature of their jobs, and how to provide help to participants and spectators in case of an emergency.</li>
                                            </ol>
                                        </div>

                                        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '13px', marginTop: '20px' }}>3</div>
                                    </div>

                                    {/* PAGE 9 (Insurance Safety Requirements Page 4) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-4">
                                            <h3 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Celebration of Life</h3>
                                            <h4 style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '14px', margin: '6px 0' }}>INSURANCE SAFETY GROUP REQUIREMENTS</h4>
                                        </div>

                                        <div className="pdf-body" style={{ fontSize: '12px' }}>
                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '12px 0 8px 0' }}>Spectators</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Spectators must be separated from all event activity at all time. Safety barriers must be in place to prevent spectators from entering event staging areas and arenas.</li>
                                                <li className="mb-2">Spectators who enter areas of equine activities are considered participants and excluded from any form of coverage.</li>
                                                <li className="mb-2">An adult must closely supervise small children at all times. Signs to this effect should be posted at entry points and in parking areas, and particularly at all stabling entrances.</li>
                                            </ol>

                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '16px 0 8px 0' }}>Wagon & Carriage Rides</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Wagon / Hay rides should avoid streets and/or areas where high public traffic is present. Wagons will come to a complete stop before crossing any road. Out walkers are required for crowd situations, parades, fairs or on city or town streets.</li>
                                                <li className="mb-2">Wagons will have open sides, be equipped with running lights, reflectors, head lights and hydraulic brakes or other breaking system acceptable to AEA. Wagons will not be pulled by motorized vehicles.</li>
                                                <li className="mb-2">Wagon drivers be at least age 21 years old, have a minimum of two year wagon team experience or fifty driving hours in preceding twelve months.</li>
                                                <li className="mb-2">Wagons or sleighs with more than seven passengers must have one (1) qualified driver and one (1) qualified assistant. The driver will tend the horses while the assistant will be responsible for loading and unloading passengers. No smoking will be permitted on or near wagons.</li>
                                                <li className="mb-2">Slow moving vehicle sign on rear of carriage or wagon.</li>
                                                <li className="mb-2">Maintain a spare kit including halters, leads, and first aid kit for humans and horses.</li>
                                                <li className="mb-2">Passengers are not allowed to be seated in an unattended vehicle. The drivers should always the first and last out of the wagon or carriage.</li>
                                                <li className="mb-2">Do not allow people to stand in front of a horse hitched to a vehicle or in front of the vehicle's wheels or runners.</li>
                                                <li className="mb-2">Fasten your traces first and undo them last when hitching to and unhitching from a vehicle. Do not remove the bridle and reins from an equine while it is still hitched to the vehicle!</li>
                                                <li className="mb-2">Do not lead horse from ground while attached to vehicle.</li>
                                                <li className="mb-2">Do not use Running W</li>
                                            </ol>

                                            <h5 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '13px', margin: '16px 0 8px 0' }}>Trail Rides & Pack Trips</h5>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">All tack and equipment must be inspected on a daily basis and repaired or replaced as necessary.</li>
                                                <li className="mb-2">Every rider must read and sign a Release and Waiver of Liability agreement in the form prescribed by A.E.A.</li>
                                                <li className="mb-2">EVERY RIDER MUST BE OFFERED PROTECTIVE HEAD GEAR. If a rider refuses to use headgear an Acknowledgment of offer and refusal must be signed by the rider.</li>
                                                <li className="mb-2">All trail ride horses must be equipped with breast collars and children's saddles with full wrap bull-nosed Tapaderos. Saddles and tack must be well matched to the horse and rider. Split western reins must be tied.</li>
                                            </ol>
                                        </div>

                                        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '13px', marginTop: '20px' }}>4</div>
                                    </div>

                                    {/* PAGE 10 (Insurance Safety Requirements Page 5) */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-4">
                                            <h3 style={{ color: '#002B49', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>Celebration of Life</h3>
                                            <h4 style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '14px', margin: '6px 0' }}>INSURANCE SAFETY GROUP REQUIREMENTS</h4>
                                        </div>

                                        <div className="pdf-body" style={{ fontSize: '12px' }}>
                                            <ol start={5} style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">A system to determine rider experience and capability must be in place. Overweight and young riders must be carefully screened by the stable manager for ability to safely ride. A mounting block should be available.</li>
                                                <li className="mb-2"><strong>ALL TRAIL RIDES MUST BE GUIDED BY AN EXPERIENCED LEAD GUIDE / WRANGLER</strong> who is at least 18 years old. An optimum ratio of 6 riders to 1 guide should be maintained. It is strongly recommended that guides be provided with radios to communicate with the drag guide and the stable in case of emergency.</li>
                                                <li className="mb-2">Walking rides only, no running or racing of horses. Trotting is permissible, on good footing, when all riders are capable and in agreement. Any guest rider violating ride safety rules or good trail etiquette must dismount and walk to the stable.</li>
                                                <li className="mb-2">No riders under 6 years old.</li>
                                                <li className="mb-2">No riding double.</li>
                                                <li className="mb-2">No horseback riding while wearing backpacks or carrying bulky items.</li>
                                                <li className="mb-2">All riding instruction must be performed within an arena, on a docile, well trained lesson horse and the student must wear riding shoes and a hard hat.</li>
                                                <li className="mb-2">All horses must be properly cared for, regularly exercised and generally well suited for use with novice riders. Sick, lame, undernourished or ill tempered horses will not be used for riding instruction, schooling or on trail rides.</li>
                                                <li className="mb-2">Trails should be well maintained, regularly inspected and free of rubbish and surprises. Guides should avoid road traffic or congested areas.</li>
                                                <li className="mb-2">The guides must explain elementary riding safety, including how to control a runaway horse, and also check to ensure that the rider is physically and mentally fit to ride a horse.</li>
                                                <li className="mb-2">If a rider drops anything from a horse, the guide should pick it up.</li>
                                            </ol>
                                        </div>

                                        <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '13px', marginTop: '30px' }}>5</div>
                                    </div>

                                    {/* LINE FOR CHECKBOX AFTER ALL 10 PAGES OF POKER RIDE */}
                                    <div className="pdf-aea-guidelines-box" style={{ marginTop: '20px', marginBottom: '10px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0, width: '100%' }}>
                                            <input
                                                type="checkbox"
                                                id="pokerEndSafetyGuidelinesCheckbox"
                                                checked={pokerEndAgreed}
                                                onChange={(e) => {
                                                    setPokerEndAgreed(e.target.checked);
                                                    if (e.target.checked && validationError) setValidationError('');
                                                }}
                                                style={{ transform: 'scale(1.2)' }}
                                            />
                                            <span><strong>I have read and agree to the Safety Guidelines & Rules</strong> (‘Celebration of Life’ for the Poker Trail Ride)</span>
                                        </label>
                                    </div>
                                </>
                            ) : (
                                /* ========================================================================= */
                                /* WALK / RUN / RUCK & GENERAL ADMISSION FORMS (2 PAGES) */
                                /* ========================================================================= */
                                <>
                                    {/* PAGE 1: The Waiver */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center">
                                            <img src={partner2} alt="Florida Horse Park" className="pdf-logo" />
                                            <h3 className="pdf-title">FOR ALL PARTICIPANTS</h3>
                                            <h4 className="pdf-subtitle">FLORIDA AGRICULTURE & HORSE PARK AUTHORITY, INC.</h4>
                                            <h4 className="pdf-subtitle">COMPLETE RELEASE FROM LIABILITY IN CASE OF INJURY OR LOSS, WAIVER</h4>
                                            <h4 className="pdf-subtitle">INDEMNITY AGREEMENT</h4>
                                        </div>
                                        
                                        <div className="pdf-body mt-3">
                                            <p>I/we understand that horseback riding and related activities, such as eventing and jumping, are very dangerous, and involve the risk of serious injury and/or death, and/or property damage, including injury and/or death to horses, spectators, and others. Accordingly, I/we agree that any activity engaged in by me on the premises owned by the state of Florida, or related to horses, or horseback riding, if on the premises, is done at my own risk.</p>
                                            
                                            <p>Accordingly, I/we release and agree to hold harmless the state of Florida, the Florida Agriculture & Horse Park Authority along with its board of directors and employees, and any and all persons or entities who are guarantors or indemnitors of the above, all agents, employees, promoters, sponsors, other horse riders, horse owners, advertisers, sales persons, photographers, volunteers, (hereinafter called Releasees) from all liability for negligence or otherwise.</p>
                                            
                                            <p>I/we assume full responsibility for the risk of bodily injury, illness, communicable or infectious disease/virus, death of myself and/or my horse(s) and any property damage due to negligence of Releasees or otherwise while the premises owned by the state of Florida, the Florida Agriculture & Horse Park Authority along with its board of directors and employees or heavily engaged in horseback riding-related activities, and/or while training, riding, competing, officiating, observing, volunteering, teaching, boarding, working for, or for any purpose relating to horseback riding, eventing, or participating as rider or spectator in such activities.</p>
                                            
                                            <p>I/we agree not to sue any Releasees, and I/we release and agree to indemnity for the Releasees form and for all liability for the undersigned, his/her person, representatives, assignees, heirs, and demands therefore on account of injury to her person or property, or communicable disease, or death of undersigned whether caused by negligence of the Releasees or otherwise.</p>
                                            
                                            <p>I/we have read and voluntarily signed the release and waiver of liability and indemnity agreement and further agree that no oral representations, statements or inducements apart from the foregoing written agreements have been made nor shall be made except by written and signed addendum</p>
                                        </div>

                                        <div className="pdf-warning text-center mt-3">
                                            <strong>WARNING</strong>
                                            <p><em>Under Florida law, an equine activity sponsor or equine professional is not liable for an injury to or the death of, a participant in equine activities resulting from the inherent risks of equine activities.</em></p>
                                        </div>

                                        <div className="pdf-agreement text-center mt-3">
                                            <h4 style={{ fontSize: '13px', fontWeight: 'bold' }}>I HAVE READ THIS ENTIRE RELEASE AND AGREE TO ITS CONTENTS.</h4>
                                            <strong>MINOR CHILDREN COVERED BY THIS RELEASE</strong>
                                            <p className="pdf-small-text" style={{ fontSize: '11px', margin: '2px 0 10px 0' }}>If signing as the parent or legal guardian of minor child(ren), list each minor's full name below.</p>
                                        </div>

                                        <div className="pdf-form-fields">
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 1:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 2:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row', marginTop: '10px' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 3:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Minor 4:</label>
                                                    <input type="text" className="pdf-line-input" style={{ width: '100%' }} />
                                                </div>
                                            </div>
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row', marginTop: '14px' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Print Name/s:</label>
                                                    <input
                                                        type="text"
                                                        className="pdf-line-input"
                                                        style={{ width: '100%' }}
                                                        value={printNameOther}
                                                        onChange={(e) => { setPrintNameOther(e.target.value); if (validationError) setValidationError(''); }}
                                                    />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Date:</label>
                                                    <input
                                                        type="date"
                                                        className="pdf-line-input"
                                                        style={{ width: '100%' }}
                                                        value={dateOther}
                                                        onChange={(e) => { setDateOther(e.target.value); if (validationError) setValidationError(''); }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="pdf-form-row" style={{ display: 'flex', gap: '20px', flexDirection: 'row', marginTop: '14px' }}>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Sign Name:</label>
                                                    <input
                                                        type="text"
                                                        className="pdf-line-input"
                                                        placeholder={savedSignature ? `(Click to apply "${savedSignature}")` : "(Digital Signature)"}
                                                        value={sigPage1}
                                                        onChange={(e) => handleSigChange(setSigPage1, e.target.value)}
                                                        onClick={() => handleSigClick(sigPage1, setSigPage1)}
                                                        onFocus={() => handleSigClick(sigPage1, setSigPage1)}
                                                        style={{ width: '100%', fontFamily: '"Brush Script MT", cursive', fontSize: '19px', cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <div className="pdf-input-group" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                    <label style={{ marginRight: '8px', whiteSpace: 'nowrap', fontSize: '12px' }}>Email:</label>
                                                    <input
                                                        type="email"
                                                        className="pdf-line-input"
                                                        style={{ width: '100%' }}
                                                        value={emailOther}
                                                        onChange={(e) => { setEmailOther(e.target.value); if (validationError) setValidationError(''); }}
                                                    />
                                                </div>
                                            </div>
                                            <p className="pdf-small-text mt-1" style={{ fontSize: '11px', color: '#666' }}>(must be over 21 years of age)</p>
                                        </div>

                                        <div className="pdf-footer text-center mt-4" style={{ fontSize: '11px' }}>
                                            <p>Florida Horse Park<br/>11008 S Hwy 475, Ocala FL 34480<br/>(352) 307-6699</p>
                                        </div>
                                    </div>

                                    {/* PAGE 2: Rules and Regulations */}
                                    <div className="fake-pdf-page">
                                        <div className="pdf-header text-center mb-3">
                                            <img src={partner2} alt="Florida Horse Park" className="pdf-logo" />
                                            <h4 className="pdf-subtitle mt-2">RULES AND REGULATIONS</h4>
                                        </div>
                                        
                                        <div className="pdf-body" style={{ fontSize: '12.5px' }}>
                                            <ol style={{ paddingLeft: '20px', margin: 0 }}>
                                                <li className="mb-2">Animals of any kind brought to the facility must observe all regulations of the State of Florida Animal Health Division, and for equines must include a valid proof of a Negative Coggins Test (within prior 12 months).</li>
                                                <li className="mb-2">FHP requires all animals to be treated in a humane manner in accordance with state humane society guidelines.</li>
                                                <li className="mb-2">Dogs must always be on a leash and under control of the handler.</li>
                                                <li className="mb-2">All trash and manure must be disposed of in designated areas only.</li>
                                                <li className="mb-2">All motorized vehicles, including but not limited to cars, trucks, golf carts, motorcycles, mopeds, ATVs, etc shall be operated by a licensed driver.</li>
                                                <li className="mb-2">Grey water or sewage dumping is not permitted.</li>
                                                <li className="mb-2">No smoking in offices, stable pavilions, spectator pavilions, equine buildings, equipment, bleachers or arenas.</li>
                                                <li className="mb-2">All obstacles/jumps on the cross-country course are only to be used on scheduled schooling days.</li>
                                                <li className="mb-2">Arenas (including grass, fiber and covered) are not to be used unless scheduled in advance and approved.</li>
                                                <li className="mb-2">Please report any damage to the facilities by calling (352)307-6699 or email maintenance@flhorsepark.com</li>
                                                <li className="mb-2">The Florida Horse Park reserves the right to remove dangerous, disruptive or unlawful persons from the property.</li>
                                                <li className="mb-2">Absolutely NO LUNGING IN THE COVERED ARENA, FIBER ARENAS OR GRASS ARENAS. The small sand arenas northeast of the covered arena is designated for lunging.</li>
                                                <li className="mb-2">Open campfires are not permitted. Fires should be in contained fire rings.</li>
                                                <li className="mb-2">Please have fun and be safe.</li>
                                            </ol>
                                        </div>

                                        <div className="pdf-contact-grid mt-4" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                                            <div>
                                                <p className="mb-1" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Peterson Smith Equine Hospital</p>
                                                <p className="mb-0">4747 SW 60th Ave</p>
                                                <p className="mb-0">Ocala, FL, 34474</p>
                                                <p className="mb-0">(352) 237-6151</p>
                                            </div>
                                            <div>
                                                <p className="mb-1" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>AdventHealth Ocala</p>
                                                <p className="mb-0">1500 SW 1st avenue</p>
                                                <p className="mb-0">Ocala, FL, 34471</p>
                                                <p className="mb-0">(352) 351-7200</p>
                                            </div>
                                        </div>

                                        <div className="text-center mt-3" style={{ color: 'red', fontWeight: 'bold', fontSize: '13px' }}>
                                            IF AN EMERGENCY, PLEASE CALL 911
                                        </div>

                                        <div className="pdf-footer text-center mt-4" style={{ fontSize: '11px' }}>
                                            <p>Florida Horse Park<br/>11008 S Hwy 475, Ocala FL 34480<br/>(352) 307-6699</p>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            {validationError && (
                                <div className="pdf-validation-warning" style={{
                                    background: '#fee2e2',
                                    border: '1.5px solid #ef4444',
                                    color: '#991b1b',
                                    padding: '12px 18px',
                                    borderRadius: '6px',
                                    margin: '20px auto 10px auto',
                                    maxWidth: '720px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)',
                                    animation: 'shakeError 0.3s ease-in-out'
                                }}>
                                    <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '20px', color: '#dc2626', flexShrink: 0 }}></i>
                                    <span>{validationError}</span>
                                </div>
                            )}

                            <div className="step-actions text-center" style={{ padding: '20px 0 40px 0' }}>
                                <button type="button" className="btn-adventure" onClick={handleSaveAndContinue}>SAVE & CONTINUE</button>
                            </div>
                        </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="reg-step-3">
                        <h2>Select Tickets & Checkout</h2>
                        <form className="reg-form" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                            <div className="ticket-selection">
                                <div className="ticket-option">
                                    <div className="ticket-info">
                                        <h4>
                                            {entryType === 'poker_ride' && 'Poker Ride Ticket'}
                                            {entryType === 'walk_run_ruck' && 'Walk / Run / Ruck Ticket'}
                                            {entryType === 'general_admission' && 'General Admission Ticket'}
                                        </h4>
                                        <p>{entryType === 'poker_ride' ? '$45.00' : entryType === 'walk_run_ruck' ? '$35.00' : '$25.00'}</p>
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
                                <h3>Total: {entryType === 'poker_ride' ? '$45.00' : entryType === 'walk_run_ruck' ? '$35.00' : '$25.00'}</h3>
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
                        <p>Your receipt and entry tickets have been emailed to you, along with a copy of your signed waiver package.</p>
                        <button className="btn-adventure mt-4" onClick={onClose}>CLOSE</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationModal;
