-- migrate:up
ALTER TABLE products
    ADD COLUMN low_category_id INT NOT NULL,
    ADD CONSTRAINT products_low_category_id_fkey FOREIGN KEY (low_category_id) REFERENCES low_category(id) ON DELETE CASCADE

-- migrate:down

