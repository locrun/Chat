import { MessageType, File, LastMessage, Topic, StatusType, ChatType } from '.';

export interface ChatPayloadParams {
  topic?: string;
  ordering?: string;
  search?: string;
  limit?: number;
  offset?: string;
}

export interface ClientCreateChatPayload {
  topic: number;
}

export interface MarkCharReadPayload {
  chat_id: number;
  message_id: number;
}

export interface ClientChatMessagePayload {
  id: number;
  limit?: number;
  offset?: number;
}

export interface ClientTopicsPayload {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ClientChatListResponse {
  results: ClientChatList[];
}

export interface ClientChatList {
  id: number;
  topic: Topic;
  created_at: string;
  status: StatusType;
  chat_type: ChatType;
  last_message: LastMessage;
  unread_messages_count: number;
}

export interface ClientCreateChatResponce {
  id: number;
  topic: number;
  created_at: string;
  status: StatusType;
  chat_type: ChatType;
}

export interface ClientCreateMessageResponce {
  text: string;
  message_type: MessageType;
  files: File;
  chat: 1;
}

export interface ClientTopicsResponce {
  results: ClientTopicResponce[];
}

export interface ClientTopicResponce {
  id: number;
  title: string;
  description: string;
  logo: string;
}
