-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "category" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
