import { Box, Button, DialogActions, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { Turma } from '../models/Turma';
import { add } from '../services/TurmaService';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  descricao: yup
    .string()
    .required('É obrigatório preencher a descrição da turma'),
});

interface FormTurmaProps {
  onClose: () => void;
}

function FormTurma(props: FormTurmaProps) {
  const { onClose } = props;
  
  const initialValues: Turma = {
    id: 0,
    descricao: '',
    isAtivo: true,
  };

  const onSave = () => {
    toast.success('Projeto cadastrado com sucesso!');
    onClose();  
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await add(values);

      formik.resetForm();

      onSave();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="descricao"
            name="descricao"
            label="Descrição"
            value={formik.values.descricao}
            onChange={formik.handleChange}
            error={formik.touched.descricao && Boolean(formik.errors.descricao)}
            helperText={formik.touched.descricao && formik.errors.descricao}
          />
        </Box>
        <FormControlLabel 
          control={<Switch 
            id="isAtivo"
            name="isAtivo"
            defaultChecked
            value={formik.values.isAtivo}
            onChange={formik.handleChange}
          />}
          label="Turma ativa" 
        />
        <DialogActions>
          <Button type="submit">
            Salvar
          </Button>
        </DialogActions>
      </FormGroup>
    </form>

  )
}

export default FormTurma