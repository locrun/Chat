export enum ChatType {
  TOPIC = 'topic',
  ORDER = 'order'
}
export enum MessageType {
  EMOJI = 'emoji',
  TEXT = 'text',
  FILE = 'file'
}
export enum StatusType {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  SPAM = 'spam',
  CLOSED = 'closed'
}

export interface Chat {
  id: number;
  topic: Topic;
  created_at: string;
  status: StatusType;
  chat_type: MessageType;
  last_message: Message;
  unread_messages_count: number;
}

export interface Message {
  id: number;
  text: string;
  created_at: string;
  is_read: boolean;
  message_type: MessageType;
  is_my_message: boolean;
  files?: File[];
}

export interface Topic {
  id: number;
  title: string;
  logo: string;
  description?: string;
}

export interface CreateChatResponse {
  id: number;
  topic: number;
  created_at: string;
  status: StatusType;
  chat_type: ChatType;
}

export interface CreateMessagePayload {
  text: string;
  message_type: MessageType;
  files: string[];
  chat: number;
}

export interface File {
  id: number;
  file: string;
}

export interface TopicData {
  topic: number;
}
