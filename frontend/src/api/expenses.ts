import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

//Get all expenses for the logged-in user
export const getExpenses = async (token: string) => {
  try {
    const response = await api.get("/expenses/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching expenses: ", error.response || error.message);
    throw error;
  }
};

export const createExpense = async (token: string, data: any) => {
  const response = await api.post("/expenses/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
