// "use client"
// import React, { useState } from 'react'
// import { 
//   Menu, 
//   MoreHorizontal, 
//   Settings, 
//   HelpCircle, 
//   Edit2, 
//   Info, 
//   ChevronLeft, 
//   ChevronRight, 
//   Copy, 
//   Download, 
//   Play,
//   Code,
//   User,
//   Mail
// } from 'lucide-react'

// const Lab = () => {
//   const [messageText, setMessageText] = useState('')
//   const [description, setDescription] = useState('')
//   const [messages] = useState([
//     {
//       id: 1,
//       text: "Hi, I'm here to help you build agents. In a few sentences, how will your agent assist your users?",
//       type: 'received',
//       timestamp: 'August 30, 2024, 5:16 PM'
//     },
//     {
//       id: 2,
//       text: "I want a guru that gives weather forecasts for any global location, including relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, storm watch.",
//       type: 'sent'
//     },
//     {
//       id: 3,
//       text: "Great, your agent will provide weather forecasts for any global location, including details like relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, and storm watch.",
//       type: 'received'
//     },
//     {
//       id: 4,
//       text: "Do you have any instructions for how your agent should assist, for example a specific tone?",
//       type: 'received'
//     }
//   ])

//   return (
//     <div className="h-screen flex flex-col bg-[#F5F5F5]">
//       {/* Header */}
//       <header className="h-12 px-3 border-b bg-white flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-semibold">GURU Studio - Create no-code custom Gen AI agents.</span>
//           </div>
//         </div>
//       </header>

//       {/* Subheader */}
//       <div className="h-12 px-4 border-b bg-white flex items-center justify-between">
//         <div className="flex items-center gap-2">         
//         </div>
//       </div>

//       <div className="flex-1 flex">
//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           <div className="flex-1 p-6 overflow-auto">
//             <div className="max-w-3xl mx-auto">
//               {/* Description Section */}
//               <div className="mb-8">
//                 <h1 className="text-2xl font-semibold mb-4">Describe your Agent to create it</h1>
//                 <div className="flex gap-2 mb-4">
//                   <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm">
//                     Helpdesk
//                   </button>
//                   <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm">
//                     Expense tracking
//                   </button>
//                   <button className="px-3 py-1.5 rounded-full border border-[#0078D4] text-[#0078D4] text-sm">
//                     HR and benefits
//                   </button>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-sm p-4">
//                   <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Use everyday words to describe what your agent should do"
//                     className="w-full min-h-[100px] resize-none border-0 focus:ring-0"
//                   />
//                 </div>
//               </div>

//               {/* Chat Messages */}
//               <div className="space-y-4">
//                 {messages.map((message, index) => (
//                   <div 
//                     key={message.id}
//                     className={`bg-white rounded-lg shadow-sm p-4 ${
//                       message.type === 'sent' ? 'bg-blue-50' : 'bg-white'
//                     }`}
//                   >
//                     {index === 0 && (
//                       <div className="text-xs text-gray-500 mb-1">
//                         {message.timestamp}
//                       </div>
//                     )}
//                     <p className="text-gray-700">{message.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Message Input */}
//           <div className="border-t bg-white p-4">
//             <div className="max-w-3xl mx-auto relative">
//               <textarea
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//                 placeholder="Type your message"
//                 className="w-full pl-4 pr-12 py-3 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[42px]"
//                 rows={1}
//               />
//               <div className="absolute right-3 bottom-3 flex items-center gap-2">
//                 <span className="text-xs text-gray-500">{messageText.length}/2000</span>
//                 <button 
//                   className="text-blue-600 hover:bg-gray-100 p-1 rounded-sm disabled:opacity-50"
//                   disabled={!messageText.length}
//                 >
//                   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
//                     <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="w-[320px] border-l bg-white p-6">
//           <div className="mb-6">
//   <div className="flex items-center justify-between mb-2">
//     <span className="text-sm font-medium">Select Tools</span>
//   </div>
//   <div className="space-y-2">
//     <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//       <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//         <Code className="w-4 h-4 text-orange-600" />
//       </div>
//       <span className="text-sm">Code Search</span>
//     </div>
//     <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//       <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//         <User className="w-4 h-4 text-blue-600" />
//       </div>
//       <span className="text-sm">Expert Search</span>
//     </div>
//     <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//       <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//         <HelpCircle className="w-4 h-4 text-blue-600" />
//       </div>
//       <span className="text-sm">Create Jira</span>
//     </div>
//     <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
//       <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
//         <Mail className="w-4 h-4 text-red-600" />
//       </div>
//       <span className="text-sm">Create email</span>
//     </div>
//   </div>
// </div>

