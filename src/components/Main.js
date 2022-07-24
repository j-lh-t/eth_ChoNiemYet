import React, { Component } from "react";

class Main extends Component {
    render() {
        return (
            <div id="content">
                <div className="BuyPr">
                    <h2>KỆ SẢN PHẨM</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Tài khoản sở hữu</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="productList">
                            {this.props.products.map((product, key) => {
                                return (
                                    <tr key={key}>
                                        <th scope="row">
                                            {product.id.toString()}
                                        </th>
                                        <td>{product.name}</td>
                                        <td>
                                            {window.web3.utils.fromWei(
                                                product.price.toString(),
                                                "Ether"
                                            )}{" "}
                                            Eth
                                        </td>
                                        <td>{product.owner}</td>
                                        <td>
                                            {!product.purchased ? (
                                                <button
                                                    name={product.id}
                                                    value={product.price}
                                                    onClick={(event) => {
                                                        this.props.purchaseProduct(
                                                            event.target.name,
                                                            event.target.value
                                                        );
                                                    }}
                                                >
                                                    Mua
                                                </button>
                                            ) : null}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <h1> \^/^\^/^\^/^\^/^\^/^\^/ </h1>
                <div className="AddPr">
                    <h1>THÊM MẶT HÀNG</h1>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const name = this.productName.value;
                            const price = window.web3.utils.toWei(
                                this.productPrice.value.toString(),
                                "Ether"
                            );
                            this.props.createProduct(name, price);
                        }}
                    >
                        <div className="form-group mr-sm-2">
                            <input
                                id="productName"
                                type="text"
                                ref={(input) => {
                                    this.productName = input;
                                }}
                                className="form-control"
                                placeholder="Nhập tên sản phẩm...."
                                required
                            />
                        </div>
                        <div className="form-group mr-sm-2">
                            <input
                                id="productPrice"
                                type="text"
                                ref={(input) => {
                                    this.productPrice = input;
                                }}
                                className="form-control"
                                placeholder="Nhập giá sản phẩm....(eth)"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Main;
