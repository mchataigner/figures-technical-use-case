import { useState } from "react";

import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/Nav";
import { BoxPlot } from "@/components/BoxPlot";
import { Title } from "@/components/Title";

const Home = ({ jobs, minSalary, maxSalary }) => {
  const [currentJob, setCurrentJob] = useState(jobs[0]);

  const salaries = currentJob.employees
    .map((e) => e.salary)
    .sort((a, b) => a - b);

  return (
    <div className="flex flex-row gap-4 text-xl h-full w-full overflow-hidden">
      <Nav jobs={jobs} currentJob={currentJob} setCurrentJob={setCurrentJob} />
      <div className="flex-grow flex flex-col gap-2 pl-0 p-4">
        <Title>
          Salary band for {currentJob.name} ({currentJob.employees.length})
        </Title>
        <BoxPlot
          salaries={salaries}
          minSalary={minSalary}
          maxSalary={maxSalary}
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const jobs = await prisma.job.findMany({
    select: { id: true, name: true, employees: true },
  });
  const minSalary = await prisma.employee.findFirst({
    select: { salary: true },
    orderBy: { salary: "asc" },
  });
  const maxSalary = await prisma.employee.findFirst({
    select: { salary: true },
    orderBy: { salary: "desc" },
  });
  return {
    props: { jobs, minSalary: minSalary.salary, maxSalary: maxSalary.salary },
  };
};

export default Home;
