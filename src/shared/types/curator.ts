//Payload
export enum ChatType {
  TOPIC = 'topic',
  ORDER = 'order'
}

export enum StatusType {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  SPAM = 'spam',
  CLOSED = 'closed'
}

export enum Chats {
  MY = 'my',
  ALL = 'all',
  OTHERS = 'others',
  NOT_CURATOR = 'not_curator'
}
export enum MessageType {
  EMOJI = 'emoji',
  TEXT = 'text',
  FILE = 'file'
}

export interface CuratorChatPayloadParams {
  topic: string;
  chat_type: ChatType;
  status: StatusType;
  chats: Chats;
  ordering: string;
  search: string;
  limit: string;
  offset: string;
}
export interface OrderCreationPayload {
  client: number;
}

export interface OrderCreationResponse {
  id: number;
  client: number;
}
// ==========================================================
//ResponseChatList
export interface ChatListResponse {
  results: ChatList[];
}

export interface ChatList {
  client: Client;
  curator: Curator;
  topic: Topic;
  status: string;
  chat_type: string;
  curator_note: string;
  unread_messages_count: number;
  last_message: LastMessage;
}

export interface Topic {
  id: number;
  title: string;
  logo: string;
}

export interface Curator {
  id: number;
  is_online: string;
}
export interface Client {
  id: number;
  is_online: string;
}

export interface LastMessage {
  id: number;
  text: string;
  created_at: Date;
  is_read: boolean;
  message_type: string;
  is_my_message: boolean;
}

export interface ChatInfo {
  topic_count: number;
  order_count: number;
}
// ======================================================
// Messages
export interface CreateMessagePayload {
  text: string;
  message_type: MessageType;
  files: string[];
  chat: number;
}

export interface Message {
  results: CreateMessage[];
}

export interface CreateMessage {
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

export interface UpdateMessagesParams {
  text: string;
  message_type: MessageType;
}

export interface UpdateMessagesResponse {
  id: number;
  text: string;
  message_type: MessageType;
}

export interface CuratorTopicsResponse {
  results: CuratorTopics[];
}
export interface CuratorTopics {
  id: number;
  title: string;
  logo: string;
  chat_count: number;
}
export interface UpdateTopic {
  topic: number;
}

export interface Note {
  curator_note: string;
}
