"use client";

import { SortableTable, type ColumnDef } from "../SortableTable/Table.client";

type PrimitiveValue = string | number | boolean;

/**
 * Props for the AdvancedTable component
 *
 * @template T - Type of the data records
 * @param data - Array of data records to display in the table
 * @param columns - Column definitions for the table
 * @param searchPlaceholder - Placeholder text for the global search input
 */
export interface AdvancedTableProps<T extends Record<string, PrimitiveValue>> {
  data: T[];
  columns: Array<
    ColumnDef & {
      key: Extract<keyof T, string>;
    }
  >;
  searchPlaceholder?: string;
  rowKey?: Extract<keyof T, string>;
  showSearch?: boolean;
}

/**
 * Mantine 9 compatible AdvancedTable wrapper built on top of SortableTable.
 * Provides sortable/searchable table behavior for the development demo page.
 */
function AdvancedTable<T extends Record<string, PrimitiveValue>>({
  data,
  columns,
  searchPlaceholder = "Search",
  rowKey,
  showSearch = true,
}: AdvancedTableProps<T>) {
  return (
    <SortableTable
      data={data}
      columns={columns}
      searchPlaceholder={searchPlaceholder}
      rowKey={rowKey}
      showSearch={showSearch}
    />
  );
}

export default AdvancedTable;
