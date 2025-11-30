export const dummyUsers = [
  {
    uuid: "USER-001",
    username: "Super Admin",
    password: "123456",
    is_active: true,
    role: { uuid: "ROLE-001", name: "superadmin" },
    company: { uuid: "COMP-001", company_name: "PT MASAGI JAYA" }
  },
  {
    uuid: "USER-002",
    username: "Admin",
    password: "123456",
    is_active: true,
    role: { uuid: "ROLE-002", name: "admin" },
    company: { uuid: "COMP-001", company_name: "PT PORTAL MASAGI" }
  },
  {
    uuid: "USER-003",
    username: "HR",
    password: "password",
    is_active: false,
    role: { uuid: "ROLE-002", name: "HR" },
    company: { uuid: "COMP-002", company_name: "PT UPI EDU" }
  },
];
