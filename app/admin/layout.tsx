import React, { ReactNode } from "react";
import styles from "@/app/admin/edges/page.module.css";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <aside className="bg-slate-700 p-5 mr-5">Admin Sidebar</aside>
      <div className={styles.background}>{children}</div>
    </div>
  );
};

export default AdminLayout;
