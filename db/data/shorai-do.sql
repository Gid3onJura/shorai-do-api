-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: shorai-do
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

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
-- Table structure for table `dojos`
--

DROP TABLE IF EXISTS `dojos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dojos` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ranks`
--

DROP TABLE IF EXISTS `ranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranks` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `rank` tinyint(3) unsigned NOT NULL,
  `category` varchar(10) NOT NULL,
  `color` varchar(10) NOT NULL,
  `user` smallint(5) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `graduatedon` date NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dojo` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `password` varchar(255) NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `activated` tinyint(1) NOT NULL DEFAULT 0,
  `birth` date DEFAULT NULL,
  `rank` tinyint(3) unsigned NULL,
  `category` varchar(10) NULL,
  `color` varchar(10) NULL,
  `graduatedon` date NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name` (`name`),
  KEY `user_FK` (`dojo`),
  FULLTEXT KEY `user_nickname_IDX` (`nickname`),
  CONSTRAINT `user_FK` FOREIGN KEY (`dojo`) REFERENCES `dojos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `calendar`
-- 
CREATE TABLE `events` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `eventdate` date NOT NULL DEFAULT curdate(),
  `eventcolor` varchar(100) DEFAULT NULL,
  `description` varchar(100) NOT NULL,
  `override` tinyint(1) DEFAULT 0,
  `createdat` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL,
  `repeating` tinyint(1) DEFAULT 0,
  `eventtype` varchar(100) NOT NULL DEFAULT 'training',
  `repetitiontype` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `refreshTokens`
--
CREATE TABLE `refreshTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;