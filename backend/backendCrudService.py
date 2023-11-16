from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from urllib.parse import quote_plus

# App config

app = Flask(__name__)

db_name = 'query_database'
db_user = 'admin_user'
db_pass = quote_plus('magical_password')
db_host = 'dbpostgres' # este es el servicio database declarado en el docker-compose
db_port = '5432'

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Models

class AppUser(db.Model):
    __tablename__ = 'appuser'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    queries = db.relationship('Query', backref='user', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)

class Query(db.Model):
    __tablename__ = 'query'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey(AppUser.__tablename__ + '.id'))  
    query_data = db.Column(db.String)  
    comments = db.relationship('Comment', backref='query', lazy=True)
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'query_data': self.query_data
        }

class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey(AppUser.__tablename__ + '.id'))
    query_id = db.Column(db.Integer, db.ForeignKey(Query.__tablename__ + '.id'))
    @property
    def serialize(self):
        return {
            'id': self.id,
            'comment_text': self.comment_text,
            'user_id': self.user_id,
            'query_id': self.query_id
        }


# Routes

@app.route('/query', methods=['GET', 'POST'])
def query():
    """ 
    This function handles GET and POST requests for the '/query' endpoint.
    If the request method is GET, it returns all the queries in the database.
    If the request method is POST, it adds a new query to the database and returns the added query.
    """
    try: 
        
        if request.method == 'GET':
            queries = Query.query.all()
            return jsonify([query.serialize for query in queries])
        elif request.method == 'POST':
            data = request.json
            query = Query(name=data['name'], user_id=data['user_id'], query_data=data['query_data'])
            db.session.add(query)
            db.session.commit()
            print("entro a post")
            print(query.serialize)
            return jsonify(query.serialize)
    
    except Exception as e:
        return {"message": f"Hay un error en el endpoint definido por la funcion query   : {str(e)}"}

@app.route('/query/<int:query_id>', methods=['GET', 'PUT', 'DELETE'])
def query_detail(query_id):
    """
    Retrieves, updates or deletes a specific query by its ID.

    Args:
        query_id (int): The ID of the query to retrieve, update or delete.

    Returns:
        If the request method is GET, returns a JSON representation of the query.
        If the request method is PUT, updates the query and returns a JSON representation of the updated query.
        If the request method is DELETE, deletes the query and returns a 204 No Content response.
        If an exception occurs, returns a JSON object with an error message.
    """
    try:

        query = Query.query.get_or_404(query_id)
        if request.method == 'GET':
            return jsonify(query.serialize)
        elif request.method == 'PUT':
            data = request.json
            query.name = data.get('name', query.name)
            query.user_id = data.get('user_id', query.user_id)
            query.query_data = data.get('query_data', query.query_data)
            db.session.commit()
            return jsonify(query.serialize)
        elif request.method == 'DELETE':
            db.session.delete(query)
            db.session.commit()
            return '', 204
        
    except Exception as e:
        return {"message": f"Hay un error en el endpoint definido por la funcion query_detail    : {str(e)}"}

@app.route('/comment', methods=['GET', 'POST'])
def comment():
    """
    GET: Returns a list of all comments.
    POST: Adds a new comment to the database.
    """
    try:

        if request.method == 'GET':
            comments = db.session.query(Comment).all()
            return jsonify([comment.serialize for comment in comments])
        elif request.method == 'POST':
            data = request.json
            comment = Comment(comment_text=data['comment_text'], user_id=data['user_id'], query_id=data['query_id'])
            db.session.add(comment)
            db.session.commit()
            return jsonify(comment.serialize)
    
    except Exception as e:
        return {"message": f"Hay un error en el endpoint definido por la funcion comment    : {str(e)}"}

@app.route('/comment/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def comment_detail(comment_id):
    """
    Retrieves, updates or deletes a specific comment by its ID.

    Args:
        comment_id (int): The ID of the comment to retrieve, update or delete.

    Returns:
        If the request method is GET, returns a JSON representation of the comment.
        If the request method is PUT, updates the comment and returns a JSON representation of the updated comment.
        If the request method is DELETE, deletes the comment and returns a 204 No Content response.
        If an exception occurs, returns a JSON object with an error message.
    """
    try:

        comment = db.session.query(Comment).filter_by(id=comment_id).first()
        if request.method == 'GET':
            return jsonify(comment.serialize)
        elif request.method == 'PUT':
            data = request.json
            comment.comment_text = data.get('comment_text', comment.comment_text)
            comment.user_id = data.get('user_id', comment.user_id)
            comment.query_id = data.get('query_id', comment.query_id)
            db.session.commit()
            return jsonify(comment.serialize)
        elif request.method == 'DELETE':
            db.session.delete(comment)
            db.session.commit()
            return '', 204

    except Exception as e:
        return {"message": f"Hay un error en el endpoint definido por la funcion comment_detail    : {str(e)}"}


# Run app

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port= 3000, debug=True)
