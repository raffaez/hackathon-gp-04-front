import { Dispatch, SetStateAction } from 'react';
import { Projeto } from '../models/Projeto';
import { api } from './axios';

export const busca = async (url: string, setDado: Dispatch<SetStateAction<Projeto[]>>) => {
  const response = await api.get(`projetos/${url}`);
  setDado(response.data);
}