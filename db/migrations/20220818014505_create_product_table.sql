-- migrate:up
CREATE TABLE `product` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `weight` FLOAT NOT NULL,
    `amount` INT NOT NULL,
    `price` INT NOT NULL,
    `made_in` VARCHAR(30) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE `product`;