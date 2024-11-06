// import React from 'react'

// const Lab = () => {
//   return (
//     <div>lab</div>
//   )
// }

// export default Lab



// import React, { useState } from 'react'
// import { Menu, MoreHorizontal, Settings, HelpCircle, Edit2, Info } from 'lucide-react'

// const Lab = () => {
//   const [messageText, setMessageText] = useState('')
//   const [description, setDescription] = useState('')

//   // Chat messages data
//   const chatMessages = [
//     {
//       id: 1,
//       text: "Hi, I'm here to help you build a copilot. In a few sentences, how will your copilot assist your users?",
//       type: "received"
//     },
//     {
//       id: 2,
//       text: "I want a copilot that gives weather forecasts for any global location, including relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, storm watch.",
//       type: "sent"
//     },
//     {
//       id: 3,
//       text: "Great, your copilot will provide weather forecasts for any global location, including details like relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, and storm watch.",
//       type: "received"
//     },
//     {
//       id: 4,
//       text: "Do you have any instructions for how your copilot should assist, for example a specific tone?",
//       type: "received"
//     }
//   ]

//   return (
//     <div className="h-screen flex flex-col bg-[#F5F5F5]">
//       {/* Header */}
//       <header className="h-12 px-3 border-b bg-white flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <button className="hover:bg-gray-100 p-1 rounded-sm">
//             <Menu className="w-5 h-5 text-gray-700" />
//           </button>
//           <div className="flex items-center gap-2">
//             <img src="/api/placeholder/20/20" alt="Copilot" className="w-5 h-5" />
//             <span className="text-sm font-semibold"> Studio</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="flex items-center">
//             <span className="text-sm text-gray-600">Environment:</span>
//             <span className="text-sm ml-1">Build 24 PPE Bug Bash</span>
//           </div>
//           <Settings className="w-5 h-5 text-gray-600" />
//           <HelpCircle className="w-5 h-5 text-gray-600" />
//         </div>
//       </header>

//       {/* Secondary Navigation */}
//       <div className="h-12 px-4 border-b bg-white flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-7 h-7 bg-[#E5F3FF] rounded-md flex items-center justify-center">
//             <img src="/api/placeholder/16/16" alt="Weather" className="w-4 h-4" />
//           </div>
//           <span className="text-[15px]">Agent Name _</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="px-4 py-1.5 bg-[#0078D4] text-white rounded-sm text-sm hover:bg-[#106EBE]">
//             Create
//           </button>
//           <button className="p-1 hover:bg-gray-100 rounded-sm">
//             <MoreHorizontal className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex">
//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col">
//           <div className="flex-1 p-6 overflow-auto">
//             <div className="max-w-3xl mx-auto">
//               {/* Description Section */}
//               <div className="mb-8">
//                 <h1 className="text-2xl font-semibold text-gray-900 mb-4">
//                   Describe your copilot to create it
//                 </h1>
//                 <div className="flex gap-2 mb-4">
//                   <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm hover:bg-blue-50">
//                     Helpdesk
//                   </button>
//                   <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm hover:bg-blue-50">
//                     Expense tracking
//                   </button>
//                   <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm hover:bg-blue-50">
//                     HR and benefits
//                   </button>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-sm p-4">
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Use everyday words to describe what your copilot should do"
//                     className="w-full min-h-[100px] resize-none border-0 focus:ring-0 text-gray-700 placeholder-gray-500 text-sm"
//                   />
//                   <div className="flex justify-end">
//                     <button className="text-[#0078D4] hover:bg-blue-50 p-2 rounded-sm">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
//                         <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//                 <div className="mt-2 text-xs text-gray-500">
//                   This AI-powered feature is currently in preview. See{' '}
//                   <a href="#" className="text-[#0078D4] hover:underline">terms</a>
//                   {' '}and{' '}
//                   <a href="#" className="text-[#0078D4] hover:underline">supplemental terms</a>
//                 </div>
//               </div>

//               {/* Chat Messages */}
//               <div className="space-y-4">
//                 {chatMessages.map((message) => (
//                   <div 
//                     key={message.id} 
//                     className="bg-white rounded-lg shadow-sm p-4"
//                   >
//                     <p className="text-gray-700">{message.text}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Message Input */}
//               <div className="relative mt-4">
//                 <textarea
//                   value={messageText}
//                   onChange={(e) => setMessageText(e.target.value)}
//                   placeholder="Type your message"
//                   className="w-full pl-4 pr-12 py-3 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[42px]"
//                   rows={1}
//                 />
//                 <div className="absolute right-3 bottom-2 flex items-center gap-2">
//                   <span className="text-xs text-gray-400">{messageText.length}/2000</span>
//                   <button 
//                     className="text-blue-600 hover:bg-gray-100 p-1 rounded-sm disabled:opacity-50"
//                     disabled={!messageText.length}
//                   >
//                     <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
//                       <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="w-[320px] border-l bg-white">
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <span className="text-sm font-medium text-gray-900">Your copilot</span>
//            
//             </div>

//             {/* Name Section */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium">Name</span>
//                   <Info className="w-4 h-4 text-gray-400" />
//                 </div>
//                 <button className="hover:bg-gray-100 p-1 rounded-sm">
//                   <Edit2 className="w-4 h-4 text-gray-400" />
//                 </button>
//               </div>
//               <div className="flex items-center gap-2 p-3 bg-[#F9F9F9] rounded-md">
//                 <div className="w-7 h-7 bg-[#E5F3FF] rounded-md flex items-center justify-center">
//                   <img src="/api/placeholder/16/16" alt="Weather" className="w-4 h-4" />
//                 </div>
//                 <span className="text-sm">Global Weather Forecaster</span>
//               </div>
//             </div>

