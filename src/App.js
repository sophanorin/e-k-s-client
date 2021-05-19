import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer.js";
import ShopScreen from "./screens/ShopScreen.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetial from "./screens/ProductDetial.js";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SigninScreen from "./screens/SigninScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import ContactScreen from "./screens/ContactScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import WishlistScreen from "./screens/WishlistScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import UnavailablePage from "./screens/UnavailablePage";
import AdminRoute from "./components/AdminRoute";
import ProductListsScreen from "./screens/ProductListsScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import CategoryListScreen from "./screens/CategoryListScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/signin" component={SigninScreen} />
        <Route path="/contact" component={ContactScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/checkout" component={CheckoutScreen} />
        <Route path="/products/:id" exact component={ProductDetial} />
        <Route path="/shop" exact component={ShopScreen} />
        <Route path="/order/:id" exact component={OrderDetailScreen} />
        <Route path="/ordershistory" component={OrderHistoryScreen} />
        <Route path="/wishlist" component={WishlistScreen} />
        <Route
          path="/product/:id/edit"
          component={ProductEditScreen}
          exact
        ></Route>
        <PrivateRoute path="/profile" component={ProfileScreen} />
        <AdminRoute
          path="/productlist"
          component={ProductListsScreen}
        ></AdminRoute>
        <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
        <AdminRoute
          path="/categorylist"
          component={CategoryListScreen}
        ></AdminRoute>
        <Route path="*" component={UnavailablePage} />
      </Switch>
      <footer id="footer" className="section footer">
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
