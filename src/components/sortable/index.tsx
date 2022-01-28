import { closestCenter, DndContext } from '@dnd-kit/core';
import type { SortableContextProps } from '@dnd-kit/sortable';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import type { HTMLAttributes } from 'react';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

interface SortableProps extends SortableContextProps {
  onChangeOrder: (orderedIds: string[]) => void;
}

interface SortableListenersContextProps {
  listeners: SyntheticListenerMap;
  attributes: ReturnType<typeof useSortable>['attributes'];
  isDragging: boolean;
}

export const SortableListenersContext =
  React.createContext<SortableListenersContextProps | null>(null);

const Sortable: React.FC<SortableProps> = ({
  onChangeOrder,
  children,
  items,
  ...props
}) => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) {
          return;
        }
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const ordered = arrayMove(items, oldIndex, newIndex);
        onChangeOrder(ordered as string[]);
      }}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={items}
        {...props}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

interface SortableItemProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  children,
  id,
  ...props
}) => {
  const {
    attributes,
    listeners = {},
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = { transform: CSS.Translate.toString(transform), transition };

  return (
    <SortableListenersContext.Provider
      value={{ isDragging, listeners, attributes }}
    >
      <div ref={setNodeRef} style={style} {...props}>
        {children}
      </div>
    </SortableListenersContext.Provider>
  );
};

export default Sortable;
