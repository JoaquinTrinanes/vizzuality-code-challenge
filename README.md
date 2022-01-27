# Front-end-code-challenge

![Legend component which is composed of several items, each one with settings such as a toggle button, an info button and a button to collapse the item](assets/images/legend.png)


## Instruction for completing and submitting the challenge:

First thing first. This coding challenge is about creating a space for you to share with us how you work and reason, what things you care about when doing coding work, and how you approach problem solving. As such, through this challenge we are not expecting to check if you know the finest algorithms, have all the right answers to a given situation or if you are the best coder in the world. We believe there are no right or wrong answers, so please make yourself comfortable and focus on what you know best.

**Please submit your ideas to us in 1 week (max).** This will give us enough time to review your challenge with the rest of the team before the next interview. During this interview we will take some time to explore together your coding challenge submission, and will ask you any clarifying questions we might have.

Based on previous candidate experiences, we believe **it will take you between 8 and 10 hours to complete the challenge.** 

## Objective

To complete this code challenge, you will need to set up a simple React-based web application and implement the Legend component from above. In a real world scenario, this component would be attached to a map, and part of a more extensive flow, but for the recruitment purpose, you will focus only this bit.

#### DATA
The sample legend data, located in the `data.json` file, describe the items of the legend component. It should be fetched dynamically (like would you do if it was data from a REST API). You can use directly this url if you want [DATA](https://raw.githubusercontent.com/Vizzuality/front-end-code-challenge/master/data.json)

Each legend item has:
- `id`: a unique identifier
- `name`: the name of the layer
- `type`: a type of the item (basic, choropleth or gradient)
- `items`: an array of objects having name and color values
- `description`: data to be displayed in a modal

#### DESIGNS
Designs are stored in Figma. You should create an account to be able to see them.

- [Figma - inspect link](https://www.figma.com/file/CcReFFvkqC2FZoCi8yiGhb/Code-Challenge?node-id=0%3A1)
- [Figma - preview link](https://www.figma.com/proto/CcReFFvkqC2FZoCi8yiGhb/Code-Challenge?node-id=1%3A415&scaling=min-zoom)


Font: [Open Sans](https://fonts.google.com/specimen/Open+Sans)

#### ICONS
All the icons required are stored in this repo, check `assets/icons`. Feel free to add them as you desire.


## Basic requirements:
Create 3 different legend item components: basic, choropleth and gradient. Timeline is optional.

`basic`

![Basic item which contains a list of values, each associated with a color](assets/images/basic.png)

`choropleth`

![Choropleth item which is composed of a ramp of colours associated with text](assets/images/choropleth.png)

`gradient`

![Gradient item is a gradient between two colours, each extremity with a value](assets/images/gradient.png)

`timeline` (optional)
If you are not going to do this layer, please filter it out from the data response.

![Timeline item is an interactive element where the user can select a range between two dates](assets/images/timeline.png)

Create the toolbar component which contains 3 different buttons, each of them has a tooltip with a short name:

`info button`
  - tooltip short name: "Layer Info"
  - a click opens a modal that displays the content from the `description` field. Please consider that some of the values are HTML string and they need to be parsed.
  - expose a function called `onChangeInfo`

`visibility button`
  - tooltip short name: "Hide layer" / "Show layer"
  - a click changes the icon and the tooltip name
  - expose a function called `onChangeVisibility`

`collapse button`
  - tooltip short name: "Collapse layer" / "Expand layer"
  - a click collapses the legend item and shows only the title of the component. It also changes the tooltip name
  - expose a function called `onChangeCollapse`

## Optional goals:
If you found the basic requirements too easy, you can always try to implement something extra:

**1)** The client wants to put a text inside the first layer (see screenshot). Could you add it and make it scalable for future changes?

![Gradient item with additional text at the bottom and a link or button](assets/images/additional-text.png)


**2)** The client wants to be able to sort the layers. As the legend has a handler designed on the left side of each layer item, could you add a functionality of drag and drop to be able to sort the layers? Also, you should expose a function `onChangeOrder` with the new ids sorted.


**3)** You may notice that there are 4 layers inside the `data.json`. The last one has a timeline config with the following values:
- `step`: it defines how many steps you should increase each time
- `speed`: it defines the changing velocity of the step (only if we animate it)
- `dateFormat`: it defines the format you should show for the dates inside the legend
- `maxDate`: Max date
- `minDate`: Min date

We think that with these values you should be able to represent this timeline. You can change the `startDate` and `endDate`. Remember to expose a function `onChangeDate` with the new dates defined by the range.






## Technical requirements
There are a few rules that we would like you to follow during your code challenge:
  - Use the React library to demonstrate component-oriented architecture,
  - Style your components, use an approach that you see fit,
  - Take care of mobile devices and make sure that your project works on smaller resolution screens,
  - Work closely with the design, try to implement it as accurately as possible

For sharing purposes please create a **new GitHub repo**, deploy your project to the **GitHub pages** and provide the link to the repo.

Your submission should also include a readme file, where you can document your work, describe the features and the architectural decisions that you made. Feel free to share there your thoughts about the challenges that you faced implementing this code.


## What’s next?
Once you submit your solution, our developers will review your code challenge, taking your experience level into account. The sample code provided by you should be in a state considered as a "production" ready - where each requested element is prepared and potentially ready to review with your colleagues.

Here are a few hints that can help to align your code with the requirements:
- Does the application realize all the required features?
- Is anything missing from the specification?

- Is the code clear, maintainable, and easy to understand for other developers? Is it extendable?
- Is it responsive? Does it scale on mobile devices easily?
- Does the readme file describes all the features and covers all the information that is essential for the project?
- Don’t focus only on the “happy path” - have you covered all the edge cases that you faced?

Good luck!

**“The Challenge” has been created with the sole intention of being used as a guiding document for the current recruitment process. This means we won't be using it (all or parts of it) within our projects.**

