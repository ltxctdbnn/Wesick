from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import Flask
from .. import models

socketio = SocketIO(cors_allowed_origins="*")

mydb = models.client['medical'] #db name
mycol = mydb['chatdata'] #collection name

@socketio.on_error_default
def error_handler(e):
    print('An error has occurred: ' + str(e))

@socketio.on('join')
def on_join(data):
    name = data['name']
    room = data['room']
    join_room(room)
    chatlist=[]
    for chat in mycol.find({"room":room}):
        chatlist.append({
            'userid':chat['userid'],
            'message':chat['message'],
            'room': chat['room']
        })
    print(chatlist)
    emit("chatHistory", chatlist, broadcast=False, to=room)

@socketio.on('sendMessage')
def send_message(data):
    userid = data['userid']
    message = data['message']
    room = data['room']
    chat = mycol.insert_one({ 
                                'userid' : int(userid),
                                'message' : message,
                                'room' : room
                            })
    emit("receiveMessage", {'userid':userid, 'message': message}, broadcast=True, to=room)

@socketio.on('leave')
def on_leave():
    leave_room(room)