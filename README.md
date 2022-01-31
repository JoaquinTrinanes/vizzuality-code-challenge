# ✨ Vizzuality front end code challenge ✨

Launching this project is as easy as:

1. 🐑 Clone it
2. 💿 _Enter_ it (`cd vizzuality-coding-challenge`)
3. 🤖 `yarn start`

## The basics

The project is created using Create React App, with the TypeScript template and some linting rules for my own sanity. I'm treating the `src/App.tsx` file as a "page" file instead of the application entrypoint.

## Fetching the data

The best way to get data is without our UI knowing how to get it. A really simple client is created, which defines the data schema for our TypeScript definitions, and most importantly exports a function that returns a `Promise` with the data. In the project root, `useEffect` is used to fetch the data only on the first render.

This is a really simple approach that can be improved in many ways. For example, creating a hook that handles the errors and loading state (or an existing solution like `useSWR`). The data should be called differently (`fetchData` is a really bad name, but it works in this context because it's the only data we handle).

Some cool additions would be a `Loading` component to take care of the loading state, instead of doing conditional rendering.

```tsx
{
  data === null ? <div>Loading</div> : <div>Not loading! :D</div>;
}
```

to:

```tsx
<Loading loading={data === null} fallback={<div>Loading</div>}>
  Not loading!
</Loading>
```

Something similar could be done for collapsibles, a component that always render the 'head' and then conditionally renders and animates the children when it's toggled.

## Legend by legend

### Basic

To create the colored circle a `div` is created. It has the background color set to the desired one, and the border radius is set to 50% to make it round.

### Choropleth

A `div` is created with `flex` display. Each cell is full width and has a `div` with the desired color and the corresponding name.

### Gradient

Similar to the previous one, but instead of using a solid color, a `linear-gradient` from the current color to the next is created. The last element is skipped.

There's some extra code to specifically render the last value's name.

## Modals

To create the description modal, I used `react-modal`. I just couldn't be bothered coming up with a solution when a better one already exists 😁

Because the content is a plain HTML string I do the unthinkable: add it as is to the document!

```tsx
<div
  className="prose mx-auto"
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(legend.description, {
      USE_PROFILES: { html: true },
    }),
  }}
/>
```

This is React's way of telling you that you shouldn't be doing this if you don't know what you're getting into. We do, because the input is sanitized beforehand 😎

The `prose` class is a Tailwind utility (`@tailwindcss/typography`) that takes care of formatting the text for us.

The modal is styled because it would be huge otherwise. The width is set to 75% and the height to 50%. Honestly, I wanted to make this part responsive, but I couldn't find a way to use classes (that is, Tailwind's built in support for responsive design) and I didn't want to use JS to get the screen size. I'm sure there's a way to do it though. The current compromise is a width that looks good both on computer and mobile, but not as good as it possibly can.

The modal can be closed pressing escape or clicking outside it, but an **&times;** button is added to improve UX. It's sticky, so it's always visible, even if the modal is scrolled down.

## Tooltips

I used a library called `rc-tooltip` and its default styles to create them. It works as a component that normally renders its `children`, but when the trigger condition is met (the desired combination of `click` and `hover`, only the latter in this case) is met, the `overlay` prop is rendered.

## Optional goals

### Little excerpt

So the client wants to show some additional data along the legend? No problem! The easiest way to do that and be flexible in the future is for them to send us that info alongside the other data. Thus, I created an optional `excerpt` property that each legend can provide. i'd use the name `description`, but that one was already taken. The excerpt is rendered the same way as the modal description. To simulate the data is received I hardcoded some text in the fetch function.

### Dragging stuff around

The `@dnd-kit` library provides all the drag and drop functionality we will ever need (for now at least). It even provides a sortable utility in `@dnd-kit/sortable`, which we will use.

A `Sortable` component is created. This component takes care of creating a `SortableContext` inside a `DndContext`. The `DndContext`handles the logic of what happens when a drag operation is completed, how items collide, mouse and touch support... whereas the `SortableContext` keeps track of how the items are ordered.

Each component inside `Sortable` must be enclosed in a `SortableItem` to work. This takes care of the dragging functionality and uses a `SortableListenersContext`. This allows us to make a whole element dragabble but select the handle in an easy way (in this case, the 6-dot image).

```tsx
const sortableContext = useContext(SortableListenersContext);

return (
  <div className="flex flex-row gap-x-2 align-middle">
    <div
      className="w-3 cursor-grab translate-y-2 touch-manipulation flex-shrink-0"
      {...sortableContext?.listeners}
      {...sortableContext?.attributes}
    >
      <img src={dragDots} />
    </div>
    ...
  </div>
);
```

### Timeline legend

Library time! A slider component is created using `rc-slider`, with our custom styles and exposing the methods and props we're interested in.

The dates are converted to numbers (milliseconds) and those are the values that the range uses internally. They are formatted into dates to make them readable. I used `luxon`, a date utility library, just because I found it to be the easiest way to format a date using a string like `yyyy-MM-dd`. Honestly, I had to cheat a little, because the correct format was `yyyy` instead of `YYYY` so I `toLowercase`'d everything 😅

The component only uses `luxon` internally, because I only needed it for that specific functionality and it made sense to return a normal JS date to work with.
