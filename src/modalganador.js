import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalGanador({ text, open, onClose }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);

  const modalStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',    
    background: '#b9b9b9',
    'text-align': 'center',
    border: 'none',
    'border-radius': 0,
    'box-sizing': 'border-box',
    color: 'transparent',
    'min-height': '23px',
    'min-width': '75px',
    'max-width': '390px',
    'text-shadow': '0 0 #222',
    height: '160px',
    'padding-top': '40px',
    'margin-top': '-5rem',
    'z-index': '999999',
    'resize': 'both',
    'overflow': 'hidden',
    'position': 'relative',
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{
        'background': '#F0DFB4',
        'min-width': '390px',
        'max-width': '390px',
        'min-height': '23px',
        'position': 'absolute',
        'display': 'block',
        'top': 0,
        'left': 0,
        'background': 'linear-gradient(90deg, #000b7c, #377cc6)',
      }}>
        <p style={{
          'margin': '5px 3px 3px 11px',
          'text-align': 'left',
          'color': 'white',
          'font-family': 'Arial, sans-serif',
        }}>Fin de la partida</p>
      </div>
      <h2 id="simple-modal-title" style={{ 'margin-top': '15px', 'fontSize': 'max(1.9vw, 30px)', }}>{text}</h2>
          <button
            style={{
              background: '#b9b9b9',
              'box-shadow': 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf',
              height: '40px',
              float: 'right',
              'max-height': '36px',
              'minWidth': 65,
              'position': 'absolute',
              'bottom': '14px',
              'right': '14px',
            }}
            onClick={e => {onClose(e)}}>
            Cancel
          </button>
      <button
        style={{
          background: '#b9b9b9',
          'box-shadow': 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf',
          height: '40px',
          float: 'right',
          'max-height': '36px',
          'minWidth': 65,
          'margin-right': '5px',
          'position': 'absolute',
          'bottom': '14px',
          'right': '80px',
        }}
        onClick={e => {onClose(e)}}>
        OK
      </button>
      <ModalGanador />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
