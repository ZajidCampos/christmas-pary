import React from 'react'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white">404</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Página no encontrada</p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">La ruta que buscas no existe o fue movida.</p>
        <div className="mt-6 flex justify-center">
          <a
            href="/"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  )
}
