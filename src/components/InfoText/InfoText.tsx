import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { StyledInfoWrapper } from "./infoText.styles";

type InfoTextProps = {
  children: React.ReactNode;
}

type InfoTextRef = {
  showInfo: (element: HTMLElement) => void;
  hideInfo: () => void;
}

const InfoText = forwardRef<InfoTextRef, InfoTextProps>(
  ({ children }, ref) => {

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const showInfo = (element: HTMLElement) => {
      const target = element;
      const targetWidth = target.offsetWidth;
      const targetHeight = target.offsetHeight;
      const x = target.getBoundingClientRect().left + targetWidth - 10;
      const y = target.getBoundingClientRect().top + targetHeight - 10;

      setPos({ x, y });
      
      timeoutRef.current = window.setTimeout(() => {
        setVisible(true);
      }, 500);

    };

    const hideInfo = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setVisible(false);
    };

    useImperativeHandle(ref, () => ({
      showInfo,
      hideInfo,
    }));

    useLayoutEffect(() => {
      if (visible && wrapperRef.current) {
        let { x, y } = pos;

        const tooltipWidth = wrapperRef.current.offsetWidth;
        const tooltipHeight = wrapperRef.current.offsetHeight;

        const padding = 10; 
        const isOverX = x + tooltipWidth + padding > window.innerWidth;
        const isOverY = y + tooltipHeight + padding > window.innerHeight;

        if (isOverX) {
          x = Math.max(padding, window.innerWidth - tooltipWidth - padding);
        }

        if (isOverY) {
          y = Math.max(padding, window.innerHeight - tooltipHeight - padding);
        }

        setPos({ x, y });
      }
    }, [pos.x, pos.y, visible]);

    if (!visible) return null;

    return (
      <StyledInfoWrapper ref={wrapperRef} $posX={pos.x} $posY={pos.y}>
        {children}
      </StyledInfoWrapper>
    );
  }
);

export default InfoText;
