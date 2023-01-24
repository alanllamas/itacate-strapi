const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;
module.exports = {
  async beforeCreate(event) {
    const { params: { data: { batch_code, quantity, output_date } } }  = event

    event.params.data.available = quantity
    // console.log(batch_code);
    const batch = typeof batch_code === 'string' ? batch_code : batch_code.connect[0].id;
    config = await strapi.entityService.findMany('api::config.config')
    // console.log(output_date);
    const yearString = `${new Date(output_date).getFullYear()}`

    const year = [yearString[2],yearString[3]].join('')

    const fechaFinal = `${new Date(output_date).getDate() + 1}${new Date(output_date).getMonth().toString().padStart(1, "0") + 1}${year}`

    // console.log(fechaFinal);
    // order_code = config.supply_output_order_code
    try {
      await strapi.entityService.findOne('api::supply-input-order.supply-input-order', batch, {
        fields: ["*"],
        populate: ["supply_output_orders", 'provider'],
      }).then (pi => {
        if (pi.available <= 0) throw new Error(`There is no more product available`);
        const available = pi.available - quantity
        const [area, supply_code, variant_code, provider_code, input_date, input_count] = pi.batch_code.split('-')
        // input_code.pop()
        
        // console.log(pi.provider.provider_code);
        const middle_code = [config.supply_output_order_code, supply_code, variant_code, pi.provider.provider_code, fechaFinal].join('-')
        // console.log(output_code);
        orders = pi.supply_output_orders.filter(order => order.output_code.includes(middle_code))

        // console.log(orders);
        const output_count = (orders.length + 1).toString().padStart(2, "0")
        // console.log(output_count);
        const output_code = [ middle_code, output_count ].join('-')
        // console.log(output_code);
        // throw new Error()
        event.params.data.output_code = output_code

        if (available >= 0) {
          strapi.entityService.update('api::supply-input-order.supply-input-order', batch, {
            data: {
              available,
            },
          });
        } else {
          throw new Error(`There is not enough product available`);
        }
      })
      
    } catch (err) {
      throw new ApplicationError(`${err}`);
    }
  },
};