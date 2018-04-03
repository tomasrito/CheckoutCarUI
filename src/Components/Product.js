import React from 'react';

class Product extends React.Component {
  
    constructor(props, context) {
      super(props, context);
      this.addToCart = this.addToCart.bind(this);
      this.removeFromCart = this.removeFromCart.bind(this);
      this.changeQuantity = this.changeQuantity.bind(this);
    }
  
    addToCart() {
      this.props.addToCart(this.props.details);
    }
  
    removeFromCart() {
      this.props.removeFromCart(this.props.details);
    }
  
    changeQuantity(event){
      const quantity = this._name.value;
      this.props.changeQuantity(this.props.details, parseInt(quantity));
    }
    render() {
      let item = this.props.details;
      return (
        <div className="Product" >
          <p>{item.name}</p>
          <p>{item.price}</p>
          <div>
          <button onClick={this.addToCart}>Add to Cart</button>
          <button onClick={this.removeFromCart}>Remove from Cart</button>
          <form>  
            <input type="text" pattern="[0-9]*" ref={input => this._name = input} />
            <button onClick={this.changeQuantity}>New Quantity</button>
          </form>
         </div>
        </div>
      );
    }
  }

  export default Product