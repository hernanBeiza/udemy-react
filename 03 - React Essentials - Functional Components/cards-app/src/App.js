import './App.css';

import faker from 'faker';

import Card from './Card/Card';

function App() {
  const buttonsMarkup = (
    <div>
    <button className="button button2">Yes</button>
    <button className="button button3">No</button>
    </div>
    )
  return (
    <div className="App">
    <Card name={faker.name.firstName()} jobTitle={faker.name.jobTitle()} avatar={faker.image.avatar()}>
    {buttonsMarkup}
    </Card>
    <Card name={faker.name.firstName()} jobTitle={faker.name.jobTitle()} avatar={faker.image.avatar()}/>
    <Card name={faker.name.firstName()} jobTitle={faker.name.jobTitle()} avatar={faker.image.avatar()}/>
    </div>
    );
}

export default App;
