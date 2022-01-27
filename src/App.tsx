import { useEffect, useState } from 'react';
import Legend from './components/legend';
import type { LegendType } from './lib/data';
import fetchData from './lib/data';

const App = () => {
  const [data, setData] = useState<LegendType[] | null>(null);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="divide-y w-2/3 mx-auto flex flex-col gap-y-10 bg-white p-10">
        {data?.map((legend) => (
          <Legend key={legend.id} legend={legend} />
        ))}
      </div>
    </div>
  );
};

export default App;
