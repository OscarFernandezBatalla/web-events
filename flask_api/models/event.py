from db import db


artist_table = db.Table('artistes',
        db.Column('artist_id', db.Integer, db.ForeignKey('artists.id')),
        db.Column('event_id', db.Integer, db.ForeignKey('events.id')))


class EventModel(db.Model):
    __tablename__ = 'events'
    __table_args__ = (db.UniqueConstraint('name', 'date', 'city'),)
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    place = db.Column(db.String(30), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    date = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    total_available_tickets = db.Column(db.Integer, nullable=False)
    artists = db.relationship('ArtistModel', secondary=artist_table, backref=db.backref('events', lazy='dynamic'))

    def __init__(self, name, place, city, date, price, total_available_tickets):
        self.name = name
        self.place = place
        self.city = city
        self.date = date
        self.price = price
        self.total_available_tickets = total_available_tickets


    def json(self):
        return {
                    "id": self.id,
                    "name": self.name,
                    "place": self.place,
                    "city": self.city,
                    "date": self.date,
                    "artists": [artist.json() for artist in self.artists if self.artists],
                    "price": self.price,
                    "total_available_tickets": self.total_available_tickets
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

    def delete_artist(self, artist):
        self.artists.remove(artist)

    def add_artist(self, artist):
        self.artists.append(artist)

    def get_price(self):
        return self.price

    def get_total_available_tickets(self):
        return self.total_available_tickets

    def set_total_available_tickets(self, tickets):
        self.total_available_tickets = tickets



    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter(cls.id == id).first()

    @classmethod
    def find_by_event_id_artist_id(cls, id):
        return cls.query.filter(cls.id == id).artists.filter.first()

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter(cls.name == name).first()

    @classmethod
    def find_by_place(cls, place):
        return cls.query.filter(cls.place == place).all()

    @classmethod
    def find_by_city(cls, city):
        return cls.query.filter(cls.city == city).all()

    @classmethod
    def find_by_date(cls, date):
        return cls.query.filter(cls.date == date).all()

    @classmethod
    def find_by_price(cls, price):
        return cls.query.filter(cls.price == price).all()

    @classmethod
    def find_by_total_available_tickets(cls, total_available_tickets):
        return cls.query.filter(cls.total_available_tickets == total_available_tickets).all()

    @classmethod
    def get_all_events(cls):
        return cls.query.all()

    @classmethod
    def find_by_artists(cls, id):
        event = cls.query.filter(cls.id == id).first()
        return event

    @classmethod
    def find_event_by_artists(cls, id):
        events = cls.query.filter(cls.id == id).all()
        return events

    @classmethod
    def find_by_id_all_artists(cls, id):
        return cls.query.filter(cls.id == id).first().artists











