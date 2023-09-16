import mongoose from 'mongoose';

const cafeModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    location: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    },
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;

        return ret;
      }
    }
  }
);

export = mongoose.model('Cafes', cafeModel);
