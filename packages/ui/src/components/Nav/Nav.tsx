import { Children, createContext, isValidElement, useContext } from "react";
import type { HTMLAttributes, MouseEvent, ReactNode } from "react";
import type { LinkComponent } from "../../utils/link";

export type NavOrientation = "vertical" | "horizontal";
export type NavItemLayout = "inline" | "stacked";

interface NavContextValue {
  orientation: NavOrientation;
  linkComponent: LinkComponent;
}

const NavContext = createContext<NavContextValue>({ orientation: "vertical", linkComponent: "a" });

export interface NavProps extends HTMLAttributes<HTMLElement> {
  /** 항목을 세로로 쌓을지(사이드 메뉴), 가로로 늘어놓을지(하단 탭 등). @default "vertical" */
  orientation?: NavOrientation;
  /** `href`가 있는 항목을 그릴 링크 컴포넌트 (예: Next.js `Link`). 지정하지 않으면 `<a>`로 이동해 페이지 전체를 새로 불러옵니다. @default "a" */
  linkComponent?: LinkComponent;
  /** 스크린 리더용 내비게이션 이름 — 한 화면에 `Nav`가 여럿이면 서로 다르게 지정하세요 (예: "주 메뉴", "하단 메뉴"). */
  "aria-label"?: string;
  /** `Nav.Item` 목록, 또는 `Nav.Item`을 묶은 `Nav.Group` 목록 (둘을 섞지 마세요). */
  children?: ReactNode;
}

function NavRoot({ orientation = "vertical", linkComponent = "a", className, children, ...rest }: NavProps) {
  // 그룹으로 묶었으면 각 그룹이 자기 목록을 그리고, 아니면 여기서 목록 하나로 감싼다.
  const hasGroups = Children.toArray(children).some((child) => isValidElement(child) && child.type === NavGroup);

  return (
    <NavContext.Provider value={{ orientation, linkComponent }}>
      <nav className={["ds-nav", className].filter(Boolean).join(" ")} {...rest}>
        {hasGroups ? children : <NavList orientation={orientation}>{children}</NavList>}
      </nav>
    </NavContext.Provider>
  );
}

function NavList({ orientation, children }: { orientation: NavOrientation; children?: ReactNode }) {
  return (
    <ul
      className={
        orientation === "vertical"
          ? "flex flex-col gap-[var(--ds-space-1)]"
          : "flex items-stretch gap-[var(--ds-space-1)]"
      }
    >
      {children}
    </ul>
  );
}

export interface NavGroupProps {
  /** 그룹 제목. 비우면 제목 없이 항목만 묶습니다. */
  label?: ReactNode;
  /** 그룹 제목 오른쪽에 놓이는 요소 (예: 항목 수). */
  trailing?: ReactNode;
  className?: string;
  /** `Nav.Item` 목록. */
  children?: ReactNode;
}

function NavGroup({ label, trailing, className, children }: NavGroupProps) {
  const { orientation } = useContext(NavContext);
  return (
    <div className={["ds-nav-group", className].filter(Boolean).join(" ")}>
      {(label || trailing) && (
        <div className="flex items-center justify-between gap-[var(--ds-space-2)] px-[var(--ds-space-3)] pb-[var(--ds-space-1)] pt-[var(--ds-space-3)] text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] font-semibold text-[var(--ds-color-text-tertiary)]">
          <span>{label}</span>
          {trailing && <span className="font-normal tabular-nums">{trailing}</span>}
        </div>
      )}
      <NavList orientation={orientation}>{children}</NavList>
    </div>
  );
}

export interface NavItemProps {
  /** 지정하면 링크로 이동합니다. 비우면 버튼이 되어 `onClick`을 호출합니다 (예: 하위 메뉴 패널 열기). */
  href?: string;
  /** 누를 때 호출됩니다. 링크 항목에서도 호출됩니다 (예: 메뉴 닫기). */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** 이름 앞(inline) 또는 위(stacked)에 표시되는 아이콘. */
  icon?: ReactNode;
  /** 현재 화면/선택된 항목 여부 — 강조 스타일과 `aria-current="page"`를 적용합니다. @default false */
  active?: boolean;
  /** 이름 위 작은 분류 글자 (예: "DAILY", "KPI"). `layout="inline"`에서만 보입니다. */
  overline?: ReactNode;
  /** 이름 아래 한 줄 설명 — 상태·담당자 같은 요소도 넣을 수 있습니다. `layout="inline"`에서만 보입니다. */
  description?: ReactNode;
  /** 항목 오른쪽 끝에 놓이는 요소 (예: 개수 배지, 설정 버튼). 링크/버튼 밖에 렌더링되어 눌러도 이동하지 않습니다. */
  trailing?: ReactNode;
  /** `"inline"`은 아이콘 옆에 이름(사이드 메뉴), `"stacked"`는 아이콘 아래 이름(아이콘 레일·하단 탭). @default "inline" */
  layout?: NavItemLayout;
  /** `href` 없이 버튼으로 쓸 때, 이 항목이 여는 영역이 열려 있는지 — `aria-expanded`로 전달됩니다. */
  expanded?: boolean;
  className?: string;
  /** 항목 이름. */
  children?: ReactNode;
}

