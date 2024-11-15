// "use client"
// import React, { useState } from 'react'
// import { Search, ChevronDown } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// interface Prompt {
//   id: string
//   title: string
//   description: string
//   department: string
//   category: string
//   tag: string
//   tagColor: string
// }

// const prompts: Prompt[] = [
//   {
//     id: '1',
//     title: 'Research documents for a blog post',
//     description: 'Identify and summarize key resources for a blog post.',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '2',
//     title: 'Explore time management techniques',
//     description: 'Discover time management techniques with description...',
//     department: 'Operations',
//     category: 'Productivity',
//     tag: 'All Teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '3',
//     title: 'Find teammates who worked on a feature',
//     description: 'Identify individuals who have worked on a feature.',
//     department: 'Engineering',
//     category: 'Collaboration',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '4',
//     title: 'Understand financial terminology',
//     description: 'Define and understand financial and company...',
//     department: 'Finance',
//     category: 'Training',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800'
//   }
// ]

// const departments = ['All Departments', 'Marketing', 'Engineering', 'Finance', 'Operations']
// const categories = ['All Categories', 'Content', 'Productivity', 'Collaboration', 'Training']

// export default function PromptLibrary() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
//   const [selectedCategory, setSelectedCategory] = useState('All Categories')

//   const filteredPrompts = prompts.filter(prompt => {
//     const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesDepartment = selectedDepartment === 'All Departments' || prompt.department === selectedDepartment
//     const matchesCategory = selectedCategory === 'All Categories' || prompt.category === selectedCategory
//     return matchesSearch && matchesDepartment && matchesCategory
//   })

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Prompt Library</h1>
//           <p className="text-xl text-gray-600 mb-6">
//             Create and discover prompts that unlock more powerful ways to use Chat.
//           </p>
//           <Button 
//             variant="outline" 
//             className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
//           >
//             Request a prompt
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 {selectedDepartment}
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-[200px]">
//               {departments.map(dept => (
//                 <DropdownMenuItem 
//                   key={dept}
//                   onClick={() => setSelectedDepartment(dept)}
//                 >
//                   {dept}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 {selectedCategory}
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-[200px]">
//               {categories.map(cat => (
//                 <DropdownMenuItem 
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                 >
//                   {cat}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search prompts"
//                 className="pl-10 w-full"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Prompt Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredPrompts.map(prompt => (
//             <div
//               key={prompt.id}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 {prompt.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {prompt.description}
//               </p>
//               <span className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}>
//                 {prompt.tag}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Show More Button */}
//         <div className="text-center mt-8">
//           <Button variant="outline">
//             Show more
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"
import React, { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Prompt {
  id: string
  title: string
  description: string
  department: string
  category: string
  tag: string
  tagColor: string
}

const initialPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Research documents for a blog post',
    description: 'Identify and summarize key resources for a blog post.',
    department: 'Marketing',
    category: 'Content',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: '2',
    title: 'Explore time management techniques',
    description: 'Discover time management techniques with description...',
    department: 'Operations',
    category: 'Productivity',
    tag: 'All Teams',
    tagColor: 'bg-gray-100 text-gray-800'
  },
  {
    id: '3',
    title: 'Find teammates who worked on a feature',
    description: 'Identify individuals who have worked on a feature.',
    department: 'Engineering',
    category: 'Collaboration',
    tag: 'Engineering',
    tagColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: '4',
    title: 'Understand financial terminology',
    description: 'Define and understand financial and company...',
    department: 'Finance',
    category: 'Training',
    tag: 'Finance',
    tagColor: 'bg-green-100 text-green-800'
  }
]

const additionalPrompts: Prompt[] = [
  {
    id: '5',
    title: 'Review security compliance',
    description: 'Based on security requirements, determine if...',
    department: 'Security',
    category: 'Compliance',
    tag: 'Security',
    tagColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: '6',
    title: 'Synthesize user testing observations',
    description: 'Analyze user feedback to identify and categorize key...',
    department: 'Design',
    category: 'Research',
    tag: 'Design',
    tagColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: '7',
    title: 'Find sales apps that mention competitor',
    description: 'Identify and summarize all open Salesforce...',
    department: 'Sales',
    category: 'Research',
    tag: 'Sales',
    tagColor: 'bg-green-100 text-green-800'
  },
  {
    id: '8',
    title: 'Compare contracts',
    description: 'Use a table to compare the difference between two...',
    department: 'Legal',
    category: 'Analysis',
    tag: 'Legal',
    tagColor: 'bg-orange-100 text-orange-800'
  },
  // Add more prompts as seen in the second image
]

const departments = ['All Departments', 'Marketing', 'Engineering', 'Finance', 'Operations', 'Security', 'Design', 'Sales', 'Legal']
const categories = ['All Categories', 'Content', 'Productivity', 'Collaboration', 'Training', 'Compliance', 'Research', 'Analysis']

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [showMore, setShowMore] = useState(false)

  const allPrompts = showMore ? [...initialPrompts, ...additionalPrompts] : initialPrompts

  const filteredPrompts = allPrompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === 'All Departments' || prompt.department === selectedDepartment
    const matchesCategory = selectedCategory === 'All Categories' || prompt.category === selectedCategory
    return matchesSearch && matchesDepartment && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Prompt Library</h1>
          <p className="text-xl text-gray-600 mb-6">
            Create and discover prompts that unlock more powerful ways to use Chat.
          </p>
          <Button 
            variant="outline" 
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Request a prompt
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {selectedDepartment}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {departments.map(dept => (
                <DropdownMenuItem 
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {selectedCategory}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              {categories.map(cat => (
                <DropdownMenuItem 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search prompts"
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPrompts.map(prompt => (
            <div
              key={prompt.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {prompt.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {prompt.description}
              </p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}>
                {prompt.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <Button 
            variant="outline"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show less' : 'Show more'}
          </Button>
        </div>
      </div>
    </div>
  )
}