// // import React from 'react';

// // const page = () => {
// //   return (
// //     <div>page</div>
// //   )
// // }

// // export default page

// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Paperclip, Image, ArrowUp } from 'lucide-react';

// const CodeEditor = () => (
//   <div className="bg-gray-800 text-green-400 font-mono p-4 h-full overflow-auto">
//     <pre>{`def fibonacci_recursive(n):
//     if n <= 0:
//         return 0
//     elif n == 1:
//         return 1
//     else:
//         return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

// # Test the function
// for i in range(10):
//     result = fibonacci_recursive(i)
//     print(f"F({i}) = {result}")
// `}</pre>
//   </div>
// );

// const LessonContent = () => (
//   <div className="p-4 overflow-auto flex-grow">
//     <h2 className="text-xl font-bold mb-4">Fibonacci Sequence</h2>
//     <p className="mb-4">The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. It typically starts with 0 and 1.</p>
//     <ul className="list-disc pl-5 mb-4">
//       <li>Step 1: Define the base cases (n = 0 and n = 1)</li>
//       <li>Step 2: For n > 1, calculate F(n) = F(n-1) + F(n-2)</li>
//       <li>Step 3: Return the result</li>
//     </ul>
//     <p>The code on the right implements this algorithm recursively.</p>
//   </div>
// );

// const InputArea = () => (
//   <div className="p-4 border-t">
//     <div className="flex items-center bg-white border rounded-md">
//       <Input 
//         type="text" 
//         placeholder="Collaborate with GURU..." 
//         className="flex-grow border-none"
//       />
//       <Button variant="ghost" size="icon" className="mx-1">
//         <Paperclip className="h-4 w-4" />
//       </Button>
//       <Button variant="ghost" size="icon" className="mx-1">
//         <Image className="h-4 w-4" />
//       </Button>
//       <Button variant="ghost" size="icon" className="mx-1">
//         <ArrowUp className="h-4 w-4" />
//       </Button>
//     </div>
//   </div>
// );

// const CodeLessonLayout = () => {
//   return (
//     <div className="flex h-screen">
//       <Card className="w-1/2 flex flex-col">
//         <CardContent className="flex-grow overflow-auto">
//           <LessonContent />
//         </CardContent>
//         <InputArea />
//       </Card>
//       <Card className="w-1/2 bg-gray-900">
//         <CardContent className="h-full p-0">
//           <CodeEditor />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CodeLessonLayout;



// // OPT 2

// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Paperclip, Image, ArrowUp, Copy, Download, Play } from 'lucide-react';

// const CodeEditor = () => (
//   <div className="bg-gray-800 text-green-400 font-mono p-4 h-full overflow-auto">
//     <pre>{`import pandas as pd
// import binascii

// # Step 1: Load the Excel File
// file_path = 'path_to_your_file.xlsx'
// excel_file = pd.ExcelFile(file_path)

// # Step 2: Load each sheet
// device_to_cloud = pd.read_excel(excel_file, sheet_name='Device to Cloud')
// cloud_to_device = pd.read_excel(excel_file, sheet_name='Cloud to Device')
// examples = pd.read_excel(excel_file, sheet_name='Examples')
// decrypt = pd.read_excel(excel_file, sheet_name='Decrypt')

// # Step 3: Parse Device-to-Cloud and Cloud-to-Device Sheets
// def parse_payload(sheet):
//     payload_data = []
//     for _, row in sheet.iterrows():
//         byte_no = row['Byte no']
//         description = row['Description']
//         example_value = row['Example Value']
//         payload_data.append({'byte_no': byte_no, 'description': description, 'example_value': example_value})
//     return payload_data

// device_to_cloud_payloads = parse_payload(device_to_cloud)
// cloud_to_device_payloads = parse_payload(cloud_to_device)

// # Step 4: Parse Hexadecimal Logs from Examples and Decrypt Sheets
// def parse_hex_logs(sheet):
//     logs = []
//     for _, row in sheet.iterrows():
//         device_log = row['Log + sync'] if 'Log + sync' in row else row['Device Log']
//         logs.append(device_log)
//     return logs

