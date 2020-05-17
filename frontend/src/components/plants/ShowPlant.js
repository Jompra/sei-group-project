import React from 'react'
import { Link } from 'react-router-dom' //* Importing link component from 'react-router-dom' so we can make an edit button to Link to the EditPLant page.
import { getSinglePlant, deletePlant, makeOffer } from '../../lib/api'

class ShowPlant extends React.Component {
  state = {
    plant: null,
    offerData: {
      offer: '',
      text: ''
    },
    isOffer: false
  }

  async componentDidMount() {
    try {
      const plantId = this.props.match.params.id
      const res = await getSinglePlant(plantId)
      this.setState({ plant: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleDelete = async () => { // * our function to handle the click of the delete button
    try {
      const plantId = this.props.match.params.id // * this plant id to be deleted, from the url
      await deletePlant(plantId) // * use the deletePlant function, passing the plant id as the argument.
      this.props.history.push('/plants') // * when succesfully deleted, redirect our user to the index page
    } catch (err) {
      this.props.history.push('/notfound') // * if something goes wrong, push the user to the error page
    }
  }

  clicker = () => {
    this.setState({ isOffer: this.state.isOffer === false ? true : false })
  }

  handleChange = event => {
    console.log(event)
    const offerData = { ...this.state.offerData, [event.target.name]: event.target.value }
    this.setState( { offerData } )
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const plantId = this.props.match.params.id
      const res = await makeOffer(plantId)
      this.setState({ offerData: res.data })
    } catch (err) {
      console.log(err);
    }
  }


  render() {
    if (!this.state.plant) return null // * if there is no cheese object, return null
    console.log(this.state.plant.user._id)
    const { plant, isOffer, offerData } = this.state // * deconstruct the cheese from state
    console.log(this.state.offerData);

    return (
      <section className="section">
        <div className="container">
          <h2 className="title has-text-centered">{plant.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={plant.imageUrl} alt={plant.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Description</h4>
              <p>{plant.description}</p>
              <hr />
              <h4 className="title is-4">Height</h4>
              <hr />
              <p>{plant.height}</p>
              <hr />
              <h4 className="title is-4">Location</h4>
              <hr />
              <p>{plant.lat}</p>
              <p>{plant.lon}</p>
              <hr />
              <h4 className="title is-4">Added By</h4>
              <hr />
              <Link to={`/profile/${plant.user._id}`}>
                <p>{plant.user.name}</p>
              </Link>
              <hr />
              <button
                className="button is-light"
                onClick={this.clicker}>Make Offer
              </button>
              <hr />
              {isOffer &&
                <>
                  <form onSubmit={this.handleSubmit} className="column is-half is-offset-one-quarter box">
                    <div className="field">
                      <label className="label">Your Offer: </label>
                      <div className="control">
                        <input
                          placeholder="Offer"
                          name="offer"
                          onChange={this.handleChange}
                          value={offerData.offer}
                        />
                      </div>
      
                    </div>
                    <div className="field">
                      <label className="label">Message for User: </label>
                      <div className="control">
                        <textarea
                          placeholder="Message"
                          name="text"
                          onChange={this.handleChange}
                          value={offerData.text}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <button type="submit" className="button is-fullwidth is-warning">Submit Offer</button>
                    </div>
                  </form>
                    <hr />
              </>
              }
              {/* {Using the "isOwner" function, it returns true if the logged in user is the creator of this cheeses, we can use this to determine if we should show the edit/delete buttons or not } */}
                  {/* {isOwner(plant.user._id) &&  */}
                  <Link to={`/plants/${plant._id}/edit`} className="button is-warning">Edit</Link>
                  <hr />
                  {/* {isOwner(plant.user._id) &&  */}
                  <button onClick={this.handleDelete} className="button is-danger">Delete</button>
                </div>
          </div>
          </div>
      </section>
    )
  }

}

export default ShowPlant