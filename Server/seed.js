require("dotenv").config();
const mongoose = require("mongoose");

const Avatar = require("./Models/Avatar");
const Temple = require("./Models/Temples");
const Story = require("./Models/Story");
const Shlok = require("./Models/Shlok");

const avatars = [
  {
    name: "Matsya",
    title: "The Fish Avatar",
    description:
      "Bhagwan Vishnu ka pehla avatar, jinhone pralaya ke samay jeevan aur gyaan ki raksha ki.",
    image: "/images/avatars/matsya.jpg"
  },
  {
    name: "Narasimha",
    title: "The Man-Lion Avatar",
    description:
      "Bhagwan Vishnu ne Prahlad ki raksha aur adharm ka ant karne ke liye ye avatar liya.",
    image: "/images/avatars/narasimha.jpg"
  },
  {
    name: "Krishna",
    title: "The Divine Avatar",
    description:
      "Bhagwan Krishna ne Bhagavad Gita ke madhyam se karm aur dharm ka gyaan diya.",
    image: "/images/avatars/krishna.jpg"
  }
];

const temples = [
  {
    name: "Badrinath Temple",
    location: "Badrinath, Uttarakhand",
    description:
      "Bhagwan Vishnu ko samarpit prasiddh Char Dham mandir.",
    image: "/images/temples/badrinath.jpg",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Badrinath+Temple"
  },
  {
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    description:
      "Bhagwan Jagannath, Balabhadra aur Subhadra ko samarpit prasiddh mandir.",
    image: "/images/temples/jagannath.jpg",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Jagannath+Temple+Puri"
  },
  {
    name: "Ranganathaswamy Temple",
    location: "Srirangam, Tamil Nadu",
    description:
      "Bhagwan Ranganatha ko samarpit prasiddh Vaishnav mandir.",
    image: "/images/temples/ranganathaswamy.jpg",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Sri+Ranganathaswamy+Temple+Srirangam"
  }
];

const stories = [
  {
    title: "Prahlad Aur Narasimha",
    description: "Bhakti aur vishwas ki kahani.",
    content:
      "Prahlad Bhagwan Vishnu ke param bhakt the. Unke pita Hiranyakashipu unki bhakti ka virodh karte the. Prahlad ki raksha ke liye Bhagwan Vishnu Narasimha roop mein prakat hue aur Hiranyakashipu ka ant kiya.",
    image: "/images/stories/prahlad.jpg",
    category: "Bhakti"
  },
  {
    title: "Samudra Manthan",
    description: "Devtaon aur asuron ke samudra manthan ki kahani.",
    content:
      "Amrit prapt karne ke liye devtaon aur asuron ne Kshir Sagar ka manthan kiya. Bhagwan Vishnu ne Kurma avatar lekar Mandarachal parvat ko sahara diya.",
    image: "/images/stories/samudra-manthan.jpg",
    category: "Puranic Story"
  },
  {
    title: "Gajendra Moksha",
    description: "Bhagwan Vishnu ki kripa aur sharanagati ki kahani.",
    content:
      "Gajendra sankat mein phans gaya aur usne Bhagwan Vishnu ko pukara. Bhagwan Vishnu ne aakar uski raksha ki. Ye kahani sharanagati aur bhagwan ki kripa ka sandesh deti hai.",
    image: "/images/stories/gajendra-moksha.jpg",
    category: "Vishnu Puran"
  }
];

const shloks = [
  {
    title: "Karm Ka Mahatva",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    meaning:
      "Tumhara adhikar karm karne par hai, uske phal par nahi.",
    source: "Bhagavad Gita",
    chapter: "2",
    verse: "47"
  },
  {
    title: "Dharm Ki Raksha",
    sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।",
    meaning:
      "Sajjanon ki raksha aur adharm ko rokne ke liye Bhagwan avatar lete hain.",
    source: "Bhagavad Gita",
    chapter: "4",
    verse: "8"
  },
  {
    title: "Bhagwan Ki Sharan",
    sanskrit: "मामेकं शरणं व्रज।",
    meaning:
      "Bhagwan ki sharan mein aane ka sandesh diya gaya hai.",
    source: "Bhagavad Gita",
    chapter: "18",
    verse: "66"
  }
];

// Duplicate records se bachne ke liye upsert
const syncData = async (Model, records, key) => {
  const operations = records.map((record) => ({
    updateOne: {
      filter: { [key]: record[key] },
      update: { $set: record },
      upsert: true
    }
  }));

  return Model.bulkWrite(operations);
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await syncData(Avatar, avatars, "name");
    console.log("Avatars seeded");

    await syncData(Temple, temples, "name");
    console.log("Temples seeded");

    await syncData(Story, stories, "title");
    console.log("Stories seeded");

    await syncData(Shlok, shloks, "title");
    console.log("Shloks seeded");

    console.log("Vaikunth seed completed successfully!");
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};
seedData();
