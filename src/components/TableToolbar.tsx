import { AddCircleOutlineRounded, FilterAltRounded } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar/Toolbar';
import React from 'react';

interface TableToolbarProps extends ToolbarProps {
  handleOpen: (modal: string) => void;
}

function TableToolbar(props: TableToolbarProps) {
  const { handleOpen } = props;
  
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
        
        <Tooltip title="Filtrar turmas"
        >
          <IconButton
            onClick={handleOpen.bind(null, 'filtro')}
          >
            <FilterAltRounded />
          </IconButton>
        </Tooltip>

        <Tooltip title="Cadastrar">
          <IconButton
            onClick={handleOpen.bind(null, 'add')}
          >
            <AddCircleOutlineRounded />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
}

export default TableToolbar