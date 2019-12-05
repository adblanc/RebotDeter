const filter = "statuses/filter";
const retweet = "statuses/retweet";
const fav = "favorites/create";
const keywords =
  "cherche un stage,cherche stage,stage de 3 ème,recherche un stage, Stage rémunéré, cherche stage";

module.exports = class Streams {
  constructor(Twitter) {
    this.T = Twitter;
  }
  listenForInternShips() {
    this.streamInternships = this.T.stream(filter, {
      track: keywords,
      language: "fr"
    });
    this.streamInternships.on("tweet", async tweet => {
      try {
        await this.T.post(`${retweet}/:id`, { id: tweet.id_str });
        await this.T.post(`${fav}`, { id: tweet.id_str });
        console.log("Post rt + faved");
      } catch (ex) {
        console.log("Error : ", ex.message);
      }
    });
  }
};
