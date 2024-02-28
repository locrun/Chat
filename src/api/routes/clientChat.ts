import { AxiosPromise } from 'axios';
import { endpoints_client } from 'api/endpoints';
import Apis from '..';
import { AxiosPaginatedResponse, DefaultPaginationParams } from 'types/api';
import { Chat, CreateMessagePayload, Message, Topic } from 'types/chat';

export const getChatsLists = (
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Chat[]>> => {
  return Apis.client_api.get(endpoints_client.chats_lists, { params });
};
export const getTopicsList = (
  params?: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Topic>> => {
  return Apis.client_api.get(endpoints_client.topics_list, { params });
};
export const getMessageList = (
  id: number
): AxiosPromise<AxiosPaginatedResponse<Message[]>> => {
  return Apis.client_api.get(endpoints_client.chats_messages(id));
};

export const createClientChats = (data: any): AxiosPromise<any> => {
  return Apis.client_api.post(endpoints_client.create_chats, data);
};

export const createClientMessage = (data: any): AxiosPromise<any> => {
  return Apis.client_api.post(endpoints_client.create_message, data);
};

export const markChatMessagesAsReadClient = (
  chat_id: number,
  message_id: number
): AxiosPromise<any> => {
  return Apis.client_api.get(
    endpoints_client.mark_as_read_client(chat_id, message_id)
  );
};

export const createNewMessage = (
  data: CreateMessagePayload
): AxiosPromise<Message> => {
  return Apis.client_api.post(endpoints_client.create_message, data);
};
