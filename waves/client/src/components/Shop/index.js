import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { frets, price } from '../utils/Form/fixed_categories';

import { connect } from 'react-redux';
import { getProductsToShop, getBrands, getWoods } from '../../actions/products_actions';

import CollapseCheckbox from '../utils/collapse_checkbox';
import CollapseRadio from '../utils/collapse_radio';

import LoadMoreCards from './loadMoreCards';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

class Shop extends Component {
  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: []
    }
  };

  componentDidMount() {
    const { skip, limit, filters } = this.state;

    this.props.getBrands();
    this.props.getWoods();

    this.props.getProductsToShop(skip, limit, filters);
  }

  handlePrice = value => {
    const prices = price;
    let array = [];

    prices.forEach(item => {
      if (item._id === parseInt(value, 10)) {
        array = item.array;
      }
    });

    return array;
  };

  handleFilters = (filters, category) => {
    let newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      const priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.setState({ filters: newFilters });
    this.showFilteredResults(newFilters);
  };

  showFilteredResults = filters => {
    this.props.getProductsToShop(0, this.state.limit, filters).then(() => {
      this.setState({ skip: 0 });
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props.getProductsToShop(skip, this.state.limit, this.state.filters, this.props.products.toShop).then(() => {
      this.setState({ skip });
    });
  };

  handleGrid = () => {
    this.setState({ grid: !this.state.grid ? 'grid_bars' : '' });
  };

  render() {
    const products = this.props.products;

    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={filters => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={filters => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckbox
                initState={false}
                title="Woods"
                list={products.woods}
                handleFilters={filters => this.handleFilters(filters, 'wood')}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div className={`grid_btn ${this.state.grid ? '' : 'active'}`} onClick={() => this.handleGrid()}>
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div className={`grid_btn ${!this.state.grid ? '' : 'active'}`} onClick={() => this.handleGrid()}>
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <LoadMoreCards
                grid={this.state.grid}
                limit={this.state.limit}
                size={products.toShopSize}
                products={products.toShop}
                loadMore={() => this.loadMoreCards()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(
  mapStateToProps,
  { getBrands, getWoods, getProductsToShop }
)(Shop);
