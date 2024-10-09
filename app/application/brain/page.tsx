// import React from 'react';

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Image, ArrowUp } from 'lucide-react';

const CodeEditor = () => (
  <div className="bg-gray-800 text-green-400 font-mono p-4 h-full overflow-auto">
    <pre>{`def fibonacci_recursive(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

# Test the function
for i in range(10):
    result = fibonacci_recursive(i)
    print(f"F({i}) = {result}")
`}</pre>
  </div>
);

const LessonContent = () => (
  <div className="p-4 overflow-auto flex-grow">
    <h2 className="text-xl font-bold mb-4">Fibonacci Sequence</h2>
    <p className="mb-4">The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. It typically starts with 0 and 1.</p>
    <ul className="list-disc pl-5 mb-4">
      <li>Step 1: Define the base cases (n = 0 and n = 1)</li>
      <li>Step 2: For n "greater than" 1, calculate F(n) = F(n-1) + F(n-2)</li>
      <li>Step 3: Return the result</li>
    </ul>
    <p>The code on the right implements this algorithm recursively.</p>
  </div>
);

const InputArea = () => (
  <div className="p-4 border-t">
    <div className="flex items-center bg-white border rounded-md">
      <Input 
        type="text" 
        placeholder="Collaborate with GURU..." 
        className="flex-grow border-none"
      />
      <Button variant="ghost" size="icon" className="mx-1">
        <Paperclip className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="mx-1">
        <Image className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="mx-1">
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const CodeLessonLayout = () => {
  return (
    <div className="flex h-screen">
      <Card className="w-1/2 flex flex-col">
        <CardContent className="flex-grow overflow-auto">
          <LessonContent />
        </CardContent>
        <InputArea />
      </Card>
      <Card className="w-1/2 bg-gray-900">
        <CardContent className="h-full p-0">
          <CodeEditor />
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeLessonLayout;