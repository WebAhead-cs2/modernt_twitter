BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  age INTEGER
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_content TEXT
);

INSERT INTO users (email, username , password, age, location) VALUES
  ('Sery@1976','Sery1976', '28',28, 'Middlehill),
  ('Notne@1991', 'Notne1991', '36', 36, 'Sunipol),
  ('Moull@1990', 'Moull1990', '41',41, 'Wanlip),
  ('Spont@1935','Spont1935', '72', 72, 'Saxilby),
  ('Pre#cand', 'Precand', '19' ,19, 'Stanton)
;

INSERT INTO blog_posts (text_content, user_id) VALUES
  ('Announcing of invitation principles in.', 1),
  ('Peculiar trifling absolute and wandered yet.', 2),
  ('Far stairs now coming bed oppose hunted become his.', 3),
  ('Curabitur arcu quam, imperdiet ac orci ac.', 4),
  ('Aenean blandit risus sed pellentesque.', 5)
;

COMMIT;
