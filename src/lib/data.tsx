interface LegendItemType {
  color: string;
  name?: string;
}

interface BasicLegendType {
  id: string;
  name: string;
  items: LegendItemType[];
  description: string;
}

export type TimelineLegendType = BasicLegendType & {
  type: 'timeline';
  timeline: {
    step: number;
    speed: number;
    dateFormat: string;
    maxDate: string;
    minDate: string;
  };
  onChangeDate?: (values: [Date, Date]) => void;
};

type OtherLegendType = BasicLegendType & {
  type: 'basic' | 'choropleth' | 'gradient';
};

export type LegendType = OtherLegendType | TimelineLegendType;

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
