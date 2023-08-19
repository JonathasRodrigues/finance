"use client";

import { SelectPeriod } from "./select-period";

interface PageContentProps {
  title: string;
  subtitle?: string;
  children: React.ReactElement;
  headerRight?: React.ReactElement;
  periodFilter?: boolean;
}

export default function PageContent({
  title,
  subtitle,
  children,
  headerRight,
  periodFilter,
}: PageContentProps) {
  return (
    <div className="hidden h-full w-[854px] flex-1 flex-col space-y-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-2">
          {periodFilter && <SelectPeriod />}
          {headerRight && headerRight}
        </div>
      </div>
      {children}
    </div>
  );
}
