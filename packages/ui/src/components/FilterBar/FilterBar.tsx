import { SearchInput } from "../SearchInput";
import type { SearchInputProps } from "../SearchInput";
import { Select } from "../Select";
import type { SelectProps } from "../Select";
import { Button } from "../Button";

export interface FilterBarProps {
  /** 검색 인풋에 전달할 props (`placeholder`, `value`, `onChange` 등). */
  search?: SearchInputProps;
  /** 필터 드롭다운에 전달할 props (`options`, `value`, `onValueChange` 등). */
  select?: SelectProps;
  /** 검색 버튼 클릭 시 호출됩니다. */
  onSubmit?: () => void;
  /** 검색 버튼 텍스트. @default "검색" */
  submitLabel?: string;
  className?: string;
}

export function FilterBar({ search, select, onSubmit, submitLabel = "검색", className }: FilterBarProps) {
  return (
    <div
      className={["ds-filter-bar flex flex-wrap items-center gap-[var(--ds-space-2)]", className]
        .filter(Boolean)
        .join(" ")}
    >
      {select && (
        <div className="w-[160px] shrink-0">
          <Select {...select} />
        </div>
      )}
      {search && (
        <div className="min-w-[200px] flex-1">
          <SearchInput {...search} />
        </div>
      )}
      {onSubmit && <Button onClick={onSubmit}>{submitLabel}</Button>}
    </div>
  );
}
