import { AxiosPromise } from 'axios';
import { endpoints_client } from 'api/endpoints';
import Apis from '..';
import {
  ChatPayloadParams,
  ClientChatMessagePayload,
  ClientTopicsPayload,
  ClientCreateChatPayload,
  MarkCharReadPayload,
  ClientCreateChatResponce,
  ClientChatList,
  ClientTopicResponce
} from 'shared/types/client';
import { Message, CreateMessagePayload } from 'shared/types';
import { AxiosPaginatedResponse } from 'types/api';

export const getChatsLists = (
  params: ChatPayloadParams
): AxiosPromise<AxiosPaginatedResponse<ClientChatList>> => {
  return Apis.client_api.get(endpoints_client.chats_lists, { params });
};

export const getTopicsList = (
  params: ClientTopicsPayload
): AxiosPromise<AxiosPaginatedResponse<ClientTopicResponce>> => {
  return Apis.client_api.get(endpoints_client.topics_list, { params });
};

export const getMessageList = ({
  id,
  limit,
  offset
}: ClientChatMessagePayload): AxiosPromise<AxiosPaginatedResponse<Message>> => {
  const params = { limit, offset };
  return Apis.client_api.get(endpoints_client.chats_messages(id), { params });
};

export const createClientChats = (
  data: ClientCreateChatPayload
): AxiosPromise<ClientCreateChatResponce> => {
  return Apis.client_api.post(endpoints_client.create_chats, data);
};

export const createClientMessage = (
  data: CreateMessagePayload
): AxiosPromise<Message> => {
  return Apis.client_api.post(endpoints_client.create_message, data);
};

export const markChatMessagesAsReadClient = ({
  chat_id,
  message_id
}: MarkCharReadPayload): AxiosPromise => {
  return Apis.client_api.get(
    endpoints_client.mark_as_read_client(chat_id, message_id)
  );
};

export const createNewMessage = (
  data: CreateMessagePayload
): AxiosPromise<Message> => {
  return Apis.client_api.post(endpoints_client.create_message, data);
};
