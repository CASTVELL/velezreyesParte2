CREATE TABLE appuser (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE
);

-- Insert default users
INSERT INTO appuser (username) VALUES ('karen'), ('admin');

CREATE TABLE query (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    user_id INTEGER REFERENCES appuser(id),
    query_data VARCHAR
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    comment_text VARCHAR(200),
    user_id INTEGER REFERENCES appuser(id),
    query_id INTEGER REFERENCES query(id)
);