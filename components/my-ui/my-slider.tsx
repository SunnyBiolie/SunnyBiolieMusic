import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface SliderProps {
  defaultValue: number;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  className?: string;
  height?: number;
}

export const Slider = ({
  defaultValue,
  value,
  min,
  max,
  step,
  onValueChange,
  className,
  height,
}: SliderProps) => {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      step={step}
      defaultValue={[defaultValue]}
      value={[value]}
      onValueChange={([e]) => onValueChange(e)}
      className={cn(
        "group py-1.5 relative flex touch-none select-none items-center cursor-pointer",
        className
      )}
    >
      <SliderPrimitive.Track
        style={height ? { height: `${height}px` } : {}}
        className="relative h-[5px] w-full grow overflow-hidden rounded-full bg-primary/20"
      >
        <SliderPrimitive.Range className="absolute h-full bg-primary group-hover:bg-sky-600 rounded-full transition" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="opacity-0 group-hover:opacity-100 block h-3 w-3 rounded-full bg-primary shadow transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
};
