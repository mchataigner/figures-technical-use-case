import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", function () {
  it("renders a job", () => {
    render(
      <Home
        jobs={[
          {
            id: 1,
            name: "QA",
            p10: 10000,
            p25: 25000,
            p50: 50000,
            p75: 75000,
            p90: 90000,
            count: 100,
          },
        ]}
        minSalary={100}
        maxSalary={1000}
      />
    );

    const heading = screen.getByRole("heading", {
      name: /Salary band for QA/i,
    });

    expect(heading).toBeInTheDocument();

    const p10 = screen.getByTestId("P10");
    expect(p10).toHaveTextContent("10000€");
    let p25 = screen.getByTestId("P25");
    expect(p25).toHaveTextContent("25000€");
    let p50 = screen.getByTestId("P50");
    expect(p50).toHaveTextContent("50000€");
    let p75 = screen.getByTestId("P75");
    expect(p75).toHaveTextContent("75000€");
    let p90 = screen.getByTestId("P90");
    expect(p90).toHaveTextContent("90000€");
  });
});
