import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    trim: true,
    select: false,
  },
  weight: {
    type: Number,
    // type: mongoose.Types.Decimal128,
    min: 1,
    max: 600,
    default: 70,
  },
  // store height in centimeters
  height: {
    type: Number,
    min: 30,
    max: 395,
    default: 170,
  },
  age: {
    type: Number,
    min: 1,
    max: 150,
    default: 25,
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'male',
  },
  dailyCals: {
    type: Number,
    default: 0,
  },
  requirements: {
    fiber: {
      type: Number, //g
      default: 0,
    },
    calcium: {
      type: Number, //mg
      default: 0,
    },
    niacin: {
      type: Number, // mg
      default: 0,
    },
    thiamin: {
      type: Number, // mg
      default: 0,
    },
    folate: {
      type: Number, //mcg
      default: 0,
    },
    iron: {
      type: Number, // mg
      default: 0,
    },
    magnesium: {
      type: Number, //mg
      default: 0,
    },
    phosphorus: {
      type: Number, //mg
      default: 0,
    },
    potassium: {
      type: Number, // mg
      default: 0,
    },
    vitA: {
      type: Number, // mcg
      default: 0,
    },
    // riboflavin: {
    vitB2: {
      type: Number, // mg (riboflavin)
      default: 0,
    },
    vitB6: {
      type: Number, // mg
      default: 0,
    },
    vitC: {
      type: Number, //mg
      default: 0,
    },
    vitD: {
      type: Number, // in mcg
      default: 0,
    },
    vitE: {
      type: Number, // mg
      default: 0,
    },
    vitK: {
      type: Number, //mcg
      default: 0,
    },
    zinc: {
      type: Number, //mg
      default: 0,
    },
  },
})

