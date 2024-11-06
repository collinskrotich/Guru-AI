// import React from 'react'

// const PropmptLibrary = () => {
//   return (
//     <div>PropmptLibrary</div>
//   )
// }

// export default PropmptLibrary



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

const prompts: Prompt[] = [
  {
    id: '1',
    title: 'Research documents for a blog post',
    description: 'Identify and summarize 3 key resources for a blog post',
    department: 'Marketing',
    category: 'Content',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: '2',
    title: 'Explore time management techniques',
    description: 'Discover time management techniques with description for productivity.',
    department: 'All Teams',
    category: 'Productivity',
    tag: 'All Teams',
    tagColor: 'bg-gray-100 text-gray-800'
  },
  {
    id: '3',
    title: 'Find teammates who worked on a feature',
    description: 'Identify individuals who have worked on a feature and summarize how they were...',
    department: 'Engineering',
    category: 'Collaboration',
    tag: 'Engineering',
    tagColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: '4',
    title: 'Find tickets that mention error messages',
    description: 'Research similar tickets and summarize how they were resolved.',
    department: 'Support',
    category: 'Research',
    tag: 'Support',
    tagColor: 'bg-red-100 text-red-800'
  },
  {
    id: '5',
    title: 'Find subject matter experts',
    description: 'Identifying subject matter experts in your company by analyzing...',
    department: 'All Teams',
    category: 'Research',
    tag: 'All Teams',
    tagColor: 'bg-gray-100 text-gray-800'
  },
  {
    id: '6',
    title: 'Outline workshop agenda for sales',
    description: 'Create a half day agenda on topics for improved sales techniques.',
    department: 'Sales',
    category: 'Planning',
    tag: 'Sales',
    tagColor: 'bg-yellow-100 text-yellow-800'
  },
  {
    id: '7',
    title: 'Understand financial terminology',
    description: 'Define and understand financial and company terminology.',
    department: 'Finance',
    category: 'Training',
    tag: 'Finance',
    tagColor: 'bg-green-100 text-green-800'
  },
  {
    id: '8',
    title: 'Personalize support plan for customers',
    description: 'Make a customer profile to help the support team give better service.',
    department: 'Support',
    category: 'Customer Support',
    tag: 'Support',
    tagColor: 'bg-red-100 text-red-800'
  },
  {
    id: '9',
    title: 'Summarize contract details',
    description: 'A key takeaways from contract terms and agreements.',
    department: 'Finance',
    category: 'Legal',
    tag: 'Finance',
    tagColor: 'bg-green-100 text-green-800'
  },
  {
    id: '10',
    title: 'Add UTMs to website links',
    description: 'UTM Tracking needs to be added onto all URLs for tracking.',
    department: 'Marketing',
    category: 'Technical',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: '11',
    title: 'Identify KPIs',
    description: 'Identify and suggest metrics that can be used to measure...',
    department: 'All Teams',
    category: 'Analytics',
    tag: 'All Teams',
    tagColor: 'bg-gray-100 text-gray-800'
  },
  {
    id: '12',
    title: 'Identify experts or ownership',
    description: 'Box, Docs, Confluence, Google Drive ownership details.',
    department: 'All Teams',
    category: 'Research',
    tag: 'All Teams',
    tagColor: 'bg-gray-100 text-gray-800'
  }
]

const departments = [
  'All Departments', 
  'Marketing', 
  'Engineering', 
  'Finance', 
  'Sales', 
  'Support', 
  'All Teams'
]

const categories = [
  'All Categories', 
  'Content', 
  'Productivity', 
  'Collaboration', 
  'Research',
  'Planning',
  'Training',
  'Customer Support',
  'Legal',
  'Technical',
  'Analytics'
]

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  const filteredPrompts = prompts.filter(prompt => {
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
                Department
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
                Category
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
              <p className="text-gray-600 text-sm mb-4">
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
          <Button variant="outline">
            Show more
          </Button>
        </div>
      </div>
    </div>
  )
}


