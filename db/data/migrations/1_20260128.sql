-- Migration: Add roles column, reservationdate, userid and update rentaldate nullability (Safe Version)

-- 1. Spalte "roles" in Tabelle "users" hinzufügen
ALTER TABLE `users` ADD COLUMN `roles` json NULL AFTER `graduatedon`;

-- 2. Spalte "rentaldate" auf NULL ändern
ALTER TABLE `bookrentals` MODIFY COLUMN `rentaldate` date DEFAULT NULL;

-- 3. Spalte "reservationdate" hinzufügen
ALTER TABLE `bookrentals` ADD COLUMN `reservationdate` date DEFAULT NULL AFTER `rentaldate`;

-- 4. Spalte "userid" mit Fremdschlüssel-Constraint hinzufügen (in 3 Schritten für bessere Fehlerbehandlung)
ALTER TABLE `bookrentals` ADD COLUMN `userid` smallint(5) unsigned NOT NULL AFTER `bookid`;
ALTER TABLE `bookrentals` ADD KEY `bookrental_userid_FK` (`userid`);
ALTER TABLE `bookrentals` ADD CONSTRAINT `bookrental_userid_FK` 
  FOREIGN KEY (`userid`) REFERENCES `users` (`id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE;

ALTER TABLE `bookrentals` DROP COLUMN readername;
-- Ende der Migration