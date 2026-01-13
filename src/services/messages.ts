import { api } from "./clients";

type SendPayload = {
  content: string;
  receiver_id: number;
  job_id: number;
};

// getConversation returns raw backend rows (array)
export const getConversation = async (receiverId: number, token: string) => {
  const res = await api.get(`/messages/chats/message/${receiverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Expect res.data to be an array of backend messages
  return res.data;
};

export const AllChats = async(token: string) => {
  const res = await api.get('/messages', 
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
  );

  return res.data;
};

// sendMessage posts to /messages/ and returns a GiftedChat-like message
export const sendMessage = async (data: SendPayload, token: string) => {
  const res = await api.post(`/messages/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

// services/message.ts



