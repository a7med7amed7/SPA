-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (30,1,8,3);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `card_number` char(16) NOT NULL,
  `expiry_date` char(5) NOT NULL,
  `cvv` char(3) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zip_code` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'1245653254369896','10/25','664','Ahmed','Hamed','Egypt','Alexandria','Bridge','22654','+209456452','ahmed@gmail.com','2024-11-08 21:48:41'),(3,1,'1245653259869896','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 22:38:48'),(4,1,'1245653259869896','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 22:39:42'),(5,1,'1245653259869896','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 22:40:47'),(6,1,'1245653259869896','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 22:41:53'),(7,1,'1245653259869896','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 22:42:30'),(8,1,'1245653259869896','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 22:43:27'),(9,1,'4111111111111111','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 22:44:14'),(10,1,'4111111111111111','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 23:50:08'),(11,1,'4111111111111111','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 23:51:19'),(12,1,'4111111111111111','11/25','663','Sameer','Saad','Egypt','Alexandria','Bridge','22951','+209456452','ali@gmail.com','2024-11-08 23:52:34'),(13,1,'4111111111111111','12/25','654','Ahmed ','Hamed','Egypt','Damanhour','Buhayrah, Damanhur','5832456','01552531401','aboz7amed7@gmail.com','2024-11-09 22:16:47'),(14,1,'4111111111111111','12/26','654','sad','fdsaf','Egypt','Damanhour','Buhayrah, Damanhur','5832456','01552531401','aboz7amed7@gmail.com','2024-11-09 23:57:04'),(15,1,'4111111111111111','12/26','654','sad','fdsaf','Egypt','Damanhour','Buhayrah, Damanhur','5832456','01552531401','aboz7amed7@gmail.com','2024-11-09 23:58:32'),(16,1,'4111111111111111','12/26','654','sad','fdsaf','Egypt','Damanhour','Buhayrah, Damanhur','5832456','01552531401','aboz7amed7@gmail.com','2024-11-09 23:59:59'),(17,1,'4111111111111111','12/26','654','sadasd','fdsaf','Egypt','Damanhour','Buhayrah, Damanhur','5832456','01552531401','aboz7amed7@gmail.com','2024-11-10 00:35:28'),(18,1,'4111111111111111','12/26','654','dsgfgfgh','fdsaf','Egypt','Damanhour','Buhayrah, Damanhur','5832456','01552531401','aboz7amed7@gmail.com','2024-11-10 01:14:27'),(19,1,'4111111111111111','12/27','654','ds452ghas','fdssaa14','Egypt','Damanhour','Buhayrah, Damanhur','5832456','01552565401','aboz7amed7@gmail.com','2024-11-10 01:24:49'),(20,1,'4111111111111111','11/25','654','Ahmed','Ali','Qatar','Duha','Duha blabla','64548','+4504894804','fasfsdff@gmail.com','2024-11-10 13:44:57');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (8,'AirFrier',150,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ahmed','ahmed@gmail.com','$2a$12$3wWPCOuvxGUlylGiQqAJk.puwxgYmwqfUy/5x6GCmtaZ8cPGVqVsi');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-10 17:08:28
