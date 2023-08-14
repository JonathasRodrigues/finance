"use client";

import { DialogCategoryForm } from "~/components/categories/dialog-form";
import TableCategories from "~/components/categories/table";

export default function CategoryPage() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-6">
        <DialogCategoryForm />
      </div>
      <div className="col-start-1 col-end-7">
        <TableCategories />
      </div>
    </div>
  );
}

CategoryPage.auth = true;
