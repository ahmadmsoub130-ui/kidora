const STORIES = [
  {
    id: "little-crescent",
    cat: "ramadan",
    icon: "🌙",
    title: { ar: "الهلال الصغير", en: "The Little Crescent" },
    desc: { ar: "قصة جميلة عن الهلال ورمضان.", en: "A sweet story about the crescent and Ramadan." },
    time: "3 min",
    pages: [
      ["🌙", "في ليلة هادئة، ظهر هلال صغير في السماء.", "On a quiet night, a little crescent appeared in the sky."],
      ["✨", "فرح الأطفال عندما رأوه وبدأوا يتحدثون عن رمضان.", "The children were happy to see it and talked about Ramadan."],
      ["❤️", "قالت الأم: رمضان شهر الخير ومساعدة الآخرين.", "Mother said: Ramadan is a month of kindness and helping others."],
      ["🤲", "قرر الأطفال أن يساعدوا عائلتهم كل يوم.", "The children decided to help their family every day."],
      ["🌟", "ومنذ ذلك اليوم أصبح الهلال الصغير رمزًا للخير في قلوبهم.", "From that day, the little crescent became a symbol of kindness in their hearts."]
    ]
  },

  {
    id: "moon-sleep",
    cat: "bedtime",
    icon: "🌙",
    title: { ar: "القمر الذي لم ينم", en: "The Moon Who Could Not Sleep" },
    desc: { ar: "قصة هادئة وجميلة قبل النوم.", en: "A calm and sweet bedtime story." },
    time: "3 min",
    pages: [
      ["🌙", "كان القمر مستيقظًا طوال الليل.", "The moon was awake all night."],
      ["⭐", "نظر إلى النجوم وسألها: كيف أنام؟", "He looked at the stars and asked, How can I sleep?"],
      ["☁️", "قالت سحابة صغيرة: أغلق عينيك وتخيل مكانًا جميلًا.", "A little cloud said, Close your eyes and imagine a beautiful place."],
      ["😴", "فكر القمر في حديقة مليئة بالزهور.", "The moon imagined a garden full of flowers."],
      ["💤", "وبعد قليل نام القمر بهدوء.", "Soon, the moon fell peacefully asleep."]
    ]
  },

  {
    id: "rabbit-star",
    cat: "animals",
    icon: "🐰",
    title: { ar: "الأرنب والنجمة", en: "The Rabbit and the Star" },
    desc: { ar: "أرنب صغير يبحث عن نجمة جميلة.", en: "A little rabbit searches for a beautiful star." },
    time: "3 min",
    pages: [
      ["🐰", "خرج أرنب صغير من بيته ليلًا.", "A little rabbit left his home at night."],
      ["⭐", "رأى نجمة لامعة فوق الشجرة.", "He saw a shining star above a tree."],
      ["🌳", "حاول الوصول إليها لكنه لم يستطع.", "He tried to reach it but could not."],
      ["🦉", "قالت البومة: بعض الأشياء الجميلة لا تحتاج أن نمتلكها.", "The owl said, Some beautiful things do not need to be owned."],
      ["❤️", "ابتسم الأرنب واستمتع بضوء النجمة.", "The rabbit smiled and enjoyed the star's light."]
    ]
  },

  {
    id: "blue-door",
    cat: "adventures",
    icon: "🚪",
    title: { ar: "الباب الأزرق", en: "The Blue Door" },
    desc: { ar: "مغامرة طفل خلف باب غامض.", en: "A child's adventure behind a mysterious door." },
    time: "4 min",
    pages: [
      ["🚪", "وجد سامي بابًا أزرق صغيرًا في الحديقة.", "Sami found a small blue door in the garden."],
      ["🔑", "وجد مفتاحًا بجانبه.", "He found a key beside it."],
      ["🌈", "فتح الباب فرأى عالمًا مليئًا بالألوان.", "He opened the door and saw a colorful world."],
      ["🦋", "طارت الفراشات حوله وقالت: مرحبًا يا سامي.", "Butterflies flew around him and said, Hello Sami."],
      ["🏡", "عاد سامي إلى منزله وهو يحمل ذكرى جميلة.", "Sami returned home with a wonderful memory."]
    ]
  },

  {
    id: "letter-far-away",
    cat: "world",
    icon: "✉️",
    title: { ar: "رسالة من بعيد", en: "A Letter From Far Away" },
    desc: { ar: "رسالة صغيرة تصل من بلد بعيد.", en: "A little letter arrives from a faraway country." },
    time: "3 min",
    pages: [
      ["✉️", "وصلت رسالة إلى ليان من طفل يعيش في بلد بعيد.", "A letter arrived for Layan from a child living in a faraway country."],
      ["🌍", "كان يحكي فيها عن مدرسته وبلده.", "He wrote about his school and his country."],
      ["🏫", "اكتشفت ليان أن الأطفال يحبون اللعب والتعلم في كل مكان.", "Layan discovered that children everywhere love to play and learn."],
      ["🤝", "أرسلت له رسالة جديدة.", "She sent him a new letter."],
      ["🌎", "وأصبح بينهما صداقة جميلة.", "They became wonderful friends."]
    ]
  },

  {
    id: "city-colors",
    cat: "learning",
    icon: "🎨",
    title: { ar: "مدينة الألوان", en: "The City of Colors" },
    desc: { ar: "قصة تساعد الطفل على تعلم الألوان.", en: "A story that helps children learn colors." },
    time: "3 min",
    pages: [
      ["🔴", "رأى آدم سيارة حمراء.", "Adam saw a red car."],
      ["🔵", "ثم رأى بيتًا أزرق.", "Then he saw a blue house."],
      ["🟡", "وكانت هناك شمس صفراء جميلة.", "There was a beautiful yellow sun."],
      ["🟢", "رأى شجرة خضراء كبيرة.", "He saw a big green tree."],
      ["🌈", "اكتشف آدم أن العالم مليء بالألوان.", "Adam discovered that the world is full of colors."]
    ]
  },

  {
    id: "lion-share",
    cat: "animals",
    icon: "🦁",
    title: { ar: "الأسد الذي تعلم المشاركة", en: "The Lion Who Learned to Share" },
    desc: { ar: "قصة عن المشاركة والصداقة.", en: "A story about sharing and friendship." },
    time: "3 min",
    pages: [
      ["🦁", "كان رعد الأسد يحب الاحتفاظ بكل الطعام لنفسه.", "Raad the lion liked to keep all the food for himself."],
      ["🐿️", "جاءت الحيوانات الصغيرة تبحث عن الطعام.", "The little animals came looking for food."],
      ["🍎", "نظر رعد إلى طعامه وفكر.", "Raad looked at his food and thought."],
      ["🤝", "قرر أن يشارك الطعام مع أصدقائه.", "He decided to share the food with his friends."],
      ["❤️", "ومنذ ذلك اليوم أصبح الجميع يحبون رعد.", "From that day, everyone loved Raad."]
    ]
  },

  {
    id: "three-stars",
    cat: "bedtime",
    icon: "⭐",
    title: { ar: "النجوم الثلاث", en: "The Three Little Stars" },
    desc: { ar: "حكاية هادئة عن ثلاث نجوم.", en: "A peaceful story about three little stars." },
    time: "3 min",
    pages: [
      ["⭐", "كانت هناك ثلاث نجوم صغيرة في السماء.", "There were three little stars in the sky."],
      ["✨", "كانت كل نجمة تحاول أن تضيء أكثر من الأخرى.", "Each star tried to shine brighter than the others."],
      ["💫", "قالت النجمة الكبيرة: عندما نضيء معًا يصبح الليل أجمل.", "The big star said, When we shine together, the night becomes more beautiful."],
      ["🌌", "اجتمعت النجوم الثلاث.", "The three stars came together."],
      ["😴", "وأصبح ضوؤها جميلًا وهادئًا.", "Their light became beautiful and peaceful."]
    ]
  },

  {
    id: "little-seed",
    cat: "learning",
    icon: "🌱",
    title: { ar: "البذرة الصغيرة", en: "The Little Seed" },
    desc: { ar: "قصة عن الصبر والنمو.", en: "A story about patience and growing." },
    time: "3 min",
    pages: [
      ["🌱", "كانت هناك بذرة صغيرة تحت التراب.", "There was a little seed under the soil."],
      ["💧", "كانت تحتاج إلى الماء.", "It needed water."],
      ["☀️", "وكانت تحتاج إلى ضوء الشمس.", "It needed sunlight."],
      ["🌿", "مرت الأيام وبدأت تنمو.", "Days passed and it began to grow."],
      ["🌳", "أصبحت نبتة جميلة.", "It became a beautiful plant."]
    ]
  },

  {
    id: "kind-bird",
    cat: "animals",
    icon: "🐦",
    title: { ar: "العصفور الطيب", en: "The Kind Little Bird" },
    desc: { ar: "عصفور صغير يساعد أصدقاءه.", en: "A little bird helps his friends." },
    time: "3 min",
    pages: [
      ["🐦", "كان عصفور صغير يعيش فوق شجرة.", "A little bird lived in a tree."],
      ["🐜", "وجد نملة تحتاج إلى المساعدة.", "He found an ant that needed help."],
      ["🌿", "أحضر لها ورقة كبيرة لتستريح عليها.", "He brought her a big leaf to rest on."],
      ["🐝", "ثم ساعد نحلة صغيرة في العودة إلى بيتها.", "Then he helped a little bee return home."],
      ["❤️", "تعلم أن الخير يعود دائمًا بالخير.", "He learned that kindness always comes back."]
    ]
  },

  {
    id: "ramadan-lantern",
    cat: "ramadan",
    icon: "🏮",
    title: { ar: "فانوس رمضان", en: "The Ramadan Lantern" },
    desc: { ar: "فانوس صغير ينشر الفرح.", en: "A little lantern spreads joy." },
    time: "3 min",
    pages: [
      ["🏮", "كان لدى عمر فانوس صغير جميل.", "Omar had a beautiful little lantern."],
      ["🌙", "كان يشع في ليالي رمضان.", "It shone during Ramadan nights."],
      ["❤️", "قرر عمر أن يضعه أمام بيت جاره الكبير في السن.", "Omar decided to place it outside his elderly neighbor's home."],
      ["😊", "فرح الجار كثيرًا.", "The neighbor was very happy."],
      ["✨", "فهم عمر أن أجمل نور هو نور الخير.", "Omar learned that the brightest light is kindness."]
    ]
  },

  {
    id: "magic-book",
    cat: "adventures",
    icon: "📖",
    title: { ar: "الكتاب السحري", en: "The Magic Book" },
    desc: { ar: "كتاب يأخذ الطفل إلى عوالم جميلة.", en: "A book that takes a child to wonderful worlds." },
    time: "4 min",
    pages: [
      ["📖", "وجدت نور كتابًا قديمًا على الرف.", "Noor found an old book on a shelf."],
      ["✨", "عندما فتحته ظهرت نجمة مضيئة.", "When she opened it, a shining star appeared."],
      ["🏰", "أخذتها النجمة إلى قلعة بعيدة.", "The star took her to a faraway castle."],
      ["🐉", "وجدت تنينًا صغيرًا يحتاج إلى صديق.", "She found a little dragon who needed a friend."],
      ["🏠", "عادت نور إلى بيتها وهي سعيدة.", "Noor returned home happily."]
    ]
  },

  {
    id: "clean-planet",
    cat: "learning",
    icon: "🌍",
    title: { ar: "كوكبنا الجميل", en: "Our Beautiful Planet" },
    desc: { ar: "قصة تعلم الأطفال المحافظة على البيئة.", en: "A story about caring for our planet." },
    time: "3 min",
    pages: [
      ["🌍", "كانت سارة تحب الطبيعة.", "Sara loved nature."],
      ["🗑️", "رأت بعض الأوراق على الأرض.", "She saw some papers on the ground."],
      ["♻️", "جمعتها ووضعتها في المكان الصحيح.", "She collected them and put them in the right place."],
      ["🌳", "زرعت شجرة صغيرة مع عائلتها.", "She planted a little tree with her family."],
      ["💚", "قالت: كوكبنا بيتنا ويجب أن نحافظ عليه.", "She said, Our planet is our home, and we should care for it."]
    ]
  },

  {
    id: "honest-boy",
    cat: "learning",
    icon: "⭐",
    title: { ar: "الولد الصادق", en: "The Honest Boy" },
    desc: { ar: "قصة عن الصدق وتحمل المسؤولية.", en: "A story about honesty and responsibility." },
    time: "3 min",
    pages: [
      ["👦", "وجد سامر لعبة ليست له.", "Samer found a toy that was not his."],
      ["🧸", "أراد أن يحتفظ بها، لكنه فكر في صاحبها.", "He wanted to keep it, but he thought about its owner."],
      ["🔎", "بحث عن الطفل الذي فقدها.", "He looked for the child who lost it."],
      ["😊", "وجد صاحب اللعبة وأعادها إليه.", "He found the owner and returned it."],
      ["❤️", "شعر سامر بالسعادة لأنه فعل الشيء الصحيح.", "Samer felt happy because he did the right thing."]
    ]
  }
];
