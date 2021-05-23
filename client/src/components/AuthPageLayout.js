import { Grid, styled } from "@material-ui/core";

import React from 'react';
import bannerImage from '../assets/images/bg-img.png';
import bubbleVector from '../assets/images/bubble.svg';

const SideBanner = styled(Grid)(({ theme }) => ({
  position: 'relative',
  background: `top center / cover no-repeat url(${bannerImage})`,

  minHeight: '100vh',

  '&::before': {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8532,
    background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },

  '& *': {
    zIndex: 1,
  },

  [theme.breakpoints.down('md')]: {
    display: 'none',
  }
}));

const BannerText = styled('span')(({ theme }) => ({
  fontSize: '26pt',
  lineHeight: '40px',
  textAlign: 'center',
  marginTop: 39,
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

const Container = styled(Grid)({
  padding: '30px 42px',
  display: 'flex',
  gap: 86,
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
});

const AuthPageLayout = ({ children }) => {
  return (
    <Grid container spacing={0}>
      <SideBanner container item xs={true} direction="column" alignItems="center" justify="center">
        <img src={bubbleVector} alt="" />
        <BannerText >Converse with anyone<br />with any language</BannerText>
      </SideBanner>
      <Container container item xs={8}>
        {children}
      </Container>
    </Grid>
  );
};

export default AuthPageLayout;
