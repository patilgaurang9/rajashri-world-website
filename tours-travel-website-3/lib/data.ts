export interface Tour {
  id: string
  slug: string
  title: string
  description: string
  image: string
  price: number
  duration: string
  location: string
  category: string
  maxPeople: string
  rating: number
  reviews: number
  difficulty: "easy" | "moderate" | "challenging"
  inclusions: string[]
  itinerary: {
    title: string
    description: string
  }[]
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "bali-cultural-adventure",
    title: "Bali Cultural Adventure",
    description:
      "Immerse yourself in the rich culture and stunning landscapes of Bali. Visit ancient temples, experience traditional ceremonies, and relax on pristine beaches.",
    image: "/images/istockphoto-675172642-612x612.jpg",
    price: 1299,
    duration: "7 days",
    location: "Bali, Indonesia",
    category: "Cultural",
    maxPeople: "12 people",
    rating: 4.8,
    reviews: 124,
    difficulty: "easy",
    inclusions: [
      "Accommodation in 4-star hotels",
      "All meals included",
      "Professional tour guide",
      "Transportation",
      "Temple entrance fees",
      "Cultural workshops",
      "Airport transfers",
    ],
    itinerary: [
      {
        title: "Arrival in Denpasar",
        description:
          "Welcome to Bali! Transfer to hotel and evening welcome dinner with traditional Balinese dance performance.",
      },
      {
        title: "Ubud Cultural Tour",
        description:
          "Visit Monkey Forest Sanctuary, Ubud Palace, and traditional art markets. Participate in a Balinese cooking class.",
      },
      {
        title: "Temple Hopping",
        description: "Explore Tanah Lot Temple at sunset and visit the sacred Uluwatu Temple with Kecak fire dance.",
      },
      {
        title: "Rice Terraces & Volcano",
        description: "Visit Jatiluwih Rice Terraces and Mount Batur for sunrise trekking (optional).",
      },
      {
        title: "Beach Day",
        description: "Relax at Seminyak Beach, water sports activities, and beachside lunch.",
      },
      {
        title: "Traditional Villages",
        description: "Visit traditional villages, witness local crafts, and participate in a purification ceremony.",
      },
      {
        title: "Departure",
        description: "Last-minute shopping and transfer to airport for departure.",
      },
    ],
  },
  {
    id: "2",
    slug: "paris-romantic-getaway",
    title: "Paris Romantic Getaway",
    description:
      "Experience the city of love with your special someone. Visit iconic landmarks, enjoy fine dining, and cruise along the Seine River.",
    image: "/images/aris.jpeg",
    price: 1899,
    duration: "5 days",
    location: "Paris, France",
    category: "Romance",
    maxPeople: "8 people",
    rating: 4.9,
    reviews: 89,
    difficulty: "easy",
    inclusions: [
      "Luxury hotel accommodation",
      "Daily breakfast",
      "Seine River cruise",
      "Eiffel Tower dinner",
      "Louvre Museum tickets",
      "Private city tour",
      "Airport transfers",
    ],
    itinerary: [
      {
        title: "Arrival & Eiffel Tower",
        description: "Arrive in Paris, check into luxury hotel, and enjoy dinner at the Eiffel Tower restaurant.",
      },
      {
        title: "Louvre & Champs-Élysées",
        description: "Visit the world-famous Louvre Museum and stroll down the Champs-Élysées for shopping.",
      },
      {
        title: "Montmartre & Sacré-Cœur",
        description: "Explore the artistic district of Montmartre and visit the beautiful Sacré-Cœur Basilica.",
      },
      {
        title: "Seine River Cruise",
        description: "Romantic Seine River cruise with dinner and live music, passing by illuminated landmarks.",
      },
      {
        title: "Versailles Day Trip",
        description: "Full day excursion to the magnificent Palace of Versailles and its gardens.",
      },
    ],
  },
  {
    id: "3",
    slug: "tokyo-modern-adventure",
    title: "Tokyo Modern Adventure",
    description:
      "Discover the perfect blend of traditional and modern Japan. From ancient temples to cutting-edge technology, experience it all in Tokyo.",
    image: "/images/tokyo.jpg",
    price: 2199,
    duration: "8 days",
    location: "Tokyo, Japan",
    category: "Adventure",
    maxPeople: "15 people",
    rating: 4.7,
    reviews: 156,
    difficulty: "moderate",
    inclusions: [
      "Modern hotel accommodation",
      "Daily breakfast",
      "JR Pass for transportation",
      "Sushi making class",
      "Temple visits",
      "Tokyo Skytree tickets",
      "Professional guide",
    ],
    itinerary: [
      {
        title: "Arrival & Shibuya",
        description: "Arrive in Tokyo, experience the famous Shibuya crossing, and explore the vibrant nightlife.",
      },
      {
        title: "Traditional Tokyo",
        description: "Visit Senso-ji Temple, explore Asakusa district, and experience a traditional tea ceremony.",
      },
      {
        title: "Modern Tokyo",
        description: "Visit Tokyo Skytree, explore Akihabara electronics district, and experience robot restaurants.",
      },
      {
        title: "Tsukiji & Ginza",
        description: "Early morning visit to Tsukiji Fish Market and upscale shopping in Ginza district.",
      },
      {
        title: "Day Trip to Nikko",
        description: "Visit the UNESCO World Heritage shrines and temples of Nikko.",
      },
      {
        title: "Harajuku & Omotesando",
        description: "Explore youth culture in Harajuku and high-end shopping in Omotesando.",
      },
      {
        title: "Mount Fuji Excursion",
        description: "Day trip to Mount Fuji area with lake cruise and scenic views.",
      },
      {
        title: "Departure",
        description: "Last-minute shopping in Tokyo Station and departure.",
      },
    ],
  },
  {
    id: "4",
    slug: "new-york-city-explorer",
    title: "New York City Explorer",
    description:
      "The city that never sleeps awaits! Experience Broadway shows, world-class museums, and iconic landmarks in the Big Apple.",
    image: "/images/ndw ork.jpg",
    price: 1699,
    duration: "6 days",
    location: "New York, USA",
    category: "Urban",
    maxPeople: "20 people",
    rating: 4.6,
    reviews: 203,
    difficulty: "easy",
    inclusions: [
      "Manhattan hotel accommodation",
      "Daily breakfast",
      "Broadway show tickets",
      "Statue of Liberty cruise",
      "Empire State Building",
      "Central Park tour",
      "Subway passes",
    ],
    itinerary: [
      {
        title: "Arrival & Times Square",
        description: "Arrive in NYC, check into Manhattan hotel, and explore the bright lights of Times Square.",
      },
      {
        title: "Statue of Liberty & Ellis Island",
        description: "Ferry to Statue of Liberty and Ellis Island with guided historical tour.",
      },
      {
        title: "Central Park & Museums",
        description: "Explore Central Park and visit the Metropolitan Museum of Art or MoMA.",
      },
      {
        title: "Brooklyn Bridge & DUMBO",
        description: "Walk across iconic Brooklyn Bridge and explore the trendy DUMBO neighborhood.",
      },
      {
        title: "Broadway & High Line",
        description: "Matinee Broadway show and evening stroll along the elevated High Line park.",
      },
      {
        title: "Empire State & Shopping",
        description: "Visit Empire State Building observation deck and shopping on Fifth Avenue.",
      },
    ],
  },
  {
    id: "5",
    slug: "dubai-luxury-experience",
    title: "Dubai Luxury Experience",
    description:
      "Indulge in the ultimate luxury experience in Dubai. From world-class shopping to desert safaris, experience the best of the UAE.",
    image: "/images/dubai.jpg",
    price: 2499,
    duration: "6 days",
    location: "Dubai, UAE",
    category: "Luxury",
    maxPeople: "10 people",
    rating: 4.9,
    reviews: 78,
    difficulty: "easy",
    inclusions: [
      "5-star hotel accommodation",
      "All meals included",
      "Desert safari with dinner",
      "Burj Khalifa tickets",
      "Dubai Mall shopping tour",
      "Luxury yacht cruise",
      "Private transfers",
    ],
    itinerary: [
      {
        title: "Arrival & Burj Al Arab",
        description: "Arrive in Dubai, luxury hotel check-in, and welcome dinner at Burj Al Arab.",
      },
      {
        title: "Burj Khalifa & Dubai Mall",
        description: "Visit the worlds tallest building and explore the massive Dubai Mall with aquarium.",
      },
      {
        title: "Desert Safari Adventure",
        description: "Thrilling desert safari with dune bashing, camel riding, and traditional Bedouin dinner.",
      },
      {
        title: "Palm Jumeirah & Atlantis",
        description: "Explore Palm Jumeirah island and visit the luxurious Atlantis resort and aquarium.",
      },
      {
        title: "Dubai Marina & Yacht Cruise",
        description: "Luxury yacht cruise around Dubai Marina with gourmet lunch and city skyline views.",
      },
      {
        title: "Gold Souk & Spice Market",
        description: "Traditional market shopping and last-minute luxury purchases before departure.",
      },
    ],
  },
  {
    id: "6",
    slug: "iceland-northern-lights",
    title: "Iceland Northern Lights",
    description:
      "Witness the magical Northern Lights and explore Icelands dramatic landscapes. From geysers to glaciers, experience natures wonders.",
    image: "/images/icelad.jpeg",
    price: 1799,
    duration: "7 days",
    location: "Reykjavik, Iceland",
    category: "Adventure",
    maxPeople: "16 people",
    rating: 4.8,
    reviews: 92,
    difficulty: "moderate",
    inclusions: [
      "Hotel accommodation",
      "Daily breakfast",
      "Northern Lights tour",
      "Golden Circle tour",
      "Blue Lagoon entry",
      "Glacier hiking",
      "4WD transportation",
    ],
    itinerary: [
      {
        title: "Arrival & Reykjavik",
        description: "Arrive in Reykjavik, city tour, and evening Northern Lights hunting (weather permitting).",
      },
      {
        title: "Golden Circle Tour",
        description: "Visit Thingvellir National Park, Geysir geothermal area, and Gullfoss waterfall.",
      },
      {
        title: "South Coast Adventure",
        description: "Explore Seljalandsfoss and Skógafoss waterfalls, and black sand beaches of Vík.",
      },
      {
        title: "Glacier Hiking",
        description: "Guided glacier hiking on Sólheimajökull glacier with professional equipment.",
      },
      {
        title: "Blue Lagoon & Northern Lights",
        description: "Relax in the famous Blue Lagoon geothermal spa and evening Northern Lights tour.",
      },
      {
        title: "Whale Watching",
        description: "Whale watching cruise from Reykjavik harbor and explore local museums.",
      },
      {
        title: "Departure",
        description: "Final Northern Lights attempt and departure from Keflavik Airport.",
      },
    ],
  },
]

