export const endpoints_chat = {
  chats_lists: '/chats/',
  topics_list: '/topics/',
  messages_list: (id: number) => `/chats/${id}/messages/`,
  read_messages_list: (chat_id: number, message_id: number) =>
    `/chats/${chat_id}/messages/${message_id}/read/`,

  select_chat_topic: '/chats/',
  create_new_message: '/chats/messages/'
};
