import { decodeState } from "./format";

export type LoadedState = { count: number; anchors: Uint16Array; flow: Uint16Array | null; bytes: number };

/**
 * Fetch a gzipped state file and inflate it with the browser's own
 * DecompressionStream (no inflate library in the bundle). `onBytes` reports
 * compressed bytes as they arrive, which drives the preloader's real progress.
 */
export async function loadStateBuffer(url: string, onBytes?: (n: number) => void): Promise<LoadedState> {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`state ${url}: HTTP ${res.status}`);
  let bytes = 0;
  const counted = res.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        bytes += chunk.byteLength;
        onBytes?.(chunk.byteLength);
        controller.enqueue(chunk);
      },
    })
  );
  const inflated = await new Response(counted.pipeThrough(new DecompressionStream("gzip") as unknown as ReadableWritablePair<Uint8Array, Uint8Array>)).arrayBuffer();
  return { ...decodeState(inflated), bytes };
}
