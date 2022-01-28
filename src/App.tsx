import { useEffect, useState } from 'react';
import Legend from './components/legend';
import Sortable, { SortableItem } from './components/sortable';
import Spinner from './components/spinner';
import type { LegendType } from './lib/data';
import fetchData from './lib/data';

const App = () => {
  const [data, setData] = useState<LegendType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then((data) => setData(data))
      .catch((e) => {
        setError(e.toString());
      });
  }, []);

  if (error) {
    return (
      <div className="text-red-700 mx-auto">ERROR! {JSON.stringify(error)}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-2xl">
      {data === null ? (
        <div className="grid place-items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="divide-y w-2/3 mx-auto flex flex-col gap-y-5 bg-white p-10">
          <Sortable
            onChangeOrder={(values) => {
              setData((oldData) => {
                if (oldData === null) return oldData;
                return oldData
                  .slice()
                  .sort((a, b) => values.indexOf(a.id) - values.indexOf(b.id));
              });
            }}
            items={data.map((legend) => legend.id)}
          >
            {data.map((legend) => (
              <SortableItem key={legend.id} id={legend.id}>
                <Legend legend={legend} />
              </SortableItem>
            ))}
          </Sortable>
        </div>
      )}
    </div>
  );
};

export default App;
