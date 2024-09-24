/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `inv-web` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inv-web`;

CREATE TABLE IF NOT EXISTS `empresas` (
  `ID_EMPRESA` varchar(36) NOT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_EMPRESA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `empresas`;
INSERT INTO `empresas` (`ID_EMPRESA`, `nombre_empresa`, `direccion`) VALUES
	('98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', 'a', 'a');
INSERT INTO `empresas` (`ID_EMPRESA`, `nombre_empresa`, `direccion`) VALUES
	('c89b9ed3-f78d-4307-bd1a-6dd466d05702', 'Supermercado Super', 'Calle avenida villa, rural s/n');

CREATE TABLE IF NOT EXISTS `inventario` (
  `ID_INVENTARIO` varchar(36) NOT NULL,
  `ID_PRODUCTO_BASE` varchar(36) DEFAULT NULL,
  `ID_EMPRESA` varchar(36) DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `ultima_actualizacion` text,
  `ID_REPONEDOR` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`ID_INVENTARIO`),
  KEY `ID_PRODUCTO_BASE` (`ID_PRODUCTO_BASE`),
  KEY `ID_EMPRESA` (`ID_EMPRESA`),
  KEY `ID_REPONEDOR` (`ID_REPONEDOR`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`ID_PRODUCTO_BASE`) REFERENCES `producto_base` (`ID_PRODUCTO_BASE`),
  CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`ID_EMPRESA`) REFERENCES `empresas` (`ID_EMPRESA`),
  CONSTRAINT `inventario_ibfk_3` FOREIGN KEY (`ID_REPONEDOR`) REFERENCES `users` (`ID_USER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `inventario`;
INSERT INTO `inventario` (`ID_INVENTARIO`, `ID_PRODUCTO_BASE`, `ID_EMPRESA`, `precio`, `cantidad`, `ultima_actualizacion`, `ID_REPONEDOR`) VALUES
	('60dc6f1f-d8a3-4cc5-a42e-15a8b3a985d5', '01266f2d-5c65-4992-8c60-1c9ad2f03eba', '98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', 10000, 10, '24/08/2024', 'a07f0201-c9fc-4a39-999f-33965f5e19f3');
INSERT INTO `inventario` (`ID_INVENTARIO`, `ID_PRODUCTO_BASE`, `ID_EMPRESA`, `precio`, `cantidad`, `ultima_actualizacion`, `ID_REPONEDOR`) VALUES
	('8f55d19f-fb82-4655-8ad7-4aea51de8c66', 'ca654bb0-a887-47b9-ae79-b3addfb48e7d', '98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', 10000, 10, '24/08/2024', 'a07f0201-c9fc-4a39-999f-33965f5e19f3');

CREATE TABLE IF NOT EXISTS `producto_base` (
  `ID_PRODUCTO_BASE` char(36) NOT NULL,
  `NOMBRE_PRODUCTO` varchar(255) DEFAULT NULL,
  `DESCRIPCION_PRODUCTO` text,
  `IMAGEN_PRODUCTO` varchar(255) DEFAULT NULL,
  `CODIGO_BARRA` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_PRODUCTO_BASE`),
  UNIQUE KEY `CODIGO_BARRAS` (`CODIGO_BARRA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `producto_base`;
INSERT INTO `producto_base` (`ID_PRODUCTO_BASE`, `NOMBRE_PRODUCTO`, `DESCRIPCION_PRODUCTO`, `IMAGEN_PRODUCTO`, `CODIGO_BARRA`) VALUES
	('01266f2d-5c65-4992-8c60-1c9ad2f03eba', 'Coca-Cola zero', NULL, 'https://images.openfoodfacts.org/images/products/544/900/021/4799/front_en.203.400.jpg', '5449000214799');
INSERT INTO `producto_base` (`ID_PRODUCTO_BASE`, `NOMBRE_PRODUCTO`, `DESCRIPCION_PRODUCTO`, `IMAGEN_PRODUCTO`, `CODIGO_BARRA`) VALUES
	('673ba806-0030-401d-8ad4-2dc35178eeed', 'Cabernet Sauvignon', '', 'https://images.openfoodfacts.org/images/products/780/432/030/3178/front_es.32.400.jpg', '7804320303178');
INSERT INTO `producto_base` (`ID_PRODUCTO_BASE`, `NOMBRE_PRODUCTO`, `DESCRIPCION_PRODUCTO`, `IMAGEN_PRODUCTO`, `CODIGO_BARRA`) VALUES
	('8ca941aa-2113-4b22-8097-911f036160f3', 'Nutella', NULL, 'https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.633.400.jpg', '3017620422003');
INSERT INTO `producto_base` (`ID_PRODUCTO_BASE`, `NOMBRE_PRODUCTO`, `DESCRIPCION_PRODUCTO`, `IMAGEN_PRODUCTO`, `CODIGO_BARRA`) VALUES
	('ca654bb0-a887-47b9-ae79-b3addfb48e7d', 'Leche Semidescremada', NULL, 'https://images.openfoodfacts.org/images/products/780/292/000/0091/front_es.4.400.jpg', '7802920000091');
INSERT INTO `producto_base` (`ID_PRODUCTO_BASE`, `NOMBRE_PRODUCTO`, `DESCRIPCION_PRODUCTO`, `IMAGEN_PRODUCTO`, `CODIGO_BARRA`) VALUES
	('ee1d38ab-1c2c-47af-8f69-9fa889dcf26f', 'Jacobs Krönung Gold Instant', '', 'https://images.openfoodfacts.org/images/products/400/050/805/0008/front_de.20.400.jpg', '4000508050008');
INSERT INTO `producto_base` (`ID_PRODUCTO_BASE`, `NOMBRE_PRODUCTO`, `DESCRIPCION_PRODUCTO`, `IMAGEN_PRODUCTO`, `CODIGO_BARRA`) VALUES
	('f89beeb3-6710-4c3b-bf9b-d4e994284f51', 'Néctar de naranja', NULL, 'https://images.openfoodfacts.org/images/products/780/162/001/1604/front_es.22.400.jpg', '7801620011604');

CREATE TABLE IF NOT EXISTS `users` (
  `ID_USER` varchar(36) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `ID_EMPRESA` varchar(36) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`ID_USER`),
  UNIQUE KEY `rut` (`rut`),
  UNIQUE KEY `email` (`email`),
  KEY `ID_EMPRESA` (`ID_EMPRESA`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`ID_EMPRESA`) REFERENCES `empresas` (`ID_EMPRESA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DELETE FROM `users`;
INSERT INTO `users` (`ID_USER`, `nombre`, `apellido`, `rut`, `telefono`, `email`, `ID_EMPRESA`, `password`) VALUES
	('4ace81da-91d9-4c0d-87a4-234c46cb2f2e', 'Juan', 'Perez', '20.112.915-K', '988888888', 'ejemplo2@example.com', 'c89b9ed3-f78d-4307-bd1a-6dd466d05702', '$2b$10$HguKd7G0AH7QEdn3Ik8Pq.Eru.NyffuxDW/FicR9Ra/m86iPp.nl.');
INSERT INTO `users` (`ID_USER`, `nombre`, `apellido`, `rut`, `telefono`, `email`, `ID_EMPRESA`, `password`) VALUES
	('a07f0201-c9fc-4a39-999f-33965f5e19f3', 'das', 'dsad', '11.111.111-1', '999999999', 'ejemplo@example.com', '98c815a8-7c6f-4bcd-aa10-63ce4464d7b1', '$2b$10$IluKj.wiklup7/a9z3Hvru6nqx16YvryA/Ly1pJBWAOKwDxqcVoSu');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
