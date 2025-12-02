"use client"

import React, { useEffect, useState } from 'react'
import { Check, Star } from 'lucide-react'

type ImageItem = {
  src?: string
  srcs?: string[]
  title: string
  description: string
}

export default function ConfirmedGallery({ images }: { images: ImageItem[] }) {
  const [slides, setSlides] = useState<string[] | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!slides) return
      if (e.key === 'Escape') setSlides(null)
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % slides.length)
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + slides.length) % slides.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides])

  function openCard(i: number) {
    const item = images[i]
    const s = item.srcs ?? (item.src ? [item.src] : [])
    if (s.length === 0) return
    setSlides(s)
    setIndex(0)
  }

  function closeModal() {
    setSlides(null)
    setIndex(0)
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div key={idx} className="group relative rounded-lg overflow-hidden border border-gray-800 bg-neutral-900">
            <button onClick={() => openCard(idx)} aria-label={`Abrir galería ${img.title}`} className="w-full text-left">
              <div className="relative">
                <img
                  src={(img.srcs && img.srcs[0]) ?? img.src}
                  alt={img.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-black/40 rounded-full p-2">
                  <svg className="w-4 h-4 text-cyan-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M4 7h3l2-2h6l2 2h3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7z" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="3" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

                <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">{img.title}</h3>
                  <span className="text-sm text-gray-400">Ver</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">{img.description}</p>

                {/* Small decorative icons for room cards (style only) */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 bg-black/40 px-2 py-1 rounded-md">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-300">Comodidades</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-black/40 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-gray-300">Top</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {slides && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/75" onClick={closeModal} />

          {/* Close button placed outside the card for a more natural position */}
          <button onClick={closeModal} aria-label="Cerrar" className="absolute top-6 right-6 z-50 p-2 bg-black/40 hover:bg-black/60 rounded-full">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative max-w-4xl w-full mx-auto bg-neutral-900 rounded shadow-2xl overflow-hidden border border-gray-800">

            {/* Left arrow */}
            <button
              onClick={() => setIndex(i => (i - 1 + slides.length) % slides.length)}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 rounded-full"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              onClick={() => setIndex(i => (i + 1) % slides.length)}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/60 rounded-full"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="bg-black flex items-center justify-center p-6">
              <img src={slides[index]} alt={`slide-${index}`} className="max-h-[75vh] w-auto object-contain transition-all duration-300" />
            </div>

            <div className="p-4 bg-neutral-900 flex flex-col items-center">
              <div className="flex gap-2 items-center">
                {slides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Ir a la imagen ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-transform ${i === index ? 'bg-cyan-400 scale-110' : 'bg-gray-600 hover:scale-105'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
