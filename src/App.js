import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id: "",
      name: "",
      description: "",
      price: "",
      quantity: ""
    };
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: "/api/product"
    }).then(res => {
      this.setState({
        products: res.data
      });
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onAdd() {
    alert("Thêm thành công");
    const { name, description, price, quantity } = this.state;
    const addForm = document.getElementById("addForm");
    const data = {
      name,
      description,
      price,
      quantity
    };
    axios({
      method: "POST",
      url: "/api/product",
      data
    }).then(res => {
      const { name, description, price, quantity } = res.data;
      this.setState({
        name,
        description,
        price,
        quantity
      });
      addForm.style.display = "none";
    });
  }

  onDelete(id) {
    axios({
      method: "DELETE",
      url: `/api/product/${id}`
    });
    alert("Xóa thành công");
  }

  onOpenUpdateForm(id) {
    axios({
      method: "GET",
      url: `/api/product/${id}`
    }).then(res => {
      console.log("re123", res);
      const { name, description, price, quantity } = res.data;
      this.setState({
        id,
        name,
        description,
        price,
        quantity
      });
    });
    const updateForm = document.getElementById("updateForm");
    const updateTitleForm = document.getElementById("updateTitleForm");
    updateForm.style.display = "block";
    updateTitleForm.style.display = "inline-block";
  }

  onUpdate() {
    const { id } = this.state;
    const { name, description, price, quantity } = this.state;
    const data = {
      name,
      description,
      price,
      quantity
    };    
    axios({
      method: "PUT",
      url: `/api/product/${id}`,
      data
    });
    alert("Sửa thành công");
  }

  onOpenAddForm() {
    const addForm = document.getElementById("addForm");
    addForm.style.display = "block";
  }

  render() {
    const { products, name, description, price, quantity } = this.state;
    return (
      <div style={{ marginLeft: "300px" }}>
        <a
          style={{ marginTop: -3 }}
          onClick={() => {
            this.onOpenAddForm();
          }}
          name=""
          id=""
          class="btn btn-primary"
          href="#"
          role="button"
        >
          Thêm sản phẩm
        </a>
        <table id="addForm" style={{ display: "none", marginTop: 20 }}>
          <tr>
            <td>
              <label>Tên sản phẩm: </label>
            </td>
            <td>
              <input type="text" name="name" onChange={e => this.onChange(e)} />
            </td>
          </tr>

          <tr>
            <td>
              <label>Mô tả: </label>
            </td>
            <td>
              <input
                type="text"
                name="description"
                onChange={e => this.onChange(e)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Giá: </label>
            </td>
            <td>
              <input
                type="text"
                name="price"
                onChange={e => this.onChange(e)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Số lượng: </label>
            </td>
            <td>
              <input
                type="number"
                name="quantity"
                onChange={e => this.onChange(e)}
              />
            </td>
          </tr>
          <br />
          <a
            onClick={() => this.onAdd()}
            name=""
            id=""
            class="btn btn-info"
            href=""
            role="button"
          >
            Lưu
          </a>
        </table>

        <span
          id="updateTitleForm"
          class="badge badge-primary"
          style={{
            fontSize: 20,
            marginLeft: 760,
            marginTop: 10,
            display: "none"
          }}
        >
          {" "}
          Sửa sản phẩm
        </span>
        <table
          id="updateForm"
          style={{
            display: "block",
            marginTop: 20,
            marginLeft: 900,
            display: "none"
          }}
        >
          <tr>
            <td>
              <label>Tên sản phẩm: </label>
            </td>
            <td>
              <input
                value={name}
                type="text"
                name="name"
                onChange={e => this.onChange(e)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Mô tả: </label>
            </td>
            <td>
              <input
                value={description}
                type="text"
                name="description"
                onChange={e => this.onChange(e)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Giá: </label>
            </td>
            <td>
              <input
                value={price}
                type="text"
                name="price"
                onChange={e => this.onChange(e)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <label>Số lượng: </label>
            </td>
            <td>
              <input
                value={quantity}
                type="number"
                name="quantity"
                onChange={e => this.onChange(e)}
              />
            </td>
          </tr>
          <br />
          <a
            onClick={() => this.onUpdate()}
            name=""
            id=""
            class="btn btn-info"
            href=""
            role="button"
          >
            Lưu
          </a>
        </table>
        <h1
          style={{
            fontWeight: "bold",
            marginBottom: "30px",
            marginLeft: "400px",
            marginTop: "100px",
            color: "red"
          }}
        >
          Danh sách sản phẩm
        </h1>
        <table border="2" cellPadding="10" style={{ fontSize: "35px" }}>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
          {products.map(product => {
            return (
              <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price} VNĐ</td>
                <td>{product.quantity}</td>
                <td>
                  <a
                    onClick={() => this.onOpenUpdateForm(product.id)}
                    name=""
                    id=""
                    class="btn btn-warning"
                    href="#"
                    role="button"
                    style={{ marginRight: 15, marginLeft: 30 }}
                  >
                    Sửa
                  </a>
                  <a
                    onClick={() => this.onDelete(product.id)}
                    name=""
                    id=""
                    class="btn btn-danger"
                    href=""
                    role="button"
                  >
                    Xóa
                  </a>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

export default App;
