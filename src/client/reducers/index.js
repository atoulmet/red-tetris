import * as types from '../constants/actionTypes'
import * as f from '../tools'

const copyState = (state, newState) => Object.assign({}, state, newState)

const defaultAnimationState = {
  getStyle: false
}

const reducer = (state = {} , action) => {
  switch(action.type){

    // case types.START_GAME:
    //   return copyState(state, {tetris: newTetris()})

    case types.CREATE_ROOM:
      return copyState(state, {room: null})

    case types.EDIT_NAME:
      return copyState(state, {nickname: action.value.trim().substr(0, 15).trim()})


    case types.NEW_PIECE:
      return copyState(state, {
        ...action.piece,
        interval: action.interval,
      })


    case types.MOVE_PIECE:
      return copyState(state, {
        coords: action.coords,
        rotate: action.rotate !== null ? action.rotate : state.rotate,
      })

    case types.UPDATE_TETRIS:
      return copyState(state, {
        tetris: action.tetris,
        coords: null,
        ...defaultAnimationState,
      })

    case types.ANIMATION_STEP:
      return copyState(state, {
        getStyle: action.getStyle
      })

    case types.ANIMATION_OVER:
      return copyState(state, {
        getStyle: false,
      })

    case 'ROOM_CREATED':
      return copyState(state, {
        room: action.id,
      })

    case 'NICKNAME_ERROR':
      return copyState(state, {
        nicknameError: 'Please enter a nickname',
      })

    default:
      return state
  }
}

export default reducer;