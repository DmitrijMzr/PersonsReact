CREATE DATABASE  IF NOT EXISTS `person2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `person2`;
-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: person
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblogin`
--

DROP TABLE IF EXISTS `tblogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tblogin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  unique key (login)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblogin`
--

LOCK TABLES `tblogin` WRITE;
/*!40000 ALTER TABLE `tblogin` DISABLE KEYS */;
INSERT INTO `tblogin` VALUES (1,'user1','1','user1@1'),(2,'user2','2','user2@2'),(3,'user4','4','user4@4'),(4,'Grigoriy Gigabidze Suliymanovich Petrovich Gazmanovich','1234567890','Grigoriy@gmail.co'),(5,'user45','45','45@45'),(6,'user5','5','user5@user'),(7,'user6','6','user6@6'),(8,'user7','7','user7@7');
/*!40000 ALTER TABLE `tblogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbperson`
--

DROP TABLE IF EXISTS `tbperson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbperson` (
  `count` int(11) NOT NULL AUTO_INCREMENT,
  `personID` int(11) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `age` varchar(100) DEFAULT NULL,
  `loginID` int(11) NOT NULL,
  PRIMARY KEY (`count`),
  KEY `loginID` (`loginID`),
  CONSTRAINT `tbperson_ibfk_1` FOREIGN KEY (`loginID`) REFERENCES `tblogin` (`id`) ON DELETE CASCADE,
  unique key (personID, loginID)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbperson`
--

LOCK TABLES `tbperson` WRITE;
/*!40000 ALTER TABLE `tbperson` DISABLE KEYS */;
INSERT INTO `tbperson` VALUES (12,2,'Alex2','Ivanov2','212',1),(13,3,'Alex23','Ivanov233333','2124',1),(14,4,'Alex23','Ivanov233333','2124',1),(19,4,'wer','wer','65',2),(21,3,'Linda','Asssd123','12',2),(22,2,'wer22','wer','653',2),(26,1,'1','1','1',3),(27,1,'Dashulya','Vasilivna','23',4),(29,1,'1','1','1',5),(30,5,'wer','wer','65',2),(32,1,'1234','1124','999',1),(33,10,'1234','1124','999',1),(34,1,'123','123','123',7);
/*!40000 ALTER TABLE `tbperson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbtodoperson`
--

DROP TABLE IF EXISTS `tbtodoperson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tbtodoperson` (
  `count` int(11) NOT NULL AUTO_INCREMENT,
  `taskID` int(11) NOT NULL,
  `task` varchar(300) NOT NULL,
  `stage` varchar(10) DEFAULT NULL,
  `loginID` int(11) NOT NULL,
  PRIMARY KEY (`count`),
  KEY `loginID` (`loginID`),
  CONSTRAINT `tbtodoperson_ibfk_1` FOREIGN KEY (`loginID`) REFERENCES `tblogin` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbtodoperson`
--

LOCK TABLES `tbtodoperson` WRITE;
/*!40000 ALTER TABLE `tbtodoperson` DISABLE KEYS */;
INSERT INTO `tbtodoperson` VALUES (3,3,'xxxx','777',8),(4,1,'pokuritr123','yyyy',8);
/*!40000 ALTER TABLE `tbtodoperson` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-22 19:26:04
