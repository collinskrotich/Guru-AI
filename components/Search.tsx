import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Paperclip, Compass, SendHorizontal, Mic } from "lucide-react"

export default function AssistantUI() {
  return (
    <div className="max-w-2xl mx-auto py-40 space-y-20">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">
          <span className="text-blue-500">Hello,</span>        
        </h1>
        <p className="text-3xl text-gray-400 font-light">
          How can I help you today?
        </p>
      </div>
      
      <div className="grid grid-cols sm:grid-cols-2 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-4 flex flex-col items-start space-y-2">
            <p>Create an image of an intergalactic event</p>
            <Paperclip className="mt-auto" />
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardContent className="p-4 flex flex-col items-start space-y-2">
            <p>Suggest beaches to visit in a city, including details</p>
            <Compass className="mt-auto" />
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardContent className="p-4 flex flex-col items-start space-y-2">
            <p>Suggest beaches to visit in a city, including details</p>
            <Compass className="mt-auto" />
          </CardContent>
        </Card>
      </div>
      
      <div className="relative">
        <Input 
          placeholder="Enter a prompt here" 
          className="pr-20"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Button variant="ghost" size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-center text-gray-500">
        Enterprise AI Search may display inaccurate info, including about people, so double-check its responses. 
        <a href="#" className="underline">Safaricom Privacy Policy</a>
      </p>
      
      {/* <div className="fixed bottom-24 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="relative">
          <Input 
            placeholder="Enter a prompt here" 
            className="pr-20 w-full"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button variant="ghost" size="icon">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  )
}