import React from 'react';

class Cart extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.clearCart = this.clearCart.bind(this);
    }
  
 

    clearCart() {
      this.props.clearCart();
    }
  
    render() {
      return (
        <div className="Cart"  >
          <h2>Cart</h2>
          <div>
          {this.props.cart.length > 0 ? this.props.cart.map((item) => {
            return <p>{item.name}{item.quantity > 1 ? <span> {item.quantity}</span> : ''}</p> }) : <p>Empty</p>}
          </div>
          <button onClick={this.clearCart}>Clear</button>
        </div>
      );
    }
  }
  
export default Cart;  