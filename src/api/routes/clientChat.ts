import { AxiosPromise } from 'axios';
import { endpoints_chat } from 'api/endpoints';
import Apis from '..';
import { AxiosPaginatedResponse, DefaultPaginationParams } from 'types/api';
import {
  Chat,
  CreateChatResponse,
  CreateMessagePayload,
  Message,
  Topic,
  TopicData
} from 'types/chat';

export const getChatsLists = (
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Chat[]>> => {
  return Apis.chat_api.get(endpoints_chat.chats_lists, { params });
};
export const getTopicsList = (
  params: DefaultPaginationParams
): AxiosPromise<AxiosPaginatedResponse<Topic[]>> => {
  return Apis.chat_api.get(endpoints_chat.topics_list, { params });
};
export const getMessageList = (
  id: number
): AxiosPromise<AxiosPaginatedResponse<Message[]>> => {
  return Apis.chat_api.get(endpoints_chat.messages_list(id));
};

export const getListReadMessages = (
  chat_id: number,
  message_id: number
): AxiosPromise<any> => {
  return Apis.chat_api.get(
    endpoints_chat.read_messages_list(chat_id, message_id)
  );
};

export const selectTopicChat = (
  data: TopicData
): AxiosPromise<CreateChatResponse> => {
  return Apis.chat_api.post(endpoints_chat.select_chat_topic, data);
};
export const createNewMessage = (
  data: CreateMessagePayload
): AxiosPromise<Message> => {
  return Apis.chat_api.post(endpoints_chat.create_new_message, data);
};
