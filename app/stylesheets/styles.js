'use strict';

export const textInputStyle = {
  display: 'block',
  color: '#333333',
  fontSize: '16px',
  margin: 5
};

export const tripsListItemStyle = {
  backgroundColor: '#eeeeee',
  border: '1px solid #333333',
  margin: 5,
  padding: 5,
  width: 300
};

export const tripPageStyles = {
  titleSection: {
    textAlign: 'center'
  },
  h1: {
    fontSize: 48
  }
}

export const tripPageIdeaStyles = {
  inputSection: {
    marginBottom: 10
  },
  idea: {
    backgroundColor: '#fdfdfd'
  },
  info: {
    minHeight: 100
  },
  photo: {
    float: 'right',
    marginLeft: 10,
    width: '33%',
    height: 100,
    objectFit: 'cover',
    border: '1px solid #eeeeee'
  },
  name: {
    fontWeight: 'bold'
  },
  address: {
    fontSize: 12,
    color: '#999999'
  },
  comment: {
    fontStyle: 'italic',
    marginTop: 10
  },
  searchBox: {
    display: 'inline',
    width: '80%',
    marginBottom: 10
  },
  commentBox: {
    display: 'inline',
    width: '100%',
    marginBottom: 10
  },
  searchBoxButton: {
    float: 'right'
  },
  removeButton: {
    div: {
      backgroundColor: 'rgba(255,255,255,0.0)',
      cursor: 'pointer'
    },
    glyph: {
      borderRadius: 22,
      backgroundColor: '#ffffff',
      fontSize: 22,
      float: 'right',
      top: -8,
      left: 8
    }
  }
};
