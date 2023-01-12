import { AddCircleOutlineRounded } from '@mui/icons-material';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import {
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Image from 'mui-image';
import React, { useEffect, useState } from 'react';

import { Projeto } from '../models/Projeto';
import { busca } from '../services/ProjetoService';
import ModalFiltro from './ModalFiltro';

const TableToolbar = () => {
  return (
    <Toolbar>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tb_projetos"
          component="div"
        >
          Projetos
        </Typography>
        
        <Tooltip title="Filtrar">
          <IconButton>
            <FilterAltRoundedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Adicionar projeto">
          <IconButton>
            <AddCircleOutlineRounded />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
}

function ListaProjetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [turmas, setTurmas] = useState<string[]>([]);
  const colunas: string[] = ['Logo', 'Nome', 'Grupo', 'Turma', 'Link', 'Pitch'];
  const [open, setOpen] = useState<boolean>(true);

  async function getProjeto(){
    await busca("", setProjetos);
  }

  useEffect(() => {
    getProjeto();
  }, [projetos.length]);

  const handleConfirmar = (turmas: string[]) => {
    setTurmas(turmas);
    setOpen(false);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableToolbar />
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
              projetos.map((projeto) => (
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
        open={open}
        handleConfirmar={handleConfirmar}
      />
    </Paper>
  )
}

export default ListaProjetos