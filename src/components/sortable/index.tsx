import { DndContext } from '@dnd-kit/core';
import type { SortableContextProps } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';

interface SortableProps extends SortableContextProps {
  onChange: (orderedIds: string[]) => void;
}

const Sortable: React.FC<SortableProps> = ({
  onChange,
  children,
  items,
  ...props
}) => {
  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) {
          return;
        }
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const ordered = arrayMove(items, oldIndex, newIndex);
        onChange(ordered as string[]);
      }}
    >
      <SortableContext items={items} {...props}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default Sortable;
