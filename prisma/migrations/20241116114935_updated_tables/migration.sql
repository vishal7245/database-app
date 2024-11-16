/*
  Warnings:

  - The primary key for the `HealthyRIF` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `HealthyRIF` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Proliferative" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Accession" TEXT NOT NULL,
    "earlySecretoryPhase" INTEGER,
    "midSecretoryPhase" INTEGER,
    "lateSecretoryPhase" INTEGER,
    "samples" TEXT,
    "platform" TEXT,
    "experimentType" TEXT,
    "fileFormat" TEXT,
    "codingNonCoding" TEXT,
    "naturalStimulated" TEXT,
    "condition" TEXT,
    "title" TEXT,
    "published" TEXT
);

-- CreateTable
CREATE TABLE "Healthy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Accession" TEXT NOT NULL,
    "earlySecretoryPhase" INTEGER,
    "midSecretoryPhase" INTEGER,
    "lateSecretoryPhase" INTEGER,
    "samples" TEXT,
    "platform" TEXT,
    "experimentType" TEXT,
    "fileFormat" TEXT,
    "codingNonCoding" TEXT,
    "naturalStimulated" TEXT,
    "condition" TEXT,
    "title" TEXT,
    "published" TEXT
);

-- CreateTable
CREATE TABLE "RIF" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Accession" TEXT NOT NULL,
    "earlySecretoryPhase" INTEGER,
    "midSecretoryPhase" INTEGER,
    "lateSecretoryPhase" INTEGER,
    "samples" TEXT,
    "platform" TEXT,
    "experimentType" TEXT,
    "fileFormat" TEXT,
    "codingNonCoding" TEXT,
    "naturalStimulated" TEXT,
    "condition" TEXT,
    "title" TEXT,
    "published" TEXT
);

-- CreateTable
CREATE TABLE "ExcludedDatasets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Accession" TEXT NOT NULL,
    "title" TEXT,
    "platform" TEXT,
    "experimentType" TEXT,
    "condition" TEXT
);

-- CreateTable
CREATE TABLE "AllDatasets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Accession" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HealthyRIF" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Accession" TEXT NOT NULL,
    "earlySecretoryPhase" INTEGER,
    "midSecretoryPhase" INTEGER,
    "lateSecretoryPhase" INTEGER,
    "samples" TEXT,
    "platform" TEXT,
    "experimentType" TEXT,
    "fileFormat" TEXT,
    "codingNonCoding" TEXT,
    "naturalStimulated" TEXT,
    "condition" TEXT,
    "title" TEXT,
    "published" TEXT
);
INSERT INTO "new_HealthyRIF" ("Accession", "codingNonCoding", "condition", "earlySecretoryPhase", "experimentType", "fileFormat", "lateSecretoryPhase", "midSecretoryPhase", "naturalStimulated", "platform", "published", "samples", "title") SELECT "Accession", "codingNonCoding", "condition", "earlySecretoryPhase", "experimentType", "fileFormat", "lateSecretoryPhase", "midSecretoryPhase", "naturalStimulated", "platform", "published", "samples", "title" FROM "HealthyRIF";
DROP TABLE "HealthyRIF";
ALTER TABLE "new_HealthyRIF" RENAME TO "HealthyRIF";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
