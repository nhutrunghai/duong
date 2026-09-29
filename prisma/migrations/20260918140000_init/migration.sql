CREATE TABLE "lophoc" (
    "id" SERIAL NOT NULL,
    "ten_lop" VARCHAR(100) NOT NULL,

    CONSTRAINT "lophoc_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sinhvien" (
    "id" SERIAL NOT NULL,
    "ho_ten" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "tuoi" INTEGER,
    "lop_id" INTEGER,

    CONSTRAINT "sinhvien_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "sinhvien_email_key" UNIQUE ("email"),
    CONSTRAINT "sinhvien_tuoi_check" CHECK ("tuoi" IS NULL OR "tuoi" BETWEEN 0 AND 150)
);

ALTER TABLE "sinhvien"
ADD CONSTRAINT "sinhvien_lop_id_fkey"
FOREIGN KEY ("lop_id") REFERENCES "lophoc"("id") ON DELETE SET NULL ON UPDATE CASCADE;
