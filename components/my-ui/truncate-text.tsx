import { ElementRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "react-tooltip";
import uniqid from "uniqid";

interface TruncateTextProps {
  text: string;
  className: string;
  lineClamp: 1 | 2 | 3 | 4 | 5 | 6;
  onClick?: () => void;
}

export const TruncateText = ({
  text,
  className,
  lineClamp,
  onClick,
}: TruncateTextProps) => {
  const [widthGap, setWidthGap] = useState<number>(0);

  const wrapperRef = useRef<ElementRef<"div">>(null);
  const textRef = useRef<ElementRef<"div">>(null);
  const randId = uniqid();

  useEffect(() => {
    setWidthGap(
      textRef.current?.offsetWidth! - wrapperRef.current?.offsetWidth!
    );
  }, []);

  return (
    <div ref={wrapperRef} className={cn("group w-full overflow-hidden")}>
      <div className="relative w-full">
        <div
          ref={textRef}
          className={cn(
            "relative w-fit max-w-full",
            lineClamp === 1 && "truncate text-nowrap",
            lineClamp === 2 && " line-clamp-2",
            lineClamp === 3 && " line-clamp-3",
            lineClamp === 4 && " line-clamp-4",
            lineClamp === 5 && " line-clamp-5",
            lineClamp === 6 && " line-clamp-6",
            className
          )}
          onClick={onClick}
          data-tooltip-delay-show={1000}
          data-tooltip-id={`${randId}-${text}`}
        >
          {text}
        </div>
      </div>
      <Tooltip
        id={`${randId}-${text}`}
        content={`${text}`}
        variant="dark"
        opacity={1}
        delayShow={1000}
        style={{ zIndex: 999 }}
        clickable
      />
    </div>
  );
};

// export const A = ({ className, text }: { className: string; text: string }) => {
//   const [duration, setDuration] = useState<number>(0);
//   const [classText, setClassText] = useState<string>("");
//   const [widthGap, setWidthGap] = useState<number>(0);

//   const wrapperRef = useRef<ElementRef<"div">>(null);
//   const textRef = useRef<ElementRef<"div">>(null);

//   useEffect(() => {
//     function bodyResize() {
//       console.log("bodyResize");
//     }
//     wrapperRef.current?.addEventListener("mouseenter", bodyResize, true);
//     return () => {
//       wrapperRef.current?.removeEventListener("resize", bodyResize);
//     };
//   });

//   // useEffect(() => {
//   //   if (widthGap > 0) {
//   //     if (widthGap < 10) {
//   //       setDuration(300);
//   //     } else if (widthGap < 20) {
//   //       setDuration(500);
//   //     } else if (widthGap < 40) {
//   //       setDuration(1000);
//   //     } else if (widthGap < 80) {
//   //       setDuration(2000);
//   //     } else if (widthGap < 120) {
//   //       setDuration(3000);
//   //     } else if (widthGap < 160) {
//   //       setDuration(4000);
//   //     } else {
//   //       setDuration(5000);
//   //     }
//   //   }
//   // }, [widthGap]);

//   // useEffect(() => {
//   //   setClassText(`duration-${duration}`);
//   // }, [duration]);

//   return (
//     <div ref={wrapperRef} className={cn("group w-full overflow-hidden")}>
//       <div className="relative w-full">
//         <div
//           ref={textRef}
//           className={cn(
//             "relative w-fit max-w-full truncate text-nowrap",
//             className
//             // widthGap > 0 && `right-0 transition-all ease-linear duration-2000`
//           )}
//           // onMouseEnter={() => {
//           //   if (widthGap > 0) {
//           //     textRef.current?.classList.add(
//           //       "!-right-full",
//           //       "!-translate-x-full",
//           //       classText
//           //     );
//           //     setTimeout(() => {
//           //       textRef.current?.classList.remove(
//           //         "!-right-full",
//           //         "!-translate-x-full"
//           //       );
//           //     }, duration + 1000);
//           //   }
//           // }}
//         >
//           {text}
//         </div>
//       </div>
//     </div>
//   );
// };