export interface Testimonial {
  id: string
  name: string
  location: string
  content: string
  avatar: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Aarav Mehta",
    location: "Mumbai, India",
    content:
      "The Rajasthan Heritage Tour was unforgettable! Exploring the palaces of Jaipur and riding camels in Jaisalmer felt like living in history. The cultural shows and traditional Rajasthani food made the trip extra special.",
    avatar: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/av1.jpeg",
    rating: 5,
  },
  {
    id: "2",
    name: "Rohan Sharma",
    location: "Delhi, India",
    content:
      "The Golden Triangle Tour exceeded all my expectations! Agra’s Taj Mahal took my breath away, and Delhi’s street food walk was delicious. The guides were knowledgeable and made history come alive. A must-do for travelers!",
    avatar: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/av2.jpeg",
    rating: 5,
  },
  {
    id: "3",
    name: "Vikram Patel",
    location: "Ahmedabad, India",
    content:
      "The Ladakh Adventure was the trip of a lifetime! Riding through the Himalayas, visiting Pangong Lake, and experiencing the local monasteries was surreal. The arrangements and homestays were excellent!",
    avatar: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/av3.jpeg",
    rating: 5,
  },
  {
    id: "4",
    name: "Kunal Verma",
    location: "Kolkata, India",
    content:
      "Goa was the perfect blend of relaxation and adventure! From beach hopping to water sports and exploring old Portuguese churches, everything was perfectly arranged. The seafood was absolutely mouthwatering!",
    avatar: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/v4.jpeg",
    rating: 5,
  },
  {
    id: "5",
    name: "Ananya Rao",
    location: "Bengaluru, India",
    content:
      "Kerala’s backwaters were a dream come true! The houseboat stay was serene, and watching the sunset over Alleppey was magical. The Ayurveda spa session left me refreshed and relaxed. Highly recommend this experience!",
    avatar: "https://txttpwyddxfhakgygtdc.supabase.co/storage/v1/object/public/images/av5.jpg",
    rating: 5,
  },
]


