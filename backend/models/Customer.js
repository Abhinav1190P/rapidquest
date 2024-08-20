const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  id: { type: Number },
  customer_id: { type: Number },
  first_name: { type: String },
  last_name: { type: String },
  company: { type: String, default: null },
  address1: { type: String },
  address2: { type: String, default: null },
  city: { type: String },
  province: { type: String },
  country: { type: String },
  zip: { type: String },
  phone: { type: String, default: null },
  name: { type: String, default: "" },
  province_code: { type: String, default: null },
  country_code: { type: String, default: "" },
  country_name: { type: String, default: "" },
  default: { type: Boolean }
});

const CustomerSchema = new Schema({
  _id: { type: Number },
  admin_graphql_api_id: { type: String },
  created_at: { type: Date },
  currency: { type: String, default: "" },
  default_address: { type: AddressSchema },
  email: { type: String },
  email_marketing_consent: {
    state: { type: String },
    opt_in_level: { type: String },
    consent_updated_at: { type: Date, default: null }
  },
  first_name: { type: String },
  last_name: { type: String },
  last_order_id: { type: Number, default: null },
  last_order_name: { type: String, default: null },
  multipass_identifier: { type: String, default: null },
  note: { type: String, default: null },
  orders_count: { type: Number, default: 0 },
  phone: { type: String, default: null },
  sms_marketing_consent: { type: Schema.Types.Mixed, default: null },
  state: { type: String },
  tags: { type: String, default: "" },
  tax_exempt: { type: Boolean, default: false },
  tax_exemptions: { type: [String], default: [] },
  total_spent: { type: String, default: "0.00" },
  updated_at: { type: Date },
  verified_email: { type: Boolean },
  addresses: [AddressSchema]
});

module.exports = mongoose.model('shopifyCustomer', CustomerSchema, 'shopifyCustomers');
