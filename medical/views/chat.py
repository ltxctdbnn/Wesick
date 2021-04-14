from flask import Blueprint
from flask import Flask, request, jsonify, session
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta

from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)

bp = Blueprint('chat', __name__, url_prefix='/')


# @bp.route('/')
# def home():

#     return 'community page ok'


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
    req = request.args.get('room', 0)
    print(f'================{req}=====================')
    # mongoDB에서room_id로 message를 가져와야함(가져옴과 동시에 읽음표시 처리해야함)
    # query = {'room_id': {'$eq': room_id}}  # 이 부분에서 room_id를 프론트로부터 가져와야함
    # for message in mycol.find(query):
    #     messages.append(message)

    # new_value = {'$set': {'is_read': True}}  # is_read라는 필드가 있어야함
    # x = mycol.update_many(query, new_value)  # 업데이트!
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
