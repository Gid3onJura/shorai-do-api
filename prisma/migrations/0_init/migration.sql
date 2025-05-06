-- CreateTable
CREATE TABLE `dojos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `eventdate` DATETIME(0) NULL,
    `eventcolor` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `override` BOOLEAN NULL,
    `repeating` BOOLEAN NULL,
    `eventtype` VARCHAR(255) NULL,
    `repetitiontype` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ranks` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `rank` TINYINT UNSIGNED NOT NULL,
    `category` VARCHAR(10) NOT NULL,
    `color` VARCHAR(10) NOT NULL,
    `user` INTEGER NOT NULL,
    `graduatedon` DATE NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ranks_users_FK`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refreshTokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `refreshTokens_token_key`(`token`),
    INDEX `refreshTokens_token_IDX`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `dojo` INTEGER NULL DEFAULT 1,
    `password` VARCHAR(255) NULL,
    `activated` BOOLEAN NULL,
    `birth` DATE NULL,
    `rank` INTEGER NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `resetcode` VARCHAR(6) NULL,

    INDEX `users_ibfk_1`(`dojo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ranks` ADD CONSTRAINT `ranks_users_FK` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`dojo`) REFERENCES `dojos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

