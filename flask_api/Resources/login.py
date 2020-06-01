from flask_restful import Resource, reqparse
from models.accounts import AccountsModel, auth
from models.orders import OrdersModel

class Login(Resource):

    def post(self):
        parser = reqparse.RequestParser()  # create parameters parser from request
        ## define al input parameters need and its type

        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)

        data = parser.parse_args()

        if not data.password:
            return {"message": {"password": "Account not valid : 'password' not provided"}}, 400

        account = AccountsModel.find_by_username(data.username)
        if not account:
            return {"message": "Invalid password"}, 400

        login_successful = account.verify_password(password=data.password)
        if not login_successful:
            return {"message": "Invalid password"}, 400

        token = account.generate_auth_token()
        return {'token': token.decode('ascii')}, 200


class AccountsList(Resource):
    def get(self):
        accounts = AccountsModel.get_all_accounts()
        return {'accounts': [account.json() for account in accounts]}, 200 if accounts else 404


