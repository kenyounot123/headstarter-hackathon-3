# Voice Taker | Sales Transcript Annotation & Summarization Tool | Hiring Hackathon Rilla Voice

This project aims to build a feature for sales managers to efficiently add, edit, and delete comments on specific parts of a sales transcript. Users can also leverage a AI assistant using Large Language Models (LLMs) to generate a concise overview of the entire transcript and its associated comments.

## Features

- **Add, Edit, and Delete Comments**: Annotate specific parts of sales transcripts with the ability to modify and remove comments as needed.
- **Chatbot**: AI assistant that provides interactive help and answers questions about the transcript. 
- **Summary Generation**: Automatically generate a concise summary of the transcript and its comments using LLMs.
- **Intuitive UI**: User-friendly interface for managing comments and viewing transcripts.

## Why This Matters

This tool supports Rilla's goal of providing actionable, data-driven feedback by enabling detailed annotation and summarization of sales interactions. This improves coaching and decision-making processes for sales teams.

## Tech Stack

- **Frontend**: 
  - TypeScript
  - React
  - Shadcn for certain UI componentes 
  - Nextjs

- **Backend**:
  - Node.js
  - AWS Lambda (for backend logic and CRUD operations)
  - GPT API (for LLM integration)

- **Database**:
  - DynamoDB (for storing comments and metadata)

## Architecture

- **Frontend**: Built with React and TypeScript to create an intuitive and responsive interface for users to interact with transcripts, comments, and summaries.
- **Backend**: Utilizes Node.js and AWS Lambda for handling CRUD operations related to comments and file attachments. Integrates with LLMs to provide summary functionalities.
- **Database**: DynamoDB is used for storing comment data and metadata.

## Challenges Faced

- **State Management**: One of the primary challenges was managing state when implementing the feature for highlighting and commenting on text. Ensuring that the highlighted text accurately reflected the current comments and that updates to comments were integrated with the highlighted text required careful coordination of state updates and re-rendering of the UI.

## Future Implementations

- **UI/UX Enhancements**: We plan to improve the user interface and user experience by refining the design and interactions. This includes optimizing the layout for better usability, enhancing the visual appeal with modern design elements, and making interactions more intuitive. Feedback from users will be crucial in guiding these enhancements.
