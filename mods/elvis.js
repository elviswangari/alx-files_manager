import redisClient from "./utils/redis";

const key = "auth_6611de34-2ec0-4e35-9a88-b99745ee20f6";
(async () => {
  console.log(redisClient.isAlive());
  //console.log(await redisClient.get('myKey'));
  //await redisClient.set('myKey', 12, 5);
  console.log(await redisClient.get(key));

  setTimeout(async () => {
    console.log(await redisClient.get(key));
  }, 1000 * 10);
})();
