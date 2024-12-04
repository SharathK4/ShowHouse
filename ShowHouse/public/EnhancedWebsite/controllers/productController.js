// controllers/productController.js
class ProductController {
    async getProducts(req, res) {
      try {
        // Fetch products and send as JSON
        const products = await ProductModel.find();
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
      }
    }
  
    async createProduct(req, res) {
      try {
        const newProduct = new ProductModel(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(400).json({ message: 'Error creating product' });
      }
    }
  }