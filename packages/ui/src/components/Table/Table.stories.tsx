import { useState } from "react";
import type { Key } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";
import type { TableColumn, TableSortDirection } from "./Table";
import { Badge } from "../Badge";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const users: User[] = [
  { id: 1, name: "김철수", email: "chulsoo@example.com", status: "active" },
  { id: 2, name: "이영희", email: "younghee@example.com", status: "active" },
  { id: 3, name: "박민수", email: "minsoo@example.com", status: "inactive" },
];

const columns: TableColumn<User>[] = [
  { key: "name", header: "이름", sortable: true },
  { key: "email", header: "이메일" },
  {
    key: "status",
    header: "상태",
    align: "center",
    render: (row) => (
      <Badge variant={row.status === "active" ? "success" : "neutral"}>
        {row.status === "active" ? "활성" : "비활성"}
      </Badge>
    ),
  },
];

const meta = {
  title: "Patterns/Table",
  component: Table<User>,
  tags: ["autodocs"],
  args: {
    columns,
    data: users,
    rowKey: (row: User) => row.id,
  },
} satisfies Meta<typeof Table<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Table columns={columns} data={users} rowKey={(row) => row.id} />,
  parameters: {
    // 기본 "Show code"는 `columns`/`data`가 어떤 값인지 보여주지 않고 변수명만
    // 노출합니다 — 실제 예시 데이터를 볼 수 있도록 소스를 직접 오버라이드합니다.
    docs: {
      source: {
        language: "tsx",
        code: `interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

const users: User[] = [
  { id: 1, name: "김철수", email: "chulsoo@example.com", status: "active" },
  { id: 2, name: "이영희", email: "younghee@example.com", status: "active" },
  { id: 3, name: "박민수", email: "minsoo@example.com", status: "inactive" },
];

const columns: TableColumn<User>[] = [
  { key: "name", header: "이름", sortable: true },
  { key: "email", header: "이메일" },
  {
    key: "status",
    header: "상태",
    align: "center",
    render: (row) => (
      <Badge variant={row.status === "active" ? "success" : "neutral"}>
        {row.status === "active" ? "활성" : "비활성"}
      </Badge>
    ),
  },
];

<Table columns={columns} data={users} rowKey={(row) => row.id} />`,
      },
    },
  },
};

export const Selectable: Story = {
  render: function Render() {
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    return (
      <Table
        columns={columns}
        data={users}
        rowKey={(row) => row.id}
        selectable
        selectedKeys={selectedKeys}
        onSelectedKeysChange={setSelectedKeys}
      />
    );
  },
};

export const Sortable: Story = {
  render: function Render() {
    const [sortKey, setSortKey] = useState<string>();
    const [sortDirection, setSortDirection] = useState<TableSortDirection>();
    const sorted = [...users].sort((a, b) => {
      if (!sortKey) return 0;
      const dir = sortDirection === "desc" ? -1 : 1;
      return String(a[sortKey as keyof User]).localeCompare(String(b[sortKey as keyof User])) * dir;
    });
    return (
      <Table
        columns={columns}
        data={sorted}
        rowKey={(row) => row.id}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSortChange={(key, direction) => {
          setSortKey(key);
          setSortDirection(direction);
        }}
      />
    );
  },
};

export const Empty: Story = {
  render: () => <Table columns={columns} data={[]} rowKey={(row) => row.id} />,
};

export const ClickableRows: Story = {
  render: () => (
    <Table columns={columns} data={users} rowKey={(row) => row.id} onRowClick={(row) => alert(row.name)} />
  ),
};
