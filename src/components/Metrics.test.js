import { render, screen } from "@testing-library/react";
import TodosContext from "../store/todos-context";
import Metrics from "./Metrics";

describe("Metrics", () => {
  test("renders Empty metrics", () => {
    render(<Metrics />);
    const noDataText = screen.getByText("No Data");
    expect(noDataText).toBeInTheDocument();
  });
  test("Renders seconds", () => {
    const mockContext = {metrics:{
        generalAvg: 45,
        lowAvg: 0,
        mediumAvg: 0,
        highAvg: 0,
      }}
    render(
      <TodosContext.Provider value={mockContext}>
        <Metrics />
      </TodosContext.Provider>
    );
    const secondsText = screen.getByText("45 seconds");
    expect(secondsText).toBeInTheDocument();
  });
  test("Renders minutes", () => {
    const mockContext = {metrics:{
        generalAvg: 150,
        lowAvg: 0,
        mediumAvg: 0,
        highAvg: 0,
      }}
    render(
      <TodosContext.Provider value={mockContext}>
        <Metrics />
      </TodosContext.Provider>
    );
    const secondsText = screen.getByText("02:30 minutes");
    expect(secondsText).toBeInTheDocument();
  });
  test("Renders hours", () => {
    const mockContext = {metrics:{
        generalAvg: 55413,
        lowAvg: 0,
        mediumAvg: 0,
        highAvg: 0,
      }}
    render(
      <TodosContext.Provider value={mockContext}>
        <Metrics />
      </TodosContext.Provider>
    );
    const secondsText = screen.getByText("15:23 hours");
    expect(secondsText).toBeInTheDocument();
  });
  test("Renders days", () => {
    const mockContext = {metrics:{
        generalAvg: 554131,
        lowAvg: 0,
        mediumAvg: 0,
        highAvg: 0,
      }}
    render(
      <TodosContext.Provider value={mockContext}>
        <Metrics />
      </TodosContext.Provider>
    );
    const secondsText = screen.getByText("6 days and 09:55 hours");
    expect(secondsText).toBeInTheDocument();
  });
  test("Renders a lot of days", () => {
    const mockContext = {metrics:{
        generalAvg: 5544131,
        lowAvg: 0,
        mediumAvg: 0,
        highAvg: 0,
      }}
    render(
      <TodosContext.Provider value={mockContext}>
        <Metrics />
      </TodosContext.Provider>
    );
    const secondsText = screen.getByText("64 days and 04:02 hours");
    expect(secondsText).toBeInTheDocument();
  });
});
