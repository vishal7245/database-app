/*
  Warnings:

  - You are about to drop the `Table1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Table2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Table3` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Table1";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Table2";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Table3";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Healthy+RIF" (
    "Accession" TEXT NOT NULL PRIMARY KEY,
    "Early secretory phase" INTEGER,
    "Mid secretory phase" INTEGER,
    "Late secretory phase" INTEGER,
    "Samples (Menstrual cycle phase)" TEXT,
    "Platform" TEXT,
    "Experiment Type" TEXT,
    "File format" TEXT,
    "Coding/non-coding" TEXT,
    "natural/stimulated" TEXT,
    "Condition" TEXT,
    "Title" TEXT,
    "Published" TEXT
);