// device_logs = parse_hex_logs(examples)
// decrypted_logs = parse_hex_logs(decrypt)

// # Step 5: Convert Hexadecimal Logs to Bytes
// def hex_to_bytes(hex_str):
//     return binascii.unhexlify(hex_str.replace(' ', ''))

// decoded_logs = [hex_to_bytes(log) for log in device_logs]`}</pre>
//   </div>
// );

// const LessonContent = () => (
//   <div className="p-4 overflow-auto flex-grow">
//     <h2 className="text-xl font-bold mb-4">Step-by-Step Guide to Building the UDP Payload Parser for Alpha Tag</h2>
    
//     <h3 className="text-lg font-semibold mb-2">Step 1: Install Required Libraries</h3>
//     <p className="mb-4">You will need `pandas` for handling the Excel file and `binascii` for working with hexadecimal data. Install them using:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">pip install pandas</pre>

//     <h3 className="text-lg font-semibold mb-2">Step 2: Load the Excel File</h3>
//     <p className="mb-4">First, load the Excel file using `pandas`:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`import pandas as pd
// file_path = 'path_to_your_file.xlsx'
// excel_file = pd.ExcelFile(file_path)`}
//     </pre>
//     <p className="mb-4">Load each sheet from the Excel file:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`device_to_cloud = pd.read_excel(excel_file, sheet_name='Device to Cloud')
// cloud_to_device = pd.read_excel(excel_file, sheet_name='Cloud to Device')
// examples = pd.read_excel(excel_file, sheet_name='Examples')
// decrypt = pd.read_excel(excel_file, sheet_name='Decrypt')`}
//     </pre>

//     <h3 className="text-lg font-semibold mb-2">Step 3: Parse Device-to-Cloud and Cloud-to-Device Payloads</h3>
//     <p className="mb-4">Write a function to parse the payloads from the "Device to Cloud" and "Cloud to Device" sheets:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`def parse_payload(sheet):
//     payload_data = []
//     for _, row in sheet.iterrows():
//         byte_no = row['Byte no']
//         description = row['Description']
//         example_value = row['Example Value']
//         payload_data.append({'byte_no': byte_no, 'description': description, 'example_value': example_value})
//     return payload_data`}
//     </pre>
//     <p className="mb-4">Apply this function to both sheets:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`device_to_cloud_payloads = parse_payload(device_to_cloud)
// cloud_to_device_payloads = parse_payload(cloud_to_device)`}
//     </pre>

//     <h3 className="text-lg font-semibold mb-2">Step 4: Parse Hexadecimal Logs from the "Examples" and "Decrypt" Sheets</h3>
//     <p className="mb-4">To handle hexadecimal log data, write a function to extract logs from the respective sheets:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`def parse_hex_logs(sheet):
//     logs = []
//     for _, row in sheet.iterrows():
//         device_log = row['Log + sync'] if 'Log + sync' in row else row['Device Log']
//         logs.append(device_log)
//     return logs`}
//     </pre>
//     <p className="mb-4">Apply this function to the logs in both "Examples" and "Decrypt" sheets:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`device_logs = parse_hex_logs(examples)
// decrypted_logs = parse_hex_logs(decrypt)`}
//     </pre>

//     <h3 className="text-lg font-semibold mb-2">Step 5: Convert Hexadecimal Logs to Byte Data</h3>
//     <p className="mb-4">To convert the hexadecimal logs into byte data, use the `binascii` module:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`import binascii

// def hex_to_bytes(hex_str):
//     return binascii.unhexlify(hex_str.replace(' ', ''))`}
//     </pre>
//     <p className="mb-4">Convert the parsed hexadecimal logs:</p>
//     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// {`decoded_logs = [hex_to_bytes(log) for log in device_logs]`}
//     </pre>

//     <h3 className="text-lg font-semibold mb-2">Step 6: Put It All Together</h3>
//     <p className="mb-4">Once parsed, the data can be used for further analysis or saved into a file format like JSON. The final code integrates all these steps.</p>
//   </div>
// );

