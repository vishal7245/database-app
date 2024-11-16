/*
  Warnings:

  - You are about to drop the `Healthy+RIF` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Healthy+RIF";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "HealthyRIF" (
    "Accession" TEXT NOT NULL PRIMARY KEY,
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
