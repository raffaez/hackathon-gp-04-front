import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Turma } from '../models/Turma';

interface ModalFiltroProps extends DialogProps {
  handleConfirmar: (turmas: string[], statusTurmas: string) => void;
  handleClose: (modal: string) => void;
  turmasPreSelecionadas: string[];
  statusTurmasPreSelecionado: string;
  turmas: Turma[];
}

function ModalFiltro(props: ModalFiltroProps) {
  const { handleClose, handleConfirmar, turmasPreSelecionadas, statusTurmasPreSelecionado, turmas } = props;
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>(turmasPreSelecionadas);
  const [statusTurmas, setStatusTurmas] = useState<string>('');

  useEffect(() => {
    setTurmasSelecionadas(turmasPreSelecionadas);
  }, [turmasPreSelecionadas]);

  const handleChangeTurma = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if(!turmasSelecionadas.includes(event.target.id)){
        setTurmasSelecionadas([...turmasSelecionadas, event.target.id]);
      }
    } else {
      setTurmasSelecionadas(turmasSelecionadas.filter((turma) => turma !== event.target.id));
    }
  };

  const handleChangeStatusTurmas = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusTurmas((event.target as HTMLInputElement).value);
  };
  

  return (
    <Dialog
      open={props.open}
      onClose={handleClose.bind(null, 'filtro')}
    >
      <DialogTitle>Filtrar</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControl>
            <FormLabel>Turmas</FormLabel>
            {
              turmas.map((turma) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={turmasSelecionadas.includes(turma.id.toString())}
                      onChange={handleChangeTurma}
                      id={turma.id.toString()} 
                    />
                  }
                  key={turma.id} 
                  label={turma.descricao} />
              ))
            }
          </FormControl>

          <FormControl>
            <FormLabel>Status</FormLabel>
            <RadioGroup 
              onChange={handleChangeStatusTurmas}
              defaultValue={statusTurmasPreSelecionado ? statusTurmasPreSelecionado : '3'}
            >
              <FormControlLabel value="1" control={<Radio />} label="Mostrar apenas turmas ativas" />
              <FormControlLabel value="2" control={<Radio />} label="Mostrar apenas turmas inativas" />
              <FormControlLabel value="3" control={<Radio />} label="Mostrar todas selecionadas" />
            </RadioGroup>
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleConfirmar(turmasSelecionadas, statusTurmas)}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalFiltro