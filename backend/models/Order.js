const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  _id: Number,
  id: Number,
  email: String,
  closed_at: Date,
  created_at: Date,
  updated_at: Date,
  number: Number,
  note: String,
  token: String,
  gateway: String,
  test: Boolean,
  total_price: String,
  subtotal_price: String,
  total_weight: Number,
  total_tax: String,
  taxes_included: Boolean,
  currency: String,
  financial_status: String,
  confirmed: Boolean,
  total_discounts: String,
  buyer_accepts_marketing: Boolean,
  name: String,
  referring_site: String,
  landing_site: String,
  cancelled_at: Date,
  cancel_reason: String,
  reference: String,
  user_id: mongoose.Schema.Types.Mixed,
  location_id: mongoose.Schema.Types.Mixed,
  source_identifier: mongoose.Schema.Types.Mixed,
  source_url: mongoose.Schema.Types.Mixed,
  device_id: mongoose.Schema.Types.Mixed,
  phone: mongoose.Schema.Types.Mixed,
  customer_locale: String,
  app_id: Number,
  browser_ip: String,
  landing_site_ref: mongoose.Schema.Types.Mixed,
  order_number: Number,
  discount_applications: Array,
  discount_codes: Array,
  note_attributes: Array,
  payment_gateway_names: [String],
  processing_method: String,
  source_name: String,
  fulfillment_status: mongoose.Schema.Types.Mixed,
  tax_lines: Array,
  tags: String,
  contact_email: mongoose.Schema.Types.Mixed,
  order_status_url: String,
  presentment_currency: String,
  total_line_items_price_set: {
    shop_money: {
      amount: String,
      currency_code: String,
    },
    presentment_money: {
      amount: String,
      currency_code: String,
    }
  },
  total_discounts_set: {
    shop_money: {
      amount: String,
      currency_code: String,
    },
    presentment_money: {
      amount: String,
      currency_code: String,
    }
  },
  total_shipping_price_set: {
    shop_money: {
      amount: String,
      currency_code: String,
    },
    presentment_money: {
      amount: String,
      currency_code: String,
    }
  },
  subtotal_price_set: {
    shop_money: {
      amount: String,
      currency_code: String,
    },
    presentment_money: {
      amount: String,
      currency_code: String,
    }
  },
  total_price_set: {
    shop_money: {
      amount: String,
      currency_code: String,
    },
    presentment_money: {
      amount: String,
      currency_code: String,
    }
  },
  total_tax_set: {
    shop_money: {
      amount: String,
      currency_code: String,
    },
    presentment_money: {
      amount: String,
      currency_code: String,
    }
  },
  line_items: [{
    id: Number,
    variant_id: Number,
    title: String,
    quantity: Number,
    sku: String,
    variant_title: String,
    vendor: String,
    fulfillment_service: String,
    product_id: Number,
    requires_shipping: Boolean,
    taxable: Boolean,
    gift_card: Boolean,
    name: String,
    variant_inventory_management: String,
    properties: Array,
    product_exists: Boolean,
    fulfillable_quantity: Number,
    grams: Number,
    price: Number,
    total_discount: String,
    fulfillment_status: mongoose.Schema.Types.Mixed,
    price_set: {
      shop_money: {
        amount: String,
        currency_code: String,
      },
      presentment_money: {
        amount: String,
        currency_code: String,
      }
    },
    total_discount_set: {
      shop_money: {
        amount: String,
        currency_code: String,
      },
      presentment_money: {
        amount: String,
        currency_code: String,
      }
    },
    discount_allocations: Array,
    duties: Array,
    admin_graphql_api_id: String,
  }],
  shipping_lines: Array,
  billing_address: mongoose.Schema.Types.Mixed,
  shipping_address: mongoose.Schema.Types.Mixed,
  fulfillments: Array,
  client_details: mongoose.Schema.Types.Mixed,
  refunds: Array,
  customer: {
    id: Number,
    email: String,
    created_at: Date,
    updated_at: Date,
    first_name: String,
    last_name: String,
    orders_count: Number,
    state: String,
    total_spent: String,
    last_order_id: Number,
    note: String,
    verified_email: Boolean,
    multipass_identifier: mongoose.Schema.Types.Mixed,
    tax_exempt: Boolean,
    phone: mongoose.Schema.Types.Mixed,
    tags: String,
    last_order_name: String,
    currency: String,
    marketing_opt_in_level: mongoose.Schema.Types.Mixed,
    tax_exemptions: Array,
    admin_graphql_api_id: String,
    default_address: {
      id: Number,
      customer_id: Number,
      first_name: String,
      last_name: String,
      company: mongoose.Schema.Types.Mixed,
      address1: String,
      address2: mongoose.Schema.Types.Mixed,
      city: String,
      province: String,
      country: String,
      zip: String,
      phone: mongoose.Schema.Types.Mixed,
      name: String,
      province_code: mongoose.Schema.Types.Mixed,
      country_code: String,
      country_name: String,
      default: Boolean
    }
  },
  total_line_items_price: String
});

module.exports = mongoose.model('shopifyOrder', OrderSchema, 'shopifyOrders');
