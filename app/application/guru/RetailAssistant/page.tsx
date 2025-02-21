import React from 'react'
<<<<<<< HEAD
import ChatUI from '@/components/Chat'
 const page = () => {
   return (
          <div >
           <ChatUI endpoint="/api/v1/retail-product-recommendation-service"/> 
           {/* "/api/v1/Enterpise-AI-Search" */}
           {/* "/api/v1/retail-product-recommendation-service" */}
           {/* https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service */}
         
     </div>
   )
 }

export default page

=======
import ChatUI from '@/components/ChatAuth'

const page = () => {
  const apiKey: string = 'bn7yU45YxMa9XgHzn0fwH7DK21AYx5FFaBnznTUa';  // API Key
  const username: string = '79cfhcnho3riu4l96of3qejr92'; // Username
  const password: string = '1okid8repct5cak65mcv9ikruuer1jvgbk69or14q2d6nfnakk1g';
  const tokenendpoint: string = 'https://guru-pool.auth.eu-west-1.amazoncognito.com/oauth2/token?grant_type=client_credentials';

  return (
    <div>
      <ChatUI endpoint="/api/v1/productRecommendation" apiKey={apiKey} username={username} password={password} tokenendpoint={tokenendpoint} />
    </div>
  )
}

export default page
>>>>>>> 06bc886af343926caaf40170133b22bd6e812bec
