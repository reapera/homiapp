import WooCommerceAPI from 'react-native-woocommerce-api';

export var WooCommerceAPIs = new WooCommerceAPI({
    url: 'http://homia.xyz', // Your store URL
    ssl: false,
    consumerKey: 'ck_95f0cb98604d8f7398a5aacca12ed3ef8542020f', // Your consumer secret
    consumerSecret: 'cs_f46c79ed12817396f662a8af3b28fd620b18f2a6', // Your consumer secret
    wpAPI: false, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
});