from flask_restful import Resource, reqparse
from models.accounts import auth
from models.event import EventModel
from models.artist import ArtistModel

class Event(Resource):

    def get(self, id):
        event = EventModel.find_by_id(id)
        if event:
            return {"event" : event.json()}, 200
        return {"message" : "Event not found"}, 404


    @auth.login_required(role='admin')
    def post(self):
        parser = reqparse.RequestParser()  # create parameters parser from request

        # define al input parameters need and its type
        #parser.add_argument('id', type=int, required=True)
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('place', type=str, required=True)
        parser.add_argument('city', type=str)
        parser.add_argument('date', type=str)
        parser.add_argument('price', type=int)
        parser.add_argument('total_available_tickets', type=int)
        data = parser.parse_args()


        print(data.price)
        print(type(data.price))

        if not data.name:
            return {"message": "Event not valid: 'name' not provided"}, 400
        if not data.place:
            return {"message": "Event not valid: 'place' not provided"}, 400
        if not data.city:
            return {"message": "Event not valid: 'city' not provided"}, 400
        if not data.date:
            return {"message": "Event not valid: 'date' not provided"}, 400
        if not data.price:
            return {"message": "Event not valid: 'price' not provided"}, 400
        if not data.total_available_tickets:
            return {"message": "Event not valid: 'total_available_tickets' not provided"}, 400

        print(data.price)

        look_for_event = EventModel.find_duplicated_event(data.name, data.date, data.city)

        if look_for_event:
            return {"message": "An Event with same name, data and city [" + look_for_event.name+ ", " + look_for_event.date +", " + look_for_event.city +"] already exists"}, 409

        event = EventModel(data.name, data.place, data.city, data.date, data.price, data.total_available_tickets)
        event.save_to_db()
        return {"event" : event.json()}, 201

    @auth.login_required(role='admin')
    def delete(self,id):

        event = EventModel.find_by_id(id)
        if event:
            event.delete_from_db()
            return {"message": "Event ['id' : " + str(id) + "'name' : " + event.name + "] deleted"}, 200
        return {"message": "Event with ['id' : " + str(id) + "] Not Found"}, 404

    @auth.login_required(role='admin')
    def put(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('place', type=str, required=True)
        parser.add_argument('city', type=str, required=True)
        parser.add_argument('date', type=str, required=True)
        parser.add_argument('price', type=int, required=True)
        parser.add_argument('total_available_tickets', type=int, required=True)


        data = parser.parse_args()


        if not data.name:
            return {"message": "Event not valid: 'name' not provided"}, 400
        if not data.place:
            return {"message": "Event not valid: 'place' not provided"}, 400
        if not data.city:
            return {"message": "Event not valid: 'city' not provided"}, 400
        if not data.date:
            return {"message": "Event not valid: 'date' not provided"}, 400
        if not data.price:
            return {"message": "Event not valid: 'price' not provided"}, 400
        if not data.total_available_tickets:
            return {"message": "Event not valid: 'total_available_tickets' not provided"}, 400

        event = EventModel.find_by_id(id)

        if event:
            event.name = data.name
            event.place = data.place
            event.city = data.city
            event.date = data.date
            event.price = data.price
            event.total_available_tickets = data.total_available_tickets
            event.save_to_db()
            return {"event": event.json()}, 200

        return {"message": "Event with ['id' : " + str(id) + "] Not Found"}, 404




class EventList(Resource):
    def get(self):
        events = EventModel.get_all_events()
        return {'events': [event.json() for event in events]}, 200 if events else 404

class EventArtistList(Resource):
    def get(self, id):
        event = EventModel.find_by_artists(id)
        if event:
            return {'artists': [artist.json() for artist in event.artists]}, 200
        return {"message" : "Event with ['id': " + str(id) + "] Not Found"}, 404


class EventArtist2(Resource):
    @auth.login_required(role='admin')
    def post(self, id_event):
        parser = reqparse.RequestParser()
        # parser.add_argument('idEvent', type=str, required=True)
        parser.add_argument('idArtist', type=str, required=True)
        data = parser.parse_args()

        if not data.idArtist:
            return {"message": "Argument not valid: 'id_artist' not provided"}, 400

        event = EventModel.find_by_id(id_event)
        artist = ArtistModel.find_by_id(data.idArtist)

        if artist in event.artists:
            return {"message": "Artist with ['name': " + artist.name + "] is already in Event with ['id':" + str(
                id_event) + "]"}, 409

        event.add_artist(artist)
        event.save_to_db()
        return {"event": event.json()}, 200

class EventArtist(Resource):
    def get(self, id_event, id_artist):

        event = EventModel.find_by_id(id_event)
        if not event:
            return {"message" : "Event with ['id': " + str(id_event) + "] Not Found"}, 404

        artists = EventModel.find_by_id_all_artists(id_event)
        artist = ArtistModel.find_by_id(id_artist)

        if artist in artists:
            return artist.json(), 200
        else:
            return {"message" : "Artist with ['id': " + str(id_artist) + "] not in Event with ['id': " + str(id_event) + "]"}, 404

    @auth.login_required(role='admin')
    def post(self, id_event):
        parser = reqparse.RequestParser()
        #parser.add_argument('idEvent', type=str, required=True)
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('country', type=str, required=True)
        parser.add_argument('genre', type=str, required=True)
        data = parser.parse_args()

        if not data.name:
            return {"message": "Artist not valid: 'name' not provided"}, 400
        if not data.country:
            return {"message": "Artist not valid: 'country' not provided"}, 400
        if not data.genre:
            return {"message": "Artist not valid: 'genre' not provided"}, 400


        event = EventModel.find_by_id(id_event)
        artist = ArtistModel.find_by_name(data.name)

        if artist in event.artists:
            return {"message": "Artist with ['name': " + artist.name + "] is already in Event with ['id':" + str(id_event) + "]"}, 409

        event.add_artist(artist)
        event.save_to_db()
        return {"event": event.json()}, 200

    @auth.login_required(role='admin')
    def delete(self, id_event, id_artist):

        event = EventModel.find_by_id(id_event)
        artist = ArtistModel.find_by_id(id_artist)


        if artist in event.artists:
            art_name = artist.name
            event.delete_artist(artist)
            event.save_to_db()
            return {"message": "Artist with ['id': " + str(id_artist) + ", 'name': " + art_name + "] deleted  from Event ['id': " + str(id_event) + ", 'name': " + event.name + "]"},200
        return {"message": "Artist with ['id': " + str(id_artist) + "] in Event with ['id': " + str(id_event) + "] Not Found"},404



class ArtistEventsList(Resource):
    def get(self, id):
        events = EventModel.find_event_by_artists(id)
        if events:
            return {'events': [event.json() for event in events]}, 200
        return {"message" : "Artist with ['id': " + str(id) + "] Not Found"}, 404