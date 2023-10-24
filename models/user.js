const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  number: {
    type: String,
    default: '',
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return value.match(re);
      },

      meesage: 'PLease enter a valid email',
    },
  },

  password: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        return value.length > 6;
      },

      meesage: 'Please enter a password more than 6 letter',
    },
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  enrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      
    },
  ],

  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      
    },
  ],
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
