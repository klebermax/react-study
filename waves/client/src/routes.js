import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';
import Home from './components/Home';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';
import Shop from './components/Shop';
import ProductDetail from './components/Product';

import ResetUser from './components/Reset_User';
import ResetPwd from './components/Reset_User/reset_pwd';

import UserDashboard from './components/Dashboard';
import AddProduct from './components/Dashboard/Admin/add_product';
import UserCart from './components/Dashboard/cart';
import ManageCategories from './components/Dashboard/Admin/manage_categories';
import UpdateProfile from './components/Dashboard/update_profile';
import ManageSite from './components/Dashboard/Admin/manage_site';
import AddFile from './components/Dashboard/Admin/add_file';

import PageNotFound from './components/utils/page_not_found';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />

        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />

        <Route path="/product_detail/:id" exact component={Auth(ProductDetail, null)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/reset_user" exact component={Auth(ResetUser, false)} />
        <Route path="/reset_password/:token" exact component={Auth(ResetPwd, false)} />

        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={Auth(PageNotFound)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
