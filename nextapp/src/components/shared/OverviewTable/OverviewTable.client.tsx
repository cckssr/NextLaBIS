"use client";

import { useState } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import {
  Center,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import classes from "./TableSort.module.css";

/**
 * Defines a single column in the OverviewTable.
 * @interface ColumnDef
 * @property {string} key - The data key to access the column value from each row
 * @property {string} label - The display label shown in the table header
 * @property {boolean} [sortable] - Whether this column is sortable (default: true)
 */
export interface ColumnDef {
  key: string;
  label: string;
  sortable?: boolean;
}

/**
 * Props for the generic OverviewTable component.
 * @interface OverviewTableProps
 * @template T - The type of data objects in the table (must have string, number, or boolean values)
 * @property {T[]} data - Array of data objects to display in the table
 * @property {ColumnDef[]} columns - Column definitions specifying which fields to display
 * @property {string} [searchPlaceholder] - Placeholder text for the search input (default: "Search by any field")
 * @property {string} [emptyMessage] - Message displayed when no rows match the search (default: "Nothing found")
 * @property {keyof T} [rowKey] - The unique identifier field for each row (default: first column key)
 */
interface OverviewTableProps<
  T extends Record<string, string | number | boolean>,
> {
  data: T[];
  columns: ColumnDef[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  rowKey?: keyof T;
}

/**
 * Props for a sortable table header cell.
 * @interface ThProps
 * @property {React.ReactNode} children - The column label to display
 * @property {boolean} reversed - Whether the sort direction is reversed (descending)
 * @property {boolean} sorted - Whether this column is currently sorted
 * @property {() => void} onSort - Callback fired when the user clicks to sort by this column
 */
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

/**
 * Renders a clickable, sortable table header cell with sort direction indicator.
 * Displays an icon indicating sort state: up arrow (ascending), down arrow (descending),
 * or a selector icon when not sorted.
 *
 * @component
 * @param {ThProps} props - The component props
 * @returns {JSX.Element} A Mantine Table.Th element with sort controls
 */
function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

/**
 * Filters table data based on a search query.
 * Searches across all specified columns and returns only rows where any column
 * contains the search query (case-insensitive).
 *
 * @template T - The type of data objects
 * @param {T[]} data - The data array to filter
 * @param {string} search - The search query to match against
 * @param {ColumnDef[]} columns - The columns to search within
 * @returns {T[]} Filtered data array
 */
function filterData<T extends Record<string, string | number | boolean>>(
  data: T[],
  search: string,
  columns: ColumnDef[],
): T[] {
  const query = search.toLowerCase().trim();
  if (!query) return data;

  return data.filter((item) =>
    columns.some((col) => {
      const value = item[col.key];
      return String(value).toLowerCase().includes(query);
    }),
  );
}

/**
 * Sorts and filters table data.
 * First applies sorting by a specified column (if provided), then applies filtering
 * based on the search query. Returns the processed data.
 *
 * @template T - The type of data objects
 * @param {T[]} data - The original data array
 * @param {Object} payload - Sort and search configuration
 * @param {string | null} payload.sortBy - The column key to sort by (null = no sorting)
 * @param {boolean} payload.reversed - Whether to sort in descending order
 * @param {string} payload.search - The search query to filter with
 * @param {ColumnDef[]} columns - The columns definition
 * @returns {T[]} Sorted and filtered data array
 */
function sortData<T extends Record<string, string | number | boolean>>(
  data: T[],
  payload: { sortBy: string | null; reversed: boolean; search: string },
  columns: ColumnDef[],
): T[] {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search, columns);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = String(a[sortBy] || "");
      const bValue = String(b[sortBy] || "");

      if (payload.reversed) {
        return bValue.localeCompare(aValue);
      }

      return aValue.localeCompare(bValue);
    }),
    payload.search,
    columns,
  );
}

/**
 * A generic, reusable table component with search and sort capabilities.
 *
 * Features:
 * - Dynamically renders columns based on data structure
 * - Full-text search across all columns (case-insensitive)
 * - Click-to-sort with ascending/descending toggle
 * - Responsive layout with horizontal scroll
 * - Empty state with customizable message
 *
 * @component
 * @template T - The shape of data objects (must contain string, number, or boolean values)
 *
 * @param {OverviewTableProps<T>} props - Component props
 * @param {T[]} props.data - Array of objects to display in the table
 * @param {ColumnDef[]} props.columns - Column definitions with key, label, and optional sortable flag
 * @param {string} [props.searchPlaceholder="Search by any field"] - Placeholder text in search box
 * @param {string} [props.emptyMessage="Nothing found"] - Message when no results match search
 * @param {keyof T} [props.rowKey] - Unique identifier field for each row (auto-detected if omitted)
 *
 * @returns {JSX.Element} A Mantine ScrollArea containing a sortable, searchable Table
 *
 * @example
 * const users = [
 *   { id: 1, name: 'John', email: 'john@example.com' },
 *   { id: 2, name: 'Jane', email: 'jane@example.com' },
 * ];
 * const columns = [
 *   { key: 'name', label: 'Name' },
 *   { key: 'email', label: 'Email' },
 * ];
 * return <OverviewTable data={users} columns={columns} rowKey="id" />;
 */
export function OverviewTable<
  T extends Record<string, string | number | boolean>,
>({
  data,
  columns,
  searchPlaceholder = "Search by any field",
  emptyMessage = "Nothing found",
  rowKey = Object.keys(data[0])?.[0] as keyof T,
}: OverviewTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }, columns));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(
        data,
        { sortBy, reversed: reverseSortDirection, search: value },
        columns,
      ),
    );
  };

  const rows = sortedData.map((row, index) => (
    <Table.Tr key={String(row[rowKey] ?? index)}>
      {columns.map((col) => (
        <Table.Td key={col.key}>{row[col.key]}</Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder={searchPlaceholder}
        mb="md"
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            {columns.map((col) => (
              <Th
                key={col.key}
                sorted={sortBy === col.key}
                reversed={reverseSortDirection}
                onSort={() => setSorting(col.key)}
              >
                {col.label}
              </Th>
            ))}
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length}>
                <Text fw={500} ta="center">
                  {emptyMessage}
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
