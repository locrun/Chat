// eslint-disable-next-line no-unused-vars
import { AxiosPromise } from 'axios';
import { endpoints_client } from 'api/endpoints';
import Apis from '..';

export const getClientChats = (params: any): AxiosPromise<any> => {
  return Apis.client_api.get(endpoints_client.chats_lists, { params });
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

export const getClientChatsMessages = (id: number): AxiosPromise<any> => {
  return Apis.client_api.get(endpoints_client.chats_messages(id));
};

export const getClientTopics = (params: any): AxiosPromise<any> => {
  return Apis.client_api.get(endpoints_client.topics_list, { params });
};
