const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;

module.exports = {
  async beforeCreate(event) {
    const { data, data: { quantity_to_produce, variant, type }  } = event.params

    if (!type) throw new ApplicationError('Add type to proceed')
    if (!quantity_to_produce) throw new ApplicationError('Add quantity to produce to proceed')
    if (variant.connect.length === null) throw new ApplicationError('Add the product variant to proceed')

    production_process = await strapi.entityService.findMany('api::production-process.production-process', { populate: '*' })
    product_brakedown = await strapi.entityService.findOne('api::product-brakedown.product-brakedown', data.product_brakedown.connect[0].id, {
      populate: '*',
    })
    
    event.params.data.supply_output_list = await Promise.all(product_brakedown.supply_list?.map(async (supply) => {
      const preview = await strapi.entityService.create('supplys.supply-output-list', 
      { data: {
        supply: supply.id,
        base_quantity: supply.quantity,
        total_quantity: (quantity_to_produce * supply.quantity) / product_brakedown.quantity
      } })
      return preview
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
    console.log(event);
    const { status, supply_output_list, production_order_list, id, quantity_produced, production_date, variant   } = event.params?.data

    // console.log('event: ', event);
    console.log('status: ', status);
    console.log('supply_output_list: ', supply_output_list);
    console.log('production_order_list: ', production_order_list);
    // console.log('event.params.where.id: ', event.params.where.id);
    // console.log('data: ', data);
    // console.log('data.product_brakedown.connect: ', data.product_brakedown.connect);
    // console.log('production_order: ', production_order);
    // console.log('id: ', id);

    // console.log('product_brakedown: ', product_brakedown)
    // product_brakedown = await strapi.entityService.findOne('api::product-brakedown.product-brakedown', data.product_brakedown.connect[0].id, {
    //   populate: '*',
    // })
    
    fetchSupplies = () => {
      return supply_output_list.map(async (supp) => {
        console.log('supp: ', supp);
        const supply = await strapi.entityService.findOne(supp.__pivot.component_type, supp.id, {
          populate: '*',
        })

        if (supply.output_code === null) throw new ApplicationError(`Seleccióna un lote para el prodúcto ${supply.supply.name}`)
        const { output_code: { id, output_code, available }, supply: { name, supply_code }, total_quantity } = supply
  
        productMatchCode = output_code.split('-')[1] === supply_code
        
        if (!productMatchCode) throw new ApplicationError(`El lote ${output_code} no corresponde al producto ${name}`);
        const isAvailable = ( available - total_quantity) > 0
        if (!isAvailable) throw new ApplicationError(`El lote ${output_code} no tiene la cantidad suficiente, estas pidiendo ${ total_quantity } y hay ${ available } en existencia.`);
        // console.log(`${name} available ${available} - total_quantity ${total_quantity}: `, available - total_quantity, isAvailable);
        // console.log('supply: ', supply);
        // console.log('id: ', id);
        return {id, available: available - total_quantity, api: 'supply-output-order'}

      })
    }
    fetchOrders = () => {

      console.log('production_order_list: ', production_order_list);
      return production_order_list.length > 0 ? production_order_list.map(async (prod_order) => {
        const order = await strapi.entityService.findOne(prod_order.__pivot.component_type, prod_order.id, {
          populate: '*',
        })
        console.log('prod_order: ', prod_order);
        console.log('order: ', order);
        const { production_code: { id, production_code, available }, product_brakedown: { name, brakedown_code }, total_quantity } = order
  
        productMatchCode = production_code.split('-')[1] === brakedown_code
        
        if (!productMatchCode) throw new ApplicationError(`El lote ${production_code} no corresponde al producto ${name}`);
        const isAvailable = ( available - total_quantity) >= 0
        if (!isAvailable) throw new ApplicationError(`El lote ${production_code} no tiene la cantidad suficiente, estas pidiendo ${ total_quantity } y hay ${ available } en existencia.`);
        console.log(`${name} available ${available} - total_quantity ${total_quantity}: `, available - total_quantity, isAvailable);
        // console.log('order: ', order);
        return {id, available: available - total_quantity, api: 'production-order'}
      }): []
    }

    try {
      // order_list = await Promise.all(fetchOrders())
      // console.log('updatedsupplies: ', updatedsupplies);
      // order_list.map(async (output) => {
      //   console.log(output);
      //   const { api, id, available } = output
      //   try {
      //     const res = await strapi.entityService.update(`api::${api}.${api}`, id, {
      //       data: {
      //         available,
      //       },
      //     });
      //     console.log(res);
      //   } catch (error) {
      //     throw new ApplicationError(`${error}`)
      //   }
      // })
      switch (status) {
        case 'preparing':
          supply_list = await Promise.all(fetchSupplies())
          order_list = await Promise.all(fetchOrders())
          input_list = [ ...supply_list, ...order_list ]
          console.log('supply_list: ', supply_list);
          console.log('order_list: ', order_list);
          console.log('input_list: ', input_list);
          await Promise.all(input_list.map(async (output) => {
            // console.log('output: ', output);
            const { api, id, available, output_code } = output
            try {
              const res = await strapi.entityService.update(`api::${api}.${api}`, id, {
                data: {
                  available,
                },
              });

              // console.log(res);
              // return res
            } catch (error) {
              throw new Error(`${error}`)
            }
          }))
          
          break;
        case 'done':
          try {
            const config = await strapi.entityService.findMany('api::config.config')
            
            const production_order = await strapi.entityService.findOne('api::production-order.production-order', event.params.where.id, {
              populate: {
                variant: true,
                product_brakedown: {
                  populate : "*"
                }
              }
            })
            const { product_brakedown, product_brakedown: { brakedown_code, expiration_days, is_quantity_exact, storefront }, variant, quantity_to_produce } = await production_order
            if (quantity_produced === null && !is_quantity_exact) throw new ApplicationError('Add the produced quantity to proceed')
            console.log('variant: ', variant);
            console.log('production_order: ', production_order);
            console.log('is_quantity_exact: ', is_quantity_exact);
            if (is_quantity_exact) event.params.data.quantity_produced = quantity_to_produce
            
            if (!event.params.data.production_date) event.params.data.production_date = new Date().toISOString()
  
            
            const yearString = `${new Date(event.params.data.production_date).getFullYear()}`
            const year = [yearString[2],yearString[3]].join('')
            const date = new Date(event.params.data.production_date).getDate() 
            const hours = new Date(event.params.data.production_date).getHours() 
            const fechaFinal = `${date + 1}${(new Date(event.params.data.production_date).getMonth() + 1).toString().padStart(1, "0")}${year}`
            
            
            const production_code = [config.production_order_code, brakedown_code, variant?.variant_code, fechaFinal].join('-')
            const expirationdate = new Date(new Date().setDate(date + expiration_days))
            const expiration_date = new Date(expirationdate).setHours(hours + expiration_days )
            
            event.params.data.storefront.connect[0] = {id: product_brakedown.storefront.id}
            if (!event.params.data.expiration_date) event.params.data.expiration_date = new Date(expiration_date).toISOString()
            if (!event.params.data.production_code) event.params.data.production_code = production_code
            if (!event.params.data.available) event.params.data.available = is_quantity_exact ? quantity_to_produce : quantity_produced

            

            
          } catch (error) {
            throw new Error(error)
          }
  
          // check status to make changes ??? 
          // throw new ApplicationError(`${error}`);
          break;
        case 'thrown':
          event.params.data.available = 0

          // throw new ApplicationError(`${error}`);
          break;
          
        default:
          // console.log('event.params.data.available: ', event.params.data.available);
          if (event.params.data.available !== null) {
            // console.log('before brake ');
            break;
          } else {
            throw new ApplicationError('change production order status to trigger next functionality')
          }
      }
    } catch (error) {
      throw new ApplicationError(`${error}`);
    }
  }
};

