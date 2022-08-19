-- migrate:up
CREATE TABLE high_category(
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
)

-- migrate:down
DROP TABLE high_category
