import React from "react";
import Forbidden from "./defaultPages/Forbidden.js";
import CustomRoute from "./CustomRoute";
import { USER_ROLE } from "./constants.js";
import Login from "./defaultPages/Login.js";
import RegistrationForm from "./defaultPages/RegistrationForm.js";
import IndexPage from "./components/views/IndexPage.js";
import ErrorPage from "./defaultPages/ErrorPage.js";
import AddCategory from "./components/admin/adminLayout/rightsidecontentPage/category/Add/AddCategory.js";
import ListCategory from "./components/admin/adminLayout/rightsidecontentPage/category/List/ListCategory.js";
import Other from "./components/admin/adminLayout/rightsidecontentPage/Other.js";
import AdminLayout from "./components/admin/adminLayout/AdminLayout.js";
import Dashboard from "./components/admin/adminLayout/rightsidecontentPage/dashboard/Dashboard.js";
import Orderlist from "./components/admin/adminLayout/rightsidecontentPage/orders/List/Orderlist.js";
import Cart from "./components/admin/adminLayout/rightsidecontentPage/orders/cart/Cart.js";
import ListStores from "./components/admin/adminLayout/rightsidecontentPage/stores/List/ListStores.js";
import AddStore from "./components/admin/adminLayout/rightsidecontentPage/stores/Add/AddStore.js";
import ListProduct from "./components/admin/adminLayout/rightsidecontentPage/products/List/ListProduct.js";
import AddProduct from "./components/admin/adminLayout/rightsidecontentPage/products/Add/AddProduct.js";
import DetailProduct from "./components/admin/adminLayout/rightsidecontentPage/products/Detail/DetailProduct.js";
import Addsize from "./components/admin/adminLayout/rightsidecontentPage/size/Add/Addsize.js";
import Listsize from "./components/admin/adminLayout/rightsidecontentPage/size/List/Listsize.js";
import Addcolor from "./components/admin/adminLayout/rightsidecontentPage/color/Add/Addcolor.js";
import Listcolor from "./components/admin/adminLayout/rightsidecontentPage/color/List/Listcolor.js";
import Addvandor from "./components/admin/adminLayout/rightsidecontentPage/vandor/Add/Addvandor.js";
import Listvandor from "./components/admin/adminLayout/rightsidecontentPage/vandor/List/Listvandor.js";
import AddPurchase from "./components/admin/adminLayout/rightsidecontentPage/purchase/Add/AddPurchase.js";
import ListPurchase from "./components/admin/adminLayout/rightsidecontentPage/purchase/List/ListPurchase.js";
import AddPayment from "./components/admin/adminLayout/rightsidecontentPage/payment/Add/AddPayment.js";
import ListPayment from "./components/admin/adminLayout/rightsidecontentPage/payment/List/ListPayment.js";
import AddSaleOrder from "./components/admin/adminLayout/rightsidecontentPage/saleorder/Add/AddSaleOrder.js";
import ListSaleOrders from "./components/admin/adminLayout/rightsidecontentPage/saleorder/List/ListSaleOrder.js";
import AddProductAllocation from "./components/admin/adminLayout/rightsidecontentPage/product allocation/Add/AddProductAllocation.js";
import ListGender from "./components/admin/adminLayout/rightsidecontentPage/Gender/ListGender/ListGender.js";
import AddGender from "./components/admin/adminLayout/rightsidecontentPage/Gender/AddGender/AddGender.js";
import SaleOrderReport from "./components/admin/adminLayout/rightsidecontentPage/report card/SaleOrderReport.js";
import PurchaseOrderReport from "./components/admin/adminLayout/rightsidecontentPage/report card/PurchaseOrderReport.js";
import DetailSaleOrder from "./components/admin/adminLayout/rightsidecontentPage/saleorder/Detail/DetailSaleOrder.js";
import DetailPurchase from "./components/admin/adminLayout/rightsidecontentPage/purchase/Detail/DetailPurchase.js";
import Exchange from "./components/admin/adminLayout/rightsidecontentPage/Exchange/Exchange.js";
import Return from "./components/admin/adminLayout/rightsidecontentPage/Exchange/Return.js";

const routesConfig = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
  {
    path: "/register",
    element: <RegistrationForm />,
  },
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/other",
    element: <Other />,
  },
  {
    element: (
      <CustomRoute element={<AdminLayout />} allowedRoles={[USER_ROLE.Admin]} />
    ),
    children: [
      {
        path: "/admin/*",
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "category",
            children: [
              {
                path: "list_category",
                element: <ListCategory />,
              },
              {
                path: "add_category",
                element: <AddCategory />,
              },
            ],
          },
          {
            path: "order",
            children: [
              {
                path: "list_orders",
                element: <Orderlist />,
              },
              {
                path: "cart",
                element: <Cart />,
              },
            ],
          },
          {
            path: "stores",
            children: [
              {
                path: "list_stores",
                element: <ListStores />,
              },
              {
                path: "add_store",
                element: <AddStore />,
              },
            ],
          },
          {
            path: "products_allocation",
            children: [
              {
                path: "add_new",
                element: <AddProductAllocation />,
              },
            ],
          },
          {
            path: "product",

            children: [
              {
                path: "list_products",
                element: <ListProduct />,
              },
              {
                path: "add_product",
                element: <AddProduct />,
              },
              {
                path: "detail_product/:productDetail",
                element: <DetailProduct />,
              },
            ],
          },
          {
            path: "size",

            children: [
              {
                path: "list_size",
                element: <Listsize />,
              },
              {
                path: "add_size",
                element: <Addsize />,
              },
            ],
          },
          {
            path: "color",

            children: [
              {
                path: "list_color",
                element: <Listcolor />,
              },
              {
                path: "add_color",
                element: <Addcolor />,
              },
            ],
          },
          {
            path: "vandor",

            children: [
              {
                path: "list_vandor",
                element: <Listvandor />,
              },
              {
                path: "add_vandor",
                element: <Addvandor />,
              },
            ],
          },
          {
            path: "purchase",

            children: [
              {
                path: "list_purchase",
                element: <ListPurchase />,
              },
              {
                path: "add_purchase",
                element: <AddPurchase />,
              },
              {
                path: "detail_purchase/:purchaseDetail",
                element: <DetailPurchase />,
              },
            ],
          },
          {
            path: "payment",

            children: [
              {
                path: "list_payment",
                element: <ListPayment />,
              },
              {
                path: "add_payment",
                element: <AddPayment />,
              },
            ],
          },
          {
            path: "saleorder",

            children: [
              {
                path: "list_saleorder",
                element: <ListSaleOrders />,
              },
              {
                path: "add_saleorder",
                element: <AddSaleOrder />,
              },
              {
                path: "detail_saleorder/:saleOrderDetail",
                element: <DetailSaleOrder />,
              },
            ],
          },
          {
            path: "gender",

            children: [
              {
                path: "listGender",
                element: <ListGender />,
              },
              {
                path: "addGender",
                element: <AddGender />,
              },
            ],
          },
          {
            path: "report_card",

            children: [
              {
                path: "saleorderreport",
                element: <SaleOrderReport />,
              },
              {
                path: "purchaseorderreport",
                element: <PurchaseOrderReport />,
              },
            ],
          },
          {
            path: "exchange",

            children: [
              {
                path: "exchange",
                element: <Exchange />,
              },
              {
                path: "return",
                element: <Return />,
              },
            ],
          },
          {
            path: "other",
            element: <Other />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
];

export default routesConfig;
