from flask_restful import Resource, reqparse
from models.accounts import AccountsModel, auth
from models.orders import OrdersModel


class Accounts(Resource):

    def get(self, username):
        account = AccountsModel.find_by_username(username)
        return account.json()

    def post(self):
        parser = reqparse.RequestParser()  # create parameters parser from request
        ## define al input parameters need and its type

        parser.add_argument('username', type=str)
        parser.add_argument('password', type=str)

        data = parser.parse_args()

        account = AccountsModel(data.username)
        account.hash_password(data.password)
        account.save_to_db()

        #return

    @auth.login_required(role='admin')
    def delete(self, username):
        orders = OrdersModel.find_by_username(username)
        for order in orders:
            order.delete_from_db()

        account = AccountsModel.find_by_username(username)
        account.delete_from_db()




class AccountsList(Resource):
    def get(self):
        accounts = AccountsModel.get_all_accounts()
        return {'accounts': [account.json() for account in accounts]}, 200 if accounts else 404


