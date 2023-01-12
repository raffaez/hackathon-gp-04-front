import { Dispatch, SetStateAction } from 'react';

import { Turma } from '../models/Turma';
import { api } from './axios';

export const busca = async (url: string, setDado: Dispatch<SetStateAction<Turma[]>>) => {
  const response = await api.get(`turmas/${url}`);
  setDado(response.data);
}