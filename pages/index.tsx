import { useState } from "react";

import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/Nav";
import { BoxPlot } from "@/components/BoxPlot";
import { Title } from "@/components/Title";
import { getJobsWithStatistics } from "@/pages/api/salary_band";

const Home = ({ jobs, minSalary, maxSalary }) => {
  const [currentJob, setCurrentJob] = useState(jobs[0]);

  return (
    <div className="flex flex-row gap-4 text-xl h-full w-full overflow-hidden">
      <Nav jobs={jobs} currentJob={currentJob} setCurrentJob={setCurrentJob} />
      <div className="flex-grow flex flex-col gap-2 pl-0 p-4">
        <Title>
          Salary band for {currentJob.name} ({currentJob.count})
        </Title>
        <BoxPlot job={currentJob} minSalary={minSalary} maxSalary={maxSalary} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const jobs = await getJobsWithStatistics();
  const minSalary = Math.min(...jobs.map((j) => j.minSalary));
  const maxSalary = Math.max(...jobs.map((j) => j.maxSalary));

  return {
    props: {
      jobs,
      minSalary: minSalary,
      maxSalary: maxSalary,
    },
  };
};

export default Home;
