import { updateObject } from '../tools'

const getPlayersGhosts = (state, { playerID, room }) => {
  const output = Object.assign({}, state)
  const users = room.users.filter(user => user.id !== playerID)

  Object.keys(output).forEach(id => {
    if (!users.find(user => user.id === id))
      delete output[id]
  })

  users.forEach(user => {
    if (!output[user.id])
      output[user.id] = user.tetris
  })
  return output
}

export default function playersGhosts(state=[], action) {

  switch (action.type) {

    case 'UPDATE_ROOM':
      return getPlayersGhosts(state, action)

    case 'UPDATE_GHOST':
      return updateObject(state, {
        [action.id]: action.tetris,
      })

    default:
      return state

  }

}