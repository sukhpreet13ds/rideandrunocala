import 'animate.css';
import '../../styles/app.css';
import '../../styles/style.css';
import { SiteProvider } from '@/lib/content-context';
import { getOverrides } from '@/lib/content';
import { getSettings } from '@/lib/settings';
import ModalProvider from '@/components/ModalProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }) {
  const [{ content, images }, settings] = await Promise.all([getOverrides(), getSettings()]);
  return (
    <SiteProvider content={content} images={images} settings={settings}>
      <ModalProvider>
        <Navbar />
        {children}
        <Footer />
      </ModalProvider>
    </SiteProvider>
  );
}
