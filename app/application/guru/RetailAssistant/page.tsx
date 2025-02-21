import React from 'react'
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
