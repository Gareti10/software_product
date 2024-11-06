import axios from 'axios';

const API_URL = "http://127.0.0.1:8003/v1/api/produtos";

export const fetchProducts = async () => {
  return await axios.get(`${API_URL}/listar_todos`);
};

export const createProduct = async (product) => {
  return await axios.post(`${API_URL}/criar`, product);
};

export const addNewProduct  = async (id, product) => {
  return await axios.put(`${API_URL}/update/${id}`, product);
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/delete/${id}`);
};

export const aumentarCaixas = async (id, quantidade) => {
  return await axios.put(`${API_URL}/aumentar_caixas/${id}?quantidade=1`);
};

export const diminuirCaixas = async (id, quantidade) => {
  return await axios.put(`${API_URL}/diminuir_caixas/${id}?quantidade=1`);
};


