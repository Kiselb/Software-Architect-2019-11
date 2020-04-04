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
  
      channel.assertQueue(queue, {
        durable: false
      });
      
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
    }, {
        noAck: true
    });
  });
});
