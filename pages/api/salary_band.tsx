import { prisma } from "@/lib/prisma";

const handler = async (req, res) => {
  const jobs = await prisma.$queryRaw`SELECT
j."id",
j."name",
min(e."salary") AS "min_salary",
max(e."salary") AS "max_salary",
percentile_cont(0.1) WITHIN GROUP (ORDER BY e."salary") AS "P10",
percentile_cont(0.25) WITHIN GROUP (ORDER BY e."salary") AS "P25",
percentile_cont(0.5) WITHIN GROUP (ORDER BY e."salary") AS "P50",
percentile_cont(0.75) WITHIN GROUP (ORDER BY e."salary") AS "P75",
percentile_cont(0.9) WITHIN GROUP (ORDER BY e."salary") AS "P90"
FROM "public"."Employee" e
INNER JOIN "public"."Job" j ON e."jobId" = j."id"
GROUP BY j."id"`;
  res.status(200).json(jobs);
};

export default handler;
