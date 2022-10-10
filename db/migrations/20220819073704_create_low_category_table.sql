-- migrate:up
CREATE TABLE low_category(
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    middle_category_id INT NOT NULL,
    CONSTRAINT low_category_middle_category_id_fkey FOREIGN KEY (middle_category_id) REFERENCES middle_category(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE low_category