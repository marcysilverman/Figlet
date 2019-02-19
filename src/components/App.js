import React, { PureComponent, Fragment } from 'react';
import figlet from 'figlet';

export default class App extends PureComponent{

  state = {
    count: 0,
    text: '',
    formatedText: ''
  }
  
  formatText = () => {
    const font = 'Ghost';
    figlet.text(this.state.text,
      { font },
      (err, formatedText) => {
        if(err) return console.error(err);

        this.setState({ formatedText });
      });
  }
  
  handleClick = () => { 
    const { count } = this.state;
    this.setState({ count: count + 1 }, () => {
      console.log(this.state.count, 'Clicked');
    });
  };
  

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      this.formatText();
    });
  }
  render() {
    const { text, formatedText } = this.state;
    return (
      <Fragment> 
        <form> 
          <input type="text" name="text" value={text} onChange={this.handleChange}/>
        </form>
        <div>
          <h1>{text} </h1>
          <h1> <pre>{formatedText}</pre></h1>
          <button onClick={this.handleClick}> Enter </button>
        </div>
      </Fragment>
    );
  }
}

