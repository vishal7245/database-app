-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Table1" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "field" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Table2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "field" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Table3" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "field" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
