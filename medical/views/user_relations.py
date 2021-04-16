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

bp = Blueprint('user_relations', __name__, url_prefix='/')

mydb = models.client['medical']  # db name

@bp.route('/user-relations', methods=['POST'])
def graphSend():

    body = literal_eval(request.get_json()['body'])
    userid = body['userid']

    x_list = []
    m_list = []

    for m in mydb['community_post'].find({'userid': userid}):
        m_list.append(m['postingid'])
        for x in mydb['comments_post'].find({'postingid': m['postingid']}):
            x_list.append(x['userid'])

    result = {'node': [], 'link': []}

    for x in x_list:
        result['node'].append({ 'id': x })
        result['link'].append({ 'source': userid, 'target': x })
        
    print(result)

    return jsonify({"data": result})
