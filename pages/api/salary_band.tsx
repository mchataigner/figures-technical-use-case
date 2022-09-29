import { prisma } from "@/lib/prisma";

export const getJobsWithStatistics = () =>
  prisma.$queryRaw`SELECT
j."id",
j."name",
min(e."salary") / 100 AS "minSalary",
max(e."salary") / 100 AS "maxSalary",
floor(percentile_cont(0.1) WITHIN GROUP (ORDER BY e."salary") / 100) AS "p10",
floor(percentile_cont(0.25) WITHIN GROUP (ORDER BY e."salary") / 100) AS "p25",
floor(percentile_cont(0.5) WITHIN GROUP (ORDER BY e."salary") / 100) AS "p50",
floor(percentile_cont(0.75) WITHIN GROUP (ORDER BY e."salary") / 100) AS "p75",
floor(percentile_cont(0.9) WITHIN GROUP (ORDER BY e."salary") / 100) AS "p90",
count(*) AS "count"
FROM "public"."Employee" e
INNER JOIN "public"."Job" j ON e."jobId" = j."id"
GROUP BY j."id"`;

const handler = async (req, res) => {
  const jobs = await getJobsWithStatistics();

  if (!jobs) {
    res.status(404);
    return;
  }

  res.status(200).json(jobs);
};

export default handler;