// const ActionButtons = () => (
//   <div className="flex justify-end space-x-2 p-4 border-t">
//     <Button variant="outline" size="sm">
//       <Copy className="h-4 w-4 mr-2" />
//       Copy
//     </Button>
//     <Button variant="outline" size="sm">
//       <Download className="h-4 w-4 mr-2" />
//       Download
//     </Button>
//     <Button variant="outline" size="sm">
//       <Play className="h-4 w-4 mr-2" />
//       Execute
//     </Button>
//   </div>
// );

// const InputArea = () => (
//   <div className="p-4 border-t">
//     <div className="flex items-center bg-white border rounded-md">
//       <Input 
//         type="text" 
//         placeholder="Collaborate with GURU..." 
//         className="flex-grow border-none"
//       />
//       <Button variant="ghost" size="icon" className="mx-1">
//         <Paperclip className="h-4 w-4" />
//       </Button>
//       <Button variant="ghost" size="icon" className="mx-1">
//         <Image className="h-4 w-4" />
//       </Button>
//       <Button variant="ghost" size="icon" className="mx-1">
//         <ArrowUp className="h-4 w-4" />
//       </Button>
//     </div>
//   </div>
// );

// const CodeLessonLayout = () => {
//   return (
//     <div className="flex h-screen">
//       <Card className="w-1/2 flex flex-col">
//         <CardContent className="flex-grow overflow-auto">
//           <LessonContent />
//         </CardContent>
//         <ActionButtons />
//         <InputArea />
//       </Card>
//       <Card className="w-1/2 bg-gray-900">
//         <CardContent className="h-full p-0">
//           <CodeEditor />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CodeLessonLayout;

// OP 3

// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Paperclip, Image, ArrowUp, Copy, Download, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// const CodeEditor = () => (
//   <div className="bg-gray-800 text-green-400 font-mono p-4 h-full overflow-auto">
//     <pre>{`import pandas as pd
// import binascii

// # Step 1: Load the Excel File
// file_path = 'path_to_your_file.xlsx'
// excel_file = pd.ExcelFile(file_path)

// # Step 2: Load each sheet
// device_to_cloud = pd.read_excel(excel_file, sheet_name='Device to Cloud')
// cloud_to_device = pd.read_excel(excel_file, sheet_name='Cloud to Device')
// examples = pd.read_excel(excel_file, sheet_name='Examples')
// decrypt = pd.read_excel(excel_file, sheet_name='Decrypt')

// # Step 3: Parse Device-to-Cloud and Cloud-to-Device Sheets
// def parse_payload(sheet):
//     payload_data = []
//     for _, row in sheet.iterrows():
//         byte_no = row['Byte no']
//         description = row['Description']
//         example_value = row['Example Value']
//         payload_data.append({'byte_no': byte_no, 'description': description, 'example_value': example_value})
//     return payload_data

// device_to_cloud_payloads = parse_payload(device_to_cloud)
// cloud_to_device_payloads = parse_payload(cloud_to_device)

// # Step 4: Parse Hexadecimal Logs from Examples and Decrypt Sheets
// def parse_hex_logs(sheet):
//     logs = []
//     for _, row in sheet.iterrows():
//         device_log = row['Log + sync'] if 'Log + sync' in row else row['Device Log']
//         logs.append(device_log)
//     return logs

// device_logs = parse_hex_logs(examples)
// decrypted_logs = parse_hex_logs(decrypt)

// # Step 5: Convert Hexadecimal Logs to Bytes
// def hex_to_bytes(hex_str):
//     return binascii.unhexlify(hex_str.replace(' ', ''))

// decoded_logs = [hex_to_bytes(log) for log in device_logs]`}</pre>
//   </div>
// );

