import { CloseRounded } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogProps, DialogTitle, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';

import FormGrupo from './FormGrupo';
import FormProjeto from './FormProjeto';
import FormTurma from './FormTurma';
import TabPanel from './TabPanel';
import { GrupoPi } from '../models/GrupoPi';
import { Turma } from '../models/Turma';
import { busca as buscaTurma } from '../services/TurmaService';
import { busca as buscaGrupo } from '../services/GrupoService';

interface ModalAddProps extends DialogProps {
  handleClose: (modal: string) => void;
}

function ModalAdd(props: ModalAddProps) {
  const { handleClose } = props;
  const [value, setValue] = useState(0);
  
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [gruposPi, setGruposPi] = useState<GrupoPi[]>([]);

  const [temTurmas, setTemTurmas] = useState<boolean>(
    turmas.length > 0 ? true : false
  );
  const [temGrupos, setTemGrupos] = useState<boolean>(
    gruposPi.length > 0 ? true : false
  );

  async function getTurma(){
    await buscaTurma("", setTurmas);
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

  const onClose = () => { 
    handleClose('add');
  }

  const handleSave = () => {
    getTurma();
    getGrupo();
  };

  useEffect(() => {
    setTemTurmas(turmas.length > 0 ? true : false);
    setTemGrupos(gruposPi.length > 0 ? true : false);
  }, [turmas, gruposPi]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={props.open}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>
        Cadastrar
        
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingY: 0 }}>
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Turma" />
            {
              temTurmas && <Tab label="Grupo" /> 
            }
            {
              !temTurmas && 
                <Tooltip title="Cadastre uma turma primeiro" placement="top" arrow>
                  <span><Tab label="Grupo" disabled /></span>
                </Tooltip>
            }
            {
              temGrupos && <Tab label="Projeto" />
            }
            {
              !temGrupos && 
                <Tooltip title="Cadastre um grupo primeiro" placement="top" arrow>
                  <span><Tab label="Projeto" disabled /></span>
                </Tooltip>
            }
          </Tabs>
          <Box sx={{ marginTop: 2 }}>
            <TabPanel value={value} index={0}>
              <FormTurma handleSave={handleSave} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormGrupo handleSave={handleSave} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <FormProjeto onClose={onClose} />
            </TabPanel>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAdd