from flask_restful import Resource, reqparse
from models.accounts import AccountsModel, auth
from models.event import EventModel
from models.orders import OrdersModel
from flask import g

class Orders(Resource):

    def get(self, username):
        orders = OrdersModel.find_by_username(username)
        if orders:
            return {'orders': [order.json() for order in orders]}, 200
        return {"message": "User not found"}, 404

    @auth.login_required(role='user')
    def post(self, username):
        if username == g.user.username:

            parser = reqparse.RequestParser()  # create parameters parser from request

            # define al input parameters need and its type
            parser.add_argument('id_event', type=int)
            parser.add_argument('tickets_bought', type=int)
            data = parser.parse_args()

            account = AccountsModel.find_by_username(username)
            event = EventModel.find_by_id(data.id_event)

            money_user = account.get_available_money()
            price_event = event.get_price()
            tickets_left = event.get_total_available_tickets()

            if money_user >= price_event * data.tickets_bought and tickets_left - data.tickets_bought >= 0:
                account.set_available_money(money_user - price_event * data.tickets_bought)
                event.set_total_available_tickets(tickets_left - data.tickets_bought)

                order = OrdersModel(data.id_event, data.tickets_bought)
                account.add_order(order)

                order.save_to_db()
                event.save_to_db()
                account.save_to_db()

                return {"order" : order.json()}, 201
            return {"message": "Not enough money or tickets"}, 400
        return {"message": "Bad authorization user"}, 400
"""
        with lock.lock:
            account = AccountsModel.find_by_username(username)
            event = EventModel.find_by_id(data.id_event)

            money_user = account.get_available_money()
            price_event = event.get_price()
            tickets_left = event.get_total_available_tickets()

            account.set_available_money(money_user - price_event * data.tickets_bought)
            event.set_total_available_tickets(tickets_left - data.tickets_bought)

            db.session.add()

            post_money = account.get_available_money()
            post_tickets = event.get_total_available_tickets()

            if (post_money < 0 or post_tickets < 0):
                db.session.rollback()
                return {"message": "Not enough money or tickets"}, 400

            else:
                order = OrdersModel(data.id_event, data.tickets_bought)
                account.add_order(order)
                order.save_to_db()
                db.session.commit(event)
                db.session.commit(account)

                return order.json(), 200"""



    #else:
    #    return {"message": "Bad authorization user"}, 400


class OrdersList(Resource):
    def get(self):
        orders = OrdersModel.get_all_orders()
        return {'orders': [order.json() for order in orders]}, 200
