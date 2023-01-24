
module.exports = {
  async beforeCreate(event) {
    // console.log(event);
    const { params : { data : { supply, input_date, provider, variant } } }  = event
    event.params.data.available = event.params.data.quantity
    supply_id = supply.connect[0].id
    provider_id = provider.connect[0].id
    variant_id = variant.connect[0]?.id

    config = await strapi.entityService.findMany('api::config.config')
    // console.log(config);
    order_code = config.supply_input_order_code

    
    provider_list = await strapi.entityService.findOne('api::provider.provider',provider_id)
    provider_code = provider_list.provider_code

    variant_list = await strapi.entityService.findOne('api::variant.variant',variant_id)
    variant_code = variant_list.variant_code

    const yearString = `${new Date(input_date).getFullYear()}`
    const year = [yearString[2],yearString[3]].join('')
    const fechaFinal = `${new Date(input_date).getDate() + 1}${new Date(input_date).getMonth().toString().padStart(1, "0") + 1}${year}`

    const supply_list = await strapi.entityService.findOne('api::supply.supply',supply_id, {
      fields: ["*"],
      populate: "supply_input_orders",
    })
    const { supply_code, supply_input_orders } = supply_list;

    const middle_code = [ order_code, supply_code, variant_code, provider_code, fechaFinal ].join('-')

    orders = supply_input_orders.filter(order => order.batch_code.includes(middle_code))
    // supply_code = supply_list.supply_code
    // const supply_input_orders = supply_list.supply_input_orders
    // console.log(orders);
    const input_count = (orders.length + 1).toString().padStart(2, "0")
    // console.log(input_count);
    const batch_code = [ middle_code, input_count ].join('-')
    // console.log(batch_code);
    // throw new Error()
    event.params.data.batch_code = batch_code
  }
};
