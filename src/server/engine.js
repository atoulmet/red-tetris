import io from 'socket.io'
import Game from './game'
import User from './user'

export default class Engine {

  constructor(app) {

    this.io = io(app)

    this.io.on('connection', (socket) => {
      console.log('Socket connected: ' + socket.id)
      const user = new User(socket)
      user.sendAction({
        type: 'USER_CONNECTED',
        id: socket.id,
      })
      const { roomId, name } = socket.handshake.query
      if (roomId && name) {
        user.name = name
        this.addUserToRoom(roomId, user)
      }

      socket.on('disconnect', () => {
        this.disconnectUser(user)
      })

      socket.on('action', (action) => {

        if (action.nickname)
          user.name = action.nickname

        //console.log(action)
        if(action.type === 'server/ping')
          socket.emit('action', {type: 'pong'})

        else if (action.type === 'server/CREATE_ROOM') {
          const room = Game.createRoom(user)
          //console.log(Game.rooms[0].master.name)
          user.sendAction({
            type: 'UPDATE_ROOM',
            room: room.getData(),
            hash: room.getHash(user)
          })
        }

        else if (action.type === 'server/JOIN_ROOM') {
          this.addUserToRoom(action.id, user)
        }

        else if (action.type === 'server/START_GAME') {
          const room = Game.getRoomByMaster(user)
          if (room && !room.isPlaying) {
            room.initGame()
            this.sendActionToRoom(room.id, {
              type: 'NEW_PIECE',
              piece: room.getNextPiece(0),
            })
          }
        }

        else if (action.type === 'server/UPDATE_TETRIS') {

          const room = Game.getRoomById(user.room)

          if (room) {
            user.tetris = action.tetris
            user.indexPiece++
            user.sendActionToRoom(room.id, {
              type: 'UPDATE_ROOM',
              room: room.getData(),
            })
            user.sendAction({
              type: 'NEW_PIECE',
              piece: room.getNextPiece(user.indexPiece),
            })

          }
        }

      })
    })

  }

  stop(cb = () => {}) {
    this.io.close(cb)
  }

  disconnectUser(user) {
    if (user.room) {
      const room = Game.removeUserFromRoom(user.room, user)
      if (room) {
        this.sendActionToRoom(room.id, {
          type: 'UPDATE_ROOM',
          room: room.getData(),
        })
      }
    }
  }

  addUserToRoom(roomId, user) {
    const room = Game.addUserToRoom(roomId, user)
    if (room) {
      setTimeout(() => {
        this.sendActionToRoom(room.id, {
          type: 'UPDATE_ROOM',
          room: room.getData(),
          hash: room.getHash(user),
          //ghosts: room.getGhosts(),
        })
      }, 1000)
      // this.sendActionToRoom(room.id, {
      //   type: 'UPDATE_ROOM',
      //   room: room.getData(),
      //   hash: room.getHash(user),
      //   ghosts: room.getGhosts(),
      // })
      // user.sendAction({
      //   type: 'UPDATE_GHOSTS',
      //   ghosts: room.getGhosts(user),
      // })
    } else {
      user.sendAction({
        type: 'JOIN_ROOM_ERROR',
        error: Game.currentError,
        hash: {
          to: user.socket.id,
          hash: '',
        }
      })
    }
  }

  sendActionToRoom(roomId, action) {
    this.io.to(roomId).emit('action', action)
  }

}
