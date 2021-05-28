import React, { useReducer } from 'react';

import Board from '../Board/Board';
import Select from '../Select/Select';
import Button from '../Button/Button';

const initialState = {
  computerBoard: [],
  playerBoard: [],
  selectValue: 5,
  round: 1,
  isActivePlayerBoard: false,
  activeField: 0,
  text: ''
}

function reducer(state, action) {

  switch (action.type) {
    case 'computerIsActive':
      return { ...state, isActivePlayerBoard: false, playerBoard: [] };
    case 'playerIsActive':
      return { ...state, isActivePlayerBoard: true, text: '' };
    case 'setSelectValue':
      return { ...state, selectValue: action.payloadValue };
    case 'startGame':
      return { ...state, computerBoard: action.payloadcomputerBoard };
    case 'setActiveField':
      return { ...state, activeField: action.payloadField };
    case 'setActiveFields':
      return { ...state, activeField: action.payloadField, isActivePlayerBoard: false, playerBoard: [] };
    case 'playerBoard':
      return { ...state, playerBoard: action.payloadplayerBoard };
    case 'playerBoardLast':
      return { ...state, playerBoard: action.payloadplayerBoard, round: action.payloadRound };
    case 'playerBoardFailed':
      return { ...state, playerBoard: [], isActivePlayerBoard: false, text: 'Pomyłka!' };
    case 'playerWin':
      return { ...initialState, text: 'Wygrana!', selectValue: action.payloadSelect }
    case 'reset':
      return { ...initialState, selectValue: action.payloadSelect };
    default:
      throw new Error();
  }
}

function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { computerBoard, playerBoard, selectValue, round, isActivePlayerBoard, activeField, text } = state;

  const changeSelectValue = (e) => {
    dispatch({ type: 'setSelectValue', payloadValue: e.target.value })
  }
  async function showFields(table, rounds = 1) {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (var i = 0; i < rounds * 2; i++) {
      if (i % 2 === 1) {
        dispatch({ type: 'setActiveField', payloadField: 0 })
        if (i + 1 === rounds * 2) dispatch({ type: 'playerIsActive' })
        await timer(200)
      }
      else {
        fieldsActivation(i / 2, table)
        await timer(500)
      }
    }
  }

  async function showField(nr) {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    for (var i = 0; i < 2; i++) {
      if (i === 0) {
        fieldActivation(0, [nr])
        await timer(500)
      }
      else {
        dispatch({ type: 'setActiveField', payloadField: 0 })
        await timer(200)
      }
    }
  }

  const fieldActivation = (i, r) => {
    dispatch({ type: 'setActiveField', payloadField: r[i] })
  }

  const fieldsActivation = (i, r) => {
    dispatch({ type: 'setActiveFields', payloadField: r[i] })
  }

  const startGame = () => {
    let randNumbers = [];
    for (let i = 0; i < selectValue; i++) {
      randNumbers.push(Math.floor(Math.random() * (17 - 1)) + 1)
    }
    dispatch({ type: 'startGame', payloadcomputerBoard: randNumbers })
    showFields(randNumbers, round)
  }

  const restartGame = () => {
    dispatch({ type: 'reset', payloadSelect: selectValue })
  }

  const selectField = (e) => {
    showField(e)
    if (computerBoard[[...playerBoard].length] === e) {
      if (round === (selectValue * 1) && [...playerBoard].length + 1 === (selectValue * 1)) {
        dispatch({ type: 'playerWin', payloadSelect: selectValue })
      } else {
        if ([...playerBoard, e].length === round) {
          setTimeout(function () {
            dispatch({ type: 'playerBoardLast', payloadplayerBoard: [], payloadRound: round + 1 })
            showFields(computerBoard, round + 1)
          }, 500)
        }
        dispatch({ type: 'playerBoard', payloadplayerBoard: [...playerBoard, e] })
      }
    } else {
      setTimeout(function () {
        dispatch({ type: 'playerBoardFailed' })
        showFields(computerBoard, round)
      }, 500)
    }
  }


  return (
    <div className="app">
      <div className='header'>
        <Button name={'start gry'} action={startGame}></Button>
        <Button name={'reset'} action={restartGame}></Button>
        <Select changeSelectValue={changeSelectValue}></Select>
      </div>
      <h1 className='round'>Runda: {round}</h1>
      <div className='boards'>
        <h1>Komputer</h1> <h1>Gracz</h1>
        <Board isComputerBoard={true} activeBoard={!isActivePlayerBoard} activeField={activeField} selectField={selectField}></Board>
        <Board isComputerBoard={false} activeBoard={isActivePlayerBoard} activeField={activeField} selectField={selectField}></Board>
      </div>
      <h1 className='information'>{text}</h1>
    </div>
  );
}

export default Game;
