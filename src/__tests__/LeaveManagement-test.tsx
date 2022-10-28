import { render, screen } from "@testing-library/react";
import LeaveManagement from "../components/LeaveManagement";

describe("Leave Management", () => {
  test("Leave Management renders correctly", () => {
    render(<LeaveManagement />);
    const textElement = screen.getByText(/Leave Management/i);
    expect(textElement).toBeInTheDocument();
  });
});
