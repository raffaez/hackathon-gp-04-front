import { Dispatch, SetStateAction } from 'react';
import { Projeto } from '../models/Projeto';
import { api } from './axios';

export const busca = async (url: string, setDado: Dispatch<SetStateAction<Projeto[]>>) => {
  const response = await api.get(`projetos/${url}`);
  setDado(response.data);
}

export const buscaProjetoGrupo = async (grupoId: number) => {
  const response = await api.get(`projetos/grupo/${grupoId}`);

  return response.data;
}

export const add = async (projeto: Projeto) => {
  await api.post('projetos', {
    nomeProjeto: projeto.nomeProjeto,
    logoProjeto: projeto.logoProjeto,
    linkProjeto: projeto.linkProjeto,
    pitProjeto: projeto.pitProjeto,
    grupoPi: { id: projeto.grupoPi.id }
  });
}