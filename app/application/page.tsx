"use client";
import React from 'react'
import AssistantUI from '@/components/Search'
import { SessionProvider } from 'next-auth/react'

const page = () => {
  return (
         <div >
          <SessionProvider>
            <AssistantUI/> 
          </SessionProvider>
    </div>
  )
}

export default page