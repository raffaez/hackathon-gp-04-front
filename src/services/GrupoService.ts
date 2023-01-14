import { GrupoPi } from '../models/GrupoPi';
import { api } from './axios';

export const add = async (grupo: GrupoPi) => {
  await api.post('grupos', {
    numeroGrupo: grupo.numeroGrupo,
    maisInfos: grupo.maisInfos,
    turma: {
      id: grupo.turma.id,
    }
  });

}