-- migrate:up
CREATE TABLE middle_category(
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    high_category_id INT NOT NULL,
    CONSTRAINT middle_category_high_category_id_fkey FOREIGN KEY (high_category_id) REFERENCES high_category(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE middle_category