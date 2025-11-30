export const dummyRoles = [
  {
    uuid: "ROLE-001",
    name: "Admin",
    created_date: "2021-01-01",
    updated_date: "2023-01-01",
    permission: [
      { permission: { uuid: "PERM-READ", name: "READ" } },
      { permission: { uuid: "PERM-WRITE", name: "WRITE" } },
      { permission: { uuid: "PERM-DELETE", name: "DELETE" } }
    ]
  },
  {
    uuid: "ROLE-002",
    name: "HR",
    created_date: "2022-02-01",
    updated_date: "2023-01-01",
    permission: [
      { permission: { uuid: "PERM-READ", name: "READ" } },
      { permission: { uuid: "PERM-WRITE", name: "WRITE" } },
    ]
  },
  {
    uuid: "ROLE-003",
    name: "Head of Division",
    created_date: "2022-03-01",
    updated_date: "2023-01-01",
    permission: [
      { permission: { uuid: "PERM-READ", name: "READ" } },
      { permission: { uuid: "PERM-WRITE", name: "WRITE" } },
    ]
  },
  {
    uuid: "ROLE-004",
    name: "Employee",
    created_date: "2022-08-15",
    updated_date: "2023-04-18",
    permission: [
      { permission: { uuid: "PERM-READ", name: "READ" } },
    ]
  }
];

