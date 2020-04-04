var amqp = require('amqplib/callback_api');

amqp.connect('amqp://10.106.101.113', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  console.log("Rabbit MQ Connected successfully");
  connection.createChannel(function(error1, channel) {
    if (error1) {
        throw error1;
      }
      var queue = 'hello';
      var msg = 'Hello world';
  
      channel.assertQueue(queue, {
        durable: false
      });
  
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);      
  });
});
