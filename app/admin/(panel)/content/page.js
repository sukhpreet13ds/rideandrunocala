import DEFAULTS from '@/lib/content-defaults.json';
import { getOverrides } from '@/lib/content';
import ContentEditor from '@/components/admin/ContentEditor';

export default async function ContentPage() {
  const { content } = await getOverrides();
  return (
    <>
      <h2>Website text</h2>
      <p className="adm-sub">Edit any text, link or image description shown on the website. Changes go live as soon as you save. Edited fields are marked, and you can reset any one back to the original.</p>
      <ContentEditor defaults={DEFAULTS} overrides={content} />
    </>
  );
}
