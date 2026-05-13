-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `hashedPassword` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('FREE', 'BASIC', 'PREMIUM', 'ADMIN') NOT NULL DEFAULT 'FREE',
    `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_role_idx`(`email`, `role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRegisteredSource` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `sourceName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserRegisteredSource_userId_sourceName_key`(`userId`, `sourceName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tier` ENUM('FREE', 'BASIC', 'PREMIUM', 'ADMIN') NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `paymentId` VARCHAR(191) NULL,

    INDEX `Subscription_userId_status_idx`(`userId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedEdge` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedEdge_userId_edgeId_key`(`userId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedPower` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedPower_userId_powerId_key`(`userId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedCreature` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedCreature_userId_creatureId_key`(`userId`, `creatureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedSpecialAbility` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `specialAbilityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedSpecialAbility_userId_specialAbilityId_key`(`userId`, `specialAbilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedItem` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedItem_userId_itemId_key`(`userId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedSkill` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedSkill_userId_skillId_key`(`userId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedHindrance_userId_hindranceId_key`(`userId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedRace` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedRace_userId_raceId_key`(`userId`, `raceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSubscribedArcaneBackground` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `arcaneBackgroundId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserSubscribedArcaneBackground_userId_arcaneBackgroundId_key`(`userId`, `arcaneBackgroundId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Edge` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL DEFAULT 'NOVICE',
    `category` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `summary` TEXT NULL,
    `requirements` JSON NULL,
    `modifierData` JSON NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `authorId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Edge_name_key`(`name`),
    UNIQUE INDEX `Edge_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Power` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL DEFAULT 'NOVICE',
    `powerPoints` INTEGER NOT NULL,
    `duration` VARCHAR(191) NULL,
    `trappings` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `summary` TEXT NULL,
    `modifierData` JSON NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `authorId` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `sourceName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Power_name_key`(`name`),
    UNIQUE INDEX `Power_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Creature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `raceId` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `agility` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `smarts` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `spirit` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `strength` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `vigor` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `basePace` INTEGER NOT NULL DEFAULT 6,
    `baseParry` INTEGER NOT NULL DEFAULT 0,
    `baseToughness` INTEGER NOT NULL,
    `baseArmor` INTEGER NOT NULL DEFAULT 0,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `authorId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Creature_name_authorId_sourceName_idx`(`name`, `authorId`, `sourceName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialAbility` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `summary` VARCHAR(191) NULL,
    `modifierData` JSON NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `authorId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SpecialAbility_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `type` ENUM('WEAPON', 'ARMOR', 'CONSUMABLE', 'AMMUNITION', 'TOOL', 'ARTIFACT', 'KEY_ITEM', 'COMPONENT', 'MATERIAL', 'MISC') NOT NULL,
    `cost` INTEGER NULL,
    `weight` DOUBLE NULL,
    `imageUrl` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `authorId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Item_name_key`(`name`),
    INDEX `Item_name_type_sourceName_idx`(`name`, `type`, `sourceName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `linkedAttribute` ENUM('AGILITY', 'SMARTS', 'SPIRIT', 'STRENGTH', 'VIGOR') NOT NULL,
    `description` TEXT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `authorId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Skill_name_key`(`name`),
    UNIQUE INDEX `Skill_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hindrance` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `severity` ENUM('MINOR', 'MAJOR') NOT NULL,
    `description` TEXT NOT NULL,
    `summary` TEXT NULL,
    `notes` TEXT NULL,
    `modifierData` JSON NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `authorId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Hindrance_name_key`(`name`),
    UNIQUE INDEX `Hindrance_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Race` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `ancestry` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `authorId` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Race_name_key`(`name`),
    UNIQUE INDEX `Race_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceRacialAbility` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `racialAbilityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaceRacialAbility_raceId_racialAbilityId_key`(`raceId`, `racialAbilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaceHindrance_raceId_hindranceId_key`(`raceId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RaceEdge` (
    `id` VARCHAR(191) NOT NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RaceEdge_raceId_edgeId_key`(`raceId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArcaneBackground` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `arcaneSkillId` VARCHAR(191) NOT NULL,
    `startingPowers` INTEGER NOT NULL,
    `powerPoints` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `summary` TEXT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `authorId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ArcaneBackground_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterSource` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `sourceName` VARCHAR(191) NULL,

    UNIQUE INDEX `PlayerCharacterSource_playerCharacterId_sourceName_key`(`playerCharacterId`, `sourceName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterEdge` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NULL,
    `mechanicsSnapshot` JSON NULL,

    UNIQUE INDEX `PlayerCharacterEdge_playerCharacterId_edgeId_key`(`playerCharacterId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterPower` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NULL,
    `mechanicsSnapshot` JSON NULL,

    UNIQUE INDEX `PlayerCharacterPower_playerCharacterId_powerId_key`(`playerCharacterId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterSkill` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NULL,
    `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `mechanicsSnapshot` JSON NULL,

    UNIQUE INDEX `PlayerCharacterSkill_playerCharacterId_skillId_key`(`playerCharacterId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NULL,

    UNIQUE INDEX `PlayerCharacterHindrance_playerCharacterId_hindranceId_key`(`playerCharacterId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterArcaneBackground` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `arcaneBackgroundId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlayerCharacterArcaneBackground_playerCharacterId_arcaneBack_key`(`playerCharacterId`, `arcaneBackgroundId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureAbility` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `specialAbilityId` VARCHAR(191) NOT NULL,
    `mechanicsSnapshot` JSON NULL,

    UNIQUE INDEX `CreatureAbility_creatureId_specialAbilityId_key`(`creatureId`, `specialAbilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureEdge` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,
    `mechanicsSnapshot` JSON NULL,

    UNIQUE INDEX `CreatureEdge_creatureId_edgeId_key`(`creatureId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreaturePower` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,
    `mechanicsSnapshot` JSON NULL,

    UNIQUE INDEX `CreaturePower_creatureId_powerId_key`(`creatureId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureSkill` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `modifier` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `CreatureSkill_creatureId_skillId_key`(`creatureId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,
    `mechanicsSnapshot` JSON NULL,

    UNIQUE INDEX `CreatureHindrance_creatureId_hindranceId_key`(`creatureId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `setting` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Campaign_name_ownerId_idx`(`name`, `ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignGM` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CampaignGM_campaignId_userId_key`(`campaignId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignSource` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `sourceName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CampaignSource_campaignId_sourceName_key`(`campaignId`, `sourceName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignSession` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` TEXT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration` INTEGER NULL,
    `status` ENUM('PLANNED', 'ACTIVE', 'PAUSED', 'ENDED') NOT NULL DEFAULT 'PLANNED',
    `gmId` VARCHAR(191) NULL,
    `campaignId` VARCHAR(191) NOT NULL,

    INDEX `CampaignSession_campaignId_date_idx`(`campaignId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionEvent` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NOT NULL,
    `type` ENUM('NARRATIVE', 'COMBAT', 'EXPLORATION', 'PUZZLE', 'SOCIAL', 'TRAVEL') NOT NULL DEFAULT 'NARRATIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionCharacterState` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `entityType` ENUM('PC', 'CREATURE') NOT NULL,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `conditions` JSON NULL,
    `notes` TEXT NULL,
    `playerCharacterId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacter` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `concept` VARCHAR(191) NULL,
    `biography` VARCHAR(191) NULL,
    `raceId` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `imageUrl` VARCHAR(191) NULL,
    `campaignId` VARCHAR(191) NULL,
    `rank` ENUM('NOVICE', 'SEASONED', 'VETERAN', 'HEROIC', 'LEGENDARY') NOT NULL DEFAULT 'NOVICE',
    `advancesSpent` INTEGER NOT NULL DEFAULT 0,
    `advancesUnspent` INTEGER NOT NULL DEFAULT 0,
    `experience` INTEGER NULL,
    `agility` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `smarts` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `spirit` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `strength` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `vigor` ENUM('D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D30', 'D50', 'D100') NOT NULL DEFAULT 'D4',
    `pace` INTEGER NULL DEFAULT 6,
    `parry` INTEGER NULL DEFAULT 0,
    `toughness` INTEGER NULL,
    `armor` INTEGER NULL DEFAULT 0,
    `wealth` INTEGER NULL DEFAULT 500,
    `builderState` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PlayerCharacter_userId_name_raceId_idx`(`userId`, `name`, `raceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterInstance` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `paceOverride` INTEGER NULL,
    `parryOverride` INTEGER NULL,
    `toughnessOverride` INTEGER NULL,
    `armorOverride` INTEGER NULL,

    UNIQUE INDEX `CharacterInstance_characterId_key`(`characterId`),
    INDEX `CharacterInstance_campaignId_idx`(`campaignId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdvancementLog` (
    `id` VARCHAR(191) NOT NULL,
    `playerCharacterId` VARCHAR(191) NOT NULL,
    `spentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `details` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignMedia` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `type` ENUM('IMAGE', 'AUDIO', 'VIDEO', 'MAP') NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerJournalEntry` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `isPrivate` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PlayerJournalEntry_userId_characterId_idx`(`userId`, `characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GMJournalEntry` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `gmId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Source` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('CORE', 'COMPANION', 'HOMEBREW', 'THIRD_PARTY') NOT NULL DEFAULT 'CORE',
    `abbreviation` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `publisher` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Source_name_key`(`name`),
    INDEX `Source_name_type_idx`(`name`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignEdge` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CampaignEdge_campaignId_edgeId_key`(`campaignId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignPower` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CampaignPower_campaignId_powerId_key`(`campaignId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignSkill` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CampaignSkill_campaignId_skillId_key`(`campaignId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CampaignHindrance_campaignId_hindranceId_key`(`campaignId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureInstance` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `isWildCard` BOOLEAN NOT NULL DEFAULT false,
    `isNpc` BOOLEAN NOT NULL DEFAULT false,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `paceOverride` INTEGER NULL,
    `parryOverride` INTEGER NULL,
    `toughnessOverride` INTEGER NULL,
    `armorOverride` INTEGER NULL,

    INDEX `CreatureInstance_campaignId_idx`(`campaignId`),
    UNIQUE INDEX `CreatureInstance_campaignId_creatureId_key`(`campaignId`, `creatureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemInstance` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NULL,
    `creatureId` VARCHAR(191) NULL,
    `containerId` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `notes` VARCHAR(191) NULL,
    `isEquipped` BOOLEAN NOT NULL DEFAULT false,
    `state` JSON NOT NULL,
    `characterInstanceId` VARCHAR(191) NULL,
    `creatureInstanceId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntityModifier` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `entityType` ENUM('PLAYER', 'CREATURE', 'ITEM', 'ENTITY') NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `sourceType` ENUM('POWER', 'ITEM', 'EDGE', 'ABILITY', 'NARRATIVE', 'SYSTEM') NOT NULL,
    `sourceId` VARCHAR(191) NULL,
    `durationType` ENUM('ROUNDS', 'MINUTES', 'HOURS', 'ENCOUNTER', 'PERMANENT') NOT NULL,
    `durationRemaining` INTEGER NULL,
    `data` JSON NOT NULL,
    `condition` JSON NULL,
    `priority` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `creatureInstanceid` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RacialAbility` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `value` INTEGER NOT NULL,
    `modifierData` JSON NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,
    `sourceName` VARCHAR(191) NULL,

    UNIQUE INDEX `RacialAbility_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapon` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `setting` ENUM('MEDIEVAL', 'MODERN', 'WESTERN', 'KIDS_ON_BIKES', 'SLASHER', 'HORROR', 'FUTURISTIC', 'ANCIENT_TIMES', 'OTHERWORLD', 'HISTORICAL_TIMES') NULL,
    `damage` VARCHAR(191) NULL,
    `range` VARCHAR(191) NULL,
    `rof` INTEGER NULL,
    `ap` INTEGER NULL,
    `caliber` DOUBLE NULL,
    `minStrength` VARCHAR(191) NULL,

    UNIQUE INDEX `Weapon_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeaponCategoryAssignment` (
    `weaponId` VARCHAR(191) NOT NULL,
    `category` ENUM('MELEE', 'RANGED', 'THROWN', 'IMPROVISED', 'FIREARM', 'BLACK_POWDER', 'ENERGY', 'BOW', 'CROSSBOW', 'MAGIC', 'PSIONIC', 'HEAVY', 'LIGHT', 'TWO_HANDED', 'ONE_HANDED', 'REACH', 'CONCEALED', 'AREA', 'SUPPRESSIVE', 'PISTOL', 'RIFLE', 'SHOTGUN', 'SMG', 'CARBINE', 'LAUNCHER', 'MELEE_BLADE', 'MELEE_BLUNT', 'MELEE_PIERCE', 'POLEARM') NOT NULL,

    PRIMARY KEY (`weaponId`, `category`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Firearm` (
    `id` VARCHAR(191) NOT NULL,
    `weaponId` VARCHAR(191) NOT NULL,
    `ammoCapacity` INTEGER NULL,
    `reloadActions` INTEGER NULL,
    `mountType` VARCHAR(191) NULL,
    `blastTemplate` VARCHAR(191) NULL,
    `overchargeDie` VARCHAR(191) NULL,
    `specialAmmo` TEXT NULL,

    UNIQUE INDEX `Firearm_weaponId_key`(`weaponId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Armor` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `armorBonus` INTEGER NOT NULL,
    `covers` VARCHAR(191) NULL,
    `minStrength` VARCHAR(191) NULL,
    `parryPenalty` INTEGER NULL,
    `modifierData` JSON NULL,

    UNIQUE INDEX `Armor_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ammunition` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `caliber` INTEGER NULL,
    `ap` INTEGER NULL,
    `damageMod` VARCHAR(191) NULL,
    `modifierData` JSON NULL,

    UNIQUE INDEX `Ammunition_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consumable` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `maxUses` INTEGER NULL,
    `isStackable` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Consumable_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tool` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `skill` VARCHAR(191) NULL,
    `skillBonus` INTEGER NULL,
    `maxUses` INTEGER NULL,
    `maxDurability` INTEGER NULL,

    UNIQUE INDEX `Tool_itemId_key`(`itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artifact` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `rarity` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `maxCharges` INTEGER NULL,

    UNIQUE INDEX `Artifact_itemId_key`(`itemId`),
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
CREATE TABLE `CreatureCategory` (
    `creatureId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`creatureId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EdgeTag` (
    `id` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EdgeTag_edgeId_tagId_key`(`edgeId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PowerTag` (
    `id` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PowerTag_powerId_tagId_key`(`powerId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureTag` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CreatureTag_creatureId_tagId_key`(`creatureId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialAbilityTag` (
    `id` VARCHAR(191) NOT NULL,
    `specialAbilityId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SpecialAbilityTag_specialAbilityId_tagId_key`(`specialAbilityId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SkillTag` (
    `id` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SkillTag_skillId_tagId_key`(`skillId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemTag` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `tagId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ItemTag_itemId_tagId_key`(`itemId`, `tagId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRegisteredSource` ADD CONSTRAINT `UserRegisteredSource_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRegisteredSource` ADD CONSTRAINT `UserRegisteredSource_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedEdge` ADD CONSTRAINT `UserSubscribedEdge_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedEdge` ADD CONSTRAINT `UserSubscribedEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedPower` ADD CONSTRAINT `UserSubscribedPower_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedPower` ADD CONSTRAINT `UserSubscribedPower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedCreature` ADD CONSTRAINT `UserSubscribedCreature_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedCreature` ADD CONSTRAINT `UserSubscribedCreature_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedSpecialAbility` ADD CONSTRAINT `UserSubscribedSpecialAbility_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedSpecialAbility` ADD CONSTRAINT `UserSubscribedSpecialAbility_specialAbilityId_fkey` FOREIGN KEY (`specialAbilityId`) REFERENCES `SpecialAbility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedItem` ADD CONSTRAINT `UserSubscribedItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedItem` ADD CONSTRAINT `UserSubscribedItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedSkill` ADD CONSTRAINT `UserSubscribedSkill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedSkill` ADD CONSTRAINT `UserSubscribedSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedHindrance` ADD CONSTRAINT `UserSubscribedHindrance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedHindrance` ADD CONSTRAINT `UserSubscribedHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedRace` ADD CONSTRAINT `UserSubscribedRace_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedRace` ADD CONSTRAINT `UserSubscribedRace_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedArcaneBackground` ADD CONSTRAINT `UserSubscribedArcaneBackground_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSubscribedArcaneBackground` ADD CONSTRAINT `UserSubscribedArcaneBackground_arcaneBackgroundId_fkey` FOREIGN KEY (`arcaneBackgroundId`) REFERENCES `ArcaneBackground`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Edge` ADD CONSTRAINT `Edge_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Edge` ADD CONSTRAINT `Edge_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Power` ADD CONSTRAINT `Power_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Power` ADD CONSTRAINT `Power_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Creature` ADD CONSTRAINT `Creature_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Creature` ADD CONSTRAINT `Creature_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Creature` ADD CONSTRAINT `Creature_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialAbility` ADD CONSTRAINT `SpecialAbility_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialAbility` ADD CONSTRAINT `SpecialAbility_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hindrance` ADD CONSTRAINT `Hindrance_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hindrance` ADD CONSTRAINT `Hindrance_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Race` ADD CONSTRAINT `Race_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Race` ADD CONSTRAINT `Race_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceRacialAbility` ADD CONSTRAINT `RaceRacialAbility_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceRacialAbility` ADD CONSTRAINT `RaceRacialAbility_racialAbilityId_fkey` FOREIGN KEY (`racialAbilityId`) REFERENCES `RacialAbility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceHindrance` ADD CONSTRAINT `RaceHindrance_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceHindrance` ADD CONSTRAINT `RaceHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceEdge` ADD CONSTRAINT `RaceEdge_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RaceEdge` ADD CONSTRAINT `RaceEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_arcaneSkillId_fkey` FOREIGN KEY (`arcaneSkillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcaneBackground` ADD CONSTRAINT `ArcaneBackground_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSource` ADD CONSTRAINT `PlayerCharacterSource_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSource` ADD CONSTRAINT `PlayerCharacterSource_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterEdge` ADD CONSTRAINT `PlayerCharacterEdge_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterEdge` ADD CONSTRAINT `PlayerCharacterEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterPower` ADD CONSTRAINT `PlayerCharacterPower_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterPower` ADD CONSTRAINT `PlayerCharacterPower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSkill` ADD CONSTRAINT `PlayerCharacterSkill_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSkill` ADD CONSTRAINT `PlayerCharacterSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterHindrance` ADD CONSTRAINT `PlayerCharacterHindrance_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterHindrance` ADD CONSTRAINT `PlayerCharacterHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterArcaneBackground` ADD CONSTRAINT `PlayerCharacterArcaneBackground_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterArcaneBackground` ADD CONSTRAINT `PlayerCharacterArcaneBackground_arcaneBackgroundId_fkey` FOREIGN KEY (`arcaneBackgroundId`) REFERENCES `ArcaneBackground`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureAbility` ADD CONSTRAINT `CreatureAbility_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureAbility` ADD CONSTRAINT `CreatureAbility_specialAbilityId_fkey` FOREIGN KEY (`specialAbilityId`) REFERENCES `SpecialAbility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureEdge` ADD CONSTRAINT `CreatureEdge_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureEdge` ADD CONSTRAINT `CreatureEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreaturePower` ADD CONSTRAINT `CreaturePower_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreaturePower` ADD CONSTRAINT `CreaturePower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureSkill` ADD CONSTRAINT `CreatureSkill_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureSkill` ADD CONSTRAINT `CreatureSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureHindrance` ADD CONSTRAINT `CreatureHindrance_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureHindrance` ADD CONSTRAINT `CreatureHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignGM` ADD CONSTRAINT `CampaignGM_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignGM` ADD CONSTRAINT `CampaignGM_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSource` ADD CONSTRAINT `CampaignSource_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSource` ADD CONSTRAINT `CampaignSource_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSession` ADD CONSTRAINT `CampaignSession_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSession` ADD CONSTRAINT `CampaignSession_gmId_fkey` FOREIGN KEY (`gmId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionEvent` ADD CONSTRAINT `SessionEvent_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionCharacterState` ADD CONSTRAINT `SessionCharacterState_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionCharacterState` ADD CONSTRAINT `SessionCharacterState_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacter` ADD CONSTRAINT `PlayerCharacter_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacter` ADD CONSTRAINT `PlayerCharacter_raceId_fkey` FOREIGN KEY (`raceId`) REFERENCES `Race`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacter` ADD CONSTRAINT `PlayerCharacter_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterInstance` ADD CONSTRAINT `CharacterInstance_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterInstance` ADD CONSTRAINT `CharacterInstance_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdvancementLog` ADD CONSTRAINT `AdvancementLog_playerCharacterId_fkey` FOREIGN KEY (`playerCharacterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignMedia` ADD CONSTRAINT `CampaignMedia_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerJournalEntry` ADD CONSTRAINT `PlayerJournalEntry_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerJournalEntry` ADD CONSTRAINT `PlayerJournalEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerJournalEntry` ADD CONSTRAINT `PlayerJournalEntry_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GMJournalEntry` ADD CONSTRAINT `GMJournalEntry_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GMJournalEntry` ADD CONSTRAINT `GMJournalEntry_gmId_fkey` FOREIGN KEY (`gmId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignEdge` ADD CONSTRAINT `CampaignEdge_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignEdge` ADD CONSTRAINT `CampaignEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignPower` ADD CONSTRAINT `CampaignPower_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignPower` ADD CONSTRAINT `CampaignPower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSkill` ADD CONSTRAINT `CampaignSkill_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSkill` ADD CONSTRAINT `CampaignSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignHindrance` ADD CONSTRAINT `CampaignHindrance_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignHindrance` ADD CONSTRAINT `CampaignHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureInstance` ADD CONSTRAINT `CreatureInstance_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureInstance` ADD CONSTRAINT `CreatureInstance_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_characterInstanceId_fkey` FOREIGN KEY (`characterInstanceId`) REFERENCES `CharacterInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInstance` ADD CONSTRAINT `ItemInstance_creatureInstanceId_fkey` FOREIGN KEY (`creatureInstanceId`) REFERENCES `CreatureInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntityModifier` ADD CONSTRAINT `EntityModifier_creatureInstanceid_fkey` FOREIGN KEY (`creatureInstanceid`) REFERENCES `CreatureInstance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RacialAbility` ADD CONSTRAINT `RacialAbility_sourceName_fkey` FOREIGN KEY (`sourceName`) REFERENCES `Source`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Weapon` ADD CONSTRAINT `Weapon_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponCategoryAssignment` ADD CONSTRAINT `WeaponCategoryAssignment_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `Weapon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Firearm` ADD CONSTRAINT `Firearm_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `Weapon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Armor` ADD CONSTRAINT `Armor_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ammunition` ADD CONSTRAINT `Ammunition_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consumable` ADD CONSTRAINT `Consumable_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tool` ADD CONSTRAINT `Tool_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artifact` ADD CONSTRAINT `Artifact_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureCategory` ADD CONSTRAINT `CreatureCategory_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureCategory` ADD CONSTRAINT `CreatureCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EdgeTag` ADD CONSTRAINT `EdgeTag_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EdgeTag` ADD CONSTRAINT `EdgeTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PowerTag` ADD CONSTRAINT `PowerTag_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PowerTag` ADD CONSTRAINT `PowerTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureTag` ADD CONSTRAINT `CreatureTag_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureTag` ADD CONSTRAINT `CreatureTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialAbilityTag` ADD CONSTRAINT `SpecialAbilityTag_specialAbilityId_fkey` FOREIGN KEY (`specialAbilityId`) REFERENCES `SpecialAbility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialAbilityTag` ADD CONSTRAINT `SpecialAbilityTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillTag` ADD CONSTRAINT `SkillTag_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillTag` ADD CONSTRAINT `SkillTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemTag` ADD CONSTRAINT `ItemTag_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemTag` ADD CONSTRAINT `ItemTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
