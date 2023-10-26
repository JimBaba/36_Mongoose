const mongoose = require('mongoose')

main().catch(err => console.log("err"));

async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/shopApp').then(() => {
            console.log("DB connection open")
        }).catch(error => {
            console.log("Error!!!!: " + error);
        });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// name ist required
const productSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 20},
    price: {type: Number, require: true, min: [0, "Price must be >0"]},
    onSale: {type: Boolean, default: false},
    categories: [String],
    qty:    {online: {type: Number, default: 0},
            inStore: {type: Number, default: 0}},
    size: {type: String, enum: ['S', 'M', 'L', 'XL']}

})

productSchema.methods.greet = function(){
    console.log("Hi")
    console.log(`- from ${this.name}`)
}

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save()
}

const findProduct = async (prod) => {
    const foundProduct  = await Product.findOne({name: prod})
    console.log(foundProduct)
    await foundProduct.toggleOnSale()
    foundProduct.price = foundProduct.price * 0.8    
    console.log(foundProduct)
}

const Product = mongoose.model('Product', productSchema)

// versuch einen datensatz ohne den required namen zu erstellen
const bike = new Product({price: 49.99, categories: ["Cycling","Accessories"]})

// resultiert in fehlercode
bike.save().then(res => {console.log("saved " + res)}).catch(e => {console.log("Error " + e)})

// Product.findOneAndUpdate({name: "Tire Pump"}, {price: -10.99}, {new: true, runValidators: true}).then(p => {console.log("Updated: " + p)}).catch(e => {"Error!!: " + e})