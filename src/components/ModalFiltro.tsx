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
}

function ModalFiltro({handleConfirmar, ...props}: ModalFiltroProps) {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>([]);

  async function getTurma(){
    await busca("", setTurmas);
  }

  useEffect(() => {
    getTurma();
  
  }, [turmas.length]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if(!turmasSelecionadas.includes(event.target.id)){
        setTurmasSelecionadas([...turmasSelecionadas, event.target.id]);
      }
    } else {
      setTurmasSelecionadas(turmasSelecionadas.filter((turma) => turma !== event.target.id));
    }
  };
  

  return (
    <Dialog
      open={props.open}
    >
      <DialogTitle>Filtrar</DialogTitle>
      <DialogContent>
        <FormGroup>
          {
            turmas.map((turma) => (
              <FormControlLabel
                control={
                  <Checkbox 
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