import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
  text: string;
};

export function ExpandableText({ text }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [shouldClamp, setShouldClamp] = useState(false);

  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // check if text overflows
    const isOverflowing = el.scrollHeight > el.clientHeight;
    setShouldClamp(isOverflowing);
  }, [text]);

  return (
    <div className="space-y-1">
      <p ref={ref} className={cn("text-sm leading-relaxed text-muted-foreground line-clamp-4", expanded && "line-clamp-none")}>
        {text}
      </p>

      {shouldClamp && (
        <Button variant="ghost" size="xs" onClick={() => setExpanded((v) => !v)} className="text-xs font-medium text-primary">
          {expanded ? "Show less" : "Read more"}
        </Button>
      )}
    </div>
  );
}
