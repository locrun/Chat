import { AxiosPromise } from 'axios';
import { endpoints_curator } from 'api/endpoints';
import Apis from '..';
import {
  ChatInfo,
  ChatListResponse,
  CreateMessagePayload,
  CreateMessage,
  CuratorChatPayloadParams,
  CuratorTopicsResponse,
  OrderCreationPayload,
  OrderCreationResponse,
  UpdateMessagesParams,
  UpdateMessagesResponse,
  UpdateTopic,
  Message,
  Note
} from 'shared/types/curator';

export const getChats = (
  params: CuratorChatPayloadParams
): AxiosPromise<ChatListResponse> => {
  return Apis.curator_api.get(endpoints_curator.chats_lists, { params });
};

export const createChats = (
  data: OrderCreationPayload
): AxiosPromise<OrderCreationResponse> => {
  return Apis.curator_api.post(endpoints_curator.create_chats, data);
};

export const updateChats = (
  id: number,
  data: UpdateTopic
): AxiosPromise<UpdateTopic> => {
  return Apis.curator_api.put(endpoints_curator.update_chats(id), data);
};

export const closeChats = (id: number): AxiosPromise<any> => {
  return Apis.curator_api.post(endpoints_curator.close_chat(id));
};

export const getChatInfoStatistics = (): AxiosPromise<ChatInfo> => {
  return Apis.curator_api.get(endpoints_curator.chats_info);
};

export const createCuratorMessage = (
  data: CreateMessagePayload
): AxiosPromise<CreateMessage> => {
  return Apis.curator_api.post(endpoints_curator.create_message, data);
};

export const updateMessage = (
  id: number,
  params: UpdateMessagesParams
): AxiosPromise<UpdateMessagesResponse> => {
  return Apis.curator_api.put(endpoints_curator.update_message(id), params);
};
export const deleteMessage = (id: number): AxiosPromise => {
  return Apis.curator_api.put(endpoints_curator.delete_message(id));
};

export const getCuratorTopics = (params: {
  limit: number;
  offset: number;
}): AxiosPromise<CuratorTopicsResponse> => {
  return Apis.curator_api.get(endpoints_curator.topics_list, { params });
};

export const markChatMessagesAsReadCurator = (
  chat_id: number,
  message_id: number
): AxiosPromise => {
  return Apis.curator_api.get(
    endpoints_curator.mark_as_read_curator(chat_id, message_id)
  );
};

export const getMessage = (id: number): AxiosPromise<Message> => {
  return Apis.curator_api.get(endpoints_curator.chats_messages(id));
};
export const getChatNote = (id: number): AxiosPromise<Note> => {
  return Apis.curator_api.get(endpoints_curator.get_note(id));
};
export const updateChatNote = (id: number, data: Note): AxiosPromise<Note> => {
  return Apis.curator_api.put(endpoints_curator.update_note(id), data);
};
