-- migrate:up
CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    weight FLOAT NOT NULL,
    amount INT NOT NULL,
    price INT NOT NULL,
    made_in VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
-- migrate:down
DROP TABLE products