import { GrupoPi } from './GrupoPi';

export interface Projeto {
  id: number;
  nomeProjeto: string;
  logoProjeto: string;
  linkProjeto: string;
  pitProjeto: string;
  grupoPi: GrupoPi;
}