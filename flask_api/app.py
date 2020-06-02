from flask import Flask
from flask_cors import CORS
from Resources.accounts import Accounts, AccountsList
from Resources.artist import Artist, ArtistList
from Resources.event import Event, EventList, EventArtistList, EventArtist, ArtistEventsList, EventArtist2
from Resources.login import Login
from Resources.orders import Orders, OrdersList
from flask_migrate import Migrate
from flask_restful import Api
from flask import render_template

from flask import request

from db import db, secret_key
import argparse
from models.artist import ArtistModel
from models.event import EventModel
from models.event import artist_table


#also import table created with many-to-many relationship


app = Flask(__name__,
         static_folder="../test/dist/static",
         template_folder="../test/dist")
api = Api(app)


CORS(app, resources={r'/*': {'origins': '*'}})

app.config['SECRET_KEY'] = secret_key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
db.init_app(app)

api.add_resource(Artist, '/artist/<int:id>', '/artist')
api.add_resource(ArtistList, '/artists')

api.add_resource(Event, '/event/<int:id>', '/event')
api.add_resource(EventList, '/events')

api.add_resource(EventArtistList, '/event/<int:id>/artists')
api.add_resource(EventArtist, '/event/<int:id_event>/artist/<int:id_artist>', '/event/<int:id_event>/artist')
api.add_resource(EventArtist2, '/event2/<int:id_event>/artist/<int:id_artist>', '/event2/<int:id_event>/artist')
#api.add_resource(EventArtist, '/event/<int:id_event>/artist/<id_artist>','/event/<int:id_event>/artist')
api.add_resource(Orders, '/orders/<string:username>')
api.add_resource(OrdersList, '/orders')

api.add_resource(Login, '/login')

api.add_resource(ArtistEventsList, '/artist/<int:id>/events')
api.add_resource(Accounts, '/account/<string:username>', '/account')
api.add_resource(AccountsList, '/accounts')




@app.route('/')
def render_vue():
    return render_template("index.html")




if __name__ == '__main__':
    app.run(port=5000, debug=True)
