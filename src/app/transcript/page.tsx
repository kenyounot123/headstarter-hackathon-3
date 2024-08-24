'use client'
import transcript from "@/app/dummy-data"
import ChatbotSection from "@/components/Chatbot"
import CommentSection from "@/components/Comment"
import { useState, useCallback } from "react"

export default function Transcript() {
  const [section, setSection] = useState<'comments' | 'chatbot'>('chatbot')
  const [highlights, setHighlights] = useState<{ text: string; startOffset: number; endOffset: number; index: number }[]>([])

  const handleTextHighlight = useCallback(() => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {

      const selectedText = selection.toString().trim()
      const range = selection.getRangeAt(0)
      const startOffset = range.startOffset
      const endOffset = range.endOffset
      console.log('Selected Text:', selectedText);
      console.log('Range:', range);
      console.log('Start Offset:', startOffset);
      console.log('End Offset:', endOffset);
    }
  }, [])

  return(
    <section className="flex flex-col md:flex-row w-[95%] h-[800px] mx-auto mt-10">
      {/* Main Transcript Section */}
      <div className="flex-1 bg-gray-100 p-4 border-b md:border-r md:border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Main Transcript</h2>
        <div onMouseUp={handleTextHighlight} className="max-h-[90%] overflow-y-auto">
          {transcript.map((entry, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg shadow-sm ${
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