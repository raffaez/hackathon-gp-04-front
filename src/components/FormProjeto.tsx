import {
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
import { Projeto } from '../models/Projeto';
import { Turma } from '../models/Turma';
import { busca as buscaGrupo } from '../services/GrupoService';
import { add, buscaProjetoGrupo } from '../services/ProjetoService';
import { busca as buscaTurma } from '../services/TurmaService';

async function validarGrupo(grupoId: number){
  return await buscaProjetoGrupo(grupoId);
}

const validationSchema = yup.object({
  nomeProjeto: yup
    .string()
    .required('É obrigatório preencher o nome do projeto'),
  logoProjeto: yup
    .string()
    .matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g, 'É obrigatório informar um link para o logo do projeto')
    .required('É obrigatório preencher o logo do projeto'),
  linkProjeto: yup
    .string()
    .matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g, 'É obrigatório informar um link para o projeto')
    .required('É obrigatório preencher o link do projeto'),
  pitProjeto: yup
    .string()
    .matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g, 'É obrigatório informar um link para o pit do projeto')
    .required('É obrigatório preencher o pit do projeto'),
  grupoPi: yup
    .object()
    .shape({
      id: yup
        .number()
        .test('obrigatorio', 'É obrigatório selecionar um grupo', (value) => {
          if(value && value > 0){
            return true;
          }
          return false;
        })
        .test('validar-grupo', 'O grupo selecionado já possui um projeto', async (value) => {
          if(value && await validarGrupo(value)){
            return false;
          }
          return true;
        })
    })
  });

interface FormProjetoProps {
  onClose: () => void;
}

function FormProjeto(props: FormProjetoProps) {
  const { onClose } = props;
  
  const [turmas, setTurmas] = useState<Turma[]>([{
    id: 0,
    descricao: '',
    isAtivo: true,
  }]);

  const [grupos, setGrupos] = useState<GrupoPi[]>([{
    id: 0,
    numeroGrupo: 0,
    maisInfos: '',
    turma: {
      id: 0,
      descricao: '',
      isAtivo: true,
    }
  }]);

  async function getGrupos(){
    await buscaGrupo("", setGrupos);
  }

  useEffect(() => {
    getGrupos();
  }, [grupos.length]);

  async function getTurma(){
    await buscaTurma("", setTurmas);
  }

  useEffect(() => {
    getTurma();
  }, [turmas.length]);

  const initialValues: Projeto = {
    id: 0,
    nomeProjeto: '',
    logoProjeto: '',
    linkProjeto: '',
    pitProjeto: '',
    grupoPi: {
      id: 0,
      numeroGrupo: 0,
      maisInfos: '',
      turma: {
        id: 0,
        descricao: '',
        isAtivo: true,
      }
    }
  };

  const onSave = () => {
    toast.success('Projeto cadastrado com sucesso!');
    onClose();  
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if(values.grupoPi.id<=0){
        values.grupoPi.id=grupos[0].id;
      }

      await add(values);

      formik.resetForm();

      onSave();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
          <Grid container>
            <Grid item xs={12} sx={{ pb: 1 }}>
              <TextField
                id="nomeProjeto"
                name="nomeProjeto"
                label="Nome do Projeto"
                fullWidth
                value={formik.values.nomeProjeto}
                onChange={formik.handleChange}
                error={formik.touched.nomeProjeto && Boolean(formik.errors.nomeProjeto)}
                helperText={formik.touched.nomeProjeto && formik.errors.nomeProjeto}
              />
            </Grid>
            <Grid container item xs={12} sx={{ pb: 1 }}>
              <Grid item xs={6} sx={{ paddingRight: 1 }}>
                <TextField
                    id="logoProjeto"
                    name="logoProjeto"
                    label="Logo"
                    fullWidth
                    value={formik.values.logoProjeto}
                    onChange={formik.handleChange}
                    error={formik.touched.logoProjeto && Boolean(formik.errors.logoProjeto)}
                    helperText={formik.touched.logoProjeto && formik.errors.logoProjeto}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="linkProjeto"
                  name="linkProjeto"
                  label="Link"
                  fullWidth
                  value={formik.values.linkProjeto}
                  onChange={formik.handleChange}
                  error={formik.touched.linkProjeto && Boolean(formik.errors.linkProjeto)}
                  helperText={formik.touched.linkProjeto && formik.errors.linkProjeto}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ paddingRight: 1 }}>
              <TextField
                id="pitProjeto"
                name="pitProjeto"
                label="Pitch"
                fullWidth
                value={formik.values.pitProjeto}
                onChange={formik.handleChange}
                error={formik.touched.pitProjeto && Boolean(formik.errors.pitProjeto)}
                helperText={formik.touched.pitProjeto && formik.errors.pitProjeto}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={formik.touched.grupoPi?.id && Boolean(formik.errors.grupoPi?.id)}>
                <InputLabel id="grupo-label">Grupo</InputLabel>
                <Select
                  labelId="grupo-label"
                  id="grupoPi.id"
                  name="grupoPi.id"
                  label="Grupo"
                  value={formik.values.grupoPi.id>0 ? formik.values.grupoPi.id : ''}
                  error={formik.touched.grupoPi?.id && Boolean(formik.errors.grupoPi?.id)}
                  onChange={formik.handleChange}
                >
                  {
                    grupos.map((grupo) => (
                      <MenuItem key={grupo.id} value={grupo.id}>
                        Grupo {grupo.numeroGrupo} - {grupo.turma.descricao}
                      </MenuItem>
                    ))
                  }

                </Select>
                {
                  formik.touched.grupoPi?.id && 
                  <FormHelperText error={true}>{formik.errors.grupoPi?.id}</FormHelperText>
                }
              </FormControl>
            </Grid>
          </Grid>

        
        <DialogActions>
          <Button type="submit">
            Salvar
          </Button>
        </DialogActions>
      </FormGroup>
    </form>

  )
}

export default FormProjeto