
import React from 'react'
// import { Card, CardContent, CardTitle, Button } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export default function GURUManager() {
  return (
    <div className="min-h-screen bg-white p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">GURU Manager</h1>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Pre-made by Safaricom</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <CardTitle>Sales Assistant</CardTitle>
                    <Button variant="icon">
                      <i className="icon-copy"></i>
                    </Button>
                  </div>
                  <p className="text-gray-600 mt-2">
                   Prep for meetings and access all the product knowledge, so you can close more deals.
                  </p>
                </CardContent>
              </Card>
              {/* Card 2 */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <CardTitle>Retail Assistant</CardTitle>
                    <Button variant="icon">
                      <i className="icon-copy"></i>
                    </Button>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Close deals faster, accurately and put customer first.
                  </p>
                </CardContent>
              </Card>
              {/* Card 3 */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <CardTitle>Customer Support</CardTitle>
                    <Button variant="icon">
                      <i className="icon-copy"></i>
                    </Button>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Engage customers with speed and confidence.
                  </p>
                </CardContent>
              </Card>
              {/* Card 4 */}
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <CardTitle>Customer Insights</CardTitle>
                    <Button variant="icon">
                      <i className="icon-copy"></i>
                    </Button>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Aggregate Intel from market and online for strategy and decision making.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Button variant="default" className="w-28">New GURU</Button>
        </div>

        {/* Sidebar - Check out GURUs */}
        {/* <div className="space-y-6">
          <Card>
            <CardContent>
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Check out GURUs</h2>
                <p className="text-gray-600">
                  GURUs are custom versions of GURUini that are tailored to give you specific types of responses. You'll find GURUs here, and you can start chatting now. To customize GURUs or create your own, upgrade to GURUini Advanced.
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                  <Button variant="default">Learn more</Button>
                  <Button variant="primary">Upgrade</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
