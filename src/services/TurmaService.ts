import { Dispatch, SetStateAction } from 'react';

import { Turma } from '../models/Turma';
import { api } from './axios';

export const busca = async (url: string, setDado: Dispatch<SetStateAction<Turma[]>>) => {
  const response = await api.get(`turmas/${url}`);
  setDado(response.data);
}

export const add = async (turma: Turma) => {
  const response = await api.post('turmas', {
    descricao: turma.descricao,
    isAtivo: turma.isAtivo,
  });
  console.log(response.data);

}