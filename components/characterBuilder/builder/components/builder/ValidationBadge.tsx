import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type Status = "valid" | "invalid" | "warning";

export default function ValidationBadge({ status }: { status: Status }) {
  if (status === "valid")
    return <CheckCircle className="w-4 h-4 text-success" />;
  if (status === "invalid") return <XCircle className="w-4 h-4 text-error" />;
  return <AlertTriangle className="w-4 h-4 text-warning" />;
}
