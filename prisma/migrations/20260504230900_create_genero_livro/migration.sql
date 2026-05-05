-- CreateTable
CREATE TABLE "generos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "generoId" INTEGER NOT NULL,
    CONSTRAINT "livros_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "generos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
