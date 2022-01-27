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
    <div className="min-h-screen divide-y w-2/3 max-w-lg mx-auto space-y-10">
      {data?.map((legend) => (
        <Legend key={legend.id} legend={legend} />
      ))}
    </div>
  );
};

export default App;
