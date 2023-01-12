import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

import ListaProjetos from '../../components/ListaProjetos';

function Home() {

  return (
    <Container>
      <Box sx={{ width: '100%', my: 4 }}>
        <ListaProjetos />
      </Box>
    </Container>
  )
}

export default Home