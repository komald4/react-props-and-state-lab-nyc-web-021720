import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    // console.log(event)
    let newType = event.target.value
    this.setState(prevState => {
      let filters = Object.assign({}, prevState.filters);  // creating copy of state variable jasper
      filters.type = newType;                            // update the name property, assign a new value                 
      return { filters };                                 // return new object jasper object
    })
  console.log(this.state.pets)} 


  onAdoptPet = (id) => {
    const adoptedPet = this.state.pets.filter(pet => pet.id === id)[0]
      adoptedPet.isAdopted = true
  }

  fetchPets = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
    .then(res => res.json())
    .then(data => {
        this.setState({ pets: data })
    }) 
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(data => {
          this.setState({ pets: data })
    })
  }
}

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType = {this.onChangeType} fetchPets={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} adopted={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App
