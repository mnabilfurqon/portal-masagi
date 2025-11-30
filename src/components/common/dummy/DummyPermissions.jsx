export const dummyPermissions = [
  {
    uuid: "RES-001",
    name: "Admin",
    permission: [
      { uuid: "PERM-READ", name: "READ" },
      { uuid: "PERM-WRITE", name: "WRITE" },
      { uuid: "PERM-DELETE", name: "DELETE" },
    ]
  },
  {
    uuid: "RES-002",
    name: "HR",
    permission: [
      { uuid: "PERM-READ", name: "READ" },
      { uuid: "PERM-CREATE", name: "CREATE" },
    ]
  },
  {
    uuid: "RES-003",
    name: "Head of Division",
    permission: [
      { uuid: "PERM-READ", name: "READ" },
      { uuid: "PERM-WRITE", name: "WRITE" },
    ]
  },
  {
    uuid: "RES-004",
    name: "Employee",
    permission: [
      { uuid: "PERM-READ", name: "READ" },
      { uuid: "PERM-CREATE", name: "CREATE" },
    ]
  }
];
