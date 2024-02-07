import Heading from "~/components/ui/heading";
import { type LegacyRef, type PropsWithChildren } from "react";

function ContentLayout({
    page,
    children,
    headerContent,
    className,
    ref,
    cardClassName,
    headingClass
}: PropsWithChildren<{
    page?: string;
    headerContent?: JSX.Element;
    className?: string;
    cardClassName?: string;
    ref?:LegacyRef<HTMLDivElement>|null
    headingClass?:string
}>) {
    return (
      <div className={`flex w-full flex-col ${className}`} ref={ref}>
        <div className={`sticky top-0 z-50 h-max w-full bg-black ${cardClassName}`}>
          {page && <Heading text={page} className={`first-letter:uppercase ${headingClass}`} />}
          {headerContent}
        </div>
        {children}
      </div>
    );
}
  
export default ContentLayout;
