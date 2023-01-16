import {
  Box,
  Button,
  DialogActions,
  FormControl,
  FormGroup,
  FormHelperText,
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

async function validarGrupoTurma(grupoId: number, turmaId: number){
  return !(await buscaGrupoTurma(grupoId.toString(), turmaId));
}

const validationSchema = yup.object({
  numeroGrupo: yup
    .number()
    .min(1, 'É obrigatório preencher o número do grupo')
    .required('É obrigatório preencher o número do grupo')
    .test(
      "validar-grupo-turma", "Esse grupo já foi cadastrado nessa turma", async (value, schema) => {
        if (value) {
          return await validarGrupoTurma(value, schema.parent.turma.id);
        }
        return true;
      }
    ),
  turma: yup
    .object()
    .shape({
      id: yup
        .number()
        .min(1, 'É obrigatório selecionar uma turma')
        .required('É obrigatório selecionar uma turma'),
    }),
  maisInfos: yup
    .string()
    .required('É obrigatório preencher informações do grupo'),
});

interface FormGrupoProps {
  handleSave: () => void;
}

function FormGrupo(props: FormGrupoProps) {
  const { handleSave } = props;

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
    handleSave();  
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
        <Box sx={{ mb: 1 }}>
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
              <FormControl fullWidth error={formik.touched.turma?.id && Boolean(formik.errors.turma?.id)}>
                <InputLabel id="turma-label">Turma</InputLabel>
                <Select
                  labelId="turma-label"
                  id="turma.id"
                  name="turma.id"
                  label="Turma"
                  value={formik.values.turma.id>0?formik.values.turma.id:''}
                  onChange={formik.handleChange}
                >
                  {turmas.map((turma) => (
                    <MenuItem key={turma.id} value={turma.id}>{turma.descricao}</MenuItem>
                  ))}

                </Select>
                {
                  formik.touched.turma?.id && 
                  <FormHelperText error={true}>{formik.errors.turma?.id}</FormHelperText>
                }
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