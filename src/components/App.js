import React, { PureComponent, Fragment } from 'react';
import figlet from 'figlet';
import DomToImage from 'dom-to-image';
import fileSaver from 'file-saver';



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
    const fontOptions = ['Weird', 'Chunky', 'Swan', 'Basic', 'LiL Devil'].map(font => {
      return <option key={font} value={font}> {font} </option>;
    });
    return (
      <Fragment> 
        <form onSubmit={this.textToImage}> 
          <select name="font" onChange={this.handleChange} value={font} > {fontOptions} </select>
          <input ref={this.imageInput} type="text" name="text" value={text} onChange={this.handleChange}/>
          <button type="submit"> Create Image</button> 
          <div>
            <h1>{text} </h1>
            <h1 ref={this.formattedTextRef}> <pre>{formatedText}</pre></h1>
            {img && <img src={img} />}
            <button onClick={this.saveFile}> Save Image </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

