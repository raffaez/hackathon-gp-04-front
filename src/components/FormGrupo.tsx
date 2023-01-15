import {
  Box,
  Button,
  DialogActions,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { GrupoPi } from '../models/GrupoPi';
import { Turma } from '../models/Turma';
import { add, buscaGrupoTurma } from '../services/GrupoService';
import { busca as buscaTurma } from '../services/TurmaService';

const validationSchema = yup.object({
  numeroGrupo: yup
    .number()
    .min(1, 'É obrigatório preencher o número do grupo')
    .required('É obrigatório preencher o número do grupo')
    .test(
      "grupo-turma check", "Esse grupo já foi cadastrado nessa turma", async (value, schema) => {
        if (value && await buscaGrupoTurma(value.toString(), schema.parent.turma.id)) {
          return false;
        }
        return true;
      }
    ),
  turma: yup
    .object()
    .required('É obrigatório selecionar a turma'),
  maisInfos: yup
    .string()
    .required('É obrigatório preencher informações do grupo'),
});

interface FormGrupoProps {
  onClose: () => void;
}

function FormGrupo(props: FormGrupoProps) {
  const { onClose } = props;

  const [turmas, setTurmas] = useState<Turma[]>([{
    id: 0,
    descricao: '',
    isAtivo: true,
  }]);

  async function getTurma(){
    await buscaTurma("", setTurmas);
  }

  useEffect(() => {
    getTurma();
  }, [turmas.length]);

  const initialValues: GrupoPi = {
    id: 0,
    numeroGrupo: 0,
    maisInfos: '',
    turma: {
      id: 0,
      descricao: '',
      isAtivo: true,
    }
  };

  const onSave = () => {
    toast.success('Grupo cadastrado com sucesso!');
    onClose();  
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(values.turma.id<=0){
        values.turma.id=turmas[0].id;
      }
      
      await add(values);

      formik.resetForm();

      onSave();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <Box sx={{ mb: 2 }}>
          <Grid container>
            <Grid item xs={6} sx={{ paddingRight: 1 }}>
              <TextField
                id="numeroGrupo"
                name="numeroGrupo"
                label="Número do Grupo"
                fullWidth
                value={formik.values.numeroGrupo>0?formik.values.numeroGrupo:''}
                onChange={formik.handleChange}
                error={formik.touched.numeroGrupo && Boolean(formik.errors.numeroGrupo)}
                helperText={formik.touched.numeroGrupo && formik.errors.numeroGrupo}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="turma-label">Turma</InputLabel>
                <Select
                  labelId="turma-label"
                  id="turma.id"
                  name="turma.id"
                  label="Turma"
                  value={formik.values.turma.id>0?formik.values.turma.id:turmas[0].id}
                  onChange={formik.handleChange}
                >
                  {turmas.map((turma) => (
                    <MenuItem key={turma.id} value={turma.id}>{turma.descricao}</MenuItem>
                  ))}

                </Select>

              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <TextField
          id="maisInfos"
          name="maisInfos"
          label="Informações do Grupo"
          multiline
          rows={4}
          value={formik.values.maisInfos}
          onChange={formik.handleChange}
          error={formik.touched.maisInfos && Boolean(formik.errors.maisInfos)}
          helperText={formik.touched.maisInfos && formik.errors.maisInfos}
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

export default FormGrupo