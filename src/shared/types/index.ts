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

export enum PageType {
  CHAT = 'chat',
  TOPIC = 'topics',
  STUDENTPROFILE = 'student-profile'
}

export enum ChatType {
  TOPIC = 'topic',
  ORDER = 'order'
}

export interface CreateMessagePayload {
  text: string;
  message_type: MessageType;
  files: string[];
  chat: number;
}

export interface Topic {
  id: number;
  title: string;
  logo: string;
}

export interface LastMessage {
  id: number;
  text: string;
  created_at: Date;
  is_read: boolean;
  message_type: string;
  is_my_message: boolean;
}

export interface Message {
  id: number;
  text: string;
  created_at: Date;
  is_read: boolean;
  message_type: MessageType;
  is_my_message: boolean;
  files: File[];
}

export interface File {
  id: number;
  file: string;
}
