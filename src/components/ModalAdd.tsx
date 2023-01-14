import { Box, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Tab, Tabs } from '@mui/material';
import React from 'react';
import TabPanel from './TabPanel';

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
      <DialogContent>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Turma" />
            <Tab label="Grupo" />
            <Tab label="Projeto" />
          </Tabs>
          <TabPanel value={value} index={0}>
            Turma
          </TabPanel>
          <TabPanel value={value} index={1}>
            Grupo
          </TabPanel>
          <TabPanel value={value} index={2}>
            Projeto
          </TabPanel>
        </Box>
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  )
}

export default ModalAdd