export interface FAQ {
  id: string
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I book a tour?",
    answer:
      "All bookings are handled through our 'Send Enquiry' option. Select your desired tour, click 'Send Enquiry,' and fill in the details. Our team will review your request, confirm availability, and share the next steps for payment and confirmation.",
  },
  {
    id: "2",
    question: "Can I request a custom tour package?",
    answer:
      "Yes! You can request a fully customized tour through the 'Send Enquiry' form. Just let us know your destinations, dates, budget, and interests, and our team will design a personalized itinerary for you.",
  },
  {
    id: "3",
    question: "Can I make special requests in my enquiry?",
    answer:
      "Of course. You can include requests such as room preferences, specific activities, additional nights, or transport upgrades in your enquiry. We’ll adjust the package accordingly before confirmation.",
  },
  {
    id: "4",
    question: "What is included in the tour packages?",
    answer:
      "Our packages typically cover accommodation, daily breakfast, guided tours, transportation, entrance fees, and airport transfers. For custom requests, inclusions can be adjusted as per your preferences.",
  },
  {
    id: "5",
    question: "Do you help with visas, flights, or travel insurance?",
    answer:
      "We don’t directly provide these services, but we can connect you with reliable partners for visa support, flight bookings, and travel insurance so your trip is seamless.",
  },
  {
    id: "6",
    question: "What if I have dietary restrictions or special needs?",
    answer:
      "Please mention any dietary requirements or accessibility needs in your enquiry. We’ll coordinate with hotels, restaurants, and providers to make sure your needs are taken care of.",
  },
  {
    id: "7",
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made 60+ days before departure are fully refundable minus a processing fee. 30–59 days before departure, a 50% penalty applies. Cancellations within 30 days are non-refundable. We recommend travel insurance.",
  },
  {
    id: "8",
    question: "Are your tours suitable for solo travelers?",
    answer:
      "Yes! Many of our travelers book solo. You can join a group tour to meet others or request a custom solo package through the enquiry form.",
  },
]
