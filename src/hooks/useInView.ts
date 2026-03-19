import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = IntersectionObserverInit & {
    once?: boolean;
};

export function useInView<T extends HTMLElement>(options: UseInViewOptions = {}) {
    const { once = true, ...observerOptions } = options;
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);
    const [hasEntered, setHasEntered] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                setHasEntered(true);
                if (once) observer.unobserve(entry.target);
            } else if (!once) {
                setInView(false);
            }
        }, observerOptions);

        observer.observe(node);

        return () => observer.disconnect();
    }, [once, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold]);

    return { ref, inView, hasEntered };
}
