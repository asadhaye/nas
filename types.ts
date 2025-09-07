
export interface Condition {
    title: string;
    summary: string;
    details: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface Message {
    id: number;
    role: 'user' | 'model';
    text: string;
}
