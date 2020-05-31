from db import db

genres = ('REGGAE', 'POP', 'TRAP', 'HIP HOP', 'ROCK', 'INDIE', 'HEAVY', 'ELECTRONIC', 'OTHER')

class ArtistModel(db.Model):
    __tablename__ = 'artists' #This is table name

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(30), unique=True, nullable=False)
    country = db.Column(db.String(30), nullable=False)
    #genre = db.Column(db.Enum(*genres,name='genres_types'), nullable=False)
    genre = db.Column(db.Enum(*genres))

    def __init__(self, name, country, genre):
        self.name = name
        self.country = country
        self.genre = genre

    def json(self):
        return {
                "id": self.id,
                "name": self.name,
                "country": self.country,
                "genre": self.genre
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

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter(cls.id == id).first()

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter(cls.name == name).first()

    @classmethod
    def find_by_country(cls, country):
        return cls.query.filter(cls.country == country).all()

    @classmethod
    def find_by_genre(cls, genre):
        return cls.query.filter(cls.genre == genre).all()

    @classmethod
    def get_all_artists(cls):
        return cls.query.all()






















