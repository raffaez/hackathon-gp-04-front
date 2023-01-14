import { Button, DialogActions, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { Turma } from '../models/Turma';
import { add } from '../services/TurmaService';

const validationSchema = yup.object({
  descricao: yup
    .string()
    .required('Descrição é obrigatória'),
});

function FormTurma() {
  const initialValues: Turma = {
    id: 0,
    descricao: '',
    isAtivo: true,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await add(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <TextField
          id="descricao"
          name="descricao"
          label="Descrição"
          value={formik.values.descricao}
          onChange={formik.handleChange}
          error={formik.touched.descricao && Boolean(formik.errors.descricao)}
          helperText={formik.touched.descricao && formik.errors.descricao}
        />
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