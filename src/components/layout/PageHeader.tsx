import { ViewSource } from "./ViewSource";
import { LastUpdated } from "./LastUpdated";

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-6 mb-1">
        <h1>{children}</h1>
        <div className="shrink-0 mt-2">
          <ViewSource />
        </div>
      </div>
      <LastUpdated />
    </div>
  );
}
