from db import db, secret_key
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)
from flask_httpauth import HTTPBasicAuth
from flask import g
auth = HTTPBasicAuth()




class AccountsModel(db.Model):

    __tablename__ = 'accounts'

    username = db.Column(db.String(30), primary_key=True, unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)


    # 0 not admin/ 1 is admin

    is_admin = db.Column(db.Integer, nullable=False)
    available_money = db.Column(db.Integer)
    orders = db.relationship('OrdersModel', backref='orders', lazy=True)



    def __init__(self, username,available_money=200, is_admin=0):
        self.username = username
        self.available_money = available_money
        self.is_admin = is_admin

    def hash_password(self, password):
        print("hash de password:")
        print(password)
        self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        print("verifico password:")
        print(password)
        return pwd_context.verify(password, self.password)



    # CODE HERE

    def generate_auth_token(self, expiration=600):
        print("genero token")
        s = Serializer(secret_key, expires_in=expiration)
        return s.dumps({'username': self.username})

    @classmethod
    def verify_auth_token(cls, token):
        print("token")
        print(token)

        s = Serializer(secret_key)
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None  # valid token, but expired
        except BadSignature:
            return None  # invalid token
        user = cls.query.filter_by(username=data['username']).first()
        print(user)
        return user

    def json(self):
        return {'accounts': {
                "username": self.username,
                "available_money": self.available_money,
                "is_admin": self.is_admin
                }
        }

    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            return {"message": "Error Description"}, 500

    def delete_from_db(self):
        db.session.delete(self)
        db.commit()

    def get_available_money(self):
        return self.available_money

    def set_available_money(self, money):
        self.available_money = money

    def add_order(self, order):
        self.orders.append(order)



    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter(cls.username == username).first()

    @classmethod
    def get_all_accounts(cls):
        return cls.query.all()


@auth.verify_password
def verify_password(token, password):
    print("verifico password2 amb token:")

    print(password)
    print(token)

    user = AccountsModel.verify_auth_token(token)

    if user:
        g.user = user
        print(user.username)
        return user
    print("fdfffffffffffffffffffff")
    return {"message": "Bad  authorization"}, 400


@auth.get_user_roles
def get_user_roles(user):
    print("get user roles")
    print(user)
    if user.is_admin:
        return ['admin']      # potser llista

    return ['user']