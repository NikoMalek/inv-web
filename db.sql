-- Primero crear la base de datos
--CREATE DATABASE invweb;

-- Despues ejecutar todo el script dentro de la DB

-- Tabla 'producto_base'
CREATE TABLE IF NOT EXISTS producto_base (
  id_producto_base UUID PRIMARY KEY,
  nombre_producto VARCHAR(255),
  descripcion_producto TEXT,
  imagen_producto VARCHAR(255),
  codigo_barra VARCHAR(50) UNIQUE
);

-- Insertar datos en 'producto_base'
DELETE FROM producto_base;
INSERT INTO producto_base (id_producto_base, nombre_producto, descripcion_producto, imagen_producto, codigo_barra) VALUES
  ('01266f2d-5c65-4992-8c60-1c9ad2f03eba', 'Coca-Cola zero', NULL, 'https://images.openfoodfacts.org/images/products/544/900/021/4799/front_en.203.400.jpg', '5449000214799'),
  ('673ba806-0030-401d-8ad4-2dc35178eeed', 'Cabernet Sauvignon', '', 'https://images.openfoodfacts.org/images/products/780/432/030/3178/front_es.32.400.jpg', '7804320303178'),
  ('8ca941aa-2113-4b22-8097-911f036160f3', 'Nutella', NULL, 'https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.633.400.jpg', '3017620422003'),
  ('ca654bb0-a887-47b9-ae79-b3addfb48e7d', 'Leche Semidescremada', NULL, 'https://images.openfoodfacts.org/images/products/780/292/000/0091/front_es.4.400.jpg', '7802920000091'),
  ('ee1d38ab-1c2c-47af-8f69-9fa889dcf26f', 'Jacobs Krönung Gold Instant', '', 'https://images.openfoodfacts.org/images/products/400/050/805/0008/front_de.20.400.jpg', '4000508050008'),
  ('f89beeb3-6710-4c3b-bf9b-d4e994284f51', 'Néctar de naranja', NULL, 'https://images.openfoodfacts.org/images/products/780/162/001/1604/front_es.22.400.jpg', '7801620011604');

-- Tabla 'empresas'
CREATE TABLE IF NOT EXISTS empresas (
  id_empresa UUID PRIMARY KEY,
  nombre_empresa VARCHAR(255) NOT NULL,
  direccion VARCHAR(255)
);

-- Insertar datos en 'empresas'
DELETE FROM empresas;
INSERT INTO empresas (id_empresa, nombre_empresa, direccion) VALUES
  ('98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', 'Tienda Test', 'Osorno, calle test #123'),
  ('c89b9ed3-f78d-4307-bd1a-6dd466d05702', 'Supermercado Super', 'Calle avenida villa, rural s/n');

-- Tabla 'users'
CREATE TABLE IF NOT EXISTS users (
  id_user UUID PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  rut VARCHAR(12) UNIQUE NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  id_empresa UUID NOT NULL,
  password VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa)
);

-- Insertar datos en 'users'
DELETE FROM users;
INSERT INTO users (id_user, nombre, apellido, rut, telefono, email, id_empresa, password) VALUES
  ('4ace81da-91d9-4c0d-87a4-234c46cb2f2e', 'Juan', 'Perez', '20.112.915-K', '988888888', 'ejemplo2@example.com', 'c89b9ed3-f78d-4307-bd1a-6dd466d05702', '$2b$10$HguKd7G0AH7QEdn3Ik8Pq.Eru.NyffuxDW/FicR9Ra/m86iPp.nl.'),
  ('a07f0201-c9fc-4a39-999f-33965f5e19f3', 'das', 'dsad', '11.111.111-1', '999999999', 'ejemplo@example.com', '98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', '$2b$10$IluKj.wiklup7/a9z3Hvru6nqx16YvryA/Ly1pJBWAOKwDxqcVoSu');

-- Tabla 'inventario'
CREATE TABLE IF NOT EXISTS inventario (
  id_inventario UUID PRIMARY KEY,
  id_producto_base UUID,
  id_empresa UUID,
  precio INT,
  cantidad INT,
  ultima_actualizacion TEXT,
  id_reponedor UUID,
  FOREIGN KEY (id_producto_base) REFERENCES producto_base(id_producto_base),
  FOREIGN KEY (id_empresa) REFERENCES empresas(id_empresa),
  FOREIGN KEY (id_reponedor) REFERENCES users(id_user)
);

-- Insertar datos en 'inventario'
DELETE FROM inventario;
INSERT INTO inventario (id_inventario, id_producto_base, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor) VALUES
  ('60dc6f1f-d8a3-4cc5-a42e-15a8b3a985d5', '01266f2d-5c65-4992-8c60-1c9ad2f03eba', '98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', 10000, 10, '24/08/2024', 'a07f0201-c9fc-4a39-999f-33965f5e19f3'),
  ('8f55d19f-fb82-4655-8ad7-4aea51de8c66', 'ca654bb0-a887-47b9-ae79-b3addfb48e7d', '98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', 10000, 10, '24/08/2024', 'a07f0201-c9fc-4a39-999f-33965f5e19f3');
