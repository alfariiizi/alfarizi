import { promises as fs } from "fs";
import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { getPlaiceholder } from "plaiceholder";

type ImageProps = NextImageProps;

async function Image({ src, ...props }: ImageProps) {
  // [Static Import]
  if (typeof src !== "string") {
    return <NextImage src={src} {...props} />;
  }

  const isExternalImage = src.startsWith("http");

  // [External URL]
  if (isExternalImage) {
    const buffer = await fetch(src).then(async (res) => {
      return Buffer.from(await res.arrayBuffer());
    });
    const { base64 } = await getPlaiceholder(buffer);
    return (
      <NextImage src={src} placeholder="blur" blurDataURL={base64} {...props} />
    );
  }

  // [Public (Local assets)]
  const buffer = await fs.readFile(`${process.cwd()}/public${src}`);
  const { base64 } = await getPlaiceholder(buffer);
  return (
    <NextImage src={src} placeholder="blur" blurDataURL={base64} {...props} />
  );
}

export { Image, type ImageProps };
