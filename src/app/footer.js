import React, {Component} from 'react';

const styles = {
  footer: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#1f1f1f',
    textAlign: 'center',
    color: 'white'
  }
};

export class Footer extends Component {
  render() {
    return (
      <footer style={styles.footer}>
        A game by&nbsp;
        <a href="https://bit.ly/suryavanshi" target="_blank" rel="noopener noreferrer">
          Aniket Suryavanshi
        </a>
      </footer>
    );
  }
}
