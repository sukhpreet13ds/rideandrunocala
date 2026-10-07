import { getSettings } from '@/lib/settings';
import SettingsForm from '@/components/admin/SettingsForm';

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <>
      <h2>Prices &amp; settings</h2>
      <p className="adm-sub">Ticket prices and donation amounts are enforced on the server at checkout.</p>
      <SettingsForm initial={settings} />
    </>
  );
}
