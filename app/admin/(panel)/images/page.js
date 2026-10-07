import images from '@/lib/image-list.json';
import { getOverrides } from '@/lib/content';
import ImageManager from '@/components/admin/ImageManager';

export default async function ImagesPage() {
  const { images: overrides } = await getOverrides();
  return (
    <>
      <h2>Images</h2>
      <p className="adm-sub">Replace any picture on the website. Upload a JPG, PNG, WebP or SVG (max 8 MB). Use “Revert” to restore the original.</p>
      <ImageManager images={images} overrides={overrides} />
    </>
  );
}
