from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)
from flask import Blueprint
from flask import Flask, request, jsonify, session
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
from pprint import pprint
import json
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


bp = Blueprint('chat', __name__, url_prefix='/')


@bp.route('/chatlist', methods=['GET'])
@jwt_required()
def chatlist():
    users = models.User.query.all()
    userlist = {}
    for user in users:
        userlist[user.id] = user.name

    return jsonify({"users": userlist})


@bp.route('/history', methods=['GET'])
def get_message():
    print('check')
    messages = []
    room_id = request.args.get('room', 0)
    query = {'room_id': int(room_id)}
    msg = models.mycol.find(query)
    message_list = list(msg)
    for message in message_list:
        del message['_id']
        messages.append(message)
    JSONEncoder().encode(messages)
    new_value = {'$set': {'is_read': True}}
    x = models.mycol.update_many(query, new_value)  # 업데이트!
    return jsonify({'messages': messages})


@bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    else:
        print('check')
        username = request.json.get('userName')
        print('userName:', userName)

        userinfo = models.User.query.filter_by(name=username).first()
        return jsonify({"userinfo": userinfo, "status": 200})


@bp.route('/room', methods=['POST'])
@jwt_required()
def room():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 402
    else:
        user_data = request.get_json(force=True)['data']
        user1 = user_data["user1"]
        user2 = user_data["user2"]

        lst = [user1, user2]  # 무조건 빠른 순서대로 방을 만들어서 중복되는 방의 생성을 없앤다
        lst.sort()
        roominfo = models.Channel.query.filter_by(
            user_one=lst[0], user_two=lst[1]).first()
        if roominfo is None:

            channel = models.Channel(
                user_one=lst[0],
                user_two=lst[1]
            )
            models.db.session.add(channel)
            models.db.session.commit()

            roominfo2 = models.Channel.query.filter_by(
                user_one=lst[0], user_two=lst[1]).first()

            is_join = models.IsJoin(
                room_id=roominfo2.id,
                user_one=0,
                user_two=0
            )
            models.db.session.add(is_join)
            models.db.session.commit()
            print(
                f'room == {roominfo2}, user_one == {user1}, user_two == {user2}')
            return jsonify({"msg": "방 생성 성공", "roomid": roominfo2.id, 'status': 300})
        else:
            roomid = roominfo.id
            print(
                f'room == {roomid}, user_one == {lst[0]}, user_two == {lst[1]}')

            return jsonify({"roomid": roomid, "status": 300})
