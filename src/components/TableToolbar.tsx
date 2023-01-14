import { AddCircleOutlineRounded, FilterAltRounded } from '@mui/icons-material';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar/Toolbar';
import React from 'react';

interface TableToolbarProps extends ToolbarProps {
  handleOpenFiltrar: () => void;
}

function TableToolbar(props: TableToolbarProps) {
  const { handleOpenFiltrar } = props;
  
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
            onClick={handleOpenFiltrar}
          >
            <FilterAltRounded />
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

export default TableToolbar