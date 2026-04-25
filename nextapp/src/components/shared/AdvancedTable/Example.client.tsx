"use client";

import { useMemo } from "react";
import AdvancedTable from "./Table.client";
import { data } from "./makeData";

export type EmployeeTableRow = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  catchPhrase: string;
};

type EmployeeColumn = {
  key: keyof EmployeeTableRow;
  label: string;
  minWidth: number;
};

/**
 * Example implementation of the generic AdvancedTable with Employee data
 * Shows how to use the table with custom columns and features
 */
export default function EmployeeTableExample() {
  const tableData = useMemo<EmployeeTableRow[]>(
    () => [
      ...data.map((employee) => ({
        id: employee.email,
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        jobTitle: employee.jobTitle,
        salary: employee.salary,
        startDate: new Date(employee.startDate).toLocaleDateString(),
        catchPhrase: employee.signatureCatchPhrase,
      })),
    ],
    [],
  );

  const columns = useMemo<EmployeeColumn[]>(
    () => [
      { key: "name", label: "Name", minWidth: 220 },
      { key: "email", label: "Email", minWidth: 260 },
      { key: "jobTitle", label: "Job Title", minWidth: 240 },
      { key: "salary", label: "Salary", minWidth: 130 },
      { key: "startDate", label: "Start Date", minWidth: 130 },
      { key: "catchPhrase", label: "Catch Phrase", minWidth: 260 },
    ],
    [],
  );

  return (
    <AdvancedTable<EmployeeTableRow>
      data={tableData}
      columns={columns}
      searchPlaceholder="Search Employees"
      rowKey="id"
    />
  );
}
