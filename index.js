const grpc = require('grpc')
const notesProto = grpc.load('notes.proto')
const server = new grpc.Server()
const uuidv1 = require('uuid/v1')

const notes = [
    { id: '1', title: 'subha', content: 'hyperledger:)'},
    { id: '2', title: 'Nisha', content: 'ethereum'}
]
server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        let note = call.request
        note.id = uuidv1()
        notes.push(note)
        callback(null, notes)
         },
         insert: (call, callback) => {
            let note = call.request
            note.id = uuidv1()
            notes.push(note)
            callback(null, note)
        },
        delete: (call, callback) => {
            let existingNoteIndex = notes.findIndex((n) => n.id == call.request.id)
            if (existingNoteIndex != -1) {
                notes.splice(existingNoteIndex, 1)
                callback(null, {})
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not found"
                })
            }
          }
    })
    
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at the above port ')
server.start()

