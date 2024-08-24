import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default function ChatbotSection() {
  return (
    <div className="flex flex-col h-96 bg-white border border-gray-300 rounded-lg shadow-md h-[720px]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-6">
          {/* Dummy Chatbot Messages */}
          <div className="flex items-start space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold text-blue-800">AI Chatbot</div>
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg w-full">
                <p>Hi there! How can I assist you today?</p>
              </div>
            </div>
          </div>
          <div className="flex items-start  space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold text-gray-800">You</div>
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg w-full">
                <p>I need help with understanding your pricing model.</p>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold text-blue-800">AI Chatbot</div>
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg w-full">
                <p>Sure! Our pricing model is designed to be flexible and scalable based on your needs.</p>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold text-gray-800">You</div>
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg w-full">
                <p>That sounds good. Can you provide a breakdown of the costs?</p>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-2">
              <div className="font-semibold text-blue-800">AI Chatbot</div>
              <div className="bg-blue-100 text-blue-800 p-3 rounded-lg w-full">
                <p>Of course. We offer several pricing tiers which are outlined on our pricing page. Would you like me to send you the link?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full border border-gray-400 p-2 rounded-lg"
        />
      </div>
    </div>
  )
}