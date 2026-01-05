import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { HelpCircle } from "lucide-react";

interface PropertyTooltipProps {
  description?: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function PropertyTooltip({ description, children, side = "right" }: PropertyTooltipProps) {
  if (!description) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            {children}
            <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
          </div>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          <p className="text-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Enhanced label component with tooltip support
interface PropertyLabelProps {
  label: string;
  description?: string;
  required?: boolean;
  htmlFor?: string;
}

export function PropertyLabel({ label, description, required, htmlFor }: PropertyLabelProps) {
  const labelElement = (
    <label htmlFor={htmlFor} className="flex items-center gap-1">
      {label}
      {required && <span className="text-destructive">*</span>}
    </label>
  );

  if (description) {
    return (
      <PropertyTooltip description={description}>
        {labelElement}
      </PropertyTooltip>
    );
  }

  return labelElement;
}