interface LegendItemType {
  color: string;
  name?: string;
}

export interface LegendType {
  id: string;
  name: string;
  type: 'basic' | 'choropleth' | 'gradient';
  items: LegendItemType[];
  description: string;
}

const fetchData: (url?: string) => Promise<LegendType[]> = async (
  url = 'https://raw.githubusercontent.com/Vizzuality/front-end-code-challenge/master/data.json'
) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw response;
  }
  return await response.json();
};

export default fetchData;
