'use client'
import transcriptData from "@/app/dummy-data"
import ChatbotSection from "@/components/Chatbot"
import CommentSection from "@/components/Comment"
import Image from "next/image"
import { useState } from "react"
import { HighlightMenu, MenuButton } from "react-highlight-menu";
import Highlight from "react-highlighter"
export default function Transcript() {
  const [transcript, setTranscript] = useState(transcriptData);
  const [section, setSection] = useState<'comments' | 'chatbot'>('chatbot')
  const [highlightedText, setHighlightedText] = useState<string>("")


  return(
    <section className="flex flex-col md:flex-row w-[95%] h-[800px] mx-auto mt-10">
      {/* Main Transcript Section */}
      <HighlightMenu
        target=".dialogue"
        allowedPlacements={["top", "bottom"]}
        menu={({ selectedText = "", setMenuOpen }) => (
          <>
            <MenuButton
              title="Highlight"
              style={{backgroundColor: "#5E6BF1"}}
              onClick={() => {
                setHighlightedText(selectedText)
              }}
            >
              <Image src={"/highlighter.svg"} alt="VoiceTaker" width={24} height={24} />
            </MenuButton>

            <MenuButton
              style={{backgroundColor: "#5E6BF1"}}
              title="Add Comment"
              
            >
              <Image src={"/comment.svg"} alt="VoiceTaker" width={24} height={24} />
            </MenuButton>
            <MenuButton
              title="Close menu"
              style={{backgroundColor: "#5E6BF1"}}
              onClick={() => setMenuOpen(false)}
              icon="x-mark"
            />
          </>
        )}
      />
      <div className="relative flex-1 bg-gray-100 p-4 border-b md:border-r md:border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Main Transcript</h2>
        <div className="transcript max-h-[90%] overflow-y-auto">
          {transcript.map((entry, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg shadow-sm ${
                entry.name === "Sales Rep" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
              }`}
            >
              <div className="font-semibold">{entry.time} - {entry.name}:</div>
              <p className="dialogue">
                <Highlight search={highlightedText} >{entry.dialogue}</Highlight>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chatbot Section and Comments Section */}
      <div className="w-full md:w-[500px] bg-gray-200 p-4">
        <div className="flex gap-7 mb-5">
          <button onClick={() => setSection('chatbot')} className={`${section === 'chatbot' && 'border-b-2'} border-primary text-2xl font-semibold`}>AI Chatbot</button>
          <button onClick={() => setSection('comments')}  className={`${section === 'comments' && 'border-b-2'} border-primary text-2xl font-semibold`}>Comments</button>
        </div>
        {section === 'chatbot' && <ChatbotSection/>}
        {section === 'comments' && <CommentSection/>}
      </div>
    </section>
  )
}