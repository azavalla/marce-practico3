import styled from "styled-components";

import "./App.css";
import React, { Component } from "react";
import { Header } from "./Header";
import Juego from "./Juego";
import { Titulo } from "./Titulo";
import { Box, FormControlLabel, Grow, Paper, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    "font-size": "2em",
    position: "relative",
    cursor: "default",
    margin: "2em auto",
    height: "50%",
    width: "50%",
    display: 'flex',
    background: "#B3A8E0",
    "background-color": "#B3A8E0",
    color: "#fff",
    border: "6px double #fff",
    padding: "1em",
    "box-shadow": "0 0 0 3px #B3A8E0, 0.5em 0.5em 3px 0 rgba(0,0,0,.5)",
  },
});

const StyledApp = styled.nav`
  background-color: #cbefe3;
  height: 100%;
  width: 100%;
  text-align: center;
  position: fixed;
  overflow: scroll;
`;

const Input = styled.input`
  text-align: center;
  font-size: min(7.5vw, 44px);
  position: relative;
  cursor: default;
  margin: 2em auto;
  width: 30%;
  background: #b3a8e0;
  color: #fff;
  border: 6px double #fff;
  padding: max(1em, 40px);
  box-shadow: 0 0 0 3px #b3a8e0, 0.5em 0.5em 3px 0 rgba(0, 0, 0, 0.5);
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
  &::placeholder {
    color: white;
    font-size: 1em;
    text-wrap: wrap;

    // centers wrapped placeholder text when screen is too narrow
    @media only screen and (max-width: 1082px) {
      float: left;
      clear: none;
      height: 100%;
      vertical-align: middle;
    }
  }
`;

const StyledGamePaper = styled.div`
  background-color: #cbefe3;
  height: 100%;
  width: 100%;
  text-align: center;
  position: fixed;
`;

const Ayuda = styled.p`
position: fixed;
bottom: 32px;
right: 32px;
margin-bottom: 0px;
font-weight: 700;
border-radius: 25px;
background: #B3A8E0;
color: white;
padding: 20px;
width: 3vw;
height: 3vw;
font-size: max(4vw, 34px);
line-height: 3vw;
`

const TextoAyuda = styled.p`
display: none;
position: absolute;
bottom: 90px;
right: 110px;
font-weight: 700;
border-radius: 25px;
background: #B3A8E0;
color: white;
padding: 20px;
width: max(8vw, 95px);
height: max(6vw, 92px);
font-size: max(1.1vw, 15px);
// line-height: 7vw;

@media (max-width: 768px) {
  border: 6px double #fff;
}

--r: 25px; /* the radius */
--t: 30px; /* the size of the tail */
// max-width: 300px;
@media (min-width: 768px) {
  padding: calc(2*var(--r)/3);
  -webkit-mask: 
  radial-gradient(var(--t) at var(--_d) 0,#0000 98%,#000 102%) 
  var(--_d) 100%/calc(100% - var(--r)) var(--t) no-repeat,
  conic-gradient(at var(--r) var(--r),#000 75%,#0000 0) 
  calc(var(--r)/-2) calc(var(--r)/-2) padding-box, 
  radial-gradient(50% 50%,#000 98%,#0000 101%) 
  0 0/var(--r) var(--r) space padding-box;
  --_d: 100%;
  border-right: var(--t) solid #0000;
  margin-left: var(--t);
  place-self: end;
}
`

const AyudaDiv = styled.div`
&:hover ${TextoAyuda} {
  display: block;
}
`

const InputNombre = ({ setearNombre }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setearNombre(event.target.value);
    }
  };

  return (
    <Input
      type="text"
      placeholder="Ingresá tu nombre"
      onKeyDown={handleKeyDown}
    />
  );
};

const FormNombre = ({ setearNombre }) => {
  return <InputNombre setearNombre={setearNombre} />;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { nombre: null, fade: false };
  }

  setearNombre = (n) => {
    this.setState({ nombre: n, fade: !this.state.fade });
  };

  render() {
    const { classes } = this.props;
    return (
      <StyledApp>
        <Titulo> Piedra, papel o tijera!</Titulo>

        { this.state.nombre ?
          <Grow in={this.state.fade}>
            <Paper className={classes.paper}>
              <Juego nombre={this.state.nombre} />
            </Paper>
          </Grow>
        :
          <FormNombre setearNombre={this.setearNombre} />
        }
        <AyudaDiv>
          <TextoAyuda>El jugador con mejor puntaje al cabo de 5 intentos gana.</TextoAyuda>
          <Ayuda>?</Ayuda>
        </AyudaDiv>
      </StyledApp>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