function NavItem({
  href,
  onClick,
  icon,
  active = false,
  overline,
  description,
  trailing,
  layout = "inline",
  expanded,
  className,
  children,
}: NavItemProps) {
  const { orientation, linkComponent: Link } = useContext(NavContext);
  const stacked = layout === "stacked";
  const vertical = orientation === "vertical";

  // 배경·왼쪽 막대는 행(li) 전체에 — 오른쪽 `trailing`까지 같은 선택/hover 배경 안에 들어가도록.
  const rowClassName = [
    "ds-nav-item relative flex min-w-0 items-center rounded-[var(--ds-radius-sm)] transition-colors duration-150",
    vertical ? "" : "flex-1",
    // 세로 메뉴의 선택 항목은 왼쪽 막대로도 표시한다(색만으로 상태를 전달하지 않도록).
    vertical
      ? "before:absolute before:inset-y-[var(--ds-space-2)] before:left-0 before:w-[var(--ds-border-width-thick)] before:rounded-r-[var(--ds-radius-xs)]"
      : "",
    active
      ? vertical
        ? "bg-[var(--ds-color-primary-light)] before:bg-[var(--ds-color-primary)]"
        : ""
      : "hover:bg-[var(--ds-color-grey-opacity-100)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const itemClassName = [
    "flex min-w-0 flex-1 cursor-pointer rounded-[var(--ds-radius-sm)]",
    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--ds-color-border-primary)]",
    stacked
      ? "flex-col items-center justify-center gap-[var(--ds-space-1)] px-[var(--ds-space-1)] py-[var(--ds-space-2)] text-center [&_.ds-nav-icon_svg]:h-[var(--ds-icon-lg)] [&_.ds-nav-icon_svg]:w-[var(--ds-icon-lg)]"
      : "min-h-[var(--ds-control-height-md)] items-center gap-[var(--ds-space-3)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] [&_.ds-nav-icon_svg]:h-[var(--ds-icon-md)] [&_.ds-nav-icon_svg]:w-[var(--ds-icon-md)]",
    active
      ? "text-[var(--ds-color-primary)]"
      : "text-[var(--ds-color-text-secondary)] hover:text-[var(--ds-color-text-primary)]",
  ].join(" ");

  const content = (
    <>
      {icon && <span className="ds-nav-icon inline-flex shrink-0">{icon}</span>}
      <span className={stacked ? "max-w-full" : "min-w-0 flex-1"}>
        {overline && !stacked && (
          <span className="block truncate text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)] font-bold tracking-wide text-[var(--ds-color-primary)]">
            {overline}
          </span>
        )}
        <span
          className={[
            "block truncate",
            stacked
              ? "text-[length:var(--ds-font-size-label1)] leading-[var(--ds-line-height-label1)] font-semibold"
              : "text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)]",
            !stacked && active ? "font-semibold" : "",
          ].join(" ")}
        >
          {children}
        </span>
        {description && !stacked && (
          <span className="flex min-w-0 items-center gap-[var(--ds-space-2)] truncate text-[length:var(--ds-font-size-caption1)] leading-[var(--ds-line-height-caption1)] font-normal text-[var(--ds-color-text-tertiary)]">
            {description}
          </span>
        )}
      </span>
    </>
  );

  return (
    <li className={rowClassName}>
      {href ? (
        <Link href={href} aria-current={active ? "page" : undefined} onClick={onClick} className={itemClassName}>
          {content}
        </Link>
      ) : (
        <button type="button" aria-expanded={expanded} onClick={onClick} className={itemClassName}>
          {content}
        </button>
      )}
      {trailing && (
        <span className="flex shrink-0 items-center gap-[var(--ds-space-1)] pr-[var(--ds-space-2)]">{trailing}</span>
      )}
    </li>
  );
}

/**
 * 내비게이션 목록 — 사이드 메뉴, 아이콘 레일, 하단 탭을 모두 같은 부품으로 만듭니다.
 * `orientation`(세로/가로)과 `Nav.Item`의 `layout`(아이콘 옆/아래 이름)을 조합하세요.
 */
export const Nav = Object.assign(NavRoot, {
  Group: NavGroup,
  Item: NavItem,
});
