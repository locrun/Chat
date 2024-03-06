import { LastMessage, Topic, MessageType } from '.';

export enum Chats {
  MY = 'my',
  ALL = 'all',
  OTHERS = 'others',
  NOT_CURATOR = 'not_curator'
}
export type CuratorChatPayloadParams = Partial<{
  topic: string;
  chat_type: string;
  status: string;
  chats: string;
  ordering: string;
  search: string;
  limit: string;
  offset: string;
}>;

export interface OrderCreationPayload {
  client: number;
}

export interface OrderCreationResponse {
  id: number;
  client: number;
}

export interface ChatList {
  id: number;
  client: Client;
  curator: Curator;
  topic: Topic;
  status: string;
  chat_type: string;
  curator_note: string;
  unread_messages_count: number;
  last_message: LastMessage;
}

export interface Curator {
  id: number;
  is_online: string;
}
export interface Client {
  id: number;
  is_online: string;
}

export interface ChatInfo {
  topic_count: number;
  order_count: number;
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
