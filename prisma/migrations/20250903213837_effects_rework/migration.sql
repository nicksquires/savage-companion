-- AlterTable
ALTER TABLE `effect` ADD COLUMN `applicableData` JSON NULL,
    ADD COLUMN `areaTemplate` VARCHAR(191) NULL,
    ADD COLUMN `targetType` ENUM('SELF', 'ALLY', 'ENEMY', 'MULTI', 'AREA', 'OBJECT') NULL,
    ADD COLUMN `triggerType` ENUM('PASSIVE', 'ON_HIT', 'ON_EQUIP', 'ON_USE', 'ON_ROLL', 'ON_CONDITION') NULL;

-- CreateTable
CREATE TABLE `Firearm` (
    `id` VARCHAR(191) NOT NULL,
    `weaponId` VARCHAR(191) NOT NULL,
    `firearmType` ENUM('PISTOL', 'RIFLE', 'SHOTGUN', 'MACHINE_GUN', 'LASER', 'GATLING', 'BLACK_POWDER', 'IMPROVISED') NULL,
    `ammoCapacity` INTEGER NULL,
    `currentAmmo` INTEGER NULL,
    `reloadActions` INTEGER NULL,
    `isDoubleBarrel` BOOLEAN NOT NULL DEFAULT false,
    `mountType` ENUM('NONE', 'BIPOD', 'TRIPOD', 'VEHICLE') NULL,
    `blastTemplate` VARCHAR(191) NULL,
    `overchargeDie` VARCHAR(191) NULL,
    `specialAmmo` TEXT NULL,

    UNIQUE INDEX `Firearm_weaponId_key`(`weaponId`),
    INDEX `Firearm_firearmType_mountType_idx`(`firearmType`, `mountType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EffectBonus` (
    `id` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,
    `attribute` ENUM('DAMAGE', 'TOUGHNESS', 'PARRY', 'PACE', 'RESISTANCE_BYPASS', 'ILLUMINATION_PENALTY', 'SKILL_ROLL', 'POWER_POINTS', 'ATTACK_ROLL', 'AGILITY_ROLL', 'STEALTH_ROLL', 'CONCEALMENT_ROLL', 'MULTI_ACTION_PENALTY', 'FATIGUE', 'STRENGTH_MINIMUM', 'RATE_OF_FIRE', 'RELOAD_TIME', 'RANGE', 'DAMAGE_ONGOING', 'MOVEMENT_PENALTY', 'SPELLCASTING_ROLL', 'BREAKAGE_CHANCE', 'MALFUNCTION_CHANCE', 'WOUND_MODIFIER', 'BENNY_COST', 'RUN_DIE', 'SIZE_MODIFIER', 'ARMOR_PENETRATION', 'HEALING_ROLL', 'INTIMIDATION_ROLL', 'TAUNT_ROLL', 'NOTICE_ROLL', 'SURVIVAL_ROLL', 'TRACKING_ROLL', 'INITIATIVE_CARD') NOT NULL,
    `value` INTEGER NOT NULL,
    `isNegative` BOOLEAN NOT NULL DEFAULT false,
    `condition` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EffectRoll` (
    `id` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,
    `skill` VARCHAR(191) NOT NULL,
    `targetNumber` INTEGER NULL,
    `onSuccess` TEXT NULL,
    `onFailure` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EffectCondition` (
    `id` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,
    `type` ENUM('SHAKEN', 'DISTRACTED', 'VULNERABLE', 'ENTANGLED', 'BOUND', 'PRONE', 'STUNNED', 'FATIGUED', 'EXHAUSTED', 'INCAPACITATED', 'POISONED', 'DRENCHED', 'FROZEN', 'BURNING', 'HOT', 'BLEEDING', 'BLINDED', 'DEAFENED', 'SICKENED', 'SUFFOCATING', 'FRIGHTENED', 'ENRAGED', 'CONFUSED', 'CHARMED', 'DOMINATED', 'HOPELESS', 'SHAMED', 'CURSED', 'PETRIFIED', 'WEAKENED', 'HAUNTED', 'ETHEREAL', 'IRRADIATED', 'HACKED', 'MAGNETIZED', 'SYSTEM_SHOCK', 'JAMMED', 'CUSTOM') NOT NULL,
    `duration` VARCHAR(191) NULL,
    `onApply` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    UNIQUE INDEX `Category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EffectCategory` (
    `effectId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`effectId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureCategory` (
    `creatureId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`creatureId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActiveEffect` (
    `id` VARCHAR(191) NOT NULL,
    `effectId` VARCHAR(191) NOT NULL,
    `targetId` VARCHAR(191) NOT NULL,
    `targetType` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Firearm` ADD CONSTRAINT `Firearm_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `Weapon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Effect` ADD CONSTRAINT `Effect_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffectBonus` ADD CONSTRAINT `EffectBonus_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffectRoll` ADD CONSTRAINT `EffectRoll_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffectCondition` ADD CONSTRAINT `EffectCondition_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffectCategory` ADD CONSTRAINT `EffectCategory_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EffectCategory` ADD CONSTRAINT `EffectCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureCategory` ADD CONSTRAINT `CreatureCategory_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureCategory` ADD CONSTRAINT `CreatureCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveEffect` ADD CONSTRAINT `ActiveEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `Effect`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
