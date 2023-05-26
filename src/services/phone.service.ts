import axios from "axios";
import { BASE_URL } from "../http";

interface Create {
  phone: string;
  comment: string;
}

export const Phone = {
  async getAll() {
    return await axios.get(`${BASE_URL}/phone`);
  },

  async create(crea: Create) {
    return await axios.post(`${BASE_URL}/phone`, crea);
  },

  async createMore(crea: Create[]) {
    return await axios.post(`${BASE_URL}/phone/more`, crea);
  },

  async getById(id: number) {
    return await axios.get(`${BASE_URL}/phone/${id}`);
  },

  async update(id: number) {
    return await axios.put(`${BASE_URL}/phone/${id}`);
  },

  async delete(id: number) {
    return await axios.delete(`${BASE_URL}/phone/${id}`);
  },

  async verify(phone: string) {
    return await axios.get(`${BASE_URL}/phone/verify/${phone}`);
  },
};