UserSchema.pre('save', async function () {
  if (this.sex === 'male') {
    this.dailyCals =
      66.5 + 13.75 * this.weight + 5.003 * this.height - 6.75 * this.age

    // defaults
    this.requirements.vitA = 900
    this.requirements.vitB6 = 1.7 // mg
    this.requirements.vitC = 90 //mg
    this.requirements.vitD = 15 // mcg
    this.requirements.vitE = 15
    this.requirements.vitK = 120 //mcg
    this.requirements.iron = 8
    this.requirements.niacin = 16
    this.requirements.thiamin = 1.2
    this.requirements.vitB2 = 1.3
    this.requirements.potassium = 3400
    this.requirements.phosphorus = 3000
    this.requirements.magnesium = 420
    this.requirements.fiber = 35
    this.requirements.folate = 400
    this.requirements.zinc = 11

    // ! nutrition requirements - make min age atleast 1
    if (this.age < 4) {
      this.requirements.vitA = 300
      this.requirements.vitC = 15 // mg
      this.requirements.vitB6 = 0.5 // mg
      this.requirements.vitE = 6
      this.requirements.vitK = 30
      this.requirements.iron = 7
      this.requirements.calcium = 700
      this.requirements.niacin = 6
      this.requirements.thiamin = 0.5
      this.requirements.vitB2 = 0.5
      this.requirements.potassium = 2000
      this.requirements.magnesium = 80
      this.requirements.folate = 150
      this.requirements.zinc = 3
    } else if (this.age < 9) {
      this.requirements.vitA = 400
      this.requirements.vitC = 25
      this.requirements.vitB6 = 0.6 // mg
      this.requirements.vitE = 6
      this.requirements.vitK = 55
      this.requirements.iron = 10
      this.requirements.calcium = 1000
      this.requirements.niacin = 8
      this.requirements.thiamin = 0.6
      this.requirements.vitB2 = 0.6
      this.requirements.potassium = 2300
      this.requirements.magnesium = 130
      this.requirements.folate = 200
      this.requirements.zinc = 5
    } else if (this.age < 14) {
      this.requirements.vitA = 600
      this.requirements.vitC = 45
      this.requirements.vitB6 = 1 // mg
      this.requirements.vitE = 11
      this.requirements.vitK = 60
      this.requirements.calcium = 1300
      this.requirements.niacin = 12
      this.requirements.thiamin = 0.9
      this.requirements.vitB2 = 0.9
      this.requirements.potassium = 2500
      this.requirements.phosphorus = 4000
      this.requirements.magnesium = 240
      this.requirements.folate = 300
      this.requirements.zinc = 8
    } else if (this.age < 19) {
      this.requirements.vitC = 75
      this.requirements.vitB6 = 1.3
      this.requirements.vitK = 75
      this.requirements.iron = 11
      this.requirements.calcium = 1300
      this.requirements.potassium = 3000
      this.requirements.phosphorus = 4000
      this.requirements.magnesium = 410
    } else if (this.age < 51) {
      if (this.age < 31) this.requirements.magnesium = 400
      this.requirements.vitB6 = 1.3
      this.requirements.calcium = 1000
      this.requirements.phosphorus = 4000
    } else if (this.age < 71) {
      this.requirements.calcium = 1000
      this.requirements.phosphorus = 4000
    } else {
      this.requirements.vitD = 20
      this.requirements.calcium = 1200
    }
  }
  if (this.sex === 'female') {
    this.dailyCals =
      655.1 + 9.563 * this.weight + 1.85 * this.height - 4.676 * this.age
    // defaults
    this.requirements.vitA = 700
    this.requirements.vitB6 = 1.5
    this.requirements.vitC = 75
    this.requirements.vitD = 15
    this.requirements.vitE = 15
    this.requirements.vitK = 90
    this.requirements.iron = 8
    this.requirements.niacin = 14
    this.requirements.thiamin = 1.1
    this.requirements.vitB2 = 1.1
    this.requirements.potassium = 2600
    this.requirements.phosphorus = 3000
    this.requirements.magnesium = 320
    this.requirements.fiber = 32
    this.requirements.folate = 400
    this.requirements.zinc = 8

    // nutrition requirements - vitA in mcg
    if (this.age < 4) {
      this.requirements.vitA = 300
      this.requirements.vitB6 = 0.5
      this.requirements.vitC = 15 // mg
      this.requirements.vitE = 6
      this.requirements.vitK = 30
      this.requirements.iron = 7
      this.requirements.calcium = 700
      this.requirements.niacin = 6
      this.requirements.thiamin = 0.5
      this.requirements.vitB2 = 0.5
      this.requirements.potassium = 2000
      this.requirements.magnesium = 80
      this.requirements.folate = 150
      this.requirements.zinc = 3
    } else if (this.age < 9) {
      this.requirements.vitA = 400
      this.requirements.vitB6 = 0.6
      this.requirements.vitC = 25 // mg
      this.requirements.vitE = 7
      this.requirements.vitK = 55
      this.requirements.iron = 10
      this.requirements.calcium = 1000
      this.requirements.niacin = 8
      this.requirements.thiamin = 0.6
      this.requirements.vitB2 = 0.6
      this.requirements.potassium = 2300
      this.requirements.magnesium = 130
      this.requirements.folate = 200
      this.requirements.zinc = 5
    } else if (this.age < 14) {
      this.requirements.vitA = 600
      this.requirements.vitB6 = 1
      this.requirements.vitC = 45 // mg
      this.requirements.vitE = 11
      this.requirements.vitK = 60
      this.requirements.calcium = 1300
      this.requirements.niacin = 12
      this.requirements.thiamin = 0.9
      this.requirements.vitB2 = 0.9
      this.requirements.potassium = 2300
      this.requirements.phosphorus = 4000
      this.requirements.magnesium = 240
      this.requirements.folate = 300
      this.requirements.zinc = 8
    } else if (this.age < 19) {
      this.requirements.vitB6 = 1.2
      this.requirements.vitC = 65 // mg
      this.requirements.vitK = 75
      this.requirements.iron = 15
      this.requirements.calcium = 1300
      this.requirements.thiamin = 1
      this.requirements.vitB2 = 1
      this.requirements.potassium = 2300
      this.requirements.phosphorus = 4000
      this.requirements.magnesium = 360
      this.requirements.zinc = 9
    } else if (this.age < 51) {
      if (this.age < 31) this.requirements.magnesium = 310
      this.requirements.vitB6 = 1.3
      this.requirements.iron = 18
      this.requirements.calcium = 1000
      this.requirements.phosphorus = 4000
    } else if (this.age < 71) {
      this.requirements.calcium = 1200
      this.requirements.phosphorus = 4000
    } else {
      this.requirements.calcium = 1200
      this.requirements.vitD = 20
    }
  }

  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) return
  // only encrypt pass if newly added or updated
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model('User', UserSchema)
