import type { ReactNode } from "react";
import { Accordion } from "../Accordion";

export interface SidebarMenuItem {
  /** 항목을 식별하는 고유 값 (Accordion의 `value`로도 사용됩니다). */
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  /**
   * 이 항목을 볼 수 있는 role 목록 (RBAC). 지정하지 않으면 모든 사용자에게 보입니다.
   * `Sidebar`의 `userRoles`와 하나라도 겹치면 표시됩니다.
   */
  roles?: string[];
  /** 2-depth 하위 메뉴. 지정하면 이 항목은 아코디언으로 펼쳐집니다. */
  children?: SidebarMenuItem[];
}

export interface SidebarProps {
  items: SidebarMenuItem[];
  /** 현재 사용자의 role 목록 — `items[].roles`와 대조해 접근 불가능한 메뉴를 숨깁니다. */
  userRoles?: string[];
  /** 현재 활성화된(선택된) 항목의 `id`. */
  activeId?: string;
  className?: string;
}

function isVisible(item: SidebarMenuItem, userRoles?: string[]) {
  if (!item.roles || item.roles.length === 0) return true;
  if (!userRoles) return true;
  return item.roles.some((role) => userRoles.includes(role));
}

function filterItems(items: SidebarMenuItem[], userRoles?: string[]): SidebarMenuItem[] {
  return items
    .filter((item) => isVisible(item, userRoles))
    .map((item) => (item.children ? { ...item, children: filterItems(item.children, userRoles) } : item));
}

function MenuRow({ item, active, indent = false }: { item: SidebarMenuItem; active: boolean; indent?: boolean }) {
  const classes = [
    "ds-sidebar-row flex w-full cursor-pointer items-center gap-[var(--ds-space-2)] rounded-[var(--ds-radius-sm)]",
    "px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[length:var(--ds-font-size-body2)] leading-[var(--ds-line-height-body2)]",
    "transition-colors duration-150",
    indent ? "ml-[var(--ds-space-4)]" : "",
    active
      ? "bg-[var(--ds-color-primary-light)] font-medium text-[var(--ds-color-primary)]"
      : "text-[var(--ds-color-text-secondary)] hover:bg-[var(--ds-color-grey-opacity-100)]",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {item.icon && <span className="w-[var(--ds-icon-sm)] h-[var(--ds-icon-sm)] shrink-0">{item.icon}</span>}
      {item.label}
    </>
  );

  if (item.href) {
    return (
      <a href={item.href} className={classes} aria-current={active ? "page" : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={item.onClick} className={classes} aria-current={active ? "page" : undefined}>
      {content}
    </button>
  );
}

export function Sidebar({ items, userRoles, activeId, className }: SidebarProps) {
  const visibleItems = filterItems(items, userRoles);

  return (
    <nav className={["ds-sidebar w-full", className].filter(Boolean).join(" ")}>
      <Accordion type="multiple">
        {visibleItems.map((item) =>
          item.children && item.children.length > 0 ? (
            <Accordion.Item key={item.id} value={item.id} title={<MenuRow item={item} active={false} />}>
              <div className="flex flex-col gap-[var(--ds-space-1)]">
                {item.children.map((child) => (
                  <MenuRow key={child.id} item={child} active={child.id === activeId} indent />
                ))}
              </div>
            </Accordion.Item>
          ) : (
            <div key={item.id} className="py-[var(--ds-space-1)]">
              <MenuRow item={item} active={item.id === activeId} />
            </div>
          ),
        )}
      </Accordion>
    </nav>
  );
}
