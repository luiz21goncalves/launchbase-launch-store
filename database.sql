-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;

DROP DATABASE IF EXISTS launchstoredb;
CREATE DATABASE launchstoredb;

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int NOT NULL,	
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,	
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "deleted_at" timestamp
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" text UNIQUE NOT NULL,	
  "cep" text,
  "address" text,	
  "reset_token" text,
  "reset_token_expires" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,	
  "name" text NOT NULL	
);

INSERT INTO categories(name) VALUES('comida');
INSERT INTO categories(name) VALUES('eletrônicos');
INSERT INTO categories(name) VALUES('automóveis');

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,	
  "name" text,
  "path" text NOT NULL,	
  "product_id" int	
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "seller_id" INT NOT NULL,
  "bayer_id" INT NOT NULL,
  "product_id" INT NOT NULL,
  "price" INT NOT NULL,
  "quantity" INT DEFAULT 0,
  "total" INT NOT NULL,
  "status" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT (now()),
  "updated_at" TIMESTAMP DEFAULT (now())
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE;

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "orders" ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("bayer_id") REFERENCES "users" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE FUNCTION trigger_set_timestamp()	
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL	
)	
WITH (OIDS=FALSE);	

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;	

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE OR REPLACE RULE delete_product AS
ON DELETE TO products DO INSTEAD
UPDATE products
SET deleted_at = now()
WHERE products.id = old.id;

CREATE VIEW products_without_deleted AS
SELECT * FROM products WHERE deleted_at IS null;

ALTER TABLE products RENAME TO products_with_deleted;
ALTER VIEW products_without_deleted RENAME TO products;

-- DELETE FROM users;
-- DELETE FROM products_with_deleted;
-- DELETE FROM files;

-- ALTER SEQUENCE users_id_seq RESTART WITH 1;
-- ALTER SEQUENCE products_with_deleted_id_seq RESTART WITH 1;
-- ALTER SEQUENCE files_id_seq RESTART WITH 1;