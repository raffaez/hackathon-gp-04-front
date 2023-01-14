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
  handleConfirmar: (turmas: string[], tipoTurmas: string) => void;
  onClose: () => void;
  turmasPreSelecionadas: string[];
  tipoTurmasPreSelecionado: string;
  turmas: Turma[];
}

function ModalFiltro(props: ModalFiltroProps) {
  const { onClose, handleConfirmar, turmasPreSelecionadas, tipoTurmasPreSelecionado, turmas } = props;
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>(turmasPreSelecionadas);
  const [tipoTurmas, setTipoTurmas] = useState<string>('');

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

  const handleChangeTipoTurma = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipoTurmas((event.target as HTMLInputElement).value);
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

          <Divider />

          <FormControl>
            <RadioGroup 
              onChange={handleChangeTipoTurma}
              defaultValue={tipoTurmasPreSelecionado}
            >
              <FormControlLabel value="1" control={<Radio />} label="Mostrar apenas turmas ativas" />
              <FormControlLabel value="2" control={<Radio />} label="Mostrar apenas turmas inativas" />
              <FormControlLabel value="3" control={<Radio />} label="Mostrar todas selecionadas" />
            </RadioGroup>
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleConfirmar(turmasSelecionadas, tipoTurmas)}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalFiltro