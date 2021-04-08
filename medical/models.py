from medical import db, client
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
# from flask.ext.mongoalchemy  import  MongoAlchemy 


class User(db.Model): #usertable
    __tablename__ = 'user_table'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nickname= db.Column(db.String(64), primary_key=True, unique=True)
    email = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(32),nullable=False)
    pw = db.Column(db.String(64),nullable=False)
    date=db.Column(db.DATE,nullable=False)
    usertype=db.Column(db.String(32))


class Post_history(db.Model): #post history table
    __tablename__ = 'post_history_table'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.String(64), unique=True)
    postid= db.Column(db.String(64), unique=True)
    date = db.Column(db.DATE)
    posttype=db.Column(db.String(64), unique=True)


class comments_info(db.Model): #comments_info table
    __tablename__ = 'comment_table'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True)
    post_userid = db.Column(db.String(64), unique=True)
    comment_userid=db.Column(db.String(64), unique=True)
    postid=db.Column(db.String(64), unique=True)
    date = db.Column(db.DATE)