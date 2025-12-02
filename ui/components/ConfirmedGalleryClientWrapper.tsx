"use client"

import React from 'react'
import ConfirmedGallery from './ConfirmedGallery'

type Props = {
  images: any[]
}

export default function ConfirmedGalleryClientWrapper({images}: Props){
  return <ConfirmedGallery images={images} />
}
