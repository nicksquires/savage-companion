-- CreateTable
CREATE TABLE `Campaign` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NULL,
    `setting` VARCHAR(191) NULL,
    `genre` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `characterTemplateId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignSession` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration` INTEGER NULL,
    `notes` VARCHAR(191) NULL,
    `gmId` VARCHAR(191) NULL,
    `campaignId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SessionEvent` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('Narrative', 'Combat', 'Exploration', 'Puzzle', 'Social', 'Travel') NOT NULL DEFAULT 'Narrative',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerJournalEntry` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `isPrivate` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PlayerJournalEntry_sessionId_userId_key`(`sessionId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GMJournalEntry` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` VARCHAR(191) NOT NULL,
    `gmId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterTemplate` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `startingWealth` INTEGER NOT NULL DEFAULT 500,
    `startingSkillPoints` INTEGER NOT NULL DEFAULT 12,
    `startingEdges` INTEGER NOT NULL DEFAULT 1,
    `startingHindrances` INTEGER NOT NULL DEFAULT 3,
    `startingPace` INTEGER NOT NULL DEFAULT 6,
    `startingBennies` INTEGER NOT NULL DEFAULT 3,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CharacterTemplate_campaignId_key`(`campaignId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacter` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `concept` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `race` VARCHAR(191) NULL,
    `arcaneBackground` VARCHAR(191) NULL,
    `rank` ENUM('Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary') NOT NULL,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `advances` INTEGER NOT NULL DEFAULT 0,
    `agility` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `smarts` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `spirit` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `strength` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `vigor` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `pace` INTEGER NOT NULL DEFAULT 6,
    `parry` INTEGER NOT NULL DEFAULT 0,
    `toughness` INTEGER NOT NULL,
    `armor` INTEGER NOT NULL DEFAULT 0,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `wealth` INTEGER NULL DEFAULT 500,
    `gear` JSON NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardCharacter` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `concept` VARCHAR(191) NULL,
    `race` VARCHAR(191) NULL,
    `arcaneBackground` VARCHAR(191) NULL,
    `rank` ENUM('Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary') NOT NULL,
    `experience` INTEGER NOT NULL DEFAULT 0,
    `advances` INTEGER NOT NULL DEFAULT 0,
    `agility` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `smarts` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `spirit` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `strength` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `vigor` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `pace` INTEGER NOT NULL DEFAULT 6,
    `parry` INTEGER NOT NULL DEFAULT 0,
    `toughness` INTEGER NOT NULL,
    `armor` INTEGER NOT NULL DEFAULT 0,
    `bennies` INTEGER NOT NULL DEFAULT 3,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `gear` JSON NULL,
    `notes` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `ownerId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `linkedAttribute` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `ownerId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Skill_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Edge` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `rank` ENUM('Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary') NOT NULL DEFAULT 'Novice',
    `requirements` JSON NULL,
    `effects` VARCHAR(191) NOT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Power` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rank` ENUM('Novice', 'Seasoned', 'Veteran', 'Heroic', 'Legendary') NOT NULL DEFAULT 'Novice',
    `powerPoints` INTEGER NULL,
    `duration` VARCHAR(191) NOT NULL,
    `effect` VARCHAR(191) NOT NULL,
    `trapping` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialAbility` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `parameters` JSON NOT NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `ownerId` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hindrance` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `severity` ENUM('Minor', 'Major') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cost` INTEGER NULL,
    `weight` DOUBLE NULL,
    `type` VARCHAR(191) NOT NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT true,
    `ownerId` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Creature` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `agility` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `smarts` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `spirit` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `strength` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `vigor` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `pace` INTEGER NOT NULL DEFAULT 6,
    `parry` INTEGER NOT NULL DEFAULT 0,
    `toughness` INTEGER NOT NULL,
    `armor` INTEGER NOT NULL DEFAULT 0,
    `wounds` INTEGER NOT NULL DEFAULT 0,
    `fatigue` INTEGER NOT NULL DEFAULT 0,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `ownerId` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `sourceId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignNote` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Source` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('CORE', 'COMPANION', 'HOMEBREW', 'THIRD_PARTY') NOT NULL DEFAULT 'CORE',
    `abbreviation` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `publisher` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `isHomebrew` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Source_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignPlayerCharacter` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignPlayerCharacter_campaignId_characterId_key`(`campaignId`, `characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignWildCardCharacter` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `wildCardCharacterId` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignWildCardCharacter_campaignId_wildCardCharacterId_key`(`campaignId`, `wildCardCharacterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignCreature` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignCreature_campaignId_creatureId_key`(`campaignId`, `creatureId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignEdge` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,
    `characterTemplateId` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignEdge_campaignId_edgeId_key`(`campaignId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignPower` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignPower_campaignId_powerId_key`(`campaignId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignSkill` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,
    `characterTemplateId` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignSkill_campaignId_skillId_key`(`campaignId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,
    `characterTemplateId` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignHindrance_campaignId_hindranceId_key`(`campaignId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignSource` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `sourceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CampaignSource_campaignId_sourceId_key`(`campaignId`, `sourceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignItem` (
    `id` VARCHAR(191) NOT NULL,
    `campaignId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CampaignItem_campaignId_itemId_key`(`campaignId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterEdge` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `PlayerCharacterEdge_characterId_edgeId_key`(`characterId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterPower` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,
    `customName` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `trapping` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `PlayerCharacterPower_characterId_powerId_key`(`characterId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterSkill` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `PlayerCharacterSkill_characterId_skillId_key`(`characterId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterItem` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `PlayerCharacterItem_characterId_itemId_key`(`characterId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerCharacterHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlayerCharacterHindrance_characterId_hindranceId_key`(`characterId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardCharacterEdge` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardCharacterId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `WildCardCharacterEdge_wildCardCharacterId_edgeId_key`(`wildCardCharacterId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardCharacterPower` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardCharacterId` VARCHAR(191) NOT NULL,
    `powerId` VARCHAR(191) NOT NULL,
    `customName` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `trapping` VARCHAR(191) NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `WildCardCharacterPower_wildCardCharacterId_powerId_key`(`wildCardCharacterId`, `powerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardCharacterSkill` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardCharacterId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `WildCardCharacterSkill_wildCardCharacterId_skillId_key`(`wildCardCharacterId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardCharacterItem` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardCharacterId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `WildCardCharacterItem_wildCardCharacterId_itemId_key`(`wildCardCharacterId`, `itemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WildCardCharacterHindrance` (
    `id` VARCHAR(191) NOT NULL,
    `wildCardCharacterId` VARCHAR(191) NOT NULL,
    `hindranceId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WildCardCharacterHindrance_wildCardCharacterId_hindranceId_key`(`wildCardCharacterId`, `hindranceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureAbility` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `specialAbilityId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CreatureAbility_creatureId_specialAbilityId_key`(`creatureId`, `specialAbilityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureEdge` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `edgeId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CreatureEdge_creatureId_edgeId_key`(`creatureId`, `edgeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureSkill` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `skillId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `CreatureSkill_creatureId_skillId_key`(`creatureId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CreatureItem` (
    `id` VARCHAR(191) NOT NULL,
    `creatureId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `dieType` ENUM('d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd30', 'd50', 'd100') NOT NULL DEFAULT 'd4',
    `modifier` INTEGER NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,

    UNIQUE INDEX `CreatureItem_creatureId_itemId_key`(`creatureId`, `itemId`),
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
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSession` ADD CONSTRAINT `CampaignSession_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSession` ADD CONSTRAINT `CampaignSession_gmId_fkey` FOREIGN KEY (`gmId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionEvent` ADD CONSTRAINT `SessionEvent_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerJournalEntry` ADD CONSTRAINT `PlayerJournalEntry_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerJournalEntry` ADD CONSTRAINT `PlayerJournalEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GMJournalEntry` ADD CONSTRAINT `GMJournalEntry_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `CampaignSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GMJournalEntry` ADD CONSTRAINT `GMJournalEntry_gmId_fkey` FOREIGN KEY (`gmId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterTemplate` ADD CONSTRAINT `CharacterTemplate_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacter` ADD CONSTRAINT `PlayerCharacter_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Edge` ADD CONSTRAINT `Edge_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Edge` ADD CONSTRAINT `Edge_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Power` ADD CONSTRAINT `Power_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Power` ADD CONSTRAINT `Power_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialAbility` ADD CONSTRAINT `SpecialAbility_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialAbility` ADD CONSTRAINT `SpecialAbility_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hindrance` ADD CONSTRAINT `Hindrance_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hindrance` ADD CONSTRAINT `Hindrance_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Creature` ADD CONSTRAINT `Creature_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Creature` ADD CONSTRAINT `Creature_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignNote` ADD CONSTRAINT `CampaignNote_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignPlayerCharacter` ADD CONSTRAINT `CampaignPlayerCharacter_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignPlayerCharacter` ADD CONSTRAINT `CampaignPlayerCharacter_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignWildCardCharacter` ADD CONSTRAINT `CampaignWildCardCharacter_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignWildCardCharacter` ADD CONSTRAINT `CampaignWildCardCharacter_wildCardCharacterId_fkey` FOREIGN KEY (`wildCardCharacterId`) REFERENCES `WildCardCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignCreature` ADD CONSTRAINT `CampaignCreature_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignCreature` ADD CONSTRAINT `CampaignCreature_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignEdge` ADD CONSTRAINT `CampaignEdge_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignEdge` ADD CONSTRAINT `CampaignEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignEdge` ADD CONSTRAINT `CampaignEdge_characterTemplateId_fkey` FOREIGN KEY (`characterTemplateId`) REFERENCES `CharacterTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignPower` ADD CONSTRAINT `CampaignPower_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignPower` ADD CONSTRAINT `CampaignPower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSkill` ADD CONSTRAINT `CampaignSkill_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSkill` ADD CONSTRAINT `CampaignSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSkill` ADD CONSTRAINT `CampaignSkill_characterTemplateId_fkey` FOREIGN KEY (`characterTemplateId`) REFERENCES `CharacterTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignHindrance` ADD CONSTRAINT `CampaignHindrance_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignHindrance` ADD CONSTRAINT `CampaignHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignHindrance` ADD CONSTRAINT `CampaignHindrance_characterTemplateId_fkey` FOREIGN KEY (`characterTemplateId`) REFERENCES `CharacterTemplate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSource` ADD CONSTRAINT `CampaignSource_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignSource` ADD CONSTRAINT `CampaignSource_sourceId_fkey` FOREIGN KEY (`sourceId`) REFERENCES `Source`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignItem` ADD CONSTRAINT `CampaignItem_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignItem` ADD CONSTRAINT `CampaignItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterEdge` ADD CONSTRAINT `PlayerCharacterEdge_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterEdge` ADD CONSTRAINT `PlayerCharacterEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterPower` ADD CONSTRAINT `PlayerCharacterPower_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterPower` ADD CONSTRAINT `PlayerCharacterPower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSkill` ADD CONSTRAINT `PlayerCharacterSkill_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterSkill` ADD CONSTRAINT `PlayerCharacterSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterItem` ADD CONSTRAINT `PlayerCharacterItem_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterItem` ADD CONSTRAINT `PlayerCharacterItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterHindrance` ADD CONSTRAINT `PlayerCharacterHindrance_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `PlayerCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerCharacterHindrance` ADD CONSTRAINT `PlayerCharacterHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterEdge` ADD CONSTRAINT `WildCardCharacterEdge_wildCardCharacterId_fkey` FOREIGN KEY (`wildCardCharacterId`) REFERENCES `WildCardCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterEdge` ADD CONSTRAINT `WildCardCharacterEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterPower` ADD CONSTRAINT `WildCardCharacterPower_wildCardCharacterId_fkey` FOREIGN KEY (`wildCardCharacterId`) REFERENCES `WildCardCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterPower` ADD CONSTRAINT `WildCardCharacterPower_powerId_fkey` FOREIGN KEY (`powerId`) REFERENCES `Power`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterSkill` ADD CONSTRAINT `WildCardCharacterSkill_wildCardCharacterId_fkey` FOREIGN KEY (`wildCardCharacterId`) REFERENCES `WildCardCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterSkill` ADD CONSTRAINT `WildCardCharacterSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterItem` ADD CONSTRAINT `WildCardCharacterItem_wildCardCharacterId_fkey` FOREIGN KEY (`wildCardCharacterId`) REFERENCES `WildCardCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterItem` ADD CONSTRAINT `WildCardCharacterItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterHindrance` ADD CONSTRAINT `WildCardCharacterHindrance_wildCardCharacterId_fkey` FOREIGN KEY (`wildCardCharacterId`) REFERENCES `WildCardCharacter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WildCardCharacterHindrance` ADD CONSTRAINT `WildCardCharacterHindrance_hindranceId_fkey` FOREIGN KEY (`hindranceId`) REFERENCES `Hindrance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureAbility` ADD CONSTRAINT `CreatureAbility_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureAbility` ADD CONSTRAINT `CreatureAbility_specialAbilityId_fkey` FOREIGN KEY (`specialAbilityId`) REFERENCES `SpecialAbility`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureEdge` ADD CONSTRAINT `CreatureEdge_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureEdge` ADD CONSTRAINT `CreatureEdge_edgeId_fkey` FOREIGN KEY (`edgeId`) REFERENCES `Edge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureSkill` ADD CONSTRAINT `CreatureSkill_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureSkill` ADD CONSTRAINT `CreatureSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureItem` ADD CONSTRAINT `CreatureItem_creatureId_fkey` FOREIGN KEY (`creatureId`) REFERENCES `Creature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CreatureItem` ADD CONSTRAINT `CreatureItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
