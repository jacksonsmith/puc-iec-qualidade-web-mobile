import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export function compareImages(img1: Buffer, img2: Buffer): number {
  const a = PNG.sync.read(img1);
  const b = PNG.sync.read(img2);
  const diff = new PNG({ width: a.width, height: a.height });
  return pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
}
