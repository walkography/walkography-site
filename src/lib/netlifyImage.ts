// src/lib/netlifyImage.ts
//
// Helper per costruire gli URL del Netlify Image CDN.
// Le immagini vengono trasformate al volo, al momento della richiesta:
// il file originale (anche da 5 MB) resta intatto nel repo, ma ai
// visitatori arriva solo la versione ridimensionata e in WebP/AVIF.
// Funziona per le immagini gia caricate e per quelle future del CMS.

export type ImageFormat = "avif" | "webp" | "jpg" | "png" | "gif";
export type ImageFit = "cover" | "contain" | "fill";

export interface NetlifyImageOptions {
  width?: number;
  height?: number;
  fit?: ImageFit;
  format?: ImageFormat;
  quality?: number;
}

/** Costruisce un singolo URL trasformato, es:
 *  /.netlify/images?url=/uploads/foto.jpg&w=524&fm=webp&q=75
 */
export function netlifyImage(src: string, opts: NetlifyImageOptions = {}): string {
  const params = new URLSearchParams({ url: src });
  if (opts.width) params.set("w", String(Math.round(opts.width)));
  if (opts.height) params.set("h", String(Math.round(opts.height)));
  if (opts.fit) params.set("fit", opts.fit);
  params.set("fm", opts.format ?? "webp");
  params.set("q", String(opts.quality ?? 75));
  return `/.netlify/images?${params.toString()}`;
}

/** Costruisce un srcset a piu larghezze (per il retina e i vari schermi),
 *  mantenendo la proporzione se viene passata anche un'altezza.
 */
export function netlifySrcset(
  src: string,
  widths: number[],
  opts: NetlifyImageOptions = {},
): string {
  return widths
    .map((w) => {
      const height =
        opts.width && opts.height
          ? Math.round((opts.height / opts.width) * w)
          : undefined;
      return `${netlifyImage(src, { ...opts, width: w, height })} ${w}w`;
    })
    .join(", ");
}