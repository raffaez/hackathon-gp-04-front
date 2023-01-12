import { Turma } from './Turma';

export interface GrupoPi {
  id: number;
  numeroGrupo: number;
  maisInfos: string;
  turma: Turma;
}