import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <>
      <div style={{ display: "flex", height: "100%", minHeight: "100vh" }}>
        <Sidebar>
          <Menu>
            <MenuItem
              style={{ fontWeight: "bold" }}
              component={<Link to="/" />}
            >
              <img
                src="/assets/logo-TRP.jpg"
                alt="Logo"
                style={{ width: "80px", height: "40px" }}
              />
            </MenuItem>

            <MenuItem component={<Link to="/admin/dashboard" />}>
              Dashboard
            </MenuItem>

            <SubMenu label="Category">
              <MenuItem component={<Link to="/admin/category/list_category" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/category/add_category" />}>
                Add New +
              </MenuItem>
            </SubMenu>
            <SubMenu label="Stores">
              <MenuItem component={<Link to="/admin/stores/add_store" />}>
                Add New +
              </MenuItem>
              <MenuItem component={<Link to="/admin/stores/list_stores" />}>
                List
              </MenuItem>
            </SubMenu>
            <SubMenu label="Products">
              <MenuItem component={<Link to="/admin/product/add_product" />}>
                Add New +
              </MenuItem>
              <MenuItem component={<Link to="/admin/product/list_products" />}>
                List
              </MenuItem>
              {/* <MenuItem component={<Link to="/admin/product/detail_product" />}>
                Detail
              </MenuItem> */}
            </SubMenu>
            <SubMenu label="Product Allocation">
              <MenuItem
                component={<Link to="/admin/products_allocation/add_new" />}
              >
                Add New +
              </MenuItem>
            </SubMenu>
            <SubMenu label="Orders">
              <MenuItem component={<Link to="/admin/order/list_orders" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/order/cart" />}>
                Cart
              </MenuItem>
            </SubMenu>
            <SubMenu label="Size">
              <MenuItem component={<Link to="/admin/size/list_size" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/size/add_size" />}>
                Add New +
              </MenuItem>
            </SubMenu>
            <SubMenu label="Color">
              <MenuItem component={<Link to="/admin/color/list_color" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/color/add_color" />}>
                Add New +
              </MenuItem>
            </SubMenu>
            <SubMenu label="Vandor">
              <MenuItem component={<Link to="/admin/vandor/list_vandor" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/vandor/add_vandor" />}>
                Add New +
              </MenuItem>
            </SubMenu>
            <SubMenu label="Purchase">
              <MenuItem component={<Link to="/admin/purchase/list_purchase" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/purchase/add_purchase" />}>
                Add New +
              </MenuItem>
            </SubMenu>
            <SubMenu label="Payment">
              <MenuItem component={<Link to="/admin/payment/list_payment" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/payment/add_payment" />}>
                Add New +
              </MenuItem>
            </SubMenu>

            <SubMenu label="Sale Order">
              <MenuItem
                component={<Link to="/admin/saleorder/list_saleorder" />}
              >
                List
              </MenuItem>
              <MenuItem
                component={<Link to="/admin/saleorder/add_saleorder" />}
              >
                Add New +
              </MenuItem>
              {/* <MenuItem component={<Link to="/admin/saleorder/detail_saleorder" />}              >
                Detail
              </MenuItem> */}
            </SubMenu>

            <SubMenu label="Gender">
              <MenuItem component={<Link to="/admin/gender/listGender" />}>
                List
              </MenuItem>
              <MenuItem component={<Link to="/admin/gender/addGender" />}>
                Add New +
              </MenuItem>
            </SubMenu>

            <SubMenu label="Report Card">
              <MenuItem  component={<Link to="/admin/report_card/saleorderreport" />}>            
                Sale Order Report
              </MenuItem>

              <MenuItem component={<Link to="/admin/report_card/purchaseorderreport" />}>
                Purchase Order Report
              </MenuItem>
            </SubMenu>

            <SubMenu label="Exchange">
              <MenuItem  component={<Link to="/admin/exchange/exchange" />}>            
                Exchange
              </MenuItem>

              <MenuItem component={<Link to="/admin/exchange/return" />}>
               Return
              </MenuItem>
            </SubMenu>

            <MenuItem component={<Link to="/admin/other" />}> Others </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default AdminSidebar;
