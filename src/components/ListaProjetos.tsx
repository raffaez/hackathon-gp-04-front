import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'mui-image';
import React, { useEffect, useState } from 'react';

import { Projeto } from '../models/Projeto';
import { Turma } from '../models/Turma';
import { busca as buscaProjeto } from '../services/ProjetoService';
import { busca as buscaTurma } from '../services/TurmaService';
import ModalFiltro from './ModalFiltro';
import TableToolbar from './TableToolbar';
import ModalAdd from './ModalAdd';


function ListaProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projetosFiltrados, setProjetosFiltrados] = useState<Projeto[]>([]);

  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>([]);
  const [statusTurmas, setStatusTurmas] = useState<string>('3');

  const colunas: string[] = ['Logo', 'Nome', 'Grupo', 'Turma', 'Link', 'Pitch'];

  const [openFiltrar, setOpenFiltrar] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);

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
          (statusTurmas === '1' && projeto.grupoPi.turma.isAtivo)
          || (statusTurmas === '2' && !projeto.grupoPi.turma.isAtivo)
          || (statusTurmas === '3')
        ){
          return true;
        }
      }
      return false;
    }
    ));
  }, [turmasSelecionadas, statusTurmas]);

  const handleConfirmar = (turmasSelecionadas: string[], statusTurmas: string) => {
    setTurmasSelecionadas(turmasSelecionadas);
    setStatusTurmas(statusTurmas);
    setOpenFiltrar(false);
  }

  const handleOpen = (modal: string) => {
    switch (modal) {
      case 'filtro':
        setOpenFiltrar(true);
        break;
      case 'add':
        setOpenAdd(true);
        break;
    }
  }

  const handleClose = (modal: string) => { 
    switch (modal) {
      case 'filtro':
        setOpenFiltrar(false);
        break;
      case 'add':
        setOpenAdd(false);
        break;
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableToolbar handleOpen={handleOpen} />
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
        statusTurmasPreSelecionado={statusTurmas}
        handleClose={handleClose}
        handleConfirmar={handleConfirmar}
        turmasPreSelecionadas={turmasSelecionadas}
      />

      <ModalAdd
        open={openAdd}
        handleClose={handleClose}
      />
    </Paper>
  )
}

export default ListaProjetos