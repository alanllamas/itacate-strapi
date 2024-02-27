import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    supply_output_order_requests: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::supply-output-order.supply-output-order'
    >;
    supply_output_order_authorization: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::supply-output-order.supply-output-order'
    >;
    management_areas: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::business-area.business-area'
    >;
    working_areas: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::business-area.business-area'
    >;
    production_processes: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::production-process.production-process'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessAreaBusinessArea extends Schema.CollectionType {
  collectionName: 'business_areas';
  info: {
    singularName: 'business-area';
    pluralName: 'business-areas';
    displayName: 'business area';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    manager: Attribute.Relation<
      'api::business-area.business-area',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    warehouse_categories: Attribute.Relation<
      'api::business-area.business-area',
      'oneToMany',
      'api::warehouse-category.warehouse-category'
    >;
    production_processes: Attribute.Relation<
      'api::business-area.business-area',
      'oneToMany',
      'api::production-process.production-process'
    >;
    employees: Attribute.Relation<
      'api::business-area.business-area',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    product_brakedowns: Attribute.Relation<
      'api::business-area.business-area',
      'oneToMany',
      'api::product-brakedown.product-brakedown'
    >;
    storefront: Attribute.Relation<
      'api::business-area.business-area',
      'oneToOne',
      'api::storefront.storefront'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business-area.business-area',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business-area.business-area',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClientClient extends Schema.CollectionType {
  collectionName: 'clients';
  info: {
    singularName: 'client';
    pluralName: 'clients';
    displayName: 'Client';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    addresses: Attribute.Component<'clients.address', true>;
    client_type: Attribute.Enumeration<
      ['restaurant', 'chef', 'hotel', 'person']
    >;
    payment_period: Attribute.Enumeration<
      ['in0days', 'in7days', 'in15days', 'in30days']
    >;
    Contact: Attribute.Component<'clients.phone', true>;
    invoice_data: Attribute.Component<'clients.invioce-data'>;
    comments: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiConfigConfig extends Schema.SingleType {
  collectionName: 'configs';
  info: {
    singularName: 'config';
    pluralName: 'configs';
    displayName: 'config';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    supply_input_order_code: Attribute.String;
    supply_output_order_code: Attribute.String;
    production_order_code: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::config.config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMeasurementUnitMeasurementUnit
  extends Schema.CollectionType {
  collectionName: 'measurement_units';
  info: {
    singularName: 'measurement-unit';
    pluralName: 'measurement-units';
    displayName: 'measurement unit';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    unit: Attribute.String;
    abbreviation_single: Attribute.String;
    abbreviation_plural: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::measurement-unit.measurement-unit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::measurement-unit.measurement-unit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOuputRelationOuputRelation extends Schema.CollectionType {
  collectionName: 'ouput_relations';
  info: {
    singularName: 'ouput-relation';
    pluralName: 'ouput-relations';
    displayName: 'ouput relation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    supply: Attribute.Relation<
      'api::ouput-relation.ouput-relation',
      'oneToOne',
      'api::supply.supply'
    >;
    output_code: Attribute.Relation<
      'api::ouput-relation.ouput-relation',
      'oneToOne',
      'api::supply-output-order.supply-output-order'
    >;
    total_quantity: Attribute.Integer;
    base_quantity: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ouput-relation.ouput-relation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ouput-relation.ouput-relation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductBrakedownProductBrakedown
  extends Schema.CollectionType {
  collectionName: 'product_brakedowns';
  info: {
    singularName: 'product-brakedown';
    pluralName: 'product-brakedowns';
    displayName: 'product brakedown';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    production_process: Attribute.Relation<
      'api::product-brakedown.product-brakedown',
      'manyToOne',
      'api::production-process.production-process'
    >;
    supply_list: Attribute.Component<'supplys.supply-list', true>;
    variants: Attribute.Relation<
      'api::product-brakedown.product-brakedown',
      'manyToMany',
      'api::variant.variant'
    >;
    quantity: Attribute.Integer;
    brakedown_cost: Attribute.Decimal;
    brakedown_code: Attribute.String;
    saleable: Attribute.Boolean & Attribute.Required;
    used_in_process: Attribute.Boolean & Attribute.Required;
    menu_price: Attribute.Decimal;
    price_factor: Attribute.Float;
    production_orders: Attribute.Relation<
      'api::product-brakedown.product-brakedown',
      'oneToMany',
      'api::production-order.production-order'
    >;
    expiration_days: Attribute.Integer;
    product_datasheet: Attribute.RichText;
    brakedown_list: Attribute.Component<
      'production-orders.brakedown-item',
      true
    >;
    must_refrigerarte: Attribute.Boolean & Attribute.DefaultTo<false>;
    can_be_frozen: Attribute.Boolean;
    is_quantity_exact: Attribute.Boolean & Attribute.DefaultTo<true>;
    business_area: Attribute.Relation<
      'api::product-brakedown.product-brakedown',
      'manyToOne',
      'api::business-area.business-area'
    >;
    storefront: Attribute.Relation<
      'api::product-brakedown.product-brakedown',
      'manyToOne',
      'api::storefront.storefront'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-brakedown.product-brakedown',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-brakedown.product-brakedown',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductionOrderProductionOrder
  extends Schema.CollectionType {
  collectionName: 'production_orders';
  info: {
    singularName: 'production-order';
    pluralName: 'production-orders';
    displayName: 'production order';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    product_brakedown: Attribute.Relation<
      'api::production-order.production-order',
      'manyToOne',
      'api::product-brakedown.product-brakedown'
    >;
    production_date: Attribute.Date;
    production_code: Attribute.String;
    available: Attribute.Integer;
    status: Attribute.Enumeration<
      ['booked', 'preparing', 'done', 'thrown', 'consume']
    > &
      Attribute.DefaultTo<'booked'>;
    quantity_to_produce: Attribute.Decimal;
    quantity_produced: Attribute.Decimal;
    production_order_list: Attribute.Component<
      'production-orders.production-order-list',
      true
    >;
    supply_output_list: Attribute.Component<'supplys.supply-output-list', true>;
    variant: Attribute.Relation<
      'api::production-order.production-order',
      'oneToOne',
      'api::variant.variant'
    >;
    expiration_date: Attribute.Date;
    type: Attribute.Enumeration<['preparation', 'setup']>;
    storefront: Attribute.Relation<
      'api::production-order.production-order',
      'manyToOne',
      'api::storefront.storefront'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::production-order.production-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::production-order.production-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductionProcessProductionProcess
  extends Schema.CollectionType {
  collectionName: 'production_processes';
  info: {
    singularName: 'production-process';
    pluralName: 'production-processes';
    displayName: 'production process';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    business_area: Attribute.Relation<
      'api::production-process.production-process',
      'manyToOne',
      'api::business-area.business-area'
    >;
    product_brakedowns: Attribute.Relation<
      'api::production-process.production-process',
      'oneToMany',
      'api::product-brakedown.product-brakedown'
    >;
    in_charge: Attribute.Relation<
      'api::production-process.production-process',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    task_list: Attribute.Component<'tasks.task-list', true>;
    required_time_minutes: Attribute.Integer;
    resting_time_minutes: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::production-process.production-process',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::production-process.production-process',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProviderProvider extends Schema.CollectionType {
  collectionName: 'providers';
  info: {
    singularName: 'provider';
    pluralName: 'providers';
    displayName: 'provider';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    first_name: Attribute.String;
    last_name: Attribute.String;
    warehouse_category: Attribute.Relation<
      'api::provider.provider',
      'oneToOne',
      'api::warehouse-category.warehouse-category'
    >;
    region: Attribute.String;
    phone_1: Attribute.BigInteger;
    phone_2: Attribute.BigInteger;
    address: Attribute.String;
    comments: Attribute.Text;
    provider_code: Attribute.String;
    supply_input_orders: Attribute.Relation<
      'api::provider.provider',
      'oneToMany',
      'api::supply-input-order.supply-input-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::provider.provider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::provider.provider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStorefrontStorefront extends Schema.CollectionType {
  collectionName: 'storefronts';
  info: {
    singularName: 'storefront';
    pluralName: 'storefronts';
    displayName: 'storefront';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    place: Attribute.Text;
    storefront_code: Attribute.String;
    business_area: Attribute.Relation<
      'api::storefront.storefront',
      'oneToOne',
      'api::business-area.business-area'
    >;
    production_orders: Attribute.Relation<
      'api::storefront.storefront',
      'oneToMany',
      'api::production-order.production-order'
    >;
    product_brakedowns: Attribute.Relation<
      'api::storefront.storefront',
      'oneToMany',
      'api::product-brakedown.product-brakedown'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::storefront.storefront',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::storefront.storefront',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupplySupply extends Schema.CollectionType {
  collectionName: 'supplies';
  info: {
    singularName: 'supply';
    pluralName: 'supplies';
    displayName: 'supply';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    measurement_unit: Attribute.Relation<
      'api::supply.supply',
      'oneToOne',
      'api::measurement-unit.measurement-unit'
    >;
    warehouse: Attribute.Relation<
      'api::supply.supply',
      'manyToOne',
      'api::warehouse.warehouse'
    >;
    warehouse_categories: Attribute.Relation<
      'api::supply.supply',
      'oneToMany',
      'api::warehouse-category.warehouse-category'
    >;
    minimum_stock: Attribute.Integer;
    minimum_expiration: Attribute.Integer;
    delivery_days: Attribute.Integer;
    storage_specifications: Attribute.Text;
    comments: Attribute.Text;
    supply_code: Attribute.String;
    variants: Attribute.Relation<
      'api::supply.supply',
      'oneToMany',
      'api::variant.variant'
    >;
    supply_input_orders: Attribute.Relation<
      'api::supply.supply',
      'oneToMany',
      'api::supply-input-order.supply-input-order'
    >;
    list_cost: Attribute.Decimal;
    tasks: Attribute.Relation<
      'api::supply.supply',
      'manyToMany',
      'api::task.task'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supply.supply',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supply.supply',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupplyInputOrderSupplyInputOrder
  extends Schema.CollectionType {
  collectionName: 'supply_input_orders';
  info: {
    singularName: 'supply-input-order';
    pluralName: 'supply-input-orders';
    displayName: 'supply input order';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    supply: Attribute.Relation<
      'api::supply-input-order.supply-input-order',
      'manyToOne',
      'api::supply.supply'
    >;
    quantity: Attribute.Integer;
    input_date: Attribute.Date;
    best_before_date: Attribute.Date;
    expiration_date: Attribute.Date;
    area_manager: Attribute.Relation<
      'api::supply-input-order.supply-input-order',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    provider: Attribute.Relation<
      'api::supply-input-order.supply-input-order',
      'manyToOne',
      'api::provider.provider'
    >;
    variant: Attribute.Relation<
      'api::supply-input-order.supply-input-order',
      'oneToOne',
      'api::variant.variant'
    >;
    batch_code: Attribute.String;
    available: Attribute.Integer;
    supply_output_orders: Attribute.Relation<
      'api::supply-input-order.supply-input-order',
      'oneToMany',
      'api::supply-output-order.supply-output-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supply-input-order.supply-input-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supply-input-order.supply-input-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupplyOutputOrderSupplyOutputOrder
  extends Schema.CollectionType {
  collectionName: 'supply_output_orders';
  info: {
    singularName: 'supply-output-order';
    pluralName: 'supply-output-orders';
    displayName: 'supply output order';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    requester: Attribute.Relation<
      'api::supply-output-order.supply-output-order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    request_area: Attribute.Enumeration<
      ['Nixtamal', 'Molino', 'Tortilla', 'Totopo', 'Empaque', 'Laboratorio']
    >;
    quantity: Attribute.Integer;
    output_date: Attribute.Date;
    output_reason: Attribute.Enumeration<
      ['Producci\u00F3n', 'Venta', 'Pruebas', 'Merma']
    >;
    authorized_by: Attribute.Relation<
      'api::supply-output-order.supply-output-order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    comments: Attribute.Text;
    batch_code: Attribute.Relation<
      'api::supply-output-order.supply-output-order',
      'manyToOne',
      'api::supply-input-order.supply-input-order'
    >;
    available: Attribute.Decimal;
    output_code: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supply-output-order.supply-output-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supply-output-order.supply-output-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTaskTask extends Schema.CollectionType {
  collectionName: 'tasks';
  info: {
    singularName: 'task';
    pluralName: 'tasks';
    displayName: 'task';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    required_time_minutes: Attribute.Integer;
    supplies: Attribute.Relation<
      'api::task.task',
      'manyToMany',
      'api::supply.supply'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiVariantVariant extends Schema.CollectionType {
  collectionName: 'variants';
  info: {
    singularName: 'variant';
    pluralName: 'variants';
    displayName: 'variant';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    variant: Attribute.String;
    variant_type: Attribute.Enumeration<
      ['color', 'tama\u00F1o', 'preparaci\u00F3n']
    >;
    variant_code: Attribute.String;
    product_brakedowns: Attribute.Relation<
      'api::variant.variant',
      'manyToMany',
      'api::product-brakedown.product-brakedown'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::variant.variant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::variant.variant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWarehouseWarehouse extends Schema.CollectionType {
  collectionName: 'warehouses';
  info: {
    singularName: 'warehouse';
    pluralName: 'warehouses';
    displayName: 'warehouse';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    location: Attribute.String;
    specifications: Attribute.String;
    warehouse_categories: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToMany',
      'api::warehouse-category.warehouse-category'
    >;
    supplies: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToMany',
      'api::supply.supply'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWarehouseCategoryWarehouseCategory
  extends Schema.CollectionType {
  collectionName: 'warehouse_categories';
  info: {
    singularName: 'warehouse-category';
    pluralName: 'warehouse-categories';
    displayName: 'warehouse category';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    category: Attribute.String;
    description: Attribute.String;
    warehouse: Attribute.Relation<
      'api::warehouse-category.warehouse-category',
      'manyToOne',
      'api::warehouse.warehouse'
    >;
    business_area: Attribute.Relation<
      'api::warehouse-category.warehouse-category',
      'manyToOne',
      'api::business-area.business-area'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::warehouse-category.warehouse-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::warehouse-category.warehouse-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::business-area.business-area': ApiBusinessAreaBusinessArea;
      'api::client.client': ApiClientClient;
      'api::config.config': ApiConfigConfig;
      'api::measurement-unit.measurement-unit': ApiMeasurementUnitMeasurementUnit;
      'api::ouput-relation.ouput-relation': ApiOuputRelationOuputRelation;
      'api::product-brakedown.product-brakedown': ApiProductBrakedownProductBrakedown;
      'api::production-order.production-order': ApiProductionOrderProductionOrder;
      'api::production-process.production-process': ApiProductionProcessProductionProcess;
      'api::provider.provider': ApiProviderProvider;
      'api::storefront.storefront': ApiStorefrontStorefront;
      'api::supply.supply': ApiSupplySupply;
      'api::supply-input-order.supply-input-order': ApiSupplyInputOrderSupplyInputOrder;
      'api::supply-output-order.supply-output-order': ApiSupplyOutputOrderSupplyOutputOrder;
      'api::task.task': ApiTaskTask;
      'api::variant.variant': ApiVariantVariant;
      'api::warehouse.warehouse': ApiWarehouseWarehouse;
      'api::warehouse-category.warehouse-category': ApiWarehouseCategoryWarehouseCategory;
    }
  }
}
