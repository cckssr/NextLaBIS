"use client";

import { useMemo } from "react";
import { type MRT_ColumnDef } from "mantine-react-table";
import { Box, Menu } from "@mantine/core";
import { IconUserCircle, IconSend } from "@tabler/icons-react";
import AdvancedTable from "./Table.client";
import { data } from "./makeData";

export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

/**
 * Example implementation of the generic AdvancedTable with Employee data
 * Shows how to use the table with custom columns and features
 */
export default function EmployeeTableExample() {
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: "employee",
        header: "Employee",
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: "name",
            header: "Name",
            size: 250,
            filterVariant: "autocomplete",
            Cell: ({ renderedCellValue }) => (
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "email",
            enableClickToCopy: true,
            header: "Email",
            size: 300,
          },
        ],
      },
      {
        id: "jobInfo",
        header: "Job Info",
        columns: [
          {
            accessorKey: "salary",
            header: "Salary",
            size: 200,
            filterVariant: "range-slider",
            mantineFilterRangeSliderProps: {
              color: "indigo",
              label: (value) =>
                value?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }),
            },
            Cell: ({ cell }) => (
              <Box
                style={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? theme.colors.red[9]
                      : cell.getValue<number>() >= 50_000 &&
                          cell.getValue<number>() < 75_000
                        ? theme.colors.yellow[9]
                        : theme.colors.green[9],
                  borderRadius: "4px",
                  color: "#fff",
                  maxWidth: "9ch",
                  padding: "4px",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "jobTitle",
            header: "Job Title",
            filterVariant: "multi-select",
            size: 350,
          },
          {
            accessorFn: (row) => {
              const sDay = new Date(row.startDate);
              sDay.setHours(0, 0, 0, 0);
              return sDay;
            },
            id: "startDate",
            header: "Start Date",
            filterVariant: "date-range",
            sortingFn: "datetime",
            enableColumnFilterModes: false,
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
            Header: ({ column }) => <em>{column.columnDef.header}</em>,
          },
        ],
      },
    ],
    [],
  );

  return (
    <AdvancedTable<Employee>
      data={data}
      columns={columns}
      searchPlaceholder="Search Employees"
      onRowAction={() => (
        <>
          <Menu.Item leftSection={<IconUserCircle />}>View Profile</Menu.Item>
          <Menu.Item leftSection={<IconSend />}>Send Email</Menu.Item>
        </>
      )}
    />
  );
}
