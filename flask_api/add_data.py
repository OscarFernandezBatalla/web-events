from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models.artist import ArtistModel
from models.event import EventModel

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.init_app(app)



new_artist1= ArtistModel("artisttest1","Spain","TRAP")
new_artist2= ArtistModel("artisttest2","Spain","REGGAE")
new_artist3= ArtistModel("artisttest3","UK","TRAP")

db.session.add(new_artist1)
db.session.add(new_artist2)
db.session.add(new_artist3)

db.session.commit()




new_event1=EventModel("Canet Rock 2021","Platja", "Canet de Mar","2021-07-05",50,300)
new_event2=EventModel("Canet Rock 2022","Platja", "Canet de Mar","2022-07-09",50,300)

db.session.add(new_event1)
db.session.add(new_event2)

db.session.commit()



new_event1.artists.append(new_artist1)
#new_event2.artists.append(artist)

db.session.add(new_event1)
db.session.commit()

db.session.close()
exit()