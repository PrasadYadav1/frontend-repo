import { render, screen } from "@testing-library/react";
import FinanceManagement from "../components/FinanceManagement";

describe("Financial Management", () => {
  test("Financial Management renders correctly", () => {
    render(<FinanceManagement />);
    const textElement = screen.getByText(/Cash Flow/i);
    expect(textElement).toBeInTheDocument();
  });
});

describe("Tables Heading", () => {
  test("Cash Flow Table heading renders correctly", () => {
    render(<FinanceManagement />);
    const textElement = screen.getByText(/Cash Flow/i);
    expect(textElement).toBeInTheDocument();
  });
  test("Expense Flow Table heading renders correctly", () => {
    render(<FinanceManagement />);
    const textElement = screen.getByText(/Expense Table/i);
    expect(textElement).toBeInTheDocument();
  });
  test("Revenue Flow Table heading renders correctly", () => {
    render(<FinanceManagement />);
    const textElement = screen.getByText(/Revenue Table/i);
    expect(textElement).toBeInTheDocument();
  });
});

describe("Button Tests", () => {
  test("Input Starting Capital Renders Correctly", () => {
    render(<FinanceManagement />);
    const buttonElementText = screen.getByText(/Input Starting Capital/i);
    expect(buttonElementText).toBeInTheDocument();
  });
  test("Upload Expense Renders Correctly", () => {
    render(<FinanceManagement />);
    const buttonElementText = screen.getByText(/Upload Expense/i);
    expect(buttonElementText).toBeInTheDocument();
  });
  test("Add Expense Renders Correctly", () => {
    render(<FinanceManagement />);
    const buttonElementText = screen.getByText(/Add Expense/i);
    expect(buttonElementText).toBeInTheDocument();
  });
  test("Upload Revenue Renders Correctly", () => {
    render(<FinanceManagement />);
    const buttonElementText = screen.getByText(/Upload Revenue/i);
    expect(buttonElementText).toBeInTheDocument();
  });
  test("Add Revenue Renders Correctly", () => {
    render(<FinanceManagement />);
    const buttonElementText = screen.getByText(/Add Revenue/i);
    expect(buttonElementText).toBeInTheDocument();
  });
});
