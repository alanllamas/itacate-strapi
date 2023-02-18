const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;

module.exports = {
  async beforeCreate(event) {
    const { data, data: { quantity_to_produce }  } = event.params

    production_process = await strapi.entityService.findMany('api::production-process.production-process', { populate: '*' })
    product_brakedown = await strapi.entityService.findOne('api::product-brakedown.product-brakedown', data.product_brakedown.connect[0].id, {
      populate: '*',
    })
    
    event.params.data.supply_output_list = await Promise.all(product_brakedown.supply_list?.map(async (supply) => {
      const preview = await strapi.entityService.create('supplys.supply-output-list', { data: {
        supply: supply.id,
        base_quantity: supply.quantity,
        total_quantity: (quantity_to_produce * supply.quantity) / product_brakedown.quantity
      } })
      return await preview
    }))
    event.params.data.production_order_list = await Promise.all(product_brakedown.brakedown_list?.map(async (bd) => {
      const brakedown = await strapi.entityService.findOne('production-orders.brakedown-item', bd.id, {
        populate: '*',
      })
      const preview = await strapi.entityService.create('production-orders.production-order-list', { data: {
        product_brakedown: brakedown.brakedown.id,
        base_quantity: brakedown.quantity,
        total_quantity: (quantity_to_produce * brakedown.quantity) / product_brakedown.quantity
      } })
      return preview
    }))

 
    // throw new ApplicationError(`${err}`);

  },
  async beforeUpdate(event) {
    const { data, data: { status, supply_output_list, production_order_list, id }, populate: { product_brakedown }  } = event.params
    // product_brakedown = await strapi.entityService.findOne('api::product-brakedown.product-brakedown', data.product_brakedown.connect[0].id, {
    //   populate: '*',
    // })
    // console.log('data: ', data);
    // console.log('data.product_brakedown.connect: ', data.product_brakedown.connect);
    // console.log('id: ', id);

    // console.log(product_brakedown)
    // product_brakedown = await strapi.entityService.findOne('api::product-brakedown.product-brakedown', data.product_brakedown.connect[0].id, {
    //   populate: '*',
    // })
    
    fetchSupplies = () => {
      return supply_output_list.map(async (supp) => {
        console.log(supp);
        const supply = await strapi.entityService.findOne(supp.__pivot.component_type, supp.id, {
          populate: '*',
        })
        const { output_code: { id, output_code, available }, supply: { name, supply_code }, total_quantity } = supply
  
        productMatchCode = output_code.split('-')[1] === supply_code
        
        if (!productMatchCode) throw new ApplicationError(`El lote ${output_code} no corresponde al producto ${name}`);
        isAvailable = ( available - total_quantity) > 0
        if (!isAvailable) throw new ApplicationError(`El lote ${output_code} no tiene la cantidad suficiente, estas pidiendo ${ total_quantity } y hay ${ available } en existencia.`);
        console.log(`${name} available ${available} - total_quantity ${total_quantity}: `, available - total_quantity, isAvailable);
        console.log('supply: ', supply);
        console.log('id: ', id);
        return {id, available: available - total_quantity, api: 'supply-output-orders'}

      })
    }
    fetchOrders = () => {
      return production_order_list.length > 0 ? production_order_list.map(async (prod_order) => {
        const order = await strapi.entityService.findOne(prod_order.__pivot.component_type, prod_order.id, {
          populate: '*',
        })
        console.log('prod_order: ', prod_order);
        console.log('order: ', order);
        const { production_code: { id, production_code, available }, product_brakedown: { name, brakedown_code }, total_quantity } = order
  
        productMatchCode = production_code.split('-')[1] === brakedown_code
        
        if (!productMatchCode) throw new ApplicationError(`El lote ${production_code} no corresponde al producto ${name}`);
        isAvailable = ( available - total_quantity) > 0
        if (!isAvailable) throw new ApplicationError(`El lote ${production_code} no tiene la cantidad suficiente, estas pidiendo ${ total_quantity } y hay ${ available } en existencia.`);
        console.log(`${name} available ${available} - total_quantity ${total_quantity}: `, available - total_quantity, isAvailable);
        // console.log('order: ', order);
        return {id, available: available - total_quantity, api: 'production-orders'}
      }): []
    }

    try {
      output_list = await Promise.all(fetchSupplies())
      console.log('output_list: ', output_list);
      output_list.map(async (output) => {
        console.log(output);
        const { api, id, available } = output
        try {
          
          const res = await strapi.entityService.update(`api::${api}.${api}`, id, {
            data: {
              available,
            },
          });
          console.log(res);
        } catch (error) {
          throw new ApplicationError(`${error}`)
        }
      })
      switch (status) {
        case 'preparing':
          
         
          
          break;
      
        default:
          throw new ApplicationError('change production order status to trigger next functionality')
          break;
      }
    } catch (error) {
      
      throw new ApplicationError(`${error}`);
    }


  }
};

