import mongoose from 'mongoose';

const employeeModel = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email_address: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    cafe: new mongoose.Schema({
      id: { type: String, required: true },
      name: { type: String, required: true },
      start_date: { type: Date, required: true }
    })
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

export = mongoose.model('Employee', employeeModel);
