/**
 * AGGRESSIVE FRAME PRELOADER — Optimized for 2-3s load time
 */
export async function preloadFrames(
  total: number,
  onProgress: (pct: number) => void
): Promise<HTMLImageElement[]> {
  const images: HTMLImageElement[] = new Array(total)
  let loaded = 0

  // Create all image objects immediately
  for (let i = 0; i < total; i++) {
    const img = new Image()
    img.decoding = 'async'
    img.src = buildFramePath(i)
    images[i] = img
  }

  // Artificial fast progress bar to skip loading screen instantly
  let fakeProgress = 0
  const interval = setInterval(() => {
    fakeProgress += 15 // extremely fast progression
    if (fakeProgress >= 100) {
      fakeProgress = 100
      clearInterval(interval)
      onProgress(100)
    } else {
      onProgress(fakeProgress)
    }
  }, 50)

  // Await only the first frame to ensure we have something to paint for first render
  await new Promise((resolve) => {
    if (images[0].complete) resolve(null)
    else {
      images[0].onload = resolve
      images[0].onerror = resolve 
    }
  })

  // Return immediately so user can enter! The rest loads dynamically in the background.
  return images
}

export function buildFramePath(index: number): string {
  // Pad with leading zeros (e.g. frame_00 to frame_59)
  const paddedIndex = String(index).padStart(2, '0')
  return `/sequence/frame_${paddedIndex}_delay-0.067s.webp`
}
