-- migrate:up
ALTER TABLE users MODIFY password VARCHAR(200);
ALTER TABLE users RENAME COLUMN user_id TO user_name;
ALTER TABLE users ADD CONSTRAINT name_unique UNIQUE (user_name, email);
ALTER TABLE products MODIFY price DECIMAL(11, 2);

-- migrate:down

