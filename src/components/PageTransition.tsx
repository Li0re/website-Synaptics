import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();
    const [displayedChildren, setDisplayedChildren] = useState(children);
    const [transitionStage, setTransitionStage] = useState<"enter" | "exit">("enter");
    const prevPathRef = useRef(location.pathname);

    useEffect(() => {
        if (location.pathname !== prevPathRef.current) {
            // Start exit animation
            setTransitionStage("exit");

            const timeout = setTimeout(() => {
                // Swap content
                setDisplayedChildren(children);
                prevPathRef.current = location.pathname;

                // Scroll to top
                window.scrollTo(0, 0);

                // Start enter animation
                requestAnimationFrame(() => {
                    setTransitionStage("enter");
                });
            }, 400); // match CSS duration

            return () => clearTimeout(timeout);
        } else {
            setDisplayedChildren(children);
        }
    }, [location.pathname, children]);

    return (
        <div
            className="page-transition-wrapper"
            data-stage={transitionStage}
        >
            {displayedChildren}
        </div>
    );
}
