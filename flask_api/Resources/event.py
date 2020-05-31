from flask_restful import Resource, reqparse
from models.accounts import auth
from models.event import EventModel
from models.artist import ArtistModel

class Event(Resource):

    def get(self, id):
        event = EventModel.find_by_id(id)
        return event.json(), 200 if event else 404

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

        event = EventModel(data.name, data.place, data.city, data.date, data.price, data.total_available_tickets)

        event.save_to_db()

    @auth.login_required(role='admin')
    def delete(self,id):
        event = EventModel.find_by_id(id)
        event.delete_from_db()

    @auth.login_required(role='admin')
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str, required=True)
        parser.add_argument('name', type=str, required=True)
        parser.add_argument('place', type=str, required=True)
        parser.add_argument('city', type=str, required=True)
        parser.add_argument('date', type=str, required=True)
        parser.add_argument('price', type=int, required=True)
        parser.add_argument('total_available_tickets', type=int, required=True)

        data = parser.parse_args()
        event = EventModel.find_by_id(data.id)

        if event:
            event.name = data.name
            event.place = data.place
            event.city = data.city
            event.date = data.date
            event.price = data.price
            event.total_available_tickets = data.total_available_tickets
            event.save_to_db()

        else:
            return {"message": "Error Description"}, 404




class EventList(Resource):
    def get(self):
        events = EventModel.get_all_events()
        return {'events': [event.json() for event in events]}, 200 if events else 404

class EventArtistList(Resource):
    def get(self, id):
        artists = EventModel.find_by_artists(id)
        return {'artists': [artist.json() for artist in artists]}, 200 if artists else 404



class EventArtist(Resource):
    '''
    def get_first_artist(self, id_event):
        event = EventModel.find_by_id(id_event).json()
        list_artists = event['event']['artists']

        if list_artists:
            return list_artists[0].json()

        return None # reeturn errorr
    '''

    def get(self, id_event, id_artist):
        artists = EventModel.find_by_id_all_artists(id_event)
        artis = ArtistModel.find_by_id(id_artist)

        if artis in artists:
            return artis.json(),200
        else:
            return {},404

    @auth.login_required(role='admin')
    def post(self, id_event):
        print(id_event)

        parser = reqparse.RequestParser()
        #parser.add_argument('idEvent', type=str, required=True)
        parser.add_argument('idArtist', type=str, required=True)
        data = parser.parse_args()

        event = EventModel.find_by_id(id_event)

        artist = ArtistModel.find_by_id(data.idArtist)

        event.add_artist(artist)
        event.save_to_db()

    @auth.login_required(role='admin')
    def delete(self, id_event, id_artist):

        event = EventModel.find_by_id(id_event)
        artist = ArtistModel.find_by_id(id_artist)

        event.delete_artist(artist)
        event.save_to_db()


class ArtistEventsList(Resource):
    def get(self, id):
        events = EventModel.find_event_by_artists(id)
        return {'events': [event.json() for event in events]}, 200 if events else 404