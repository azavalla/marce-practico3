import { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Box, Hidden } from '@material-ui/core';
import ModalGanador from './modalganador';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  stretch: {
    height: '100%',
  }
});


const ScoreJugador = styled.div`
  // position: absolute;
  // top: 0;
`

const Jugador = styled.p`
  text-decoration: underline;
  font-size: 1.9vw;
`
const ScoreCompu = styled.div`
  position: absolute;
  bottom: 0;
`

const Separador = styled.div`
  border-radius: 165px;
  border: 5px solid #fff;
  padding: 1.5vw;
  font-size: 3.3vh;
  padding: max(2vh, 5.8px);
`

const BotonJugador = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0.3rem solid transparent;
  padding: 0;
`

const Puntaje = styled.p`
  font-size: 4vw;
  margin: auto;
`

const Computadora = styled.p`
  text-decoration: underline;
  font-size: 1.9vw;
`

const BotonCompu = styled.button`
  background-color: transparent;
  border: 0.3rem solid transparent;
  // margin: 10px;
  padding: 0;
  filter: opacity(0.5)
`

// Clase principal del juego
class Juego extends Component {
  estadoInicial = {
    ganadorParcial: null,
    eleccionJugador: null,
    eleccionComputadora: null,
    puntajeJugador: 0,
    puntajeComputadora: 0,
    empates: 0,
    ganador: null,
    njugada: 1,
    jugando: false
  };

  constructor(props) {
    super(props);
    this.state = this.estadoInicial;
  }

  reiniciar = () => {
    this.setState(this.estadoInicial);
  };

  // Dados dos elecciones, decide quien gano la jugada
  // bug: Si el jugador elige el nombre "COMPUTADORA", el juego no funciona
  quienGanaJugada = (eleccionJugador, eleccionComputadora) => {
    if (eleccionJugador == eleccionComputadora) {
      return "EMPATE";
    } else if ((eleccionJugador == "PIEDRA" && eleccionComputadora == "TIJERA") ||
      (eleccionJugador == "TIJERA" && eleccionComputadora == "PAPEL") ||
      (eleccionJugador == "PAPEL" && eleccionComputadora == "PIEDRA")) {
      return "JUGADOR";
    } else {
      return "COMPUTADORA";
    }
  };

  // Atiende una nueva jugada.
  // Calcula el nuevo puntaje y decide si hay un ganador.
  manejarJugada = (eleccionJugador) => {
    // si ya hay un ganador, no se puede seguir jugando
    if (this.state.ganador) {
      return;
    }

    // si no se ingresó el nombre, no se puede jugar
    if (!this.props.nombre) {
      alert('Ingrese su nombre');
      return;
    }

    // si hay una jugada en curso, no se puede jugar
    if (this.state.jugando) {
      return
    }

    let { puntajeJugador, puntajeComputadora, empates, njugada } = this.state;
    const choices = ["PIEDRA", "PAPEL", "TIJERA"];
    const eleccionComputadora = choices[Math.floor(Math.random() * choices.length)];
    const ganadorParcial = this.quienGanaJugada(eleccionJugador, eleccionComputadora);

    if (ganadorParcial == "JUGADOR") {
      puntajeJugador = this.state.puntajeJugador + 1;
    } else if (ganadorParcial == "COMPUTADORA") {
      puntajeComputadora = this.state.puntajeComputadora + 1;
    } else {
      empates = this.state.empates + 1;
    }

    let ganador = null;
    if (puntajeJugador == 3 || puntajeComputadora == 3 || puntajeJugador + puntajeComputadora + empates == 5) {
      // cuando alguno llega a tres o se juegan cinco rondas, se termina el juego
      if (puntajeJugador > puntajeComputadora) {
        ganador = this.props.nombre
      } else if (puntajeComputadora > puntajeJugador) {
        ganador = "COMPUTADORA";
      } else {
        ganador = "EMPATE";
      }
    }

    this.setState({
      ganadorParcial: ganadorParcial,
      eleccionJugador: eleccionJugador,
      eleccionComputadora: eleccionComputadora,
      jugando: true,
      // puntajeJugador: puntajeJugador,
      // puntajeComputadora: puntajeComputadora,
      // empates: empates,
      // ganador: ganador,
      // njugada: njugada + 1,
    });

    setTimeout(function() {
      this.setState({
        eleccionJugador: null,
        eleccionComputadora: null,
        njugada: ganador ? njugada : njugada + 1,
        puntajeJugador: puntajeJugador,
        puntajeComputadora: puntajeComputadora,
        empates: empates,
        ganador: ganador,
        jugando: false,
      })
    }.bind(this), 1800)
  };

  reiniciar() {
    this.setState({
      ganador: null,
    })
  }

  render() {
    const { eleccionJugador, eleccionComputadora, puntajeJugador, puntajeComputadora, ganadorParcial, empates, ganador } = this.state;
    const estiloSeleccionado = {border: '0.3rem solid #55eb34'}
    const estiloNoSeleccionado = {border: '0.3rem solid transparent'}
    const { classes } = this.props;
    let ganadorText;
    switch (this.state.ganador) {
      case this.props.nombre:
        ganadorText = 'Victoria!'
        break;
      case 'COMPUTADORA':
        ganadorText = 'Derrota!'
        break;
      default:
        ganadorText = 'Empate!'
        break;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={3} justifyContent='center'>
        <Hidden smDown>
          <Grid className={classes.stretch} item md={3} style={{display: 'flex', 'justify-content': 'center', 'align-items': 'start'}}>
            <ScoreJugador>
            <Puntaje>{puntajeJugador}</Puntaje>
            <Jugador>{this.props.nombre}</Jugador>
            </ScoreJugador>
          </Grid>
        </Hidden>

          <Grid className={classes.stretch} item container direction='column' md={6} sm={12}>
            <Grid item container direction='row' style={{height: '33.33%', 'align-content': 'center'}}>
              <Grid item xs={4}>
                <BotonJugador style={this.state.eleccionJugador == 'PIEDRA' ? estiloSeleccionado : null}><img src={process.env.PUBLIC_URL + "/rock.svg"} onClick={() => this.manejarJugada("PIEDRA")} style={{'max-height': '15vh'}}/></BotonJugador>
              </Grid>
              <Grid item xs={4}>
                <BotonJugador style={this.state.eleccionJugador == 'PAPEL' ? estiloSeleccionado : null}><img src={process.env.PUBLIC_URL + "/papel.png"} onClick={() => this.manejarJugada("PAPEL")} style={{'max-height': '15vh'}}/></BotonJugador>
              </Grid>
              <Grid item xs={4}>
                <BotonJugador style={this.state.eleccionJugador == 'TIJERA' ? estiloSeleccionado : null}><img src={process.env.PUBLIC_URL + "/tijera.png"} onClick={() => this.manejarJugada("TIJERA")} style={{'max-height': '15vh'}}/></BotonJugador>
              </Grid>
            </Grid>

            <Grid item style={{height: '33.33%', display: 'flex', 'align-items': 'center', 'justify-content': 'center'}}>
              <Separador>{this.state.njugada}/5</Separador>
            </Grid>

            <Grid item container style={{height: '33.33%', 'align-content': 'center'}}>
              <Grid item xs={4}>
                <BotonCompu style={this.state.eleccionComputadora == 'PIEDRA' ? estiloSeleccionado : null}><img src={process.env.PUBLIC_URL + "/rock.svg"} style={{'max-height': '15vh'}}/></BotonCompu>
              </Grid>
              <Grid item xs={4}>
                <BotonCompu style={this.state.eleccionComputadora == 'PAPEL' ? estiloSeleccionado : null}><img src={process.env.PUBLIC_URL + "/papel.png"} style={{'max-height': '15vh'}}/></BotonCompu>
              </Grid>
              <Grid item xs={4}>
                <BotonCompu style={this.state.eleccionComputadora == 'TIJERA' ? estiloSeleccionado : null}><img src={process.env.PUBLIC_URL + "/tijera.png"} style={{'max-height': '15vh'}}/></BotonCompu>
              </Grid>
            </Grid>
          </Grid>

        <Hidden smDown>
        <Grid className={classes.stretch} item md={3} style={{display: 'flex', 'justify-content': 'center', 'align-items': 'end'}}>
          <ScoreCompu>
            <Puntaje>{puntajeComputadora}</Puntaje>
            <Computadora>Computadora</Computadora>
          </ScoreCompu>
        </Grid>
          </Hidden>

      </Grid>
      <ModalGanador text={ganadorText} open={!!this.state.ganador} onClose={this.reiniciar}></ModalGanador>
    </div>

      // <div>
      //   {/* <h3>Seleccione su jugada:</h3> */}
      //   <button id="piedra" type="button"> <img src={process.env.PUBLIC_URL + "/rock.svg"} height="90" width="90" onClick={() => this.manejarJugada("PIEDRA")} /></button>
      //   <button id="papel" type="button"> <img src={process.env.PUBLIC_URL + "/papel.png"} height="90" width="90" onClick={() => this.manejarJugada("PAPEL")} /></button>
      //   <button id="tijera" type="button"> <img src={process.env.PUBLIC_URL + "/tijera.png"} height="90" width="90" onClick={() => this.manejarJugada("TIJERA")} /></button>
      //   <br />

      //   {!!this.props.nombre ? <p id="eleccionusuario">{this.props.nombre} eligió: {eleccionJugador}</p> : <br />}
      //   <p id="eleccionpc">La Computadora eligió: {eleccionComputadora}</p>
      //   <p id="resultadoparcial">El ganador de la jugada fue: {ganadorParcial} </p>
      //   <br />

      //   <p id="resultado">El resultado final es: </p>
      //   {!!this.props.nombre ? <p id="resultadousuario">{this.props.nombre}: {puntajeJugador}</p> : <br />}
      //   <p id="resultadopc">Computadora: {puntajeComputadora}</p>
      //   <p id="resultadoempate">Empates: {empates}</p>
      //   <p id="resultadofinal">Ganador: {ganador ? ganador : null}</p>

      //   <button id="reset" onClick={() => this.reiniciar()}> Reiniciar </button>
      // </div>
    );
  }
}


Juego.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Juego);
