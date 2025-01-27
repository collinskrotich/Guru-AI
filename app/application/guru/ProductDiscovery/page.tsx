import React from 'react'
import ProductDiscovery from '@/components/ProductDiscovery'
 const page = () => {
   return (
          <div >
           <ProductDiscovery endpoint="/api/v1/CustomerService"/>
           {/* "/api/v1/Enterpise-AI-Search" */}
           {/* "/api/v1/retail-product-recommendation-service" */}
           {/* https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service */}
         
     </div>
   )
 }

export default page