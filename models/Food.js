import mongoose from 'mongoose'

const NutrientSchema = new mongoose.Schema({
  label: { type: String },
  quantity: { type: Number },
  dailyQuantity: { type: Number },
  unit: { type: String },
})

const FoodSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 70,
    },
    foodId: {
      type: String,
      required: [true, 'Please provide ID'],
      maxlength: 100,
    },
    measureOptions: [
      {
        uri: { type: String },
        label: { type: String },
        weight: { type: Number },
      },
    ],
    measure: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    nutrientObj: {
      CA: NutrientSchema,
      FOLDFE: NutrientSchema,
      FOLFD: NutrientSchema,
      K: NutrientSchema,
      MG: NutrientSchema,
      // ENERC_KCAL: 0,
      FE: NutrientSchema,
      FIBTG: NutrientSchema,
      NIA: NutrientSchema,
      P: NutrientSchema,
      RIBF: NutrientSchema,
      THIA: NutrientSchema,
      TOCPHA: NutrientSchema,
      VITA_RAE: NutrientSchema,
      VITB6A: NutrientSchema,
      VITB12: NutrientSchema,
      VITC: NutrientSchema,
      VITD: NutrientSchema,
      VITK1: NutrientSchema,
      ZN: NutrientSchema,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Food', FoodSchema)
