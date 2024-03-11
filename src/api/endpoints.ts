export const endpoints_client = {
  chats_lists: '/chats/',
  create_chats: '/chats/',
  create_message: '/chats/messages/',
  mark_as_read_client: (chat_id: number, message_id: number) =>
    `/chats/${chat_id}/messages/${message_id}/read/`,
  chats_messages: (id: number) => `/chats/${id}/messages/`,
  topics_list: '/topics/'
};
export const endpoints_curator = {
  chats_lists: '/chats/',
  create_chats: '/chats/',
  update_chats: (id: number) => `/chats/${id}/`,
  assign_curator: '/chats/assign/',
  close_chat: (id: number) => `/chats/${id}/close/`,
  chats_info: '/chats/info/',
  create_message: '/chats/messages/',
  update_message: (id: number) => `/chats/messages/${id}/`,
  delete_message: (id: number) => `/chats/messages/${id}/`,
  topics_list: '/chats/topics/',
  mark_as_read_curator: (chat_id: number, message_id: number) =>
    `/chats/${chat_id}/messages/${message_id}/read/`,
  chats_messages: (id: number) => `/chats/${id}/messages/`,
  get_note: (id: number) => `/chats/${id}/note/`,
  update_note: (id: number) => `/chats/${id}/note/`
};
