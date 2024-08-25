import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function BotMessage(message: string) {
  return (
    <>
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
    </>
  );
}
