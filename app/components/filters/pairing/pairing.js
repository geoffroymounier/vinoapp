const pairing = [
  {
    "key": "appetizer",
    "title": "Appetizer",
    "image": require("assets/meat.png")
  },
  {
    "key": "starter",
    "title": "Starter",
    "image": require("assets/meat.png")
  },
  {
    "key": "meat",
    "title": "Meat",
    "image": require("assets/meat.png")
  },
  {
    "key": "fish",
    "title": "Fish",
    "image": require("assets/meat.png")
  },
  {
    "key": "seafood",
    "title": "Seafood",
    "image": require("assets/meat.png")
  },
  {
    "key": "veggie",
    "title": "Veggie",
    "image": require("assets/meat.png")
  },
  {
    "key": "ricepasta",
    "title": "Rice & Pasta",
    "image": require("assets/meat.png")
  },
  {
    "key": "cheese",
    "title": "Cheese",
    "image": require("assets/meat.png")
  },
  {
    "key": "dessert",
    "title": "Dessert",
    "image": require("assets/meat.png")
  },
  {
    "title": "beef",
    "key":"beef",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "game",
    "key":"game",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "Lamb",
    "key":"lamb",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "offal",
    "key":"offal",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "pork",
    "key":"pork",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "poultry",
    "key":"poultry",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "rabbit",
    "key":"rabbit",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "sheep",
    "key":"sheep",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "title": "veal",
    "key":"veal",
    "type":"type",
    "referrer": ["meat"],
    "image": require("assets/meat.png")
  },
  {
    "key":"rawMeat",
    "value": "raw",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal"],
    "title":"raw",
    "image": require("assets/meat.png")
  },
  {
    "key":"grilledMeat",
    "value": "grilled",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal","poultry"],
    "title":"grilled",
    "image": require("assets/meat.png")
  },
  {
    "key":"roastedMeat",
    "value": "roasted",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal","poultry"],
    "title":"roasted",
    "image": require("assets/meat.png")
  },
  {
    "key":"stewedMeat",
    "value": "stewed",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal","poultry"],
    "title":"stewed",
    "image": require("assets/meat.png")
  },
  {
    "key":"creamButterSauceMeat",
    "value": "cream-butter-sauce",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal","poultry","fish","seafood"],
    "title":"cream / butter sauce",
    "image": require("assets/meat.png")
  },
  {
    "key":"redSauceMeat",
    "value": "red-sauce",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal","poultry","fish","seafood"],
    "title":"red sauce",
    "image": require("assets/meat.png")
  },
  {
    "key":"spicyMeat",
    "value": "spicy",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal","poultry","fish","seafood","starter"],
    "title":"spicy",
    "image": require("assets/meat.png")
  },
  {
    "key":"sweerSourMeat",
    "value": "sweer-sour",
    "type":"cook",
    "referrer": ["beef","game","lamb","offal","pork","rabbit","sheep","veal","poultry","fish","seafood","starter"],
    "title":"sweer sour",
    "image": require("assets/meat.png")
  },
  {
    "title":"raw / smoked",
    "value":"raw",
    "key":"rawFish",
    "type":"cook",
    "referrer":["fish"],
    "image": require("assets/meat.png")
  },
  {
    "title":"grilled",
    "value":"grilled",
    "key":"grilledFish",
    "type":"cook",
    "referrer":["fish"],
    "image": require("assets/meat.png")
  },
  {
    "title":"baked",
    "value":"baked",
    "key":"bakedFish",
    "type":"cook",
    "referrer":["fish"],
    "image": require("assets/meat.png")
  },
  {
    "key":"stewedFish",
    "value": "stewed",
    "type":"cook",
    "referrer": ["fish"],
    "title":"stewed",
    "image": require("assets/meat.png")
  },
  {
    "title":"raw / smoked",
    "value":"raw",
    "key":"rawSeaFood",
    "type":"cook",
    "referrer":["seafood"],
    "image": require("assets/meat.png")
  },
  {
    "title":"grilled",
    "value":"grilled",
    "key":"grilledSeaFood",
    "type":"cook",
    "referrer":["seafood"],
    "image": require("assets/meat.png")
  },
  {
    "title":"baked",
    "value":"baked",
    "key":"bakedSeaFood",
    "type":"cook",
    "referrer":["seafood"],
    "image": require("assets/meat.png")
  },
  {
    "key":"stewedSeaFood",
    "value": "stewed",
    "type":"cook",
    "referrer": ["seafood"],
    "title":"stewed",
    "image": require("assets/meat.png")
  },
  {
    "key":"vegetablesAppetizer",
    "title":"vegetables",
    "value":"vegetables",
    "type":"type",
    "referrer":["appetizer"],
    "image": require("assets/meat.png")
  },
  {
    "key":"seafoodAppetizer",
    "title":"fish / seafood",
    "value":"seafood",
    "type":"type",
    "referrer":["appetizer"],
    "image": require("assets/meat.png")
  },
  {
    "key":"terrineAppetizer",
    "title":"curred meat / terrine",
    "value":"terrine",
    "type":"type",
    "referrer":["appetizer","starter"],
    "image": require("assets/meat.png")
  },
  {
    "key":"verrineAppetizer",
    "title":"spread / verrine",
    "value":"verrine",
    "type":"type",
    "referrer":["appetizer"],
    "image": require("assets/meat.png")
  },
  {
    "key":"crackersAppetizer",
    "title":"crackers",
    "value":"crackers",
    "type":"type",
    "referrer":["appetizer"],
    "image": require("assets/meat.png")
  },
  {
    "key":"quicheAppetizer",
    "title":"quiche / salty cake",
    "value":"quiche",
    "type":"type",
    "referrer":["appetizer","starter"],
    "image": require("assets/meat.png")
  },
  {
    "key":"dipsAppetizer",
    "title":"dips",
    "value":"dips",
    "type":"type",
    "referrer":["appetizer"],
    "image": require("assets/meat.png")
  },
  {
    "key":"foiegrasAppetizer",
    "title":"foie gras",
    "value":"foiegras",
    "type":"type",
    "referrer":["appetizer","starter"],
    "image": require("assets/meat.png")
  },
  {
    "key":"seafoodStarter",
    "title":"fish / seafood",
    "value":"seafood",
    "type":"type",
    "referrer":["started"],
    "image": require("assets/meat.png")
  },
  {
    "key":"greenvegetables",
    "title":"green vegetables",
    "value":"green",
    "type":"type",
    "referrer":["veggie"],
    "image": require("assets/meat.png")
  },
  {
    "key":"southernvegetables",
    "title":"southern vegetables",
    "value":"southern",
    "type":"type",
    "referrer":["veggie"],
    "image": require("assets/meat.png")
  },
  {
    "key":"rootvegetables",
    "title":"root vegetables",
    "value":"root",
    "type":"type",
    "referrer":["veggie"],
    "image": require("assets/meat.png")
  },
  {
    "key":"pulses",
    "title":"pulses",
    "value":"pulses",
    "type":"type",
    "referrer":["veggie"],
    "image": require("assets/meat.png")
  }

]
export default pairing;
