import React from 'react';
import { Link } from '@reach/router';

class All extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_DATA_URL}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
  }
  render() {
    const { DataisLoaded, items } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h1> Loading...</h1>{' '}
        </div>
      );

    return (
      <div className="App">
        {items.map((item) => (
          <ol key={item.id}>
            <Link to={`ensembles/${item.id}`}>{item.title}</Link> by{' '}
            {item.composer}
          </ol>
        ))}
      </div>
    );
  }
}

export default All;