//             {/* Description Section */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium">Description</span>
//                   <Info className="w-4 h-4 text-gray-400" />
//                 </div>
//                 <button className="hover:bg-gray-100 p-1 rounded-sm">
//                   <Edit2 className="w-4 h-4 text-gray-400" />
//                 </button>
//               </div>
//               <div className="p-3 bg-[#F9F9F9] rounded-md">
//                 <p className="text-sm text-gray-600">
//                   Provides weather forecasts for any global location, including details like relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, and storm watch.
//                 </p>
//               </div>
//             </div>

//             {/* Instructions Section */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium">Instructions</span>
//                   <Info className="w-4 h-4 text-gray-400" />
//                 </div>
//                 <button className="hover:bg-gray-100 p-1 rounded-sm">
//                   <Edit2 className="w-4 h-4 text-gray-400" />
//                 </button>
//               </div>
//               <div className="p-3 bg-[#F9F9F9] rounded-md">
//                 <p className="text-sm text-gray-600">
//                   Your name is Global Weather Forecaster. You provide weather forecasts for any global location, including details like relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, and storm watch.
//                 </p>
//               </div>
//             </div>

//             {/* Knowledge Section */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-medium">Knowledge</span>
//                   <Info className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//               <button className="w-full flex items-center gap-2 justify-center px-4 py-2 border rounded-sm hover:bg-gray-50 text-sm">
//                 <span className="text-[#0078D4] text-lg leading-none">+</span>
//                 <span className="text-gray-700">Add knowledge</span>
//               </button>
//               <p className="mt-2 text-xs text-gray-500">Add data, files, and other resources that your copilot will use to learn. These sources form the basis for your copilot's responses.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Lab



"use client"
import React, { useState } from 'react'
import { 
  Menu, 
  MoreHorizontal, 
  Settings, 
  HelpCircle, 
  Edit2, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Download, 
  Play
} from 'lucide-react'

const Lab = () => {
  const [messageText, setMessageText] = useState('')
  const [description, setDescription] = useState('')
  const [messages] = useState([
    {
      id: 1,
      text: "Hi, I'm here to help you build a copilot. In a few sentences, how will your copilot assist your users?",
      type: 'received',
      timestamp: 'August 30, 2024, 5:16 PM'
    },
    {
      id: 2,
      text: "I want a copilot that gives weather forecasts for any global location, including relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, storm watch.",
      type: 'sent'
    },
    {
      id: 3,
      text: "Great, your copilot will provide weather forecasts for any global location, including details like relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, and storm watch.",
      type: 'received'
    },
    {
      id: 4,
      text: "Do you have any instructions for how your copilot should assist, for example a specific tone?",
      type: 'received'
    }
  ])

  return (
    <div className="h-screen flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <header className="h-12 px-3 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 text-gray-700" />
          <div className="flex items-center gap-2">
            <img src="/api/placeholder/20/20" alt="Copilot" className="w-5 h-5" />
            <span className="text-sm font-semibold">GURU Studio</span>
          </div>
        </div>
      </header>

      {/* Subheader */}
      <div className="h-12 px-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#E5F3FF] rounded-md flex items-center justify-center">
            <img src="/api/placeholder/16/16" alt="Weather" className="w-4 h-4" />
          </div>
          
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 bg-[#0078D4] text-white text-sm rounded-sm">
            Create
          </button>
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-3xl mx-auto">
              {/* Description Section */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold mb-4">Describe your copilot to create it</h1>
                <div className="flex gap-2 mb-4">
                  <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm">
                    Helpdesk
                  </button>
                  <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm">
                    Expense tracking
                  </button>
                  <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm">
                    HR and benefits
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Use everyday words to describe what your copilot should do"
                    className="w-full min-h-[100px] resize-none border-0 focus:ring-0"
                  />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={message.id}
                    className={`bg-white rounded-lg shadow-sm p-4 ${
                      message.type === 'sent' ? 'bg-blue-50' : 'bg-white'
                    }`}
                  >
                    {index === 0 && (
                      <div className="text-xs text-gray-500 mb-1">
                        {message.timestamp}
                      </div>
                    )}
                    <p className="text-gray-700">{message.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t bg-white p-4">
            <div className="max-w-3xl mx-auto relative">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message"
                className="w-full pl-4 pr-12 py-3 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[42px]"
                rows={1}
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <span className="text-xs text-gray-500">{messageText.length}/2000</span>
                <button 
                  className="text-blue-600 hover:bg-gray-100 p-1 rounded-sm disabled:opacity-50"
                  disabled={!messageText.length}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[320px] border-l bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium">Your copilot</span>
            <div className="flex items-center gap-1 text-sm">
              <span>Language: English (en-US)</span>
            </div>
          </div>

          {/* Configuration Sections */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">Name</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <Edit2 className="w-4 h-4 text-gray-400" />
              </div>
              <div className="p-3 bg-[#F9F9F9] rounded-md flex items-center gap-2">
                <div className="w-7 h-7 bg-[#E5F3FF] rounded-md flex items-center justify-center">
                  <img src="/api/placeholder/16/16" alt="Weather" className="w-4 h-4" />
                </div>
                <span className="text-sm">Select Tools</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Description</span>
                <Edit2 className="w-4 h-4 text-gray-400" />
              </div>
              <div className="p-3 bg-[#F9F9F9] rounded-md">
                <p className="text-sm text-gray-600">
                  Provides weather forecasts for any global location, including details like relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, and storm watch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
            <span className="text-sm">Version 2 of 2</span>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md">
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md">
              <Play className="w-4 h-4" />
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lab