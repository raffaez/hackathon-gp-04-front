import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { Turma } from '../models/Turma';
import { busca } from '../services/TurmaService';

interface ModalFiltroProps extends DialogProps {
  handleConfirmar: (turmas: string[]) => void;
  onClose: () => void;
  turmasPreSelecionadas: string[];
}

function ModalFiltro(props: ModalFiltroProps) {
  const { onClose, handleConfirmar, turmasPreSelecionadas } = props;
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>(turmasPreSelecionadas);

  async function getTurma(){
    await busca("", setTurmas);
  }

  useEffect(() => {
    getTurma();
  }, [turmas.length]);

  useEffect(() => {
    setTurmasSelecionadas(turmasPreSelecionadas);
  }, [turmasPreSelecionadas]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if(!turmasSelecionadas.includes(event.target.id)){
        setTurmasSelecionadas([...turmasSelecionadas, event.target.id]);
      }
    } else {
      setTurmasSelecionadas(turmasSelecionadas.filter((turma) => turma !== event.target.id));
    }
  };

  const handleClose = () => {
    onClose();
  }
  

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Filtrar</DialogTitle>
      <DialogContent>
        <FormGroup>
          {
            turmas.map((turma) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={turmasSelecionadas.includes(turma.id.toString())}
                    onChange={handleChange}
                    id={turma.id.toString()} 
                  />
                }
                key={turma.id} 
                label={turma.descricao} />
            ))
          }
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleConfirmar(turmasSelecionadas)}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalFiltro