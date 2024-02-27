import type { Schema, Attribute } from '@strapi/strapi';

export interface ClientsAddress extends Schema.Component {
  collectionName: 'components_clients_addresses';
  info: {
    displayName: 'address';
    description: '';
  };
  attributes: {
    address: Attribute.String;
    phones: Attribute.Component<'clients.phone', true>;
    name: Attribute.String;
    address_type: Attribute.Enumeration<
      ['restaurant', 'distro center', 'home', 'transport']
    >;
    delivery_address: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    delivery_cost: Attribute.Integer;
  };
}

export interface ClientsInvioceData extends Schema.Component {
  collectionName: 'components_clients_invioce_data';
  info: {
    displayName: 'invioce_data';
  };
  attributes: {
    business_name: Attribute.String;
    RFC: Attribute.String;
    payment_method: Attribute.Enumeration<['to fill']>;
    CFDI_use: Attribute.Enumeration<['to fill']>;
    payment_format: Attribute.Enumeration<['to fill']>;
    email: Attribute.Email;
    invoice_address: Attribute.String;
    invoice_period: Attribute.Integer;
    invoice_fiscal_situation: Attribute.Media;
  };
}

export interface ClientsPhone extends Schema.Component {
  collectionName: 'components_clients_phones';
  info: {
    displayName: 'phone';
    description: '';
  };
  attributes: {
    phone: Attribute.BigInteger &
      Attribute.SetMinMax<{
        min: '10';
        max: '10';
      }>;
    international_code: Attribute.Integer &
      Attribute.SetMinMax<{
        min: 2;
        max: 2;
      }>;
    person: Attribute.String;
    extension: Attribute.Integer &
      Attribute.SetMinMax<{
        max: 8;
      }>;
    area: Attribute.String;
  };
}

export interface ProductionOrdersBrakedownItem extends Schema.Component {
  collectionName: 'components_po_brakedown_items';
  info: {
    displayName: 'brakedown item';
  };
  attributes: {
    brakedown: Attribute.Relation<
      'production-orders.brakedown-item',
      'oneToOne',
      'api::product-brakedown.product-brakedown'
    >;
    quantity: Attribute.Decimal;
    total_cost: Attribute.Decimal;
  };
}

export interface ProductionOrdersProductBrakedownList extends Schema.Component {
  collectionName: 'components_po_product_brakedown_lists';
  info: {
    displayName: 'product brakedown list';
  };
  attributes: {
    brakedown: Attribute.Component<'production-orders.brakedown-item', true>;
  };
}

export interface ProductionOrdersProductionOrderList extends Schema.Component {
  collectionName: 'components_po_production_order_lists';
  info: {
    displayName: 'production_order_list';
  };
  attributes: {
    production_code: Attribute.Relation<
      'production-orders.production-order-list',
      'oneToOne',
      'api::production-order.production-order'
    >;
    product_brakedown: Attribute.Relation<
      'production-orders.production-order-list',
      'oneToOne',
      'api::product-brakedown.product-brakedown'
    >;
    base_quantity: Attribute.Decimal;
    total_quantity: Attribute.Decimal;
  };
}

export interface SupplysSupplyList extends Schema.Component {
  collectionName: 'components_supplys_supply_lists';
  info: {
    displayName: 'supply list';
  };
  attributes: {
    supply: Attribute.Relation<
      'supplys.supply-list',
      'oneToOne',
      'api::supply.supply'
    >;
    quantity: Attribute.Integer;
    total_cost: Attribute.Decimal;
  };
}

export interface SupplysSupplyOutputList extends Schema.Component {
  collectionName: 'components_supplys_supply_output_lists';
  info: {
    displayName: 'supply output list';
    description: '';
  };
  attributes: {
    base_quantity: Attribute.Integer;
    total_quantity: Attribute.Decimal & Attribute.DefaultTo<0>;
    output_code: Attribute.Relation<
      'supplys.supply-output-list',
      'oneToOne',
      'api::supply-output-order.supply-output-order'
    >;
    supply: Attribute.Relation<
      'supplys.supply-output-list',
      'oneToOne',
      'api::supply.supply'
    >;
  };
}

export interface TasksTaskList extends Schema.Component {
  collectionName: 'components_tasks_task_lists';
  info: {
    displayName: 'task list';
    description: '';
  };
  attributes: {
    step: Attribute.String;
    step_order: Attribute.Integer;
    description: Attribute.Text;
    related_supplies: Attribute.Relation<
      'tasks.task-list',
      'oneToMany',
      'api::supply.supply'
    >;
    required_time_minutes: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'clients.address': ClientsAddress;
      'clients.invioce-data': ClientsInvioceData;
      'clients.phone': ClientsPhone;
      'production-orders.brakedown-item': ProductionOrdersBrakedownItem;
      'production-orders.product-brakedown-list': ProductionOrdersProductBrakedownList;
      'production-orders.production-order-list': ProductionOrdersProductionOrderList;
      'supplys.supply-list': SupplysSupplyList;
      'supplys.supply-output-list': SupplysSupplyOutputList;
      'tasks.task-list': TasksTaskList;
    }
  }
}
