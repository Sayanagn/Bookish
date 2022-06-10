import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import RegCustomer from './components/RegCustomer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminProfile from './components/AdminProfile';
import AllCustomers from './components/AllCustomers';
import CustomerLogin from './components/CustomerLogin';
import AddProduct from './components/AddProduct';
import MyProducts from './components/MyProducts';
import AllProduct from './components/AllProducts';
import EditProduct from './components/EditProduct';
import CustomerProfile from './components/CustomerProfile';
import MyOrders from './components/MyOrders';
import Orders from './components/Orders';
import ViewCart from './components/ViewCart';

function App() {
  return (
    <div className="App">
      <Header />      
      <BrowserRouter>
      <NavBar />
        <Switch>
          <Route component={AllProduct} path="/" exact />
          <Route component={AllProduct} path="/cats" />
          <Route component={RegCustomer} path="/register" />          
          <Route component={AdminLogin} path="/alogin" />          
          <Route component={CustomerLogin} path="/clogin" />          
          <Route component={AdminProfile} path="/aprofile" />          
          <Route component={CustomerProfile} path="/cprofile" />          
          <Route component={AllCustomers} path="/customers" />          
          <Route component={AddProduct} path="/add-product" />          
          <Route component={EditProduct} path="/edit/:prodid" />          
          <Route component={MyProducts} path="/myproducts" />          
          <Route component={MyOrders} path="/myorders" />          
          <Route component={Orders} path="/orders" />          
          <Route component={ViewCart} path="/cart" />          
        </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
