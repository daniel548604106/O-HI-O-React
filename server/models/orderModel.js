const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  shoppingList:[
   {
    quantity: {
      type: Number
    },
    product:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product'
    }
   }
  ],
  orderer:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  deliveryMethod:{
    type: String,
    enum: ['7-11 pickup']
  },
  paymentMethod: {
    type: String,
    enum: ['7-11 pick-&-pay']
  },
  personalInfo:{
    name: {
      type: String,
      required: [true, 'Please fill in the name']
    },
    phone: {
      type: Number,
      required: [true, 'Please fill in your phone number']
    },
    email: {
      type: String,
      required: [true, 'Please fill in your email address']
      
    }
  },
  invoice: {
    type: {
      type: String
    },
    retrieveMethod: {
      type: {
        type: String
      },
      code: {
        type: String
      }
    },
    ordererFullName: {
      type: String
    },
    ordererEmail: {
      type: String
    }
  }
})


const Order = mongoose.model('Order',orderSchema)
module.exports = Order