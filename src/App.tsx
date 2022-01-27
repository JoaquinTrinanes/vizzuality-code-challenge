import { DndContext } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import Legend from './components/legend';
import Sortable, { SortableItem } from './components/sortable';
import type { LegendType } from './lib/data';
import fetchData from './lib/data';

const App = () => {
  const [data, setData] = useState<LegendType[]>([]);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  if (!data.length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-800">
      <div className="divide-y w-2/3 mx-auto flex flex-col gap-y-10 bg-white p-10">
        <Sortable
          onChange={(values) => {
            setData((oldData) =>
              oldData
                .slice()
                .sort((a, b) => values.indexOf(a.id) - values.indexOf(b.id))
            );
          }}
          items={data.map((legend) => legend.id)}
          strategy={verticalListSortingStrategy}
        >
          {data.map((legend) => (
            <SortableItem key={legend.id} id={legend.id}>
              <Legend legend={legend} />
            </SortableItem>
          ))}
        </Sortable>
      </div>
    </div>
  );
};

export default App;
