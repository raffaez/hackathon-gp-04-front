import { Box } from '@mui/material';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const addTurma = <div>Turma</div>;
  const addGrupo = <div>Grupo</div>;
  const addProjeto = <div>Projeto</div>;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {
            {
              0: addTurma,
              1: addGrupo,
              2: addProjeto
            }[index]
          }
        </Box>
      )}
    </div>
  );
}

export default TabPanel