import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import StripeCheckoutButton from './Stripe';
import Edit from './Edit';

class Cart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cart: [],
		};
	}

	componentDidMount() {
		this.getCart();
	}

	getCart = () => {
		axios
			.get(`/api/cart/${this.props.user.cart_id}`)
			.then(res => this.setState({ cart: res.data }))
			.catch(err => console.log(err));
	};

	deleteCartItem = id => {
		axios
			.delete(`/api/cart-item/${id}`)
			.then(() => this.getCart())
			.catch(err => console.log(err));
	};

	editCartItem = (item, qty) => {
		// console.log(product);
		axios
			.put(`/api/cart-item/${item.cart_item_id}`, { qty })
			.then(results => {
				this.getCart();
			})
			.catch(err => console.log(err));
	};

	render() {
		const mappedCart = this.state.cart.map((item, i) => {
			return (
				<Edit
					item={item}
					key={i}
					editCartItem={this.editCartItem}
					deleteCartItem={this.deleteCartItem}
				/>
				// <div key={i} className="product-container">
				// 	<img src={item.image} alt={item.name} className="product-image" />
				// 	<p>{item.name}</p>
				// 	<p>{item.description}</p>
				// 	<p>${item.price}</p>

				// 	<button onClick={() => this.deleteCartItem(item.cart_item_id)}>
				// 		Remove Item
				// 	</button>
				// </div>
			);
		});
		return (
			<div>
				{mappedCart}
				<div>
					<StripeCheckoutButton />
				</div>
			</div>
		);
	}
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Cart);
