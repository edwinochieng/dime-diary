import API from "@/utils/api";

export const registerUser = (name: string, email: string, password: string) => {
  return API.post("/auth/signup", { full_name: name, email, password });
};

export const login = async (
  email: string,
  password: string
): Promise<{ access_token: string }> => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};
