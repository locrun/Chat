import { AxiosPromise } from 'axios';
import { endpoints_curator } from 'api/endpoints';
import Apis from '..';
import {
  ChatInfo,
  ChatList,
  ChatFilterParams,
  CuratorTopicsResponse,
  OrderCreationPayload,
  OrderCreationResponse,
  UpdateMessagesParams,
  UpdateMessagesResponse,
  UpdateTopic,
  Note,
  AssignCuratorParams
} from 'shared/types/curator';
import { Message, CreateMessagePayload } from 'shared/types';
import { AxiosPaginatedResponse } from 'types/api';
import {
  ChatListMessagePayload,
  MarkCharReadPayload
} from 'shared/types/client';

export const getCuratorChats = (
  params: ChatFilterParams
): AxiosPromise<AxiosPaginatedResponse<ChatList>> => {
  return Apis.curator_api.get(endpoints_curator.chats_lists, { params });
};

export const assignCurator = (data: AssignCuratorParams) => {
  return Apis.curator_api.post(endpoints_curator.assign_curator, data);
};

export const createCuratorChats = (
  data: OrderCreationPayload
): AxiosPromise<OrderCreationResponse> => {
  return Apis.curator_api.post(endpoints_curator.create_chats, data);
};

export const getMessagesListCurator = ({
  id,
  limit,
  offset
}: ChatListMessagePayload): AxiosPromise<AxiosPaginatedResponse<Message>> => {
  const params = { limit, offset };
  return Apis.curator_api.get(endpoints_curator.chats_messages(id), { params });
};

export const updateCuratorChats = (
  id: number,
  data: UpdateTopic
): AxiosPromise<UpdateTopic> => {
  return Apis.curator_api.post(endpoints_curator.update_chats(id), data);
};

export const closeCurrentDialog = (id: number): AxiosPromise => {
  return Apis.curator_api.get(endpoints_curator.close_chat(id));
};

export const getChatInfoStatistics = (): AxiosPromise<ChatInfo> => {
  return Apis.curator_api.get(endpoints_curator.chats_info);
};

export const createCuratorMessage = (
  formData: CreateMessagePayload
): AxiosPromise<Message> => {
  return Apis.curator_api.post(endpoints_curator.create_message, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
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

export const markChatMessagesAsReadCurator = ({
  chat_id,
  message_id
}: MarkCharReadPayload): AxiosPromise => {
  return Apis.curator_api.get(
    endpoints_curator.mark_as_read_curator(chat_id, message_id)
  );
};

export const getCuratorChatsMessages = (id: number): AxiosPromise<Message> => {
  return Apis.curator_api.get(endpoints_curator.chats_messages(id));
};
export const getChatNote = (id: number): AxiosPromise<Note> => {
  return Apis.curator_api.get(endpoints_curator.get_note(id));
};
export const updateChatNote = (id: number, data: Note): AxiosPromise<Note> => {
  return Apis.curator_api.put(endpoints_curator.update_note(id), data);
};
