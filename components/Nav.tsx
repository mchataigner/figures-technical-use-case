export const Nav = ({ jobs, currentJob, setCurrentJob }) => {
  return (
    <nav className="h-full flex flex-col border-r p-4 gap-4 bg-pink-500 w-72">
      <span className="py-2 font-bold text-4xl">Numbers</span>
      {jobs.map((job, i) => (
        <button
          className={`rounded px-2 py-1 whitespace-nowrap ${
            currentJob === job
              ? "bg-emerald-600 text-white font-bold"
              : "bg-pink-200"
          }`}
          key={i}
          onClick={() => setCurrentJob(job)}
        >
          {job.name}
        </button>
      ))}
    </nav>
  );
};
