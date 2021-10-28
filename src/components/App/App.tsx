import "components/App/App.css";
import MainLayout from "components/MainLayout/MainLayout";
import PageProductImport from "components/pages/admin/PageProductImport/PageProductImport";
import PageCart from "components/pages/PageCart/PageCart";
import PageOrder from "components/pages/PageOrder/PageOrder";
import PageOrders from "components/pages/PageOrders/PageOrders";
import PageProductForm from "components/pages/PageProductForm/PageProductForm";
import PageProducts from "components/pages/PageProducts/PageProducts";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function saveLocalstorage() {
  const authorization_token = btoa(`belspirit:TEST_PASSWORD`);
  localStorage.setItem("authorization_token", authorization_token);
}

function App() {
  React.useEffect(saveLocalstorage, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainLayout>
            <Route exact path="/">
              <PageProducts />
            </Route>
            <Route exact path={["/admin/product-form/:id", "/admin/product-form"]}>
              <PageProductForm />
            </Route>
            <Route exact path="/cart">
              <PageCart />
            </Route>
            <Route exact path="/admin/orders">
              <PageOrders />
            </Route>
            <Route exact path="/admin/order/:id">
              <PageOrder />
            </Route>
            <Route exact path="/admin/products">
              <PageProductImport />
            </Route>
          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
