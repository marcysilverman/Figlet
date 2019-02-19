import React, { PureComponent, Fragment } from 'react';
import figlet from 'figlet';
import DomToImage from 'dom-to-image';
import fileSaver from 'file-saver';
import TextFormatter from './TextFormatter';
import FormatDisplay from './FormatDisplay';



export default class App extends PureComponent{
  constructor() {
    super();
    this.formattedTextRef = React.createRef();
  }
  state = {
    count: 0,
    text: '',
    formatedText: '',
    font: 'Ghost',
    img: ''
  }
  textToImage = () => {
    event.preventDefault();
    DomToImage.toPng(this.formattedTextRef.current)
      .then(img => {
        this.setState({ img });
      });
  }

  saveFile = () => {
    fileSaver.saveAs(this.state.img);
  }
  formatText = () => {
    const { font } = this.state;
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
    const { text, formatedText, font, img } = this.state;
    return (
      <Fragment> 
        <TextFormatter 
          text={text}
          font={font}
          handleChange={this.handleChange}
          textToImage={this.textToImage}
        />
        <FormatDisplay
          formattedText={formatedText}
          formattedTextRef={this.formattedTextRef}
        />
        {img && <img src={img} />}
        {img && <button onClick={this.saveFile}> Save Image </button>}  
      </Fragment>
    );
  }
}

