import API from "@/utils/api";

export const generateResponse = async (query: string): Promise<string> => {
  const res = await API.post(`/chat/generate-response`, query);
  return res.data.response;
};
