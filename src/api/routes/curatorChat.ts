import { AxiosPromise } from 'axios';
import { endpoints_curator } from 'api/endpoints';
import Apis from '..';

export const getCuratorChats = (params: any): AxiosPromise<any> => {
  return Apis.curator_api.get(endpoints_curator.chats_lists, { params });
};

export const createCuratorChats = (data: any): AxiosPromise<any> => {
  return Apis.curator_api.post(endpoints_curator.create_chats, data);
};

export const updateCuratorChats = (
  id: number,
  data: any
): AxiosPromise<any> => {
  return Apis.curator_api.post(endpoints_curator.update_chats(id), data);
};

export const closeCuratorChats = (id: number): AxiosPromise<any> => {
  return Apis.curator_api.post(endpoints_curator.close_chat(id));
};

export const getChatInfoStatistics = (params: any): AxiosPromise<any> => {
  return Apis.curator_api.get(endpoints_curator.chats_info, { params });
};

export const createCuratorMessage = (data: any): AxiosPromise<any> => {
  return Apis.curator_api.post(endpoints_curator.create_message, data);
};

export const updateMessage = (id: number, params: any): AxiosPromise<any> => {
  return Apis.curator_api.put(endpoints_curator.update_message(id), params);
};
export const deleteMessage = (id: number): AxiosPromise<any> => {
  return Apis.curator_api.put(endpoints_curator.delete_message(id));
};

export const getCuratorTopics = (params: any): AxiosPromise<any> => {
  return Apis.curator_api.get(endpoints_curator.topics_list, { params });
};

export const markChatMessagesAsReadCurator = (
  chat_id: number,
  message_id: number
): AxiosPromise<any> => {
  return Apis.curator_api.get(
    endpoints_curator.mark_as_read_curator(chat_id, message_id)
  );
};

export const getCuratorChatsMessages = (id: number): AxiosPromise<any> => {
  return Apis.curator_api.get(endpoints_curator.chats_messages(id));
};
export const getChatNote = (id: number): AxiosPromise<any> => {
  return Apis.curator_api.get(endpoints_curator.get_note(id));
};
export const updateChatNote = (id: number, data: any): AxiosPromise<any> => {
  return Apis.curator_api.put(endpoints_curator.update_note(id), data);
};
