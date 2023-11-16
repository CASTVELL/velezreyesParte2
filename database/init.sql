CREATE TABLE appuser (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE
);

CREATE TABLE query (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    user_id INTEGER REFERENCES user(id),
    query_data VARCHAR
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    comment_text VARCHAR(200),
    user_id INTEGER REFERENCES user(id),
    query_id INTEGER REFERENCES query(id)
);
