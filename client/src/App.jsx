import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Listing from './Listing';
import TitleBar from './TitleBar';

const ListingBlock = styled.div`
  display: flex;
  flex-flow: row nowrap;
  transform: translateX(-${(props) => (((props.currentSet - 1) * ((12 / props.setCount) * 250)))}px);
  transition: transform .5s;
`;
const ListingWrapper = styled.div`
  max-width: ${(props) => ((12 / props.setCount) * 250)}px;
  overflow: hidden;
`;

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      setCount: 4,
      currentSet: 1,
    };
    this.changeSet = this.changeSet.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }

  componentDidMount() {
    axios.get('/api/more')
      .then((response) => {
        this.setState({
          listings: response.data,
        });
      })
      .catch(() => {
      });
  }

  changeSize() {
    const { setCount } = this.state;
    this.setState({
      setCount: setCount === 3 ? 4 : 3,
    });
  }

  changeSet(increment) {
    const { setCount, currentSet } = this.state;
    if (currentSet >= setCount && increment === 1) {
      this.setState({
        currentSet: 1,
      });
    } else if (currentSet === 1 && increment === -1) {
      this.setState({
        currentSet: setCount,
      });
    } else {
      this.setState({
        currentSet: currentSet + increment,
      });
    }
  }

  render() {
    const { listings, setCount, currentSet } = this.state;
    return (
      <ListingWrapper setCount={setCount}>
        <TitleBar
          setCount={setCount}
          currentSet={currentSet}
          changeSet={this.changeSet}
          changeSize={this.changeSize}
        />
        <ListingBlock currentSet={currentSet} setCount={setCount}>
          {listings.map((listing) => (<Listing listing={listing} key={listing.listingId} />))}
        </ListingBlock>
      </ListingWrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
