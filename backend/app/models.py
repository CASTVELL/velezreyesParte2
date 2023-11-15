# models.py
from backend.app.app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)

class Query(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    comment = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    query_data = db.Column(db.String)  # or db.Column(db.JSON)
    comments = db.relationship('Comment', backref='query', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    query_id = db.Column(db.Integer, db.ForeignKey('query.id'))

class Visualization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query_id = db.Column(db.Integer, db.ForeignKey('query.id'))
    visualization_data = db.Column(db.String)  # or db.Column(db.JSON)
