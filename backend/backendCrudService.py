from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)

class Query(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    comment = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    query_data = db.Column(db.String)  # or db.Column(db.JSON)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment_text = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    query_id = db.Column(db.Integer, db.ForeignKey('query.id'))

class Visualization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query_id = db.Column(db.Integer, db.ForeignKey('query.id'))
    visualization_data = db.Column(db.String)  # or db.Column(db.JSON)

@app.route('/query', methods=['GET', 'POST'])
def query():
    if request.method == 'GET':
        queries = Query.query.all()
        return jsonify([query.__dict__ for query in queries])
    elif request.method == 'POST':
        data = request.json
        query = Query(name=data['name'], comment=data['comment'], user_id=data['user_id'], query_data=data['query_data'])
        db.session.add(query)
        db.session.commit()
        return jsonify(query.__dict__)

@app.route('/query/<int:query_id>', methods=['GET', 'PUT', 'DELETE'])
def query_detail(query_id):
    query = Query.query.get_or_404(query_id)
    if request.method == 'GET':
        return jsonify(query.__dict__)
    elif request.method == 'PUT':
        data = request.json
        query.name = data.get('name', query.name)
        query.comment = data.get('comment', query.comment)
        query.user_id = data.get('user_id', query.user_id)
        query.query_data = data.get('query_data', query.query_data)
        db.session.commit()
        return jsonify(query.__dict__)
    elif request.method == 'DELETE':
        db.session.delete(query)
        db.session.commit()
        return '', 204

@app.route('/comment', methods=['GET', 'POST'])
def comment():
    if request.method == 'GET':
        comments = Comment.query.all()
        return jsonify([comment.__dict__ for comment in comments])
    elif request.method == 'POST':
        data = request.json
        comment = Comment(comment_text=data['comment_text'], user_id=data['user_id'], query_id=data['query_id'])
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment.__dict__)

@app.route('/comment/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def comment_detail(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    if request.method == 'GET':
        return jsonify(comment.__dict__)
    elif request.method == 'PUT':
        data = request.json
        comment.comment_text = data.get('comment_text', comment.comment_text)
        comment.user_id = data.get('user_id', comment.user_id)
        comment.query_id = data.get('query_id', comment.query_id)
        db.session.commit()
        return jsonify(comment.__dict__)
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return '', 204

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port= 3000, debug=True)
