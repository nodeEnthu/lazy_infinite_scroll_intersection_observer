import React from "react";
import "../styles/components/visible-area.scss";
import ReactDOM from "react-dom";

class VisibleArea extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentImageindex: 1,
    };

    this.intersectionCallback  =  this.intersectionCallback.bind(this);
    this.configureInsertedElement  =  this.configureInsertedElement.bind(this);
  }
  currentScrollPosition = 0;

  intersectionCallback(entries, observer) {
    const self = this;
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        // append the current row in visible area
        const divToAppendReactElement = document.createElement('div');
        divToAppendReactElement.id = `dom${this.currentScrollPosition}`;
        const newElement = ReactDOM.render(self.configureInsertedElement(), divToAppendReactElement);
        const parentNode = entry.target.parentNode;
        const target = document.getElementById(`end-sentinel${this.currentScrollPosition}`);
        // append the element just before the sentinel
        parentNode.insertBefore(newElement, target);
        //unobserve the current seltinel
        observer.unobserve(entry.target);
        // set the new intersection observers
        console.log(this.currentScrollPosition);
        this.currentScrollPosition = this.currentScrollPosition + 1;
        target.id = `end-sentinel${this.currentScrollPosition}`;
        this.lazyLoadImageRow();
        
      }
    })
  }

  lazyLoadImageRow() {
    let observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
  
    const target = document.getElementById(`end-sentinel${this.currentScrollPosition}`);
    const observer = new IntersectionObserver(this.intersectionCallback, observerOptions);
    observer.observe(target);
  }

  componentDidMount() {
    this.lazyLoadImageRow();
  }

  configureInsertedElement() {
    const { currentImageindex } = this.state;
    const firstImageInRow = currentImageindex + (this.currentScrollPosition * 3);
    return <React.Fragment>
      <div className="row">
        <div className="col-1-3 image-no-show-wrapper">
          <img className="image" src={`https://picsum.photos/200/200?random=${firstImageInRow}.jpg`}/>
        </div>
        <div className="col-1-3 image-no-show-wrapper">
          <img className="image" src={`https://picsum.photos/200/200?random=${firstImageInRow + 1}.jpg`}/>
        </div>
        <div className="col-1-3 image-no-show-wrapper">
          <img className="image" src={`https://picsum.photos/200/200?random=${firstImageInRow + 2}.jpg`}/>
        </div>
      </div>
    </React.Fragment>
  }

  render() {
    return <div className="container">
          <div id= "end-sentinel0"></div>
      </div>
  }
}

export default VisibleArea;