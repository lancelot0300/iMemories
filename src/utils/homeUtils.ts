

export const isClickedContainer = (containerRef: React.MutableRefObject<HTMLDivElement | null>, e?: React.MouseEvent<HTMLDivElement>) => {
    if (e?.target === undefined) return true;
    return (
      e?.target === containerRef.current ||
      e?.target === containerRef.current?.firstChild
    );
  };
