-- migrate:up
CREATE TABLE images(
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    product_image_url VARCHAR(255),
    CONSTRAINT images_product_id_products_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE images

