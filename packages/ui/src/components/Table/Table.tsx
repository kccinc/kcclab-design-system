import type { Key, ReactNode } from "react";
import { Checkbox } from "../Checkbox";

export type TableSortDirection = "asc" | "desc";
export type TableColumnAlign = "left" | "center" | "right";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
  /** 이 컬럼 헤더 클릭으로 정렬을 지원하는지. @default false */
  sortable?: boolean;
  align?: TableColumnAlign;
  width?: string | number;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  /** 각 행의 고유 key를 반환합니다. */
  rowKey: (row: T) => Key;
  /** 체크박스 열을 표시해 행 선택을 지원합니다. @default false */
  selectable?: boolean;
  /** 선택된 행의 key 목록 (controlled). */
  selectedKeys?: Key[];
  /** 선택된 행이 바뀔 때 호출됩니다. */
  onSelectedKeysChange?: (keys: Key[]) => void;
  /** 현재 정렬 기준 컬럼의 key. */
  sortKey?: string;
  sortDirection?: TableSortDirection;
  /** 정렬 가능한 헤더를 클릭하면 호출됩니다. */
  onSortChange?: (key: string, direction: TableSortDirection) => void;
  /** 데이터가 없을 때 표시할 메시지. @default "데이터가 없습니다" */
  emptyMessage?: ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
}

const alignClassName: Record<TableColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function SortIcon({ direction }: { direction?: TableSortDirection }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={["w-[var(--ds-icon-xs)] h-[var(--ds-icon-xs)] transition-transform", direction === "desc" ? "rotate-180" : ""].join(" ")}
    >
      <path d="M12 5v14M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cellClassName =
  "border border-[var(--ds-color-border)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] " +
  "text-[length:var(--ds-font-size-body3)] leading-[var(--ds-line-height-body3)]";

export function Table<T>({
  columns,
  data,
  rowKey,
  selectable = false,
  selectedKeys,
  onSelectedKeysChange,
  sortKey,
  sortDirection,
  onSortChange,
  emptyMessage = "데이터가 없습니다",
  onRowClick,
  className,
}: TableProps<T>) {
  const selected = new Set(selectedKeys ?? []);
  const allKeys = data.map(rowKey);
  const allSelected = allKeys.length > 0 && allKeys.every((key) => selected.has(key));
  const someSelected = !allSelected && allKeys.some((key) => selected.has(key));
  const columnCount = columns.length + (selectable ? 1 : 0);

  function toggleAll(checked: boolean | "indeterminate") {
    onSelectedKeysChange?.(checked === true ? allKeys : []);
  }

  function toggleRow(key: Key, checked: boolean | "indeterminate") {
    const next = new Set(selected);
    if (checked === true) next.add(key);
    else next.delete(key);
    onSelectedKeysChange?.(Array.from(next));
  }

  function handleHeaderClick(column: TableColumn<T>) {
    if (!column.sortable || !onSortChange) return;
    const nextDirection: TableSortDirection = sortKey === column.key && sortDirection === "asc" ? "desc" : "asc";
    onSortChange(column.key, nextDirection);
  }

  return (
    <div className={["ds-table-wrapper w-full overflow-x-auto", className].filter(Boolean).join(" ")}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--ds-color-grey-background)]">
            {selectable && (
              <th className={[cellClassName, "w-[var(--ds-space-10)]"].join(" ")}>
                <Checkbox
                  checked={someSelected ? "indeterminate" : allSelected}
                  onCheckedChange={toggleAll}
                  disabled={data.length === 0}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={[
                  cellClassName,
                  alignClassName[column.align ?? "left"],
                  "font-medium text-[var(--ds-color-text-secondary)]",
                  column.sortable ? "cursor-pointer select-none" : "",
                ].join(" ")}
                onClick={() => handleHeaderClick(column)}
              >
                <span className="inline-flex items-center gap-[var(--ds-space-1)]">
                  {column.header}
                  {column.sortable && (
                    <SortIcon direction={sortKey === column.key ? sortDirection : undefined} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columnCount}
                className={[cellClassName, "py-[var(--ds-space-10)] text-center text-[var(--ds-color-text-tertiary)]"].join(" ")}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const key = rowKey(row);
              const isSelected = selected.has(key);
              return (
                <tr
                  key={key}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={[
                    "transition-colors duration-150",
                    onRowClick ? "cursor-pointer" : "",
                    isSelected ? "bg-[var(--ds-color-primary-light)]" : "hover:bg-[var(--ds-color-grey-opacity-50)]",
                  ].join(" ")}
                >
                  {selectable && (
                    <td className={cellClassName} onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={isSelected} onCheckedChange={(checked) => toggleRow(key, checked)} />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={[cellClassName, alignClassName[column.align ?? "left"]].join(" ")}>
                      {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
