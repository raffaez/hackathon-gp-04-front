import { Button, CircularProgress, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Image from 'mui-image';
import React, { useEffect, useState } from 'react';

import { Projeto } from '../models/Projeto';
import { Turma } from '../models/Turma';
import { busca as buscaProjeto } from '../services/ProjetoService';
import { busca as buscaTurma } from '../services/TurmaService';
import ModalFiltro from './ModalFiltro';
import TableToolbar from './TableToolbar';
import ModalAdd from './ModalAdd';
import { GrupoPi } from '../models/GrupoPi';
import { busca as buscaGrupo } from '../services/GrupoService';
import { AddRounded } from '@mui/icons-material';


function ListaProjetos() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [projetosFiltrados, setProjetosFiltrados] = useState<Projeto[]>([]);

  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>([]);
  const [statusTurmas, setStatusTurmas] = useState<string>('3');

  const [gruposPi, setGruposPi] = useState<GrupoPi[]>([]);

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
    await buscaTurma("", setTurmas)
      .then(() => {
        setTurmasSelecionadas(turmas.map((turma) => turma.id.toString())); 

        setInterval(() => {
          setIsLoading(false);
        },  200);
      });
  }

  useEffect(() => {
    getTurma();
  }, [turmas.length]);

  async function getGrupo(){
    await buscaGrupo("", setGruposPi);
  }

  useEffect(() => {
    getGrupo();
  }, [gruposPi.length]);

  useEffect(() => {
    setProjetosFiltrados(projetos.filter((projeto) => {
      if (turmasSelecionadas.includes(projeto.grupoPi.turma.id.toString())){
        if (
          (statusTurmas === '1' && projeto.grupoPi.turma.isAtivo)
          || (statusTurmas === '2' && !projeto.grupoPi.turma.isAtivo)
          || (statusTurmas !== '1' && statusTurmas !== '2')
        ){
          return true;
        }
      }
      return false;
    }
    ));
  }, [turmasSelecionadas, statusTurmas, projetos.length]);

  const handleConfirmar = (turmasSelecionadas: string[], statusTurmas: string) => {
    setTurmasSelecionadas(turmasSelecionadas);
    setStatusTurmas(statusTurmas);
    handleClose('filtro');
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
        getProjeto();
        break;
      case 'add':
        setOpenAdd(false);
        getProjeto();
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
          <Grid container justifyContent="center" alignItems="center">
              {
                isLoading ?
                  <Grid item sx={{ py: 3 }} textAlign="center">
                    <CircularProgress />
                  </Grid>
                :
                  projetosFiltrados.length === 0 && (
                    <Grid item sx={{ py: 3 }} textAlign="center">
                      <Typography variant="h6" color="text.secondary">
                        Nenhum projeto encontrado
                      </Typography>
                      <Button 
                        variant="contained" 
                        endIcon={<AddRounded />} 
                        sx={{ mt: 2 }}
                        onClick={() => handleOpen('add')}
                      >
                        Adicionar projeto
                      </Button>
                    </Grid>
                  )
              }
          </Grid>
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
        temTurmas={turmas.length > 0}
        temGrupos={gruposPi.length > 0}
      />
    </Paper>
  )
}

export default ListaProjetos