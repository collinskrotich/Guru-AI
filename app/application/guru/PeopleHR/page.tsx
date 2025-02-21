import React from 'react'
<<<<<<< HEAD
import ChatUI from '@/components/Chat';
const page = () => {

  const endpoint = "/api/v1/Enterpise-AI-Search" ;
=======
import ChatUI from '@/components/Hr';
import Hr from '@/components/Hr';
const page = () => {

  
>>>>>>> 06bc886af343926caaf40170133b22bd6e812bec

  return (
   
         <div >
<<<<<<< HEAD
          <ChatUI endpoint={endpoint} /> 
=======
          <Hr endpoint="/api/v1/test-hr"/> 
>>>>>>> 06bc886af343926caaf40170133b22bd6e812bec
    </div>
  )
}

export default page