--
-- Table structure for table `dojos`
--
CREATE TABLE `dojos` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ranks`
--
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
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `repeating` tinyint(1) DEFAULT 0,
  `eventtype` varchar(100) NOT NULL DEFAULT 'training',
  `repetitiontype` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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