import { Dispatch, SetStateAction } from 'react';
import { GrupoPi } from '../models/GrupoPi';
import { api } from './axios';

export const busca = async (url: string, setDado: Dispatch<SetStateAction<GrupoPi[]>>) => {
  const response = await api.get(`grupos/${url}`);
  setDado(response.data);
}

export const buscaGrupoTurma = async (numeroGrupo: string, turmaId: number) => {
  const response = await api.get(`grupos/${numeroGrupo}/${turmaId}`);

  return response.data;
}

export const add = async (grupo: GrupoPi) => {
  await api.post('grupos', {
    numeroGrupo: grupo.numeroGrupo,
    maisInfos: grupo.maisInfos,
    turma: {
      id: grupo.turma.id,
    }
  });
}