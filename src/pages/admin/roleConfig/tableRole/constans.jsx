export const tabel_data = [
  {
    key: 1,
    roleName: "Super Admin",
  },
  {
    key: 2,
    roleName: "Admin",
  },
];

export const paginationConfig = {
  pageSize: 10, // Jumlah item per halaman
  showTotal: (total, range) => (
    <span style={{ color: "#556172" }}>
      Page {Math.ceil(range[0] / paginationConfig.pageSize)} of{" "}
      {Math.ceil(total / paginationConfig.pageSize)}
    </span>
  ),
  showLessItems: true,
};