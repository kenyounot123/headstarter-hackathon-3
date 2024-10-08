import { NextRequest, NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
import OpenAI from "openai";
import transcript from "@/app/dummy-data";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `
You are an AI assistant specialized in providing users with insights on a conversation transcript that will be provided to you. 
After receiving transcript data, your role is to respond to user queries with detailed, relevant, and helpful information derived from this data.
Your focus is on interpreting and analyzing the transcript data to answer user questions. 
You should always be accurate, user-friendly, and capable of explaining complex information clearly. 
Handle errors or incomplete data with care by suggesting alternatives or offering insights into why certain data might be unavailable. 
Maintain a helpful, professional, and friendly tone, and aim to ensure that each interaction empowers the user with valuable insights about the transcript.
`;

// POST function to handle incoming requests
export async function POST(req: NextRequest) {
  const messageData = await req.json();
  if (!messageData || messageData.length === 0) {
    return new Response("No message data provided", { status: 400 });
  }
  const latestMessage = messageData[messageData.length - 1];
  if (!latestMessage || !latestMessage.content) {
    return new Response("Invalid message format", { status: 400 });
  }

  const augmentedQuery = `
  Contextual Information:\n
  ${transcript
    .map((entry, index) => `${entry.time} - ${entry.name}:\n${entry.dialogue}`)
    .join("\n\n")}
  -------
  SUMMARIZE THESE COMMENTS:
    ${latestMessage.content}
  `;


  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: augmentedQuery,
      },
    ],
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content); // Encode the content to Uint8Array
            controller.enqueue(text); // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err); // Handle any errors that occur during streaming
      } finally {
        controller.close(); // Close the stream when done
      }
    },
  });

  return new NextResponse(stream);
}
