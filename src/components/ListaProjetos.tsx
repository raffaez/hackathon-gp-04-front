import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'mui-image';
import React, { useEffect, useState } from 'react';

import { Projeto } from '../models/Projeto';
import { Turma } from '../models/Turma';
import { busca as buscaProjeto } from '../services/ProjetoService';
import { busca as buscaTurma } from '../services/TurmaService';
import ModalFiltro from './ModalFiltro';
import TableToolbar from './TableToolbar';


function ListaProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projetosFiltrados, setProjetosFiltrados] = useState<Projeto[]>([]);

  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>([]);
  const [tipoTurmas, setTipoTurmas] = useState<string>('3');

  const colunas: string[] = ['Logo', 'Nome', 'Grupo', 'Turma', 'Link', 'Pitch'];

  const [openFiltrar, setOpenFiltrar] = useState<boolean>(false);

  async function getProjeto(){
    await buscaProjeto("", setProjetos);
  }

  useEffect(() => {
    getProjeto();
  }, [projetos.length]);

  async function getTurma(){
    await buscaTurma("", setTurmas);
    setTurmasSelecionadas(turmas.map((turma) => turma.id.toString())); 
  }

  useEffect(() => {
    getTurma();
  }, [turmas.length]);

  useEffect(() => {
    setProjetosFiltrados(projetos.filter((projeto) => {
      if (turmasSelecionadas.includes(projeto.grupoPi.turma.id.toString())){
        if (
          (tipoTurmas === '1' && projeto.grupoPi.turma.isAtivo)
          || (tipoTurmas === '2' && !projeto.grupoPi.turma.isAtivo)
          || (tipoTurmas === '3')
        ){
          return true;
        }
      }
      return false;
    }
    ));
  }, [turmasSelecionadas, tipoTurmas]);

  const handleConfirmar = (turmasSelecionadas: string[], tipoTurmas: string) => {
    setTurmasSelecionadas(turmasSelecionadas);
    setTipoTurmas(tipoTurmas);
    setOpenFiltrar(false);
  }

  const handleOpenFiltrar = () => {
    setOpenFiltrar(true);
  }

  const handleCloseFiltrar = () => {
    setOpenFiltrar(false);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableToolbar handleOpenFiltrar={handleOpenFiltrar} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
                colunas.map((coluna) => (
                  <TableCell key={coluna} align="left">{coluna}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              projetosFiltrados.map((projeto) => (
                <TableRow
                  key={projeto.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Image 
                    width={40} 
                    src={projeto.logoProjeto} 
                    alt={projeto.nomeProjeto} 
                    duration={100}
                    />
                  </TableCell>
                  <TableCell align="left">{projeto.nomeProjeto}</TableCell>
                  <TableCell align="left">{projeto.grupoPi.numeroGrupo}</TableCell>
                  <TableCell align="left">{projeto.grupoPi.turma.descricao}</TableCell>
                  <TableCell align="left">
                    <Link href={projeto.linkProjeto} rel="noreferrer" target="_blank">Deploy</Link>
                  </TableCell>
                  <TableCell align="left">
                    <Link href={projeto.pitProjeto}>Pitch</Link>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    
      <ModalFiltro 
        open={openFiltrar}
        turmas={turmas}
        tipoTurmasPreSelecionado={tipoTurmas}
        onClose={handleCloseFiltrar}
        handleConfirmar={handleConfirmar}
        turmasPreSelecionadas={turmasSelecionadas}
      />
    </Paper>
  )
}

export default ListaProjetos