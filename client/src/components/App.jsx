import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Listing from './Listing';
import TitleBar from './TitleBar';
import ListsModal from './Lists/ListsModal';
import GlobalStyle from '../styles/GlobalStyle';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

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
      lists: [],
      setCount: 3,
      currentSet: 1,
      showListsModal: false,
    };
    this.changeSet = this.changeSet.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.toggleLists = this.toggleLists.bind(this);
    this.changeListCount = this.changeListCount.bind(this);
  }

  componentDidMount() {
    axios.get('/api/more')
      .then((response) => {
        this.setState({
          listings: response.data.listings,
          lists: response.data.lists,
        });
      })
      .catch(() => {
      });
  }

  changeSize() {
    const { setCount, currentSet } = this.state;
    this.setState({
      setCount: setCount === 3 ? 4 : 3,
    });
    this.setState({
      currentSet: (currentSet === setCount && setCount === 4) ? 3 : currentSet,
    });
  }

  changeListCount(targetIndex, addend) {
    const { lists } = this.state;
    const newLists = lists.map((list, i) => {
      if (i === targetIndex) {
        list.count += addend;
      }
      return list;
    });
    this.setState({
      lists: newLists,
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

  toggleLists() {
    const { showListsModal } = this.state;
    this.setState({
      showListsModal: !showListsModal,
    });
  }

  render() {
    const {
      listings,
      lists,
      setCount,
      currentSet,
      showListsModal,
    } = this.state;
    return (
      <AppWrapper>
        {showListsModal ? <ListsModal lists={lists} toggleLists={this.toggleLists} changeCount={this.changeListCount} /> : ''}
        <ListingWrapper setCount={setCount}>
          <GlobalStyle />
          <TitleBar
            setCount={setCount}
            currentSet={currentSet}
            changeSet={this.changeSet}
            changeSize={this.changeSize}
          />
          <ListingBlock currentSet={currentSet} setCount={setCount}>
            {listings.map((listing) => (
              <Listing
                listing={listing}
                key={listing.listingId}
                toggleLists={this.toggleLists}
              />
            ))}
          </ListingBlock>
        </ListingWrapper>
      </AppWrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

export default App;
