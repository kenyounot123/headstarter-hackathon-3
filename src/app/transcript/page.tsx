'use client'
import transcriptData from "@/app/dummy-data"
import ChatbotSection from "@/components/Chatbot"
import CommentSection from "@/components/Comment"
import CommentForm from "@/components/CommentForm"
import Image from "next/image"
import { useState, useRef } from "react"
import { HighlightMenu, MenuButton } from "react-highlight-menu";
import Highlight from "react-highlighter"
type Comment = {
  username: string;
  userComment: string;
  highlightedText: string;
};

export default function Transcript() {
  const [transcript, setTranscript] = useState(transcriptData);
  const [section, setSection] = useState<'comments' | 'chatbot'>('chatbot')
  const [highlightedText, setHighlightedText] = useState<string>("")
  const [comments, setComments] = useState<Comment[]>([])
  const [displayForm, setDisplayForm] = useState<boolean>(false)
  const commentFormRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const getSelectedTextPosition = () => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      // Get the range of the selected text
      const range = selection.getRangeAt(0);
  
      // Get the bounding rectangle of the selected text
      const rect = range.getBoundingClientRect();
  
      // Extract position and dimensions
      const position = {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      };
  
      return position;
    }
  
    return null; // No text selected or selection unavailable
  };
  
  const handleCommentClick = () => {
    const position = getSelectedTextPosition()
    if (commentFormRef.current && menuRef.current && position) {
      commentFormRef.current.style.setProperty('display', 'block');
      menuRef.current.style.setProperty('display', 'none');

      const commentForm = commentFormRef.current as HTMLDivElement;
    
      commentForm.style.position = 'fixed'; // Use 'fixed' to position relative to the viewport
      commentForm.style.top = `${position.top + window.scrollY + position.height}px`; // Adjust for page scroll
      commentForm.style.left = `${position.left + window.scrollX}px`; // Adjust for page scroll
      commentForm.style.width = `${position.width}px`; // Optional: adjust width if needed
      commentForm.style.height = `${position.height}px`; // Optional: adjust height if needed

    }
  }
  const handleCancel = () => {
    if (commentFormRef.current) {
      commentFormRef.current.style.setProperty('display', 'none');
    }
  }

  return(
    <section className="flex flex-col md:flex-row w-[95%] h-[800px] mx-auto mt-10">
      {/* Main Transcript Section */}
      <HighlightMenu
        target=".dialogue"
        zIndex={5}
        allowedPlacements={["top", "bottom"]}
        menu={({ selectedText = "", setMenuOpen }) => (
          <>
            <div ref={menuRef} className="flex gap-1">
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
                onClick={() => {
                  setMenuOpen(false)
                  handleCommentClick()
                  // Display a floating form with a text field where
                  // users can input a comment
                  // Comment get saved in DB and then is displayed in the 
                  // comment section
                }}
              >
                <Image src={"/comment.svg"} alt="VoiceTaker" width={24} height={24} />
              </MenuButton>
              <MenuButton
                title="Close menu"
                style={{backgroundColor: "#5E6BF1"}}
                onClick={() => setMenuOpen(false)}
                icon="x-mark"
              />
            </div>
          </>
        )}
      />
      <div ref={commentFormRef} style={{ display: 'none', zIndex:999}}>
        <CommentForm onSubmit={(str) => str} onCancel={handleCancel}/>
      </div>
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