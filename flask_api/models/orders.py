from db import db
from models.event import EventModel


class OrdersModel(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), db.ForeignKey('accounts.username'), nullable=False)
    id_event = db.Column(db.Integer, nullable=False)
    tickets_bought = db.Column(db.Integer, nullable=False)

    def __init__(self, id_event, tickets_bought):
        self.id_event = id_event
        self.tickets_bought = tickets_bought

    def json(self):
        event = EventModel.find_by_id(self.id_event)
        return {
            "id": self.id,
            "username": self.username,
            "event_name": event.name,
            "event_date": event.date,
            "event_city": event.city,
            "tickets_bought": self.tickets_bought
        }



    def save_to_db(self):
        try:
            db.session.add(self)
            db.session.commit()
        except:
            return {"message": "Error Description"}, 500

    def delete_from_db(self):
        try:
            db.session.delete(self)
            db.session.commit()
        except:
            db.session.rollback()





    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter(cls.username == username).all()

    @classmethod
    def get_all_orders(cls):
        return cls.query.all()


