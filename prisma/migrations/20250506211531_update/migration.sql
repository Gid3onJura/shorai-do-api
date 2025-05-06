/*
  Warnings:

  - The primary key for the `dojos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `dojos` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedTinyInt`.
  - You are about to alter the column `eventcolor` on the `events` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `repetitiontype` on the `events` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `user` on the `ranks` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedSmallInt`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rank` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedSmallInt`.
  - You are about to alter the column `nickname` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - A unique constraint covering the columns `[nickname]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `dojos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventdate` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventtype` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `refreshTokens` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dojo` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `activated` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ranks` DROP FOREIGN KEY `ranks_users_FK`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- DropIndex
DROP INDEX `refreshTokens_token_key` ON `refreshTokens`;

-- AlterTable
ALTER TABLE `dojos` DROP PRIMARY KEY,
    MODIFY `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `name` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `events` ADD COLUMN `eventdatetimefrom` DATETIME(0) NULL,
    ADD COLUMN `eventdatetimeto` DATETIME(0) NULL,
    MODIFY `eventdate` DATE NOT NULL,
    MODIFY `eventcolor` VARCHAR(100) NULL,
    MODIFY `description` VARCHAR(100) NOT NULL,
    MODIFY `override` BOOLEAN NULL DEFAULT false,
    MODIFY `repeating` BOOLEAN NULL DEFAULT false,
    MODIFY `eventtype` VARCHAR(100) NOT NULL DEFAULT 'training',
    MODIFY `repetitiontype` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `ranks` MODIFY `user` SMALLINT UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `refreshTokens` MODIFY `token` VARCHAR(255) NOT NULL,
    MODIFY `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `rank`,
    MODIFY `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `nickname` VARCHAR(100) NULL,
    MODIFY `name` VARCHAR(100) NOT NULL,
    MODIFY `email` VARCHAR(100) NULL,
    MODIFY `dojo` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    MODIFY `activated` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `updatedAt` DATETIME(0) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `nickname` ON `users`(`nickname`);

-- CreateIndex
CREATE UNIQUE INDEX `name` ON `users`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `users`(`email`);

-- CreateIndex
CREATE INDEX `user_nickname_IDX` ON `users`(`nickname`);

-- AddForeignKey
ALTER TABLE `ranks` ADD CONSTRAINT `ranks_users_FK` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`dojo`) REFERENCES `dojos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_ibfk_1` TO `user_FK`;
