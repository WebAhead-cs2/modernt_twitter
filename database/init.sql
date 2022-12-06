BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  pass VARCHAR(255)
);

CREATE TABLE user_comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  comment TEXT
);
INSERT INTO users (username, email, pass) VALUES
  ('wael', 'wael@wa', '123'),
  ('amal', 'amal@amal', 'amal'),
  ('ahmad', 'ahmad@ah', '1234')
;

INSERT INTO user_comments (comment, user_id) VALUES
  ('Announcing of invitation principles in.', 1),
  ('Peculiar trifling absolute and wandered yet.', 2),
  ('Far stairs now coming bed oppose hunted become his.', 3)
;
COMMIT;