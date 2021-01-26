/* eslint-disable no-param-reassign */
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
      listingToMarkSaved: -1,
    };
    this.changeSet = this.changeSet.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.toggleListsModal = this.toggleListsModal.bind(this);
    this.addToList = this.addToList.bind(this);
    this.designateListingToSave = this.designateListingToSave.bind(this);
    this.markListingAsSaved = this.markListingAsSaved.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.createList = this.createList.bind(this);
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

  assignList(id, listIndex) {
    const { listings } = this.state;
    const newListings = listings.map((listing) => {
      if (listing.listingId === id) {
        listing.savedList = listIndex;
      }
      return listing;
    });
    this.setState({
      listings: newListings,
    });
  }

  addToList(targetIndex /* , id */) {
    const { lists } = this.state;
    const newLists = lists.map((list, i) => {
      if (i === targetIndex) {
        list.count += 1;
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

  changeSize() {
    const { setCount, currentSet } = this.state;
    this.setState({
      setCount: setCount === 3 ? 4 : 3,
    });
    this.setState({
      currentSet: (currentSet === setCount && setCount === 4) ? 3 : currentSet,
    });
  }

  createList(newListTitle) {
    const { lists } = this.state;
    let titleAlreadyExists = false;
    lists.forEach((list) => {
      if (list.title === newListTitle) {
        titleAlreadyExists = true;
      }
    });
    if (!titleAlreadyExists) {
      const newList = {
        title: newListTitle,
        count: 1,
        thumbnailUrl: 'https://zennearby.s3-us-west-1.amazonaws.com/20.webp',
        listings: [],
      };
      lists.push(newList);
      this.setState({
        lists,
      });
      this.markListingAsSaved(lists.length);
    }
  }

  designateListingToSave(id) {
    this.setState({
      listingToMarkSaved: id,
    });
  }

  markListingAsSaved(listIndex) {
    const { listings, listingToMarkSaved } = this.state;
    const newListings = listings.map((listing) => {
      if (listing.listingId === listingToMarkSaved) {
        listing.savedList = listIndex;
      }
      return listing;
    });
    this.setState({
      listings: newListings,
    });
  }

  removeFromList(listingId, listIndex) {
    const { lists, listings } = this.state;
    const newLists = lists.map((list, i) => {
      if (i === listIndex) {
        list.count -= 1;
      }
      return list;
    });
    const newListings = listings.map((listing) => {
      if (listing.listingId === listingId) {
        listing.savedList = -1;
      }
      return listing;
    });
    this.setState({
      lists: newLists,
      listings: newListings,
    });
  }

  toggleListsModal() {
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
        {showListsModal ? <ListsModal lists={lists} toggleListsModal={this.toggleListsModal} addToList={this.addToList} markListingAsSaved={this.markListingAsSaved} createList={this.createList} /> : ''}
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
                toggleListsModal={this.toggleListsModal}
                designateListingToSave={this.designateListingToSave}
                removeFromList={this.removeFromList}
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
