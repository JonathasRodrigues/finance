"use client";

import { DialogCategoryForm } from "~/components/categories/dialog-form";
import TableCategories from "~/components/categories/table";
import PageContent from "~/components/page-content";

export default function CategoryPage() {
  return (
    <PageContent
      title="Categories"
      subtitle="List of expense category"
      headerRight={<DialogCategoryForm />}
    >
      <TableCategories />
    </PageContent>
  );
}

CategoryPage.auth = true;
