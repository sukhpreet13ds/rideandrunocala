'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import RegistrationModal from './RegistrationModal';
import DonateModal from './DonateModal';
import { T, useSite } from '@/lib/content-context';

const Ctx = createContext({ openRegistration() {}, openDonate() {} });
export const useModals = () => useContext(Ctx);

export default function ModalProvider({ children }) {
    const { settings } = useSite();
    const [regOpen, setRegOpen] = useState(false);
    const [donateOpen, setDonateOpen] = useState(false);
    const [showNotice, setShowNotice] = useState(false);

    const openRegistration = useCallback(() => setRegOpen(true), []);
    const openDonate = useCallback(() => setDonateOpen(true), []);

    useEffect(() => {
        if (!settings.notice.enabled) return;
        const t = setTimeout(() => setShowNotice(true), (settings.notice.delaySeconds || 3.5) * 1000);
        return () => clearTimeout(t);
    }, [settings.notice.enabled, settings.notice.delaySeconds]);

    return (
        <Ctx.Provider value={{ openRegistration, openDonate }}>
            {children}
            <RegistrationModal isOpen={regOpen} onClose={() => setRegOpen(false)} />
            <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
            {showNotice && (
                <div className="site-notice-overlay" onClick={() => setShowNotice(false)}>
                    <div className="site-notice" onClick={(e) => e.stopPropagation()}>
                        <button className="site-notice-close" onClick={() => setShowNotice(false)} aria-label="Close">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <p><T id="notice.text" /></p>
                    </div>
                </div>
            )}
        </Ctx.Provider>
    );
}
