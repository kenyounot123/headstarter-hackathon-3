"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { HighlightMenu, MenuButton } from "react-highlight-menu";
import Highlighter from "react-highlight-words";
import { Message, Comment, DbComment } from "@/types";

const HighlightedWord = ({
  children,
  isCommentHovered,
  onHover,
  onClick,
}: {
  children: string;
  isCommentHovered: boolean;
  onHover: (word: string | null) => void;
  onClick: (children: string | null) => void;
}) => (
  <mark
    onMouseEnter={() => onHover(children)}
    onMouseLeave={() => onHover(null)}
    onClick={() => onClick(children)}
    className={`${
      isCommentHovered ? "bg-yellow-400" : "bg-yellow-200 hover:bg-yellow-400"
    } hover:cursor-pointer`}
  >
    {children}
  </mark>
);

export function TranscriptMessage({
  message,
  comments,
  hoveredComment,
  openCommentFormWith,
  setHoveredComment,
  focusOnComment,
}: {
  message: Message;
  comments: DbComment[];
  hoveredComment: DbComment | null;
  openCommentFormWith: (comment: Comment) => void;
  setHoveredComment: (comment: DbComment | null) => void;
  focusOnComment: (comment: DbComment) => void;
}) {
  const [highlightedText, setHighlightedText] = useState<string[]>(() => {
    return comments
      .filter((comment) => comment.message_id === message.id)
      .map((comment) => comment.highlighted_message);
  });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const handleHover = (word: string | null) => {
    if (word) {
      const comment = comments.find(
        (comment) =>
          comment.message_id === message.id &&
          comment.highlighted_message === word
      );
      if (comment) {
        setHoveredComment(comment);
      }
    } else {
      setHoveredComment(null);
    }
  };

  const handleClick = (word: string | null) => {
    if (word) {
      const comment = comments.find(
        (comment) =>
          comment.message_id === message.id &&
          comment.highlighted_message === word
      );
      if (comment) {
        focusOnComment(comment);
      }
    }
  };

  // Update highlightedText when comments change
  useEffect(() => {
    setHighlightedText(
      comments
        .filter((comment) => comment.message_id === message.id)
        .map((comment) => comment.highlighted_message)
    );
  }, [comments, message.id]);

  return (
    <>
      <HighlightMenu
        target={`#transcript-message-${message.id}`}
        zIndex={5}
        allowedPlacements={["top", "bottom"]}
        menu={({ selectedText = "", setMenuOpen }) => (
          <>
            <div ref={menuRef} className="flex gap-1">
              <MenuButton
                title="Highlight"
                style={{ backgroundColor: "#5E6BF1" }}
                onClick={() => {
                  setHighlightedText([...highlightedText, selectedText]);
                }}
              >
                <Image
                  src={"/highlighter.svg"}
                  alt="VoiceTaker"
                  width={24}
                  height={24}
                />
              </MenuButton>

              <MenuButton
                style={{ backgroundColor: "#5E6BF1" }}
                title="Add Comment"
                onClick={() => {
                  setMenuOpen(false);
                  openCommentFormWith({
                    user_fullname: "",
                    message_id: message.id,
                    highlighted_message: selectedText,
                    comment: "",
                  });
                }}
              >
                <Image
                  src={"/comment.svg"}
                  alt="VoiceTaker"
                  width={24}
                  height={24}
                />
              </MenuButton>
              <MenuButton
                title="Close menu"
                style={{ backgroundColor: "#5E6BF1" }}
                onClick={() => setMenuOpen(false)}
                icon="x-mark"
              />
            </div>
          </>
        )}
      />
      <div
        ref={messageRef}
        id={`transcript-message-${message.id}`}
        className={`mb-4 p-4 rounded-lg shadow-sm ${
          message.name === "Sales Rep"
            ? "bg-blue-50 text-blue-700"
            : "bg-green-50 text-green-700"
        }`}
      >
        <div className="font-semibold">
          {message.time} - {message.name}:
        </div>
        <p className="dialogue">
          <Highlighter
            searchWords={highlightedText}
            autoEscape={true}
            textToHighlight={message.dialogue}
            highlightTag={({ children }) => {
              const associatedComment = comments.find(
                (comment) =>
                  comment.message_id === message.id &&
                  comment.highlighted_message === children
              );
              const isCommentHovered =
                hoveredComment && associatedComment
                  ? hoveredComment.id === associatedComment.id
                  : false;

              return (
                <HighlightedWord
                  onHover={handleHover}
                  onClick={handleClick}
                  isCommentHovered={isCommentHovered}
                >
                  {children}
                </HighlightedWord>
              );
            }}
          />
        </p>
      </div>
    </>
  );
}
