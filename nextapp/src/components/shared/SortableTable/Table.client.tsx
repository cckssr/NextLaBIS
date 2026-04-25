"use client";

import { useMemo, useState } from "react";
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
import classes from "./Table.module.css";

/**
 * Defines a single column in the SortableTable.
 * @interface ColumnDef
 * @property {string} key - The data key to access the column value from each row
 * @property {string} label - The display label shown in the table header
 * @property {boolean} [sortable] - Whether this column is sortable (default: true)
 * @property {string | number} [width] - Optional CSS width for the column (e.g., '200px', '20%'). If not provided, width adjusts automatically to content
 * @property {string | number} [minWidth] - Minimum width to prevent icons from wrapping (default: '120px'). Prevents sort icons from breaking to a new line
 */
export interface ColumnDef {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  minWidth?: string | number;
}

/**
 * Props for the generic SortableTable component.
 * @interface SortableTableProps
 * @template T - The type of data objects in the table (must have string, number, or boolean values)
 * @property {T[]} data - Array of data objects to display in the table
 * @property {ColumnDef[]} columns - Column definitions specifying which fields to display
 * @property {string} [searchPlaceholder] - Placeholder text for the search input (default: "Search by any field")
 * @property {string} [emptyMessage] - Message displayed when no rows match the search (default: "Nothing found")
 * @property {keyof T} [rowKey] - The unique identifier field for each row (default: first column key)
 * @property {React.ReactNode} [searchInput] - Custom search input component. If provided, replaces the default search input
 * @property {boolean} [showSearch=true] - Whether to show the default search input (ignored if searchInput is provided)
 * @property {string} [searchValue] - Controlled search value from parent component. When provided, overrides internal search state
 * @property {...any} [tableProps] - Additional props to pass directly to the Mantine Table component (e.g., striped, bordered, highlightOnHover)
 */
interface SortableTableProps<
  T extends Record<string, string | number | boolean>,
> {
  data: T[];
  columns: ColumnDef[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  rowKey?: keyof T;
  searchInput?: React.ReactNode;
  showSearch?: boolean;
  searchValue?: string;
}

/**
 * Props for a sortable table header cell.
 * @interface ThProps
 * @property {React.ReactNode} children - The column label to display
 * @property {boolean} reversed - Whether the sort direction is reversed (descending)
 * @property {boolean} sorted - Whether this column is currently sorted
 * @property {() => void} onSort - Callback fired when the user clicks to sort by this column
 * @property {React.CSSProperties} [style] - Optional inline styles for the header cell
 */
interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  sortable: boolean;
  onSort: () => void;
  style?: React.CSSProperties;
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
function Th({ children, reversed, sorted, sortable, onSort, style }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;

  if (!sortable) {
    return (
      <Table.Th className={classes.th} style={style}>
        <Text fw={500} fz="sm">
          {children}
        </Text>
      </Table.Th>
    );
  }

  return (
    <Table.Th className={classes.th} style={style}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between" wrap="nowrap">
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
  const compareValues = (
    a: string | number | boolean,
    b: string | number | boolean,
  ) => {
    if (typeof a === "number" && typeof b === "number") {
      return payload.reversed ? b - a : a - b;
    }

    if (typeof a === "boolean" && typeof b === "boolean") {
      return payload.reversed ? Number(b) - Number(a) : Number(a) - Number(b);
    }

    const aValue = String(a);
    const bValue = String(b);

    return payload.reversed
      ? bValue.localeCompare(aValue, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      : aValue.localeCompare(bValue, undefined, {
          numeric: true,
          sensitivity: "base",
        });
  };

  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search, columns);
  }

  return filterData(
    [...data].sort((a, b) => {
      const aValue = a[sortBy] ?? "";
      const bValue = b[sortBy] ?? "";
      return compareValues(aValue, bValue);
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
 * @param {SortableTableProps<T>} props - Component props
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
 * return <SortableTable data={users} columns={columns} rowKey="id" />;
 */
export function SortableTable<
  T extends Record<string, string | number | boolean>,
>({
  data,
  columns,
  searchPlaceholder = "Search by any field",
  emptyMessage = "Nothing found",
  rowKey,
  searchInput,
  showSearch = true,
  searchValue,
  ...tableProps
}: SortableTableProps<T> & React.ComponentProps<typeof Table>) {
  const isControlledSearch = searchValue !== undefined;
  const resolvedRowKey = rowKey ?? (columns[0]?.key as keyof T | undefined);
  const [internalSearch, setInternalSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // Use external searchValue if provided, otherwise use internal state
  const currentSearch =
    searchValue !== undefined ? searchValue : internalSearch;

  const sortedData = useMemo(
    () =>
      sortData(
        data,
        {
          sortBy,
          reversed: reverseSortDirection,
          search: currentSearch,
        },
        columns,
      ),
    [data, sortBy, reverseSortDirection, currentSearch, columns],
  );

  const setSorting = (field: string) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!isControlledSearch) {
      setInternalSearch(value);
    }
  };

  const rows = sortedData.map((row, index) => (
    <Table.Tr
      key={
        resolvedRowKey ? String(row[resolvedRowKey] ?? index) : String(index)
      }
    >
      {columns.map((col) => (
        <Table.Td
          key={col.key}
          style={{
            width: col.width,
            minWidth: col.minWidth || "120px",
          }}
        >
          {row[col.key]}
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      {searchInput ? (
        searchInput
      ) : showSearch ? (
        <TextInput
          placeholder={searchPlaceholder}
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={currentSearch}
          onChange={handleSearchChange}
          readOnly={isControlledSearch}
        />
      ) : null}
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        layout="auto"
        {...tableProps}
      >
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Th
                key={col.key}
                sorted={sortBy === col.key}
                reversed={reverseSortDirection}
                sortable={col.sortable !== false}
                onSort={() => setSorting(col.key)}
                style={{
                  width: col.width,
                  minWidth: col.minWidth || "120px",
                }}
              >
                {col.label}
              </Th>
            ))}
          </Table.Tr>
        </Table.Thead>
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
