from flask_restful import Resource, reqparse
from models.accounts import auth
from models.artist import ArtistModel

class Artist(Resource):

    def get(self, id):
        artist = ArtistModel.find_by_id(id)
        return artist.json(), 200 if artist else 404

    @auth.login_required(role='admin')
    def post(self):
        parser = reqparse.RequestParser()  # create parameters parser from request
        # define al input parameters need and its type
        #parser.add_argument(str(id), type=int, required=True)
        parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
        parser.add_argument('country', type=str)
        parser.add_argument('genre', type=str) #, action="append"

        data = parser.parse_args()
        artist = ArtistModel.find_by_name(data.name)


        if not artist:
            new_artist = ArtistModel(data.name, data.country, data.genre)
            new_artist.save_to_db()
            return {'id_artist': new_artist.id}, 200

        else:
            return {'id_artist': artist.id}, 200


    @auth.login_required(role='admin')
    def delete(self,id):
        artist = ArtistModel.find_by_id(id)
        artist.delete_from_db()

    @auth.login_required(role='admin')
    def put(self,id):
        artist=ArtistModel.find_by_id(id)

        if(artist is None):
            parser=reqparse.RequestParser()
            parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
            parser.add_argument('country', type=str)
            parser.add_argument('genre', type=str, action="append")
            data = parser.parse_args()
            artist = ArtistModel(data['name'], data['country'], data['genre'])
            artist.save_to_db()
        else:
            parser=reqparse.RequestParser()
            parser.add_argument('name', type=str, required=True, help="This field cannot be left blanck")
            parser.add_argument('country', type=str)
            parser.add_argument('genre', type=str, action="append")
            data = parser.parse_args()
            artist.name = data['name']
            artist.country = data['country']
            artist.genre = data['genre']
            artist.save_to_db()

class ArtistList(Resource):
    def get(self):
        artists = ArtistModel.get_all_artists()
        return {'artists': [artist.json() for artist in artists]}




