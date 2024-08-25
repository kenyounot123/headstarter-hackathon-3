export interface Comment {
    user_fullname: string;

    message_id: string;
    highlighted_message: string;
    comment: string;

    transcript_id?: string; // unused
}

export interface DbComment extends Comment {
    id: string;
}

export interface Message {
    id: string; // primary key
    time: string;
    name: string;
    dialogue: string;
}

export type Transcript = Message[];
