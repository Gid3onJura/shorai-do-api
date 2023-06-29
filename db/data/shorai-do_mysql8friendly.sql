--
-- Table structure for table `dojos`
--

DROP TABLE IF EXISTS dojos;
CREATE TABLE dojos (
  id tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `ranks`
--

DROP TABLE IF EXISTS `ranks`;
CREATE TABLE `ranks` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `rank` tinyint(3) unsigned NOT NULL,
  `category` varchar(10) NOT NULL,
  `color` varchar(10) NOT NULL,
  `user` smallint(5) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `graduatedOn` date NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `nickname` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dojo` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `activated` tinyint(1) NOT NULL DEFAULT 0,
  `updatedAt` datetime DEFAULT NULL,
  `birth` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`),
  KEY `user_FK` (`dojo`),
  CONSTRAINT `user_FK` FOREIGN KEY (`dojo`) REFERENCES `dojos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
