class Product {
  title = "def";
  id;
  description;
  price;
  constructor(title, id, desc, price) {
    this.title = title;
    this.id = id;
    this.description = desc;
    this.price = price;
  }
}
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    }
  }
  render() {}
  createRootElement(tag, cssClass, attribute) {
    console.log(tag, cssClass, attribute);
    const rootElement = document.createElement(tag);
    if (cssClass) {
      rootElement.classList = cssClass;
    }
    if (attribute && attribute.length > 0) {
      for (const attr of attribute) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}
class ShoppingCart extends Component {
  items = [];
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: ${this.totalAmount.toFixed(
      2
    )}$</h2>`;
  }
  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => {
      console.log(curItem.price);
      return prevValue + curItem.price;
    }, 0);
    return sum;
  }
  constructor(renderHookId) {
    super(renderHookId);
  }
  addProduct(product) {
    const updateItems = [...this.items];
    updateItems.push(product);
    this.cartItems = updateItems;
  }
  orderProduct() {
    console.log("Ordering");
    console.log(this.items);
  }
  render() {
    const cartE = this.createRootElement(
      "section",
      "flex-1 p:2 sm:p-6 dark:bg-slate-800"
    );
    cartE.innerHTML = `
    <h2>Total: ${5}$</h2>
    <button>Order</button>
    `;
    const orderBtn = cartE.querySelector("button");
    //essa arrow func funciona como um .bind(), ela remove o link do this com o btn nesse caso
    orderBtn.addEventListener("click", this.orderProduct.bind(this));
    this.totalOutput = cartE.querySelector("h2");
  }
}
class ProductList extends Component {
  // essa hash deixa a prop privada a essa instância  #prod = []

  prod = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchData();
  }
  fetchData() {
    this.prod = [
      new Product("pillow", "15", "some nice pillow", 500),
      new Product("mouse", "5", "some mouse", 300),
      new Product("bed", "8", "some bed", 200),
      new Product("carpet", "60", "some carpet", 150),
      new Product("water", "1", "some water", 600),
    ];
    this.renderProduct();
  }
  renderProduct() {
    for (const product of this.prod) {
      new SingleProduct(product, "prod-list");
    }
  }
  render() {
    this.createRootElement(
      "ul",
      "list-disc hover:list-disc list-[upper-roman]",
      [new ElementAttribute("id", "prod-list")]
    );
    if (this.prod && this.prod.length > 0) {
      this.renderProduct();
    }
  }
}
class SingleProduct extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    App.addProductToCart(this.product);
  }
  render() {
    const list = this.createRootElement("li", "flex flex-col");

    list.innerHTML = `
      <div id="container" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <p>${this.product.title}</p>
      <p>${this.product.price}$</p>
      <p>${this.product.id}</p>
      <p>${this.product.description}</p>
      </div>
      `;
    const btn = document.createElement("button");
    btn.classList =
      "inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none";
    btn.textContent = "add cart";
    list.append(btn);
    btn.addEventListener("click", this.addToCart.bind(this));
  }
}

class Shop extends Component {
  constructor() {
    super();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    console.log(shop);
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
