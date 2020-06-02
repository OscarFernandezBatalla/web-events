from flask_restful import Resource, reqparse
from models.accounts import AccountsModel, auth
from models.orders import OrdersModel


class Accounts(Resource):

    def get(self, username):
        account = AccountsModel.find_by_username(username)
        if account:
            return {"account": account.json()}, 200
        return {"message": "User not found"}, 404

    def post(self):
        parser = reqparse.RequestParser()  # create parameters parser from request
        ## define al input parameters need and its type

        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)

        data = parser.parse_args()
        if not data.password:
            return {
                "message": {
                    "password": "Account not valid : 'password' not provided"
                }
            }, 400

        look_for_account = AccountsModel.find_by_username(data.username)

        if not look_for_account:
            account = AccountsModel(data.username)
            account.hash_password(data.password)
            account.save_to_db()
            return {"username" : account.username, "password" : account.password}, 201
        else:
            return {"message": "An user with same username [" + look_for_account.username + "] already exists"}, 409



    @auth.login_required(role='admin')
    def delete(self, username):
        account = AccountsModel.find_by_username(username)

        if account:
            orders = OrdersModel.find_by_username(username)
            for order in orders:
                order.delete_from_db()
            account.delete_from_db()
            return {"message": "User ['username' : " + account.username + "] deleted"}, 200
        return {"message": "User with ['username' : " + username + "] Not Found"}, 404





class AccountsList(Resource):
    def get(self):
        accounts = AccountsModel.get_all_accounts()
        return {'accounts': [account.json() for account in accounts]}, 200 if accounts else 404