// const LessonContent = () => (
//   <div className="p-4 overflow-auto flex-grow">
//     <h2 className="text-xl font-bold mb-4">Fibonacci Sequence</h2>
//     <p className="mb-4">The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. It typically starts with 0 and 1.</p>
//     <ul className="list-disc pl-5 mb-4">
//       <li>Step 1: Define the base cases (n = 0 and n = 1)</li>
//       <li>Step 2: For n > 1, calculate F(n) = F(n-1) + F(n-2)</li>
//       <li>Step 3: Return the result</li>
//     </ul>
//     <p>The code on the right implements this algorithm recursively.</p>
//   </div>
// );

// const InputArea = () => (
//   <div className="p-4 border-t">
//     <div className="flex items-center bg-white border rounded-md">
//       <Input 
//         type="text" 
//         placeholder="Collaborate with GURU..." 
//         className="flex-grow border-none"
//       />
//       <Button variant="ghost" size="icon" className="mx-1">
//         <Paperclip className="h-4 w-4" />
//       </Button>
//       <Button variant="ghost" size="icon" className="mx-1">
//         <Image className="h-4 w-4" />
//       </Button>
//       <Button variant="ghost" size="icon" className="mx-1">
//         <ArrowUp className="h-4 w-4" />
//       </Button>
//     </div>
//   </div>
// );

// const CodeLessonLayout = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex flex-grow">
//         <Card className="w-1/2 flex flex-col">
//           <CardContent className="flex-grow overflow-auto">
//             <LessonContent />
//           </CardContent>
//         </Card>
//         <Card className="w-1/2 flex flex-col bg-gray-900">
//           <CardContent className="flex-grow p-0">
//             <CodeEditor />
//           </CardContent>
//         </Card>
//       </div>
//       <ActionBar />
//       <InputArea />
//     </div>
//   );
// };

// export default CodeLessonLayout;

// OP4

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, Image, ArrowUp, Copy, Download, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const CodeEditor = () => (
  <div className="bg-gray-800 text-green-400 font-mono p-4 h-full overflow-auto">
    <pre>{`import pandas as pd
import binascii

# Step 1: Load the Excel File
file_path = 'path_to_your_file.xlsx'
excel_file = pd.ExcelFile(file_path)

# Step 2: Load each sheet
device_to_cloud = pd.read_excel(excel_file, sheet_name='Device to Cloud')
cloud_to_device = pd.read_excel(excel_file, sheet_name='Cloud to Device')
examples = pd.read_excel(excel_file, sheet_name='Examples')
decrypt = pd.read_excel(excel_file, sheet_name='Decrypt')

# Step 3: Parse Device-to-Cloud and Cloud-to-Device Sheets
def parse_payload(sheet):
    payload_data = []
    for _, row in sheet.iterrows():
        byte_no = row['Byte no']
        description = row['Description']
        example_value = row['Example Value']
        payload_data.append({'byte_no': byte_no, 'description': description, 'example_value': example_value})
    return payload_data

device_to_cloud_payloads = parse_payload(device_to_cloud)
cloud_to_device_payloads = parse_payload(cloud_to_device)

# Step 4: Parse Hexadecimal Logs from Examples and Decrypt Sheets
def parse_hex_logs(sheet):
    logs = []
    for _, row in sheet.iterrows():
        device_log = row['Log + sync'] if 'Log + sync' in row else row['Device Log']
        logs.append(device_log)
    return logs

device_logs = parse_hex_logs(examples)
decrypted_logs = parse_hex_logs(decrypt)

# Step 5: Convert Hexadecimal Logs to Bytes
def hex_to_bytes(hex_str):
    return binascii.unhexlify(hex_str.replace(' ', ''))

decoded_logs = [hex_to_bytes(log) for log in device_logs]`}</pre>
  </div>
);

