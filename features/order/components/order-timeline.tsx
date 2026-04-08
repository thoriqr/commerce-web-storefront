import { CheckCircle, Circle } from "lucide-react";
import { TimelineItem } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  timeline: TimelineItem[];
};

export default function OrderTimeline({ timeline }: Props) {
  return (
    <div className="space-y-4">
      {timeline.map((item, index) => {
        const isLast = index === timeline.length - 1;

        return (
          <div key={item.key} className="flex items-start gap-3">
            {/* ICON + LINE */}
            <div className="flex flex-col items-center">
              {item.isCompleted ? <CheckCircle className="h-5 w-5 text-primary" /> : <Circle className="h-5 w-5 text-muted-foreground" />}

              {!isLast && <div className={cn("w-px flex-1 mt-1", item.isCompleted ? "bg-primary" : "bg-muted")} />}
            </div>

            {/* CONTENT */}
            <div className="space-y-1 pb-4">
              <p
                className={cn(
                  "text-sm font-medium",
                  item.isCurrent && "text-primary",
                  !item.isCompleted && !item.isCurrent && "text-muted-foreground"
                )}
              >
                {item.label}
              </p>

              {item.date && <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString("id-ID")}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
