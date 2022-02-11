const up = async connection => {
    await connection.query(`
            CREATE TABLE categories(
                id INT NOT NULL AUTO_INCREMENT,
                category VARCHAR(250) NULL DEFAULT NULL,
                PRIMARY KEY (id)
  )`)
    await connection.query(`
            CREATE TABLE products(
                id INT NOT NULL  AUTO_INCREMENT,
                product VARCHAR(250) NULL DEFAULT NULL,
                price FLOAT,
                PRIMARY KEY (id)
            )`)
    await connection.query(`
            CREATE TABLE images(
                id INT NOT NULL AUTO_INCREMENT,
                description TEXT NULL DEFAULT NULL,
                url VARCHAR(500) NULL DEFAULT NULL,
                product_id INT NOT NULL,
                PRIMARY KEY (id),
                KEY fk_image_product_index (product_id),
                CONSTRAINT fk_image_product_constraint FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
                
            )`)
    await connection.query(`
            CREATE TABLE category_product(
                product_id INT NOT NULL ,
                category_id INT NOT NULL,
                KEY fk_categories_products_index (product_id,category_id),
                CONSTRAINT fk_category_product_constraint1 FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT fk_category_product_constraint2 FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE
            )`)
  }
  const down = async connection => {
    await connection.query(`
            DROP TABLE category_product`)
    await connection.query(`
            DROP TABLE images`)
    await connection.query(`
            DROP TABLE categories`)
    await connection.query(`
            DROP TABLE products`)
  }
  
  module.exports = {
    up,
    down,
  }
  