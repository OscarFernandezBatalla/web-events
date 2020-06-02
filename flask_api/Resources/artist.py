from flask_restful import Resource, reqparse
from models.accounts import auth
from models.artist import ArtistModel

class Artist(Resource):

    def get(self, id):
        artist = ArtistModel.find_by_id(id)
        if artist:
            return {"artist": artist.json()}, 200
        return {"message": "Artist not found"}, 404

    @auth.login_required(role='admin')
    def post(self):
        parser = reqparse.RequestParser()  # create parameters parser from request
        # define al input parameters need and its type
        #parser.add_argument(str(id), type=int, required=True)
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('country', type=str)
        parser.add_argument('genre', type=str) #, action="append"

        data = parser.parse_args()

        if not data.country:
            return {"message": "Artist not valid : 'country' not provided"}, 400
        if not data.name:
            return {"message": "Artist not valid : 'name' not provided"}, 400
        if not data.genre:
            return {"message": "Artist not valid : 'genre' not provided"}, 400

        artist = ArtistModel.find_by_name(data.name)

        if not artist:
            new_artist = ArtistModel(data.name, data.country, data.genre)
            new_artist.save_to_db()

            return {"artist" : new_artist.json()}, 201

        else:
            return {"message": "An artist with same name [" + artist.name + "] already exists"}, 409


    @auth.login_required(role='admin')
    def delete(self, id):
        artist = ArtistModel.find_by_id(id)
        if artist:
            artist.delete_from_db()
            return {"message": "Artist ['id': " + str(id) + ", 'name': " + artist.name + "] deleted"}, 200
        return {"message": "Artist with ['id': " + str(id) + "] Not Found"}, 404

    @auth.login_required(role='admin')
    def put(self, id):
        artist = ArtistModel.find_by_id(id)

        if not artist:
            return {"message": "Artist with ['id' : " + str(id) + "] Not Found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('country', type=str)
        parser.add_argument('genre', type=str, action="append")
        data = parser.parse_args()

        if not data.name:
            return {"message": "Event not valid: 'name' not provided"}, 400
        if not data.country:
            return {"message": "Event not valid: 'country' not provided"}, 400
        if not data.genre:
            return {"message": "Event not valid: 'genre' not provided"}, 400

        exists = ArtistModel.find_by_name(data.name)
        if exists:
            return {"message": "Artist name modification not allowed: An Artist with ['name' : " + data.name + "] already exists"}, 400

        artist.name = data.name
        artist.country = data.country
        artist.genre = data.genre
        artist.save_to_db()

        return {"artist": artist.json()}, 200



class ArtistList(Resource):
    def get(self):
        artists = ArtistModel.get_all_artists()
        return {'artists': [artist.json() for artist in artists]}




