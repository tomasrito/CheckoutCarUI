import React from 'react';
import Product from './Product';
import Cart from './Cart';

class ShoppingCart extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = { items: [], cart: [] };

    this.getItems = this.getItems.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    
  }

  componentDidMount() {
    this.getInitialState();
  }

  getItems() {
    // some request here
    return [{id: 1, name: "Cool Banana", price: 2.49},
            {id: 2, name: "Epic Apple", price: 3.29},
            {id: 1, name: "Cool Banana", price: 2.49},
            {id: 2, name: "Epic Apple", price: 3.29},
            {id: 1, name: "Cool Banana", price: 2.49},
            {id: 2, name: "Epic Apple", price: 3.29},
            {id: 3, name: "Awesome Grape", price: 0.49}];
  }

  getInitialState() {
    let items = this.getItems();
    this.setState({items: items, cart: []});    
  }

  clearCart() {
    fetch('http://localhost:8080/ShoppingCart/ClearItems', {
      method: 'post'
    })
    this.setState({
      cart: []
    });
  }


  // leaving this without validating that item exists to prove that the backend handles this exception!
  removeFromCart(item) {
    fetch('http://localhost:8080/ShoppingCart/RemoveItem/'+item.id, {
      method: 'post'
    });
    var updatedCart = this.state.cart.filter(cartItem => cartItem.name != item.name);  
    
    this.setState({
      cart: updatedCart
    });
  }

  changeQuantity(item, quantity) {
    fetch('http://localhost:8080/ShoppingCart/ChangeQuantity/'+item.id+'/'+quantity, {
      method: 'post'
    });
    var found = false;
    var updatedCart = this.state.cart.map((cartItem) => {
      if (cartItem.name === item.name) {
        found = true;
        cartItem.quantity = quantity;
        return cartItem;
      } else {
        return cartItem;
      }
    });
    
    if (!found) { 
      updatedCart.push({id: item.id, name: item.name, price: item.price, quantity: quantity}) 
    }
    
    this.setState({
      cart: updatedCart
    });
  }

  addToCart(item) {   
    var found = false;
    var updatedCart = this.state.cart.map((cartItem) => {
      if (cartItem.name === item.name) {
        let quantity = cartItem.quantity+1;
        fetch('http://localhost:8080/ShoppingCart/ChangeQuantity/'+item.id+'/'+quantity, {
        method: 'post'
        });
        found = true;
        cartItem.quantity = quantity;
        return cartItem;
      } else {
        return cartItem;
      }
    });
    
    if (!found) { 
      fetch('http://localhost:8080/ShoppingCart/AddItem/'+item.id+'/1', {
         method: 'post'
        });
      updatedCart.push({id: item.id, name: item.name, price: item.price, quantity: 1}) 
    }
    
    this.setState({
      cart: updatedCart
    });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Cart cart={this.state.cart} clearCart={this.clearCart} />
        </nav>
          <div> 
            <h3>Products</h3> 
            {this.state.items.map((item) => {
              return <Product details={item} addToCart={this.addToCart} removeFromCart={this.removeFromCart} changeQuantity={this.changeQuantity} />
            })}
          </div>
      </div>
    );
  }
}


export default ShoppingCart;

