pragma solidity >=0.5.0;

contract Marketplace {
    //Todo: Biến dùng để kiểm thử.
    string public name;

    //Todo: Khởi tạo cấu trúc sản phẩm.
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        bool purchased;
    }

    //Todo: Biến đếm số sản phẩm có trên kệ.
    uint256 public productCount = 0;
    //Todo: "Kệ" chứa sản phẩm.
    mapping(uint256 => Product) public products;

    //Todo: Con trỏ lớp - Hàm khởi tạo lớp.
    constructor() public {
        name = "Eth Marketplace";
    }

    //Todo: Định nghĩa sự kiện "Thêm sản phẩm".
    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    //Todo: Hàm thêm sản phẩm lên kệ.
    function createProduct(string memory _name, uint256 _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount++;
        // Create the product
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            false
        );
        // Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    //Todo: Định nghĩa sự kiện "Mua sản phẩm".
    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    //Todo: Hàm mua sản phẩm có ở trên kệ.
    function purchaseProduct(uint256 _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased already
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit ProductPurchased(
            productCount,
            _product.name,
            _product.price,
            msg.sender,
            true
        );
    }
}
