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
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `rank` tinyint unsigned NOT NULL,
  `category` varchar(10) NOT NULL,
  `color` varchar(10) NOT NULL,
  `user` smallint unsigned  NOT NULL,
  `graduatedon` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ranks_users_FK` (`user`),
  CONSTRAINT `ranks_users_FK` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `roles` json NULL,
  `updatedAt` datetime DEFAULT NULL,
  `resetcode` VARCHAR(6) NULL,
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
  `eventdate` date NOT NULL,
  `eventcolor` varchar(100) DEFAULT NULL,
  `description` varchar(100) NOT NULL,
  `override` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `repeating` tinyint(1) DEFAULT 0,
  `eventtype` varchar(100) NOT NULL DEFAULT 'training',
  `repetitiontype` varchar(100) DEFAULT NULL,
  `eventdatetimefrom` datetime DEFAULT NULL,
  `eventdatetimeto` datetime DEFAULT NULL,
  `note` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `refreshTokens`
--
CREATE TABLE `refreshTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `refreshTokens_token_IDX` (`token`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `options`
--
CREATE TABLE `options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `eventid` smallint(5) unsigned NOT NULL,
  `description` varchar(255) NOT NULL,
  `slug` varchar(255) NULL,
  `type` varchar(255) NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `option_FK` (`eventid`),
  FULLTEXT KEY `option_description_IDX` (`description`),
  CONSTRAINT `option_FK` 
    FOREIGN KEY (`eventid`) REFERENCES `events` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `books`
--
CREATE TABLE `books` (
	`id` smallint(5) unsigned auto_increment NOT NULL,
	`bookname` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `bookrentals`
--
CREATE TABLE `bookrentals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bookid` smallint(5) unsigned NOT NULL,
  `readername` varchar(255) NOT NULL,
  `rentaldate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookid` (`bookid`),
  KEY `bookrental_FK` (`bookid`),
  CONSTRAINT `bookrental_FK` 
    FOREIGN KEY (`bookid`) REFERENCES `books` (`id`) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;