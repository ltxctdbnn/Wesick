from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import Flask, request, jsonify
from . import models

socketio = SocketIO(cors_allowed_origins="*")


@socketio.on_error_default
def error_handler(e):
    print('An error has occurred: ' + str(e))


@socketio.on('join')
def on_join(data):
    name = data['name']
    from_user = data['from_user']  # 누른 사람 user id
    to_user = data['to_user']  # 눌린 사람 user id
    room = data['room']
    join_room(room)

    # 누른 사람과 눌린 사람을 둘다 가져와서 정렬해서 들어온 사람을 체크하는 부분을 넣어야함
    # 이 부분은 sql

    users = sorted([from_user, to_user])
    query = models.IsJoin.query.filter_by(room_id=room)
    is_join = query.first()
    print(type(room))
    if not is_join:
        print(f'error!')
    if users[0] == from_user:
        is_join.user_one = 1
    elif users[1] == from_user:
        is_join.user_two = 1
    models.db.session.commit()
    emit("receiveMessage", {'greeting': name +
         ' 님이 들어왔습니다.'}, broadcast=False, to=room)


@socketio.on('sendMessage')
def send_message(data):
    print(f'==================data[{data}]=================')
    message = data['nickname'].replace('"', "") + ": " + data['message']
    message_db = data['message']
    room_id = data['room']
    from_user = data['from_user']  # 누른 사람 user id
    to_user = data['to_user']  # 눌린 사람 user id

    # 프론트에서 보낸 사람 받는 사람 id를 보내줘야함
    # 이 부분에서 message를 mongoDB에 저장해야함
    # 그 전에 우선 is_join 테이블에서 to 유저가 존재하는지를 판단해서
    # 있으면 그냥 넣고 없으면 안읽은 메세지로 표시하고mongoDB에 저장

    # mongoDB
    # message_query = {
    #     'room_id': room,
    #     'from_user': from_user,
    #     'to_user': to_user,
    #     'message': message_db,
    #     'timestamp': datetime어쩌구,
    #     'is_read': False
    # }
    #     message_query = {
    #     'room_id': room,
    #     'from_user': from_user,
    #     'to_user': to_user,
    #     'message': message,
    #     'timestamp': '2020-11-22 12:42:42',
    #     'is_read': False
    # }

    # mysql
    # is_join = models.IsJoin.query.filter_by(room=room)

    # if is_join.user1 and is_join.user2:  # 둘다 접속중일때만
    #     # 몽고db에 읽은 메세지로 저장
    #     message_query['is_read'] = True
    # mycol.insert_one(message_db)

    print("sendMessage",  message, data)
    emit("receiveMessage", {'message': message}, broadcast=False, to=room)


@socketio.on('leave')
def on_leave(data):
    # 누른 사람 눌린 사람 둘다 가져와서 정렬해서 나간 사람을 체크하는 부분을 넣어야함
    # 이 부분은 sql
    from_user = data['from_user']  # 누른 사람 user id
    to_user = data['to_user']  # 눌린 사람 user id
    users = sorted([from_user, to_user])
    is_join = models.IsJoin.query.filter_by(room_id=room)
    if user[0] == from_user:
        is_join.user_one = 0
    elif user[1] == from_user:
        is_join.user_two = 0
    models.db.session.commit()
    # print("LEAVEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!!!!!!!!!!")
    leave_room(room)
