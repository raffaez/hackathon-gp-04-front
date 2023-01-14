import { Box, Dialog, DialogContent, DialogProps, DialogTitle, Tab, Tabs } from '@mui/material';
import React from 'react';

import TabPanel from './TabPanel';
import FormTurma from './FormTurma';
import FormGrupo from './FormGrupo';

interface ModalAddProps extends DialogProps {
  handleClose: (modal: string) => void;
}

function ModalAdd(props: ModalAddProps) {
  const { handleClose } = props;
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
      </DialogTitle>
      <DialogContent sx={{ paddingY: 0 }}>
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Turma" />
            <Tab label="Grupo" />
            <Tab label="Projeto" />
          </Tabs>
          <Box sx={{ marginTop: 2 }}>
            <TabPanel value={value} index={0}>
              <FormTurma />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormGrupo />
            </TabPanel>
            <TabPanel value={value} index={2}>
              Projeto
            </TabPanel>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ModalAdd