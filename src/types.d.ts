export interface Comment {
    id: string;
    user_id: string;
    transcript_id: string;
    transcript_text: string;
    comment: string;
}

export interface Message {
    time: string;
    name: string;
    dialogue: string;
}

export type Transcript = Message[];
