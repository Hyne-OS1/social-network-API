// Importing the required dependencies from the mongoose library
const { Schema, model, Types } = require('mongoose'); 
// Defining the User schema with the required fields and their respective data types
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
      // using regular expression to validate email format
    email: {
        type: String,
        required: true,
        unique: true,
        validate: { 
          validator: function(v) {
              return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
          }
      }
    },

    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ],
    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }
  ],
  },
  {
    toJSON: {
      virtuals: true, // enables virtual properties to be displayed 
    },
    id: false, // disables the default '_id' field 
}
);


// defining virtual property in this case 'friendcount' which will return the number of friends in the given array
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

// Creating the User model from the userSchema
const User = model('User',userSchema)

// Exporting the User model 
module.exports = User