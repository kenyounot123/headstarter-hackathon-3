import transcript from "@/app/dummy-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Transcript() {
  return(
    <section className="flex flex-col md:flex-row w-[95%] h-[800px] mx-auto">
      {/* Main Transcript Section */}
      <div className="flex-1 bg-gray-100 p-4 border-b md:border-r md:border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Main Transcript</h2>
        <div className="max-h-[90%] overflow-y-auto">
          {transcript.map((entry, index) => (
            <div
              key={index}
              className={`mb-4 p-4 border rounded-lg shadow-sm ${
                entry.name === "Sales Rep" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
              }`}
            >
              <div className="font-semibold">{entry.time} - {entry.name}:</div>
              <p>{entry.dialogue}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chatbot Section */}
      <div className="w-full md:w-96 bg-gray-200 p-4">
        <h2 className="text-2xl font-semibold mb-4">AI Chatbot</h2>
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
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
                    <p>Hi there! How can I assist you today?</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <div className="font-semibold text-gray-800">You</div>
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
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
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
                    <p>Sure! Our pricing model is designed to be flexible and scalable based on your needs.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-end space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <div className="font-semibold text-gray-800">You</div>
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-xs">
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
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-lg max-w-xs">
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
      </div>
    </section>
  )
}