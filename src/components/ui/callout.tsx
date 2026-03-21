import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

type CalloutType = "info" | "warning" | "success" | "error";

const typeMap: Record<
  CalloutType,
  {
    icon: React.ComponentType<{ className?: string }>;
    variant: "info" | "warning" | "success" | "destructive";
  }
> = {
  info:    { icon: Info,          variant: "info" },
  warning: { icon: AlertTriangle, variant: "warning" },
  success: { icon: CheckCircle,   variant: "success" },
  error:   { icon: XCircle,       variant: "destructive" },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const { icon: Icon, variant } = typeMap[type];
  return (
    <Alert variant={variant} className="my-5">
      <Icon />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription className="[&>p]:mb-0 [&>p]:leading-relaxed">
        {children}
      </AlertDescription>
    </Alert>
  );
}
