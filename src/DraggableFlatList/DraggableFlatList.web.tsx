/// <reference lib="dom" /> TODO: DO NOT REMOVE THIS LINE

import React from "react";

import { DEFAULT_PROPS } from "@constant/DraggableFlatList/constants";
import { CellProvider } from "@context/DraggableFlatList/cellContext";
import DraggableFlatListProvider from "@context/DraggableFlatList/draggableFlatListContext";
import { WebDraggableFlatListProps } from "@constant/DraggableFlatList/types.web";

function DraggableFlatListWeb<T>({
  data,
  renderItem,
  keyExtractor,
  onDragEnd,
  onDragBegin,
  onRelease,
  onPlaceholderIndexChange,
  activationDistance = DEFAULT_PROPS.activationDistance,
  containerStyle,
  horizontal = false,
  ...props
}: WebDraggableFlatListProps<T>) {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [tempData, setTempData] = React.useState<T[] | null>(null);

  const placeholderIndexRef = React.useRef<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const currentIndexRef = React.useRef<number | null>(null);
  const draggedKeyRef = React.useRef<string | null>(null);

  const positionsRef = React.useRef<Map<string, DOMRect>>(new Map());
  const lastReorderIndexRef = React.useRef<number | null>(null);
  const lastPointerRef = React.useRef<{ x: number; y: number } | null>(null);

  const dragAnchorRef = React.useRef<{
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const containerRectRef = React.useRef<DOMRect | null>(null);

  const [dragGhost, setDragGhost] = React.useState<{
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    item: T;
    index: number;
    key: string;
  } | null>(null);

  const activeKey = draggedKeyRef.current;

  const getKey = React.useCallback(
    (item: T, index: number) => {
      return keyExtractor(item, index);
    },
    [keyExtractor],
  );

  const handleDragStart = React.useCallback(
    (e: React.DragEvent, index: number) => {
      setDraggedIndex(index);

      const key = keyExtractor(data[index], index);
      draggedKeyRef.current = key;
      currentIndexRef.current = index;
      setTempData([...data]);

      placeholderIndexRef.current = index;
      onDragBegin?.(index);

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", index.toString());

      const el = itemRefs.current.get(key);

      if (el) {
        const rect = el.getBoundingClientRect();

        const container = containerRef.current;
        if (container) {
          containerRectRef.current = container.getBoundingClientRect();
        }

        const img = new Image();
        img.src =
          "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
        e.dataTransfer.setDragImage(img, 0, 0);

        const mouseY = e.clientY;
        const mouseX = e.clientX;

        const anchor = dragAnchorRef.current;

        setDragGhost({
          x: e.clientX,
          y: e.clientY,
          offsetX: anchor?.offsetX ?? rect.width / 2,
          offsetY: anchor?.offsetY ?? rect.height / 2,
          width: rect.width,
          height: rect.height,
          item: data[index],
          index,
          key,
        });
      }
    },
    [onDragBegin, data, keyExtractor],
  );

  const handleDragEnd = React.useCallback(() => {
    if (draggedIndex !== null) {
      onRelease?.(draggedIndex);
    }

    placeholderIndexRef.current = null;
    lastPointerRef.current = null;

    setDraggedIndex(null);

    setDragGhost(null);

    lastReorderIndexRef.current = null;
  }, [draggedIndex, onRelease]);

  const handleContainerDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      setDragGhost((prev) => {
        const rect = containerRectRef.current;
        if (!prev || !rect) return prev;

        return {
          ...prev,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      });

      if (!tempData || !draggedKeyRef.current) return;

      const mouseY = e.clientY;
      const mouseX = e.clientX;

      let nextIndex: number | null = null;

      if (lastPointerRef.current) {
        const dx = Math.abs(mouseX - lastPointerRef.current.x);
        const dy = Math.abs(mouseY - lastPointerRef.current.y);

        if (dx < 2 && dy < 2) {
          return;
        }
      }

      lastPointerRef.current = { x: mouseX, y: mouseY };

      for (let i = 0; i < tempData.length; i++) {
        const key = keyExtractor(tempData[i], i);
        const el = itemRefs.current.get(key);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const isInside = horizontal
          ? mouseX >= rect.left && mouseX <= rect.right
          : mouseY >= rect.top && mouseY <= rect.bottom;

        if (!isInside) continue;

        const isAfter = horizontal
          ? mouseX > rect.left + rect.width / 1.5
          : mouseY > rect.top + rect.height / 1.5;

        nextIndex = isAfter ? i + 1 : i;
        break;
      }

      if (
        nextIndex === null ||
        placeholderIndexRef.current === nextIndex ||
        lastReorderIndexRef.current === nextIndex
      ) {
        return;
      }

      positionsRef.current.clear();
      tempData.forEach((item, index) => {
        const key = keyExtractor(item, index);
        const el = itemRefs.current.get(key);
        if (el) positionsRef.current.set(key, el.getBoundingClientRect());
      });

      placeholderIndexRef.current = nextIndex;
      onPlaceholderIndexChange?.(nextIndex);

      setTempData((prev) => {
        if (!prev || !draggedKeyRef.current) return prev;

        const from = prev.findIndex(
          (item, index) => keyExtractor(item, index) === draggedKeyRef.current,
        );
        if (from === -1 || from === nextIndex) return prev;

        const arr = [...prev];
        const [item] = arr.splice(from, 1);
        arr.splice(nextIndex, 0, item);
        return arr;
      });

      lastReorderIndexRef.current = nextIndex;

      requestAnimationFrame(() => {
        positionsRef.current.forEach((prevRect, key) => {
          if (key === draggedKeyRef.current) return;

          const el = itemRefs.current.get(key);
          if (!el) return;

          const nextRect = el.getBoundingClientRect();
          const dx = prevRect.left - nextRect.left;
          const dy = prevRect.top - nextRect.top;

          if (!dx && !dy) return;

          el.style.transform = `translate(${dx}px, ${dy}px)`;
          el.style.transition = "none";

          requestAnimationFrame(() => {
            el.style.transform = "";
            el.style.transition =
              "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)";
          });
        });
      });
    },
    [tempData, horizontal, keyExtractor, onPlaceholderIndexChange],
  );

  const workingData = tempData ?? data;

  const getItemStyle = (key: string): React.CSSProperties =>
    key === draggedKeyRef.current ? { opacity: 0 } : {};

  React.useLayoutEffect(() => {
    if (draggedKeyRef.current !== null) return;

    itemRefs.current.forEach((el) => {
      el.style.transform = "";
      el.style.transition = "";
    });
  }, [workingData]);

  return (
    <DraggableFlatListProvider
      activeKey={activeKey}
      keyExtractor={keyExtractor}
      horizontal={!!horizontal}
      layoutAnimationDisabled={false}
    >
      <div
        ref={containerRef}
        style={{
          display: horizontal ? "flex" : "block",
          overflow: horizontal ? "auto" : "visible",
          minHeight: horizontal ? "auto" : "100%",
          ...containerStyle,
        }}
        onDragOver={handleContainerDragOver}
        onDrop={(e) => {
          e.preventDefault();

          if (!tempData || !draggedKeyRef.current) return;

          const from = data.findIndex(
            (item) => keyExtractor(item, 0) === draggedKeyRef.current,
          );

          const to = placeholderIndexRef.current;
          if (from === -1 || to == null) return;

          const newData = [...data];
          const [item] = newData.splice(from, 1);
          newData.splice(to, 0, item);

          onDragEnd?.({ from, to, data: newData });

          draggedKeyRef.current = null;
          currentIndexRef.current = null;
          placeholderIndexRef.current = null;
          setDragGhost(null);

          setDraggedIndex(null);
          setTempData(null);

          lastReorderIndexRef.current = null;
          itemRefs.current.forEach((el) => {
            el.style.transform = "";
            el.style.transition = "";
          });
          lastPointerRef.current = null;

          onRelease?.(from);
        }}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {workingData.map((item, index) => {
          const key = getKey(item, index);
          const isActive = key === draggedKeyRef.current;

          return (
            <CellProvider isActive={isActive} key={key}>
              <div
                ref={(el) => {
                  if (el) {
                    itemRefs.current.set(key, el);
                  } else {
                    itemRefs.current.delete(key);
                  }
                }}
                draggable={draggedIndex === null}
                onMouseDown={(e) => {
                  const el = itemRefs.current.get(key);
                  if (!el) return;

                  const rect = el.getBoundingClientRect();
                  dragAnchorRef.current = {
                    offsetX: e.clientX - rect.left,
                    offsetY: e.clientY - rect.top,
                  };
                }}
                onDragStart={(e) => {
                  handleDragStart(e, index);
                }}
                onDragEnd={handleDragEnd}
                style={{
                  cursor: draggedIndex === null ? "grab" : "grabbing",
                  userSelect: "none",
                  position: "relative",
                  ...getItemStyle(key),
                }}
              >
                {renderItem({
                  item,
                  getIndex: () => index,
                  drag: () => { },
                  isActive,
                })}
              </div>
            </CellProvider>
          );
        })}
        {dragGhost && (
          <CellProvider isActive={true}>
            <div
              style={{
                position: "absolute",
                left: dragGhost.x - dragGhost.offsetX,
                top: dragGhost.y - dragGhost.offsetY,
                width: dragGhost.width,
                height: dragGhost.height,
                pointerEvents: "none",
                zIndex: 9999,
              }}
            >
              {renderItem({
                item: dragGhost.item,
                getIndex: () => dragGhost.index,
                drag: () => { },
                isActive: true,
              })}
            </div>
          </CellProvider>
        )}
      </div>
    </DraggableFlatListProvider>
  );
}

export default DraggableFlatListWeb;
