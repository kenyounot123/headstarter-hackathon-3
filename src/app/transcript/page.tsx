"use client";
import transcriptData from "@/app/dummy-data";
import ChatbotSection from "@/components/Chatbot";
import CommentSection from "@/components/Comment";
import { useState, useRef, useEffect } from "react";
import { Comment, DbComment } from "@/types";
import { getComments } from "@/app/actions";
import { TranscriptMessage } from "@/components/TranscriptMessage";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { createComment } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const emptyCommentForm: Comment = {
  user_fullname: "",
  message_id: "",
  highlighted_message: "",
  comment: "",
};


export default function Transcript() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [transcript, setTranscript] = useState(transcriptData);
  const [section, setSection] = useState<"comments" | "chatbot">("comments");
  const [comments, setComments] = useState<DbComment[]>([]);
  const [commentForm, setCommentForm] = useState<Comment>(emptyCommentForm);
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const [hoveredComment, setHoveredComment] = useState<DbComment | null>(null);

  const [messages, setMessages] = useState<string[]>(["Hi there! How can I assist you today?"]);
  const router = useRouter()

  // console.log("IN PARENT:", hoveredComment);

  function openCommentFormWith(comment: Comment) {
    setCommentFormOpen(true);
    setCommentForm(comment);
  }

  function focusOnComment(comment: DbComment) {
    setHoveredComment(comment);
    setSection("comments");
  }

  function scrollToMessage(messageId: string) {
    const element = document.getElementById(`transcript-message-${messageId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  async function handleCommentFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded || !isSignedIn) {
      const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
  
      if (signInUrl) {
        router.push(signInUrl);
      }
      alert("You need to be signed in to comment");
  
      return;
    }

    const newComment: Comment = {
      user_fullname: user.fullName || user.id,
      message_id: commentForm?.message_id,
      highlighted_message: commentForm?.highlighted_message,
      comment: commentForm?.comment,
    };

    try {
      // Handle form submission save comments using setComments and save in db as well.
      const id = await createComment(newComment);
      setComments([...comments, { ...newComment, id }]);
    } catch (e: any) {
      alert(e.message);
    }

    setCommentFormOpen(false);
  }

  useEffect(() => {
    getComments().then((comments) => {
      setComments(comments);
      console.log(comments)
    });
  }, []);

  return (
    <section className="flex flex-col md:flex-row w-[95%] h-[800px] mx-auto mt-10">
      {/* Main Transcript Section */}
      <div className="relative flex-1 bg-gray-100 p-4 border-b md:border-r md:border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Main Transcript</h2>
        <div className="transcript max-h-[90%] overflow-y-auto">
          {transcript.map((entry, index) => (
            <TranscriptMessage
              message={entry}
              key={index}
              comments={comments}
              openCommentFormWith={openCommentFormWith}
              hoveredComment={hoveredComment}
              setHoveredComment={setHoveredComment}
              focusOnComment={focusOnComment}
            />
          ))}
        </div>
      </div>

      {/* AI Chatbot Section and Comments Section */}
      <div className="w-full md:w-[500px] bg-gray-200 p-4">
        <div className="flex gap-7 mb-5">
          <button
            onClick={() => setSection("chatbot")}
            className={`${
              section === "chatbot" && "border-b-2"
            } border-primary text-2xl font-semibold`}
          >
            AI Chatbot
          </button>
          <button
            onClick={() => setSection("comments")}
            className={`${
              section === "comments" && "border-b-2"
            } border-primary text-2xl font-semibold`}
          >
            Comments
          </button>
        </div>
        {section === "chatbot" && <ChatbotSection messages={messages} setMessages={setMessages} comments={comments}/>}
        {section === "comments" && (
          <CommentSection
            comments={comments}
            setComments={setComments}
            hoveredComment={hoveredComment}
            setHoveredComment={setHoveredComment}
            scrollToMessage={scrollToMessage}
          />
        )}
      </div>
      <Dialog open={commentFormOpen} onOpenChange={setCommentFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comment</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <blockquote className="py-1 border-l-2 pl-6 italic bg-accent">
              {commentForm.highlighted_message}
            </blockquote>

            <form id="comment-form">
              <Label htmlFor="comment">Your comment</Label>

              <Textarea
                id="comment"
                value={commentForm.comment}
                onChange={(e) =>
                  setCommentForm({ ...commentForm, comment: e.target.value })
                }
                className="w-full h-32 p-2 border border-gray-300 rounded-md"
              ></Textarea>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                variant={"default"}
                form="comment-form"
                onClick={handleCommentFormSubmit}
              >
                Submit
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
