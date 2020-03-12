import React from 'react';
import './App.css';
import axios from 'axios';

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="Card">
        <img src={profile.avatar_url} alt="Profile" />
        <div>
          <h4><b>{profile.name}</b></h4>
          <div>{profile.company}</div>
        </div>
      </div>
    );
  }
}
// 

const CardList = (props) => (
  <div className="CardList">
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
)

class Form extends React.Component {
  state = { userName: '' }
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(response.data);
    this.setState({ userName: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="GitHub username"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })} required />
        <button>Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  state = {
    profiles: []
  };

  addNewProfile = (profile) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profile]
    }))
  };

  render() {
    return (<div className="App">
      <header>{this.props.title}</header>
      <Form onSubmit={this.addNewProfile} />
      <br />
      <CardList profiles={this.state.profiles} />
    </div>)
  }
}

export default App;
