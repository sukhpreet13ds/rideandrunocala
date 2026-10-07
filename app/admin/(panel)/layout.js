import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';

export default async function PanelLayout({ children }) {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  return (
    <div className="adm-shell">
      <Sidebar username={admin.username} />
      <main className="adm-main">{children}</main>
    </div>
  );
}