//           {/* Configuration Sections */}
//           <div className="space-y-6">
//             {/* Name */}

//             {/* Test Agents */}
//             <div>
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm font-medium">Test Agents</span>
//               </div>
//               <div className="p-3 bg-[#F9F9F9] rounded-md">
//                 <p className="text-sm text-gray-600">
//                   Provides weather forecasts for any global location, including details like relative humidity, chance of precipitation, amount of precipitation, low and high daily temperature, barometric pressure, and storm watch.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="border-t bg-white px-4 py-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//             <span className="text-sm">Version 2 of 2</span>
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md">
//               <Copy className="w-4 h-4" />
//               Upload
//             </button>
//             <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md">
//               <Download className="w-4 h-4" />
//               Download
//             </button>
//             <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md">
//               <Play className="w-4 h-4" />
//               Submit Agent
//             </button>
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
  ChevronRight,
  ChevronDown,
  Code, 
  User,
  HelpCircle,
  Mail,
  MessageCircle,
  Slack,
  Blocks,
  Diamond,
  X,
  FileText,
  Github
} from 'lucide-react'

const Lab = () => {
  const [activeSection, setActiveSection] = useState('publish') // Set publish as default open
  const [basicInfo, setBasicInfo] = useState({
    name: 'Engineering Agent',
    description: 'Helps debug code errors and onboard to our systems faster'
  })

  const sections = [
    { id: 'basic', title: 'Basic info' },
    { id: 'knowledge', title: 'Knowledge' },
    { id: 'instruction', title: 'Instruction' },
    { id: 'actions', title: 'Actions' },
    { id: 'triggering', title: 'Triggering' },
    { id: 'publish', title: 'Publish' }
  ]

  const renderSectionContent = (sectionId) => {
    switch(sectionId) {
        case 'basic':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                value={basicInfo.name}
                onChange={e => setBasicInfo({...basicInfo, name: e.target.value})}
                className="flex-1 p-2 border rounded-md"
                placeholder="Engineering Agent"
              />
            </div>
            <textarea
              value={basicInfo.description}
              onChange={e => setBasicInfo({...basicInfo, description: e.target.value})}
              className="w-full p-3 border rounded-md min-h-[100px]"
              placeholder="Helps debug code errors and onboard to our systems faster"
            />
          </div>
        )

      case 'knowledge':
        return (
          <div className="mt-4 flex items-center gap-3 justify-center">
            <Diamond className="w-6 h-6 text-blue-500" />
            <div className="h-px w-16 bg-gray-200" />
            <X className="w-6 h-6 text-gray-400" />
            <div className="h-px w-16 bg-gray-200" />
            <FileText className="w-6 h-6 text-green-500" />
            <div className="h-px w-16 bg-gray-200" />
            <Code className="w-6 h-6 text-blue-500" />
            <div className="h-px w-16 bg-gray-200" />
            <Mail className="w-6 h-6 text-gray-400" />
            <div className="h-px w-16 bg-gray-200" />
            <Github className="w-6 h-6 text-gray-600" />
          </div>
        )

      case 'instruction':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Follow the user's requirements carefully & to the letter.</p>
            <p className="text-gray-600 mt-2">When asked to write code, follow these instructions:</p>
            <p className="text-gray-600 mt-1">1. Directly write code and skip any guidance.</p>
          </div>
        )

      case 'actions':
        return (
          <div className="flex items-center gap-6 justify-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm">Code Search</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm">Expert Search</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm">Create Jira</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm">Create email</span>
            </div>
          </div>
        )

      case 'triggering':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">
              Auto-trigger this app when a user asks a question about the company's codebase, or questions relating to engineering practices and software development lifecycle.
            </p>
          </div>
        )


      case 'publish':
        return (
          <div>
            <div className="flex items-center gap-8 justify-center py-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Chat</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
                  <Slack className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Slack</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
                  <Blocks className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-600">API</span>
              </div>
            </div>
            
            {/* Build App Button inside Publish section */}
            <div className="flex justify-center mt-8">
              <button 
                className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Build App
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      {sections.map(section => (
        <div 
          key={section.id}
          className={`bg-white rounded-lg border shadow-sm ${
            activeSection === section.id ? 'p-6' : 'p-4'
          }`}
        >
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
          >
            <span className="text-gray-700 font-medium">{section.title}</span>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
              activeSection === section.id ? 'rotate-90' : ''
            }`} />
          </div>

          {activeSection === section.id && (
            <div className="mt-4">
              {renderSectionContent(section.id)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Lab









// import React, { useState } from 'react'
// import { 
//   ChevronRight,
//   Code, 
//   User,
//   HelpCircle,
//   Mail,
//   MessageCircle,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github
// } from 'lucide-react'

// const Preview = () => {
//   const [activeSection, setActiveSection] = useState(null)
  
//   const sections = [
//     { id: 'basic', title: 'Basic info' },
//     { id: 'knowledge', title: 'Knowledge' },
//     { id: 'instruction', title: 'Instruction' },
//     { id: 'actions', title: 'Actions' },
//     { id: 'triggering', title: 'Triggering' },
//     { id: 'publish', title: 'Publish' }
//   ]

//   const renderSectionContent = (sectionId) => {
//     switch(sectionId) {
//       case 'knowledge':
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <Diamond className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <X className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <FileText className="w-6 h-6 text-green-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Code className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Mail className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Github className="w-6 h-6 text-gray-600" />
//           </div>
//         )

//       case 'instruction':
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">Follow the user's requirements carefully & to the letter.</p>
//             <p className="text-gray-600 mt-2">When asked to write code, follow these instructions:</p>
//             <p className="text-gray-600 mt-1">1. Directly write code and skip any guidance.</p>
//           </div>
//         )

//       case 'actions':
//         return (
//           <div className="mt-4 flex items-center gap-6 justify-center">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">Code Search</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <User className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">Expert Search</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <HelpCircle className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">Create Jira</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
//                 <Mail className="w-4 h-4 text-red-600" />
//               </div>
//               <span className="text-sm">Create email</span>
//             </div>
//           </div>
//         )

//       case 'triggering':
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Auto-trigger this app when a user asks a question about the company's codebase, or questions relating to engineering practices and software development lifecycle.
//             </p>
//           </div>
//         )

//       case 'publish':
//         return (
//           <div className="mt-4">
//             <div className="flex items-center gap-8 justify-center py-4">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
//                   <MessageCircle className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Chat</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
//                   <Slack className="w-6 h-6 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Slack</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
//                   <Code className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">API</span>
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-4 bg-gray-50">
//       {sections.map(section => (
//         <div 
//           key={section.id}
//           className={`bg-white rounded-lg border shadow-sm ${
//             activeSection === section.id ? 'p-6' : 'p-4'
//           }`}
//         >
//           <div 
//             className="flex items-center justify-between cursor-pointer"
//             onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
//           >
//             <span className="text-gray-700 font-medium">{section.title}</span>
//             <ChevronRight 
//               className={`w-5 h-5 text-gray-400 transition-transform ${
//                 activeSection === section.id ? 'rotate-90' : ''
//               }`} 
//             />
//           </div>

//           {activeSection === section.id && renderSectionContent(section.id)}
//         </div>
//       ))}

//       {/* Build App Button */}
//       <div className="flex justify-center mt-8">
//         <button 
//           className="px-8 py-2.5 bg-[#4844DE] text-white rounded-lg font-medium text-sm"
//         >
//           Build App
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Preview







// import React, { useState } from 'react'
// import { 
//   ChevronRight,
//   ChevronDown,
//   Code, 
//   User,
//   HelpCircle,
//   Mail,
//   MessageCircle,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github
// } from 'lucide-react'

// const Preview = () => {
//   const [activeSection, setActiveSection] = useState('basic') // Set basic as default open
  
//   const sections = [
//     { id: 'basic', title: 'Basic info' },
//     { id: 'knowledge', title: 'Knowledge' },
//     { id: 'instruction', title: 'Instruction' },
//     { id: 'actions', title: 'Actions' },
//     { id: 'triggering', title: 'Triggering' },
//     { id: 'publish', title: 'Publish' }
//   ]

//   const renderSectionContent = (sectionId) => {
//     switch(sectionId) {
//       case 'basic':
//         return (
//           <div className="mt-4 space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-indigo-600" />
//               </div>
//               <input
//                 type="text"
//                 defaultValue="Engineering Agent"
//                 className="flex-1 p-2 border rounded-md text-gray-700"
//               />
//             </div>
//             <div>
//               <textarea
//                 defaultValue="Helps debug code errors and onboard to our systems faster"
//                 className="w-full p-3 border rounded-md min-h-[100px] text-gray-600"
//               />
//             </div>
//           </div>
//         )

//       // ... rest of the cases remain exactly the same ...

//       case 'knowledge':
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <Diamond className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <X className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <FileText className="w-6 h-6 text-green-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Code className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Mail className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Github className="w-6 h-6 text-gray-600" />
//           </div>
//         )

//       case 'instruction':
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">Follow the user's requirements carefully & to the letter.</p>
//             <p className="text-gray-600 mt-2">When asked to write code, follow these instructions:</p>
//             <p className="text-gray-600 mt-1">1. Directly write code and skip any guidance.</p>
//           </div>
//         )

//       case 'actions':
//         return (
//           <div className="mt-4 flex items-center gap-6 justify-center">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">Code Search</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <User className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">Expert Search</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <HelpCircle className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">Create Jira</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
//                 <Mail className="w-4 h-4 text-red-600" />
//               </div>
//               <span className="text-sm">Create email</span>
//             </div>
//           </div>
//         )

//       case 'triggering':
//         return (
//           <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Auto-trigger this app when a user asks a question about the company's codebase, or questions relating to engineering practices and software development lifecycle.
//             </p>
//           </div>
//         )

//       case 'publish':
//         return (
//           <div className="mt-4">
//             <div className="flex items-center gap-8 justify-center py-4">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
//                   <MessageCircle className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Chat</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
//                   <Slack className="w-6 h-6 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Slack</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
//                   <Code className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">API</span>
//               </div>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-4 bg-gray-50">
//       {sections.map(section => (
//         <div 
//           key={section.id}
//           className={`bg-white rounded-lg border shadow-sm ${
//             activeSection === section.id ? 'p-6' : 'p-4'
//           }`}
//         >
//           <div 
//             className="flex items-center justify-between cursor-pointer"
//             onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
//           >
//             <span className="text-gray-700 font-medium">{section.title}</span>
//             {activeSection === section.id ? (
//               <ChevronDown className="w-5 h-5 text-gray-400" />
//             ) : (
//               <ChevronRight className="w-5 h-5 text-gray-400" />
//             )}
//           </div>

//           {activeSection === section.id && renderSectionContent(section.id)}
//         </div>
//       ))}

//       {/* Build App Button */}
//       <div className="flex justify-center mt-8">
//         <button 
//           className="px-8 py-2.5 bg-[#4844DE] text-white rounded-lg font-medium text-sm"
//         >
//           Build App
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Preview