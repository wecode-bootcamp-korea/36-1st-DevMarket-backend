-- migrate:up
CREATE TABLE cart (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    amount INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_key (user_id,product_id),
    CONSTRAINT cart_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    CONSTRAINT cart_users_id_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE cart