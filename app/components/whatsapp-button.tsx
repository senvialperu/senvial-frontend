'use client'
import image from '@/public/avatar.png'
import React from 'react'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

export default function WhatsappButton({ logoUrl }: any) {
    console.log('logoUrl', logoUrl.mediaItems.nodes[0].sourceUrl)
    return (
        <FloatingWhatsApp phoneNumber='+51900369609' accountName='' chatMessage='Hola, en que podemos ayudarte?' placeholder='escriba su mensaje' avatar={logoUrl.mediaItems.nodes[0].sourceUrl} statusMessage='Generalmente responde en una hora' />
    )
}