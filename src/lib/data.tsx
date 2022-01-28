interface LegendItemType {
  color: string;
  name?: string;
}

interface BasicLegendType {
  id: string;
  name: string;
  items: LegendItemType[];
  description: string;
  excerpt?: string;
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

  // This is obviously a terrible solution, it's just my way to 'emulate' this field present in the file
  const data = (await response.json()) as LegendType[];
  data[0].excerpt = `
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vero debitis, reprehenderit, laboriosam dolore, nobis at distinctio molestiae tenetur ex nisi facilis alias et blanditiis. Nesciunt error molestiae ratione at?</p>
  <p><a href="https://www.icegif.com/wp-content/uploads/polish-cow-icegif.gif">Check the data</a></p>
  `;
  return data;
};

export default fetchData;
