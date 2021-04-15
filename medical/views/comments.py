from flask import Blueprint
from flask import Flask, request, jsonify
import bcrypt
from flask_cors import CORS
from .. import models
from datetime import datetime, timedelta
import json
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token,
                                get_jwt_identity, unset_jwt_cookies, create_refresh_token)
from ast import literal_eval

bp = Blueprint('comments', __name__, url_prefix='/')

mydb = models.client['medical']  # db name
mycol = mydb['comments_post']  # collection name


# [CREATE] 댓글
@bp.route('/posting/comment/create', methods=['POST'])
@jwt_required()
def create_comment():

    body = literal_eval(request.get_json()['body'])
    print(body)
    postingid = body['postingid']
    userid = body['userid']
    nickname = body['nickname']
    usertype = body['usertype']
    content = body['content']

    profilephoto = models.Userprofile.query.filter_by(userid=userid).first()

    date = (datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

    commentid = str(userid)+';'+str(date)
    print(profilephoto.profilephotourl, date)

    comment = mycol.insert_one({
        'commentid': commentid,
        'postingid': postingid,
        "userid": userid,
        "nickname": nickname,
        "usertype": usertype,
        "content": content,
        "date": date,
        "profilephotourl": profilephoto.profilephotourl
    })
    print('creat_ok')
    return jsonify({"msg": "글생성 성공", 'status': 200})


# [READ] 댓글
@bp.route('/posting/comment/read', methods=['GET', 'POST'])
@jwt_required()
def read_comment():
    if request.method == 'POST':
        print('commentread_ok')
        lst = []
        for m in mycol.find():
            lst.append({
                "commentid": m['commentid'],
                "postingid": m["postingid"],
                "userid": m["userid"],
                "nickname": m["nickname"],
                "usertype": m["usertype"],
                "content": m["content"],
                "date": m["date"],
                "profilephotourl": m['profilephotourl']
            })
        return jsonify(lst)


# [DELETE] 댓글
@bp.route('/posting/comment/delete', methods=['POST'])
@jwt_required()
def delete_articles():
    body = literal_eval(request.get_json()['body'])
    commentid = body['commentid']

    mycol.delete_one({'commentid': commentid})

    return jsonify({"msg": "삭제성공", 'status': 200})