const LessonContent = () => (
  <div className="p-4 overflow-auto flex-grow">
    <h2 className="text-xl font-bold mb-4">Engineering: Step-by-Step Guide to Building the UDP Payload Parser for Alpha Tag</h2>
    
    <h3 className="text-lg font-semibold mb-2">Step 1: Install Required Libraries</h3>
    <p className="mb-4">You will need `pandas` for handling the Excel file and `binascii` for working with hexadecimal data. Install them using:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">pip install pandas</pre>

    <h3 className="text-lg font-semibold mb-2">Step 2: Load the Excel File</h3>
    <p className="mb-4">First, load the Excel file using `pandas`:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`import pandas as pd
file_path = 'path_to_your_file.xlsx'
excel_file = pd.ExcelFile(file_path)`}
    </pre>
    <p className="mb-4">Load each sheet from the Excel file:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`device_to_cloud = pd.read_excel(excel_file, sheet_name='Device to Cloud')
cloud_to_device = pd.read_excel(excel_file, sheet_name='Cloud to Device')
examples = pd.read_excel(excel_file, sheet_name='Examples')
decrypt = pd.read_excel(excel_file, sheet_name='Decrypt')`}
    </pre>

    <h3 className="text-lg font-semibold mb-2">Step 3: Parse Device-to-Cloud and Cloud-to-Device Payloads</h3>
    <p className="mb-4">Write a function to parse the payloads from the "Device to Cloud" and "Cloud to Device" sheets:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`def parse_payload(sheet):
    payload_data = []
    for _, row in sheet.iterrows():
        byte_no = row['Byte no']
        description = row['Description']
        example_value = row['Example Value']
        payload_data.append({'byte_no': byte_no, 'description': description, 'example_value': example_value})
    return payload_data`}
    </pre>
    <p className="mb-4">Apply this function to both sheets:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`device_to_cloud_payloads = parse_payload(device_to_cloud)
cloud_to_device_payloads = parse_payload(cloud_to_device)`}
    </pre>

    <h3 className="text-lg font-semibold mb-2">Step 4: Parse Hexadecimal Logs from the "Examples" and "Decrypt" Sheets</h3>
    <p className="mb-4">To handle hexadecimal log data, write a function to extract logs from the respective sheets:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`def parse_hex_logs(sheet):
    logs = []
    for _, row in sheet.iterrows():
        device_log = row['Log + sync'] if 'Log + sync' in row else row['Device Log']
        logs.append(device_log)
    return logs`}
    </pre>
    <p className="mb-4">Apply this function to the logs in both "Examples" and "Decrypt" sheets:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`device_logs = parse_hex_logs(examples)
decrypted_logs = parse_hex_logs(decrypt)`}
    </pre>

    <h3 className="text-lg font-semibold mb-2">Step 5: Convert Hexadecimal Logs to Byte Data</h3>
    <p className="mb-4">To convert the hexadecimal logs into byte data, use the `binascii` module:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`import binascii

def hex_to_bytes(hex_str):
    return binascii.unhexlify(hex_str.replace(' ', ''))`}
    </pre>
    <p className="mb-4">Convert the parsed hexadecimal logs:</p>
    <pre className="bg-gray-100 p-2 rounded-md mb-4">
{`decoded_logs = [hex_to_bytes(log) for log in device_logs]`}
    </pre>

    <h3 className="text-lg font-semibold mb-2">Step 6: Put It All Together</h3>
    <p className="mb-4">Once parsed, the data can be used for further analysis or saved into a file format like JSON. The final code integrates all these steps.</p>
  </div>
);

const ActionBar = () => (
  <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
    <div className="flex items-center space-x-2">
      <ChevronLeft className="h-4 w-4" />
      <span className="text-sm">Version 2 of 2</span>
      <ChevronRight className="h-4 w-4" />
    </div>
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
      <Button variant="outline" size="sm">
        <Play className="h-4 w-4 mr-2" />
        Execute
      </Button>
    </div>
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
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <Card className="w-1/2 flex flex-col">
          <CardContent className="flex-grow overflow-auto">
            <LessonContent />
          </CardContent>
        </Card>
        <Card className="w-1/2 flex flex-col bg-gray-900">
          <CardContent className="flex-grow p-0">
            <CodeEditor />
          </CardContent>
        </Card>
      </div>
      <ActionBar />
      <InputArea />
    </div>
  );
};

export default CodeLessonLayout;