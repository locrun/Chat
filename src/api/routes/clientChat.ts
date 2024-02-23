import { AxiosPromise } from 'axios';
import { endpoints_chat } from 'api/endpoints';
import Apis from '..';

export const getChatsLists = (params: any): AxiosPromise<any> => {
  return Apis.chat_api.get(endpoints_chat.chats_lists, { params });
};
export const getTopicsList = (params: any): AxiosPromise<any> => {
  return Apis.chat_api.get(endpoints_chat.topics_list, { params });
};
export const getMessageList = (id: number): AxiosPromise<any> => {
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

export const selectTopicChat = (data: any): AxiosPromise<any> => {
  return Apis.chat_api.post(endpoints_chat.select_chat_topic, data);
};
export const createNewMessage = (data: any): AxiosPromise<any> => {
  return Apis.chat_api.post(endpoints_chat.create_new_message, data);
};
