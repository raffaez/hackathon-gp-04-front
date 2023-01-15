import { CloseRounded } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogProps, DialogTitle, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import React from 'react';

import FormGrupo from './FormGrupo';
import FormProjeto from './FormProjeto';
import FormTurma from './FormTurma';
import TabPanel from './TabPanel';

interface ModalAddProps extends DialogProps {
  handleClose: (modal: string) => void;
  temTurmas: boolean;
  temGrupos: boolean;
}

function ModalAdd(props: ModalAddProps) {
  const { handleClose, temTurmas, temGrupos } = props;
  const [value, setValue] = React.useState(0);

  const onClose = () => { handleClose('add') }

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
              temTurmas ? <Tab label="Grupo" /> 
              : <Tooltip title="Cadastre uma turma primeiro" placement="top" arrow>
                  <span><Tab label="Grupo" disabled /></span>
                </Tooltip>
            }
            {
              temGrupos ? <Tab label="Projeto" />
              : <Tooltip title="Cadastre um grupo primeiro" placement="top" arrow>
                  <span><Tab label="Projeto" disabled /></span>
                </Tooltip>
            }
          </Tabs>
          <Box sx={{ marginTop: 2 }}>
            <TabPanel value={value} index={0}>
              <FormTurma onClose={onClose} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormGrupo onClose={onClose} />
